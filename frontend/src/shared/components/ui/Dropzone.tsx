import { cn, calculateFileSize } from "@/shared";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  type Dispatch,
  type ComponentProps,
  type SetStateAction,
} from "react";

const ACCEPT_PRESETS = {
  pdf: ".pdf",
  image: "image/*",
  doc: ".doc,.docx",
  spreadsheet: ".xls,.xlsx,.csv",
  video: "video/*",
  audio: "audio/*",
} as const;

type AcceptPreset = keyof typeof ACCEPT_PRESETS;

const resolveAccept = (accept: AcceptPreset): string =>
  accept in ACCEPT_PRESETS ? ACCEPT_PRESETS[accept] : accept;

export interface RemoteDropzoneFile {
  id: string;
  name: string;
  size: number; // bytes
  url?: string;
  /** Mime type, e.g. "image/png" — pass this from your API if you have it
   *  so the preview logic doesn't have to guess from the file extension. */
  type?: string;
}

interface LocalDropzoneItem {
  kind: "local";
  id: string;
  file: File;
}
interface RemoteDropzoneItem {
  kind: "remote";
  id: string;
  file: RemoteDropzoneFile;
}
export type DropzoneItem = LocalDropzoneItem | RemoteDropzoneItem;

const getItemName = (item: DropzoneItem) => item.file.name;
const getItemSize = (item: DropzoneItem) => item.file.size;

const IMAGE_EXTENSION_RE = /\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i;

const isImageItem = (item: DropzoneItem): boolean => {
  if (item.kind === "local") return item.file.type.startsWith("image/");
  if (item.file.type) return item.file.type.startsWith("image/");
  return IMAGE_EXTENSION_RE.test(item.file.name);
};

interface DropzoneProps extends Omit<
  ComponentProps<"div">,
  "onDrop" | "onDragOver" | "onSubmit"
> {
  maxFiles?: number;
  accept?: AcceptPreset;
  initialFiles?: RemoteDropzoneFile[];
  /** Called with the newly picked/dropped (not-yet-uploaded) files
   *  whenever that set changes. Remote files are never included here. */
  onFilesChange?: (files: File[]) => void;
  onSubmit?: (files: File[]) => void | Promise<void>;
  onRemove?: (item: DropzoneItem) => void | Promise<void>;
}

interface DropzoneContextProps {
  triggerFileInput: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  accept: string;
  maxFiles: number;
  /** Combined, derived list — remote (from initialFiles) + local (picked/dropped).
   *  Read-only from here; use setLocalItems to add/remove local files. */
  items: DropzoneItem[];
  error: string | null;
  isDragActive: boolean;
  handleSubmit: () => void;
  handleRemove: (item: DropzoneItem) => void;
  setError: Dispatch<SetStateAction<string | null>>;
  setIsDragActive: Dispatch<SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setLocalItems: Dispatch<SetStateAction<LocalDropzoneItem[]>>;
}

const DropzoneContext = createContext({} as DropzoneContextProps);

export const Dropzone = ({
  children,
  maxFiles = 3,
  accept = "pdf",
  initialFiles,
  onFilesChange,
  onSubmit,
  onRemove,
  ...props
}: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [localItems, setLocalItems] = useState<LocalDropzoneItem[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const resolvedAccept = resolveAccept(accept);

  useEffect(() => {
    if (!error) return;
    const timerId = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timerId);
  }, [error]);

  const remoteItems: RemoteDropzoneItem[] = (initialFiles ?? []).map(
    (file) => ({ kind: "remote", id: file.id, file }),
  );

  const items: DropzoneItem[] = [...remoteItems, ...localItems];

  const triggerFileInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const updateLocalItems: Dispatch<SetStateAction<LocalDropzoneItem[]>> = (
    value,
  ) => {
    setLocalItems((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      onFilesChange?.(next.map((item) => item.file));
      return next;
    });
  };

  const handleSubmit = async () => {
    const localFiles = localItems.map((item) => item.file);
    if (!localFiles.length) return;
    try {
      await onSubmit?.(localFiles);
    } finally {
      setLocalItems([]);
    }
  };

  const handleRemove = async (item: DropzoneItem) => {
    if (item.kind === "local") {
      return updateLocalItems((prev) => prev.filter((i) => i.id !== item.id));
    }
    try {
      await onRemove?.(item);
    } catch {
      setError(`failed to remove ${getItemName(item)}`);
    }
  };

  return (
    <div {...props}>
      <DropzoneContext.Provider
        value={{
          error,
          items,
          setError,
          inputRef,
          maxFiles,
          isDragActive,
          handleSubmit,
          handleRemove,
          setIsDragActive,
          triggerFileInput,
          accept: resolvedAccept,
          setLocalItems: updateLocalItems,
        }}
      >
        {children}
      </DropzoneContext.Provider>
    </div>
  );
};

const isFileAccepted = (file: File, accept: string) => {
  if (!accept.trim()) return true;
  const rules = accept.split(",").map((r) => r.trim().toLowerCase());
  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();

  return rules.some((rule) => {
    if (rule.startsWith(".")) return fileName.endsWith(rule);
    if (rule.endsWith("/*"))
      return mimeType.startsWith(rule.replace("/*", "/"));
    return mimeType === rule;
  });
};

