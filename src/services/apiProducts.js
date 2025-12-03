import { ITEMS_PER_PAGE } from "../utils/constants";
import supabase from "./supabase";

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
  const firstColor = formData.color1;
  const secondColor = formData.color2;
  let variants = {
    [firstColor]: [],
    [secondColor]: [],
  };

  const { data, error } = await supabase
    .from("items")
    .insert([
      {
        name: formData.name,
        category: category,
        description: formData.description,
        variants: variants,
        price: Number(formData.price),
        discount: Number(formData.discount),
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
  //Create object for variants column
  const firstColor = formData.color1;
  const secondColor = formData.color2;
  let variants = {
    [firstColor]: [],
    [secondColor]: [],
  };

  const { error } = await supabase
    .from("items")
    .update({
      name: formData.name,
      category: category,
      description: formData.description,
      variants: variants,
      price: Number(formData.price),
      discount: Number(formData.discount),
      itemType: formData.itemType,
    })
    .eq("id", formData.productID)
    .select();

  if (error) throw new Error("Could not update new product!");
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
    .eq("email", email)
    .select();
  if (error) throw new Error("Could not load customers` details!");
  return data;
}
