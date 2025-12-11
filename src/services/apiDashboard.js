import supabase from "./supabase";

export async function getRatings() {
  const { data, error } = await supabase.from("reviews").select("rating");
  if (error) throw new Error("Could not load ratings!");
  return data;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("deliveryDate,totalPrice")
    .order("deliveryDate");

  if (error) throw new Error("Could not load orders for revenue!");
  return data;
}
