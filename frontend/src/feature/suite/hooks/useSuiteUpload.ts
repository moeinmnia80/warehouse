import { useSendDataMutation, type UploadPayload } from "@/feature/suite";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const useSuiteUpload = () => {
  const [uploadMutation, { isLoading: isUploading }] = useSendDataMutation();

  const upload = async ({ credentials, type, id }: UploadPayload) => {
    try {
      await uploadMutation({ credentials, type, id }).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          (error as FetchBaseQueryError | SerializedError) ??
          "upload file error",
      };
    }
  };

  return {
    isUploading,
    upload,
  };
};
