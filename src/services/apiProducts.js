import { ITEMS_PER_PAGE } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getProductsForTable({
  page,
  selectedSortingOption,
  filter,
}) {
  //Set range of products dispayed in one page.
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + (ITEMS_PER_PAGE - 1);

  //Get filter options parsed
  const filterObject = filter !== null ? JSON.parse(filter) : null;

  //Get all products from supabase
  let query = supabase.from("items").select("*", { count: "exact" });

  //Select only products that matches with selected filter options
  if (filterObject?.type) query = query.in("itemType", filterObject.type);
  if (filterObject?.category)
    query = query.overlaps("category", [filterObject.category]);
  if (filterObject?.minPrice) query = query.gte("price", filterObject.minPrice);
  if (filterObject?.maxPrice) query = query.lte("price", filterObject.maxPrice);
  if (filterObject?.color)
    query = query.or(
      filterObject.color
        .map((color) => `variants->${color}.not.is.null`)
        .join(",")
    );

  //Divide products on pages
  if (page) query = query.range(from, to);

  //Display products based on sorting option
  if (selectedSortingOption === "ascendingPrice")
    query = query.order("price", { ascending: true });
  if (selectedSortingOption === "descendingPrice")
    query = query.order("price", { ascending: false });
  if (selectedSortingOption === "default")
    query = query.order("id", { ascending: true });
  if (selectedSortingOption === "withDiscount")
    query = query.not("discount", "is", null);
  if (selectedSortingOption === "noDiscount")
    query = query.is("discount", null);
  if (selectedSortingOption === "recentlyAdded")
    query = query.order("created_at", { ascending: false });

  const { data, error, count } = await query;
  if (error) throw new Error("Could not load products for table!");

  return { data, count };
}

export async function getAllProducts() {
  const { data, error } = await supabase.from("items").select("*");

  if (error) throw new Error("Could not load products for filter!");

  return data;
}

export async function getAllProductNames() {
  const { data, error } = await supabase.from("items").select("name");

  if (error) throw new Error("Could not load names of existing products!");
  return data;
}

async function uploadImages(data) {
  //Select colors and images file from formData
  const firstColor = data.color1;
  const secondColor = data.color2;
  const imagesArrayFirstColor = Object.values(data.imagesFirstColor);
  const imagesArraySecondColor = Object.values(data.imagesSecondColor);
  let imageNamesFirstColor = [];
  let imageNamesSecondColor = [];
  //Upload in storage bucket images for first color and add names with Math.random in array
  for (const image of imagesArrayFirstColor) {
    const imageName = `/${Math.random()}-${image.name}`;
    imageNamesFirstColor.push(imageName);
    const { error: storageUploadErrorFirstColor } = await supabase.storage
      .from(data.category)
      .upload(imageName, image);
    if (storageUploadErrorFirstColor)
      throw new Error(
        "Could not upload images in storage bucket for first color!"
      );
  }
  //Upload in storage bucket images for second color and add names with Math.random in array
  for (const image of imagesArraySecondColor) {
    const imageName = `${Math.random()}-${image.name}`;
    imageNamesSecondColor.push(imageName);
    const { error: storageUploadErrorSecondColor } = await supabase.storage
      .from(data.category)
      .upload(imageName, image);
    if (storageUploadErrorSecondColor)
      throw new Error(
        "Could not upload images in storage bucket for second color!"
      );
  }
  //Create paths of images for table column.
  let imagesPathsFirstColor = [];
  let imagesPathsSecondColor = [];
  imageNamesFirstColor.map((name) => {
    imagesPathsFirstColor.push(
      `${supabaseUrl}/storage/v1/object/public/${data.category}/${name}`
    );
  });
  imageNamesSecondColor.map((name) => {
    imagesPathsSecondColor.push(
      `${supabaseUrl}/storage/v1/object/public/${data.category}/${name}`
    );
  });
  let variants = {
    [firstColor]: imagesPathsFirstColor,
    [secondColor]: imagesPathsSecondColor,
  };
  return variants;
}

export async function addNewProduct(formData) {
  //Find out if there is a product already with name from form an return an error if so
  const existingNamesArr = [];
  const existingNames = await getAllProductNames();
  existingNames.map((name) => {
    return existingNamesArr.push(Object.values(name));
  });
  if (existingNamesArr.flat().includes(formData.name))
    throw new Error(
      "This name has been used already. Please use another name!"
    );
  //Check if new product is new collection or not
  let category = [];
  formData.newCollection === "yes"
    ? category.push(formData.category, "newCollection")
    : category.push(formData.category);

  //Create object for variants column
  const variants = await uploadImages(formData);
  //Set to null discount if it is "" or 0
  const discount =
    formData.discount === "" || formData.discount === "0"
      ? null
      : Number(formData.discount);
  //Add product to the table
  const { data, error } = await supabase
    .from("items")
    .insert([
      {
        name: formData.name,
        category: category,
        description: formData.description,
        variants: variants,
        price: Number(formData.price),
        discount: discount,
        itemType: formData.itemType,
      },
    ])
    .select();
  if (error) throw new Error("Could not add new product!");
  return data;
}

export async function editProduct(formData) {
  console.log(formData);
  //Check if updated product is new collection or not
  let category = [];
  formData.newCollection === "yes"
    ? category.push(formData.category, "newCollection")
    : category.push(formData.category);
  console.log(formData?.imagesFirstColor?.length);
  //Create object for variants column
  const variants =
    formData?.imagesFirstColor?.length > 0
      ? await uploadImages(formData)
      : "undefined";
  console.log(formData);
  console.log(variants);
  //Update edited product in table
  const { error } = await supabase
    .from("items")
    .update({
      name: formData.name,
      category: category,
      description: formData.description,
      price: Number(formData.price),
      discount: Number(formData.discount),
      itemType: formData.itemType,
    })
    .eq("id", formData.productID)
    .select();
  //Upload new images only if images were changed
  const { error: updateImagesError } =
    variants !== "undefined" &&
    (await supabase
      .from("items")
      .update({
        variants: variants,
      })
      .eq("id", formData.productID)
      .select());
  //Throw errors for each async operation
  if (error) throw new Error("Could not update new product!");
  if (updateImagesError)
    throw new Error("Could not update images for edited product!");
}

export async function deleteProduct(name) {
  const { error } = await supabase.from("items").delete().eq("name", name);
  if (error) throw new Error("Could not delete the product!");
}

export async function getOrders() {
  let { data, error } = await supabase.from("orders").select("*");
  if (error) throw new Error("Could not load the orders!");
  return data;
}

export async function getCustomerDetails(email) {
  let { data, error } = await supabase
    .from("userDetails")
    .select()
    .eq("email", email);

  if (error) throw new Error("Could not load customer`s details!");
  return data;
}
