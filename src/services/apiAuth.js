import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updateData;
  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };
  // / 1- update password or fullName
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  // 2- upload the avatar image
  if (!avatar) return data?.user;
  const fileName = `avatar-${data.user.id}-${Date.now()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadError) throw new Error(uploadError.message);
  // 3- update avatar in the user
  const { error: updateError, data: updatedUser } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateError) throw new Error(updateError.message);
  console.log(updatedUser);
  return updatedUser?.user;
}
