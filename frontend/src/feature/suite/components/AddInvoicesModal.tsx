import { useRef, useState } from "react";
import { toast } from "@/store/toast.store";
import { calculateFileSize } from "@/shared";
import { PdfIcon, TrashIcon, UploadIcon } from "@/assets/index";
import { useSuiteUpload, type AddInvoiceModalProps } from "@/feature/suite";

const MAX_FILES = 3;

export const AddInvoicesModal = ({
  item: pkg,
  packageId,
}: AddInvoiceModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { upload, isUploading } = useSuiteUpload();

  /**
   * Adds newly selected files to state, enforcing the MAX_FILES limit
   * against the *combined* total (existing + incoming), not just existing.
   */
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

  /** Opens the hidden file input via the visible "Add Invoice" button. */
  const triggerFileInputClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0 || !packageId) return;

    setError(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("packagePdf", file));

    const res = await upload({
      credentials: formData,
      type: "pdf",
      id: packageId,
    });

    if (res.success) {
      toast.success("The file was successfully uploaded");
    } else {
      toast.error("Upload failed");
    }
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
          title="file"
          ref={inputRef}
          accept=".pdf"
          onChange={handleFileInputChange}
          className="hidden"
          multiple
        />

        <div className="flex gap-2">
          {pkg?.invoices.map((invoice) => (
            <div
              key={invoice.name}
              className="flex-center flex-col size-30 p-2 border border-bo-primary rounded-lg text-tx-primary text-xs text-center"
            >
              {invoice.name}
              <span className="text-tx-secondary">
                {calculateFileSize(invoice.size)}
              </span>
            </div>
          ))}

          {files.map((file) => (
            <div
              key={file.name}
              className="relative flex-center flex-col size-30 bg-b-secondary border border-bo-primary rounded-lg overflow-hidden p-2 animate-fade-in text-tx-secondary text-xs"
            >
              <span
                onClick={() => removeFile(file.name)}
                className="absolute right-2 top-2 flex-center size-6 text-error bg-error-50 rounded-full cursor-pointer"
              >
                <TrashIcon className="size-4 stroke-error" />
              </span>

              <PdfIcon className="size-10 stroke-st-primary" />
              <span className="line-clamp-2">{file.name}</span>
              <span className="line-clamp-2">
                {calculateFileSize(file.size)}
              </span>
            </div>
          ))}

          <button
            type="submit"
            disabled={!files.length}
            className="flex-center flex-col size-30 bg-b-secondary border border-bo-primary rounded-lg disabled:opacity-50 disabled:cursor-default"
          >
            <UploadIcon className="size-10 stroke-st-primary" />
            <span className="text-tx-primary text-xl">
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
          className="btn max-w-full bg-tx-primary text-b-primary rounded-lg"
          onClick={triggerFileInputClick}
        >
          Add Invoice
        </button>
      </div>
    </form>
  );
};
