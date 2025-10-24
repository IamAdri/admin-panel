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

  //Display products based on srting option
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

  const { data, error, count } = await query;

  if (error) throw new Error("Could not load products for table!");

  return { data, count };
}

export async function getProductsForFilterAndForm() {
  const { data, error } = await supabase.from("items").select("*");

  if (error) throw new Error("Could not load products for filter!");

  return data;
}
