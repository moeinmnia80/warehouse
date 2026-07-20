import { UploadIcon } from "@/assets";
import {
  Dropzone,
  DropzoneArea,
  type TableRow,
  DropzoneFileList,
  DropzoneSubmitButton,
} from "@/shared/index";
import { toast } from "@/store/toast.store";
import { FilePreview, useSuiteUpload } from "@/feature/suite";

export const DropzoneImage = ({ data }: { data: TableRow }) => {
  const { upload } = useSuiteUpload();
  return (
    <Dropzone
      maxFiles={5}
      accept="image"
      initialFiles={data?.images}
      onSubmit={async (files) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));

        const res = await upload({
          credentials: formData,
          id: data.packageId,
          type: "images",
        });

        if (res.success) {
          toast.success("files successfully uploaded");
        } else {
          toast.error(res.error ?? "something went wrong ... try another time");
        }
      }}
    >
      <DropzoneArea className="cursor-pointer rounded-xl py-3">
        <p className="text-sm text-tx-placeholder">
          Drag & drop images here, or click anywhere, or
        </p>
        <p className="text-sm text-tx-placeholder">
          Images up to 5MB — max 5 files
        </p>
        <DropzoneFileList
          className="flex gap-2 mt-3"
          itemClassName="flex-center flex-col bg-b-primary size-22 text-sm font-semibold border border-bo-primary rounded-xl animate-fade-in"
          renderRemotePreview={(item) => (
            <FilePreview
              packageId={data.packageId}
              item={item.file}
              className="rounded-md"
            />
          )}
        />
      </DropzoneArea>
      <DropzoneSubmitButton className="flex-center gap-1 w-fit py-3 px-8 text-md text-b-primary font-semibold bg-tx-primary rounded-xl disabled:opacity-15 disabled:cursor-default">
        Upload
        <UploadIcon className="size-4 stroke-b-primary" />
      </DropzoneSubmitButton>
    </Dropzone>
  );
};
