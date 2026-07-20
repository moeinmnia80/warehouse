import { useSendDataMutation, type MutationDataType } from "@/feature/suite";

export const useSuiteUpload = () => {
  const [uploadMutation, { isLoading: isUploading }] = useSendDataMutation();

  const upload = async ({ credentials, type, id }: MutationDataType) => {
    try {
      await uploadMutation({ credentials, type, id }).unwrap();
      return { success: true as const };
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? String((err as { data?: unknown }).data)
          : "upload file error";

      return { success: false as const, error: message };
    }
  };

  return {
    isUploading,
    upload,
  };
};
