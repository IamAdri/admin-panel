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
  const { data, error } = await supabase.auth.updateUser({
    password: formData.password,
  });
  if (error) throw new Error("Could not update user credentials!");

  return data;
}
