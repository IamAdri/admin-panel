import supabase from "./supabase";

export async function getAdminDetails() {
  let { data, error } = await supabase.from("admin").select("*");
  if (error) throw new Error("Could not load admin`s details!");
  return data;
}

export async function updateAdminDetails(formData) {
  console.log(formData);
  const { data, error } = await supabase
    .from("admin")
    .update({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    })
    .eq("id", formData.adminID)
    .select();
  if (error) throw new Error("Could not update admin`s details!");
  return data;
}
