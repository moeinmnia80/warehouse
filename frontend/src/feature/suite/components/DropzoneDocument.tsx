import { UploadIcon } from "@/assets";
import { FilePreview, useSuiteUpload } from "@/feature/suite";
import {
  Dropzone,
  type Package,
  DropzoneArea,
  DropzoneFileList,
  DropzoneSubmitButton,
  Spinner,
} from "@/shared";

export const DropzoneDocument = ({ data }: { data: Package }) => {
  const { upload, isUploading } = useSuiteUpload();

  return (
    <Dropzone
      maxFiles={3}
      accept="pdf"
      initialFiles={data?.invoices}
      onSubmit={async (files) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("packagePdf", file));

        await upload({
          credentials: formData,
          id: data.packageId,
          type: "pdf",
        });
      }}
    >
      <DropzoneArea className="cursor-pointer rounded-xl px-2 mt-2 py-3 data-active:bg-b-secondary transition duration-300">
        <p className="text-sm text-tx-placeholder">
          Drag & drop images here, or click anywhere, or
        </p>
        <p className="text-sm text-tx-placeholder">
          PDF up to 10MB — max 3 files
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
      <DropzoneSubmitButton className="flex-center w-32 mt-2 py-3 px-8 text-md text-b-primary font-semibold bg-tx-primary rounded-xl disabled:opacity-15 disabled:cursor-default">
        <Spinner className={isUploading ? "size-4 text-b-primary" : "hidden"} />
        <div className={isUploading ? "hidden" : "flex items-center gap-1"}>
          Upload
          <UploadIcon className="size-4 stroke-b-primary" />
        </div>
      </DropzoneSubmitButton>
    </Dropzone>
  );
};
