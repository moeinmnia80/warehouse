import path from "path";

import { Errors } from "./errors.js";
import { supabase } from "../config/supabase.js";

import { BUCKET_NAME } from "../constants/suite.constants.js";

export const uploadFileToSupabase = async (file, folderName, packageId) => {
  const fileExt = path.extname(file.originalname);
  const fileName = `${folderName}/${packageId}/${Date.now()}${fileExt}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw Errors.internal(`Supabase upload failed: ${error.message}`);

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

export const processAndUploadFiles = async (files, folderName, packageId) => {
  const uploadPromises = files.map(async (file) => {
    const fileUrl = await uploadFileToSupabase(file, folderName, packageId);
    return {
      id: crypto.randomUUID(),
      url: fileUrl,
      name: Buffer.from(file.originalname, "latin1").toString("utf8"),
      size: file.size,
      type: file.originalname.split(".").pop(),
      packageId,
    };
  });

  return Promise.all(uploadPromises);
};
