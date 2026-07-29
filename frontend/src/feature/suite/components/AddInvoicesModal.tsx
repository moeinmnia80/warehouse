import { useRef, useState } from "react";
import { UploadIcon } from "@/assets/index";
import {
  FilePreview,
  InvoiceFile,
  useSuiteUpload,
  type AddInvoiceModalProps,
} from "@/feature/suite";

const MAX_FILES = 3;

export const AddInvoicesModal = ({
  item: pkg,
  packageId,
}: AddInvoiceModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { upload, isUploading } = useSuiteUpload();

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;

    const selected = Array.from(incoming);

    if (files.length + selected.length > MAX_FILES) {
      setError(`You can upload up to ${MAX_FILES} files`);
      return;
    }

    setError(null);
    setFiles((prev) => [...prev, ...selected]);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    addFiles(event.target.files);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };

  const triggerFileInputClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0 || !packageId) return;

    setError(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("packagePdf", file));

    await upload({
      credentials: formData,
      type: "pdf",
      id: packageId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        className="min-h-44 p-6"
      >
        <input
          type="file"
          ref={inputRef}
          accept=".pdf"
          onChange={handleFileInputChange}
          className="hidden"
          multiple
        />

        <div className="flex gap-2">
          {pkg?.invoices.map((invoice) => (
            <div className="relative flex size-30 text-tx-primary text-xs text-center border border-bo-primary rounded-lg">
              <FilePreview item={invoice} packageId={pkg.packageId} />
            </div>
          ))}

          {files.map((file) => (
            <InvoiceFile file={file} removeFile={removeFile} />
          ))}

          <button
            type="submit"
            disabled={!files.length}
            className="flex-center flex-col size-30 bg-b-primary border border-bo-primary rounded-lg disabled:opacity-50 disabled:cursor-default hover:bg-b-secondary transition duration-200"
          >
            <UploadIcon className="size-10 stroke-st-primary" />
            <span className="text-tx-primary text-sm uppercase">
              {isUploading ? "Uploading" : "Upload"}
            </span>
          </button>
        </div>
        {error && <span className="text-error bg-error-50">{error}</span>}
        <span className="text-sm text-tx-secondary">
          You can drag/drop files
        </span>
      </div>

      <div className="p-5 border-t border-bo-primary">
        <button
          className="btn max-w-full bg-tx-primary text-b-primary rounded-lg hover:opacity-30 transition duration-200 delay-75"
          onClick={triggerFileInputClick}
        >
          Add Invoice
        </button>
      </div>
    </form>
  );
};
