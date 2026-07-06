import { useCallback, useEffect, useState, type ComponentProps } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import DangerIcon from "@/assets/icons/DangerIcon";

interface FileWithPreview extends File {
  preview: string;
}

interface ImageDropzoneProps extends Pick<ComponentProps<"div">, "children"> {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMb?: number;
}

const ImageDropzone = ({
  children,
  onFilesChange,
  maxFiles = 10,
  maxSizeMb = 5,
}: ImageDropzoneProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string | null>(null);

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
              : "Only image files are accepted",
        );
      }

      const withPreview = accepted.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      ) as FileWithPreview[];

      setFiles((prev) => {
        const next = [...prev, ...withPreview].slice(0, maxFiles);
        onFilesChange?.(next);
        return next;
      });
    },
    [maxFiles, maxSizeMb, onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: maxSizeMb * 1024 * 1024,
    maxFiles,
  });

  const removeFile = (name: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.name !== name);
      onFilesChange?.(next);
      return next;
    });
  };

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
  }, [files]);

  return (
    <div className="w-full mt-1">
      <div
        {...getRootProps()}
        className={`flex flex-col cursor-pointer transition 
          ${isDragActive ? "border-t-primary bg-b-table" : "border-bo-primary"}
        `}
      >
        <input {...getInputProps()} />

        <p className="text-md text-t-placeholder font-medium">
          {isDragActive
            ? "Drop images here"
            : "Drag and drop or click to add photos"}
        </p>
        <p className="text-xs text-t-placeholder">
          PNG, JPG up to {maxSizeMb}MB — max {maxFiles} files
        </p>
        <div className="flex items-center gap-4 mt-2">
          {children}
          {files.length > 0 &&
            files.map((file) => (
              <div
                key={file.name}
                className="relative aspect-square rounded-md overflow-hidden border border-bo-primary group w-22 h-22"
              >
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                  className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-error">
          <DangerIcon className="size-3.5 stroke-error" />
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
