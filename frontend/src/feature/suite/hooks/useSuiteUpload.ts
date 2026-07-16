import { useSendDataMutation, type MutationDataType } from "@/feature/suite";

export const useSuiteUpload = () => {
  const [uploadMutation, { isLoading: isUploading }] = useSendDataMutation();

  const upload = async ({ credentials, type, id }: MutationDataType) => {
    try {
      await uploadMutation({ credentials, type, id }).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error || "upload file error",
      };
    }
  };

  return {
    isUploading,
    upload,
  };
};
