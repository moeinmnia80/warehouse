import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import UploadIcon from "@/assets/icons/UploadIcon";
import DangerIcon from "@/assets/icons/DangerIcon";
import PdfIcon from "@/assets/icons/PdfIcon";

interface DocumentDropzoneProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMb?: number;
}

const ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DocumentDropzone = ({
  onFilesChange,
  maxFiles = 10,
  maxSizeMb = 10,
}: DocumentDropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejections: FileRejection[]) => {
      setError(null);

      if (rejections.length > 0) {
        const reason = rejections[0].errors[0];
        setError(
          reason.code === "file-too-large"
            ? `File too large — max ${maxSizeMb}MB`
            : reason.code === "too-many-files"
              ? `Max ${maxFiles} files allowed`
              : "Only PDF, Word, or Excel files are accepted",
        );
      }

      setFiles((prev) => {
        const next = [...prev, ...accepted].slice(0, maxFiles);
        onFilesChange?.(next);
        return next;
      });
    },
    [maxFiles, maxSizeMb, onFilesChange],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: maxSizeMb * 1024 * 1024,
    maxFiles,
  });

  const removeFile = (name: string) => {
    console.log(name);

    setFiles((prev) => {
      const next = prev.filter((f) => f.name !== name);
      onFilesChange?.(next);
      return next;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("documents", file, file.name));

    try {
      const res = await fetch("/api/packages/123/documents", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const data = await res.json();
      console.log("uploaded:", data);
      setFiles([]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full mt-1">
      <div
        {...getRootProps()}
        className={`flex flex-col rounded-xl transition-colors
          ${isDragActive ? "border-t-primary bg-b-table" : "border-bo-primary"}
        `}
      >
        <input {...getInputProps()} />
        <p className="text-md font-medium text-t-placeholder">
          {isDragActive
            ? "Drop documents here"
            : "Drag and drop or click to add documents"}
        </p>
        <p className="text-sm text-t-placeholder">
          PDF, DOC, XLS up to {maxSizeMb}MB — max {maxFiles} files
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            uploadFiles();
          }}
          disabled={uploading}
          className={`btn mt-2 h-12 px-6 bg-t-primary rounded-lg text-b-primary font-bold disabled:opacity-50 w-fit`}
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <span className="flex-center gap-2">
              Upload
              <UploadIcon className="size-4 stroke-b-primary" />
            </span>
          )}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-error">
          <DangerIcon className="size-3.5 stroke-error" />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="flex gap-2 mt-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between gap-3 rounded-lg border border-bo-primary px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-center size-9 rounded-md bg-b-table shrink-0 text-xs font-bold text-t-secondary uppercase">
                  <PdfIcon className="size-6 stroke-st-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-md text-t-primary font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-t-placeholder">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="text-t-secondary hover:text-error text-sm shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {uploadError && <p className="text-error text-sm mt-2">{uploadError}</p>}
    </div>
  );
};

export default DocumentDropzone;
