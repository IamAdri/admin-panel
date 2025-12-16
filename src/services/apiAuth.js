import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Could not login user!");

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("Could not get user!");

  return data?.user;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("Could not log out the user!");
}

export async function updateCredentials(formData) {
  const { error: updateCredentialsError } = await supabase.auth.updateUser({
    password: formData.password,
  });
  if (updateCredentialsError)
    throw new Error("Could not update user credentials!");

  const { data, error: updateAdminDetailsError } = await supabase
    .from("admin")
    .update({
      email: formData.email,
      password: formData.password,
    })
    .eq("id", formData.adminID)
    .select();

  if (updateAdminDetailsError)
    throw new Error("Could not update admin`s details!");
  return data;
}
