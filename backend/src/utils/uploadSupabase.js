import path from "path";

import { Errors } from "./errors.js";
import { supabase } from "../config/supabase.js";

import { BUCKET_NAME } from "../constants/suite.constants.js";

export const uploadFileToSupabase = async (file, packageId) => {
  const fileExt = path.extname(file.originalname);
  const serverFileName = `${Date.now()}${fileExt}`;

  const relativePath = `packages/${packageId}/${serverFileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(relativePath, file.buffer, {
      contentType: file.mimetype,
      cacheControl: 3600,
      upsert: true,
    });

  if (error) throw Errors.internal(`Supabase upload failed: ${error.message}`);

  return {
    path: relativePath,
  };
};

export const processAndUploadFiles = async (files, folderName, packageId) => {
  const uploadPromises = files.map(async (file) => {
    const { path: fileUrlPath } = await uploadFileToSupabase(file, packageId);

    const originalName = Buffer.from(file.originalname, "latin1").toString(
      "utf8",
    );

    const fullPublicUrl = getPublicFileUrl(fileUrlPath);

    return {
      id: crypto.randomUUID(),
      url: fullPublicUrl,
      path: fileUrlPath,
      name: originalName,
      size: file.size,
      type: originalName.split(".").pop(),
      packageId,
    };
  });

  return Promise.all(uploadPromises);
};

export const deleteFileFromSupabase = async (filePath) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) throw Errors.internal(`Supabase delete failed: ${error.message}`);

  return data;
};

export const getPublicFileUrl = (filePath) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
};
