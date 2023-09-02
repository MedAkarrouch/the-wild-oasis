import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Cabins could not be loaded");

  return data;
};
export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin could not be deleted");

  return data;
};
export const createEditCabin = async (newCabin, id) => {
  console.log(newCabin, id);
  let imageName, imagePath;
  let query = supabase.from("cabins");
  const hasImage = newCabin?.image?.startsWith?.(supabaseUrl);

  if (!hasImage) {
    imageName = `${Date.now()}--${newCabin.image?.name?.replaceAll("/", "")}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1- Create doc
  if (!id)
    query = query.insert([
      { ...newCabin, image: hasImage ? newCabin.image : imagePath },
    ]);
  // 1- Update doc
  if (id)
    query = query
      .update({ ...newCabin, image: hasImage ? newCabin.image : imagePath })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be ${id ? "updated" : "created"}`);
  }

  // 2- Upload image
  if (hasImage) return data;

  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (uploadError) throw new Error(uploadError.message);

  return data;
};
