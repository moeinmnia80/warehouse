import { UploadIcon } from "@/assets";
import { toast } from "@/store/toast.store";
import { FilePreview, useSuiteUpload } from "@/feature/suite";
import {
  Dropzone,
  DropzoneArea,
  type TableRow,
  DropzoneFileList,
  DropzoneSubmitButton,
} from "@/shared";

export const DropzoneDocument = ({ data }: { data: TableRow }) => {
  const { upload } = useSuiteUpload();
  return (
    <Dropzone
      maxFiles={3}
      accept="pdf"
      initialFiles={data?.invoices}
      onSubmit={async (files) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("packagePdf", file));

        const res = await upload({
          credentials: formData,
          id: data.packageId,
          type: "pdf",
        });

        if (res.success) {
          toast.success("files successfully uploaded");
        } else {
          toast.error("something went wrong ... try another time");
        }
      }}
    >
      <DropzoneArea className="cursor-pointer rounded-xl py-3">
        <p className="text-sm text-tx-placeholder">
          Drag & drop images here, or click anywhere, or
        </p>
        <p className="text-sm text-tx-placeholder">
          PDF up to 10MB — max 3 files
        </p>
        <DropzoneFileList
          className="flex gap-2 mt-3 "
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