export const DropzoneArea = ({ children, ...props }: ComponentProps<"div">) => {
  const {
    items,
    accept,
    maxFiles,
    inputRef,
    setError,
    isDragActive,
    setLocalItems,
    setIsDragActive,
  } = useContext(DropzoneContext);

  const addFiles = (incoming: File[]) => {
    const rejected = incoming.filter((file) => !isFileAccepted(file, accept));
    if (rejected.length > 0) {
      return setError(`only ${accept} files are allowed`);
    }
    if (items.length + incoming.length > maxFiles) {
      return setError(`max upload files is ${maxFiles}`);
    }
    setError(null);
    const newItems: LocalDropzoneItem[] = incoming.map((file) => ({
      kind: "local",
      id: crypto.randomUUID(),
      file,
    }));
    setLocalItems((prev) => [...prev, ...newItems]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formFiles = e.target.files;
    if (!formFiles || formFiles.length === 0) return;
    addFiles(Array.from(formFiles));
    e.target.value = "";
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const formFiles = event.dataTransfer?.files;
    if (!formFiles || formFiles.length === 0) return;
    addFiles(Array.from(formFiles));
  };

  const handleAreaClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      {...props}
      onDrop={handleDrop}
      onClick={handleAreaClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      data-active={isDragActive || undefined}
    >
      <input
        type="file"
        title="file"
        ref={inputRef}
        accept={accept}
        className="hidden"
        onChange={handleChange}
        multiple
      />
      {children}
    </div>
  );
};

export const DropzoneWrapper = ({ children }: ComponentProps<"div">) => {
  return <div>{children}</div>;
};

interface DropzoneButtonProps extends Omit<
  ComponentProps<"button">,
  "onClick"
> {
  onClick?: () => void;
}

export const DropzoneButton = ({
  onClick,
  children,
  ...props
}: DropzoneButtonProps) => {
  const { triggerFileInput } = useContext(DropzoneContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    triggerFileInput(e);
    onClick?.();
  };

  return (
    <button onClick={handleClick} {...props}>
      {children ?? "Browse files"}
    </button>
  );
};

interface DropzoneSubmitButtonProps extends Omit<
  ComponentProps<"button">,
  "onClick"
> {
  onClick?: () => void;
}

export const DropzoneSubmitButton = ({
  onClick,
  children,
  disabled,
  ...props
}: DropzoneSubmitButtonProps) => {
  const { handleSubmit, items } = useContext(DropzoneContext);
  const hasFiles = items.some((item) => item.kind === "local");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
    onClick?.();
  };

  return (
    <button onClick={handleClick} disabled={disabled ?? !hasFiles} {...props}>
      {children}
    </button>
  );
};

const DropzoneImagePreview = ({
  item,
  className,
}: {
  item: LocalDropzoneItem;
  className?: string;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const url = URL.createObjectURL(item.file);
    if (imgRef.current) imgRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [item]);

  return (
    <div className={className}>
      <img
        ref={imgRef}
        alt={getItemName(item)}
        className="w-full h-full object-cover"
        draggable={false}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
};

interface DropzoneFileListProps extends ComponentProps<"ul"> {
  itemClassName?: string;
  renderRemotePreview: (item: RemoteDropzoneItem) => React.ReactNode;
}

export const DropzoneFileList = ({
  children,
  itemClassName,
  renderRemotePreview,
  ...props
}: DropzoneFileListProps) => {
  const { items, error, handleRemove } = useContext(DropzoneContext);

  return (
    <>
      <ul {...props}>
        {!!items.length &&
          items.map((item, i) => {
            return (
              <li key={item.id} className={cn("relative", itemClassName)}>
                <div className="flex flex-col justify-center w-full h-full text-xs p-2 overflow-hidden">
                  {item.kind === "remote" ? (
                    renderRemotePreview(item)
                  ) : isImageItem(item) ? (
                    <DropzoneImagePreview
                      item={item}
                      className="absolute inset-0 overflow-hidden rounded-md"
                    />
                  ) : (
                    <>
                      <p className="truncate" title={getItemName(item)}>
                        {getItemName(item)}
                      </p>
                      <span className="text-current font-light opacity-70">
                        {calculateFileSize(getItemSize(item))}
                      </span>
                    </>
                  )}
                </div>
                <span className="absolute top-1 left-1 z-10 bg-b-primary flex-center size-5 text-xs text-t-primary rounded-full opacity-50">
                  {i + 1}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${getItemName(item)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(item);
                  }}
                  className="absolute top-1 right-1 bg-b-primary flex-center size-5 rounded-full opacity-50 disabled:opacity-40 hover:text-alert transition duration-200 delay-75"
                >
                  <span className="mb-0.5">×</span>
                </button>
              </li>
            );
          })}
        <div className={`${items.length >= 3 ? "opacity-10" : ""}`}>
          {children}
        </div>
      </ul>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};
