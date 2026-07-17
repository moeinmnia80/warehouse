import { cn } from "@/shared/utils/merge.utils";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
} from "react";

// Common accept presets so you don't have to remember MIME strings or
// extension lists — pass a key like "image" or "pdf", or fall back to any
// raw accept string (e.g. ".svg" or "application/json") for edge cases.
const ACCEPT_PRESETS = {
  pdf: ".pdf",
  image: "image/*",
  doc: ".doc,.docx",
  spreadsheet: ".xls,.xlsx,.csv",
  video: "video/*",
  audio: "audio/*",
  any: "",
} as const;

type AcceptPreset = keyof typeof ACCEPT_PRESETS;
// `string & {}` keeps the ACCEPT_PRESETS keys autocompleting in your editor
// while still allowing any other custom string to be passed.
type AcceptValue = AcceptPreset | (string & {});

const resolveAccept = (accept: AcceptValue): string =>
  accept in ACCEPT_PRESETS ? ACCEPT_PRESETS[accept as AcceptPreset] : accept;

//——————————————————————————————————
//0-—————— File model ———————————————
//——————————————————————————————————
// A file shown in the dropzone can be one of two very different things:
// - "local": a browser File the user just picked/dropped, not uploaded yet.
// - "remote": metadata about a file that already exists on your server
//   (e.g. fetched from your API when the page loads). There's no File
//   object for these — just whatever your API gives you.
//
// Both need to render in the same list and both need a "remove" button,
// but removing a local one is just a state update, while removing a
// remote one should call your backend. The `kind` tag is how every part
// of this component tells them apart.

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

// File and RemoteDropzoneFile both expose `name`/`size`, so these just
// read straight through regardless of which kind the item is.
const getItemName = (item: DropzoneItem) => item.file.name;
const getItemSize = (item: DropzoneItem) => item.file.size;

const IMAGE_EXTENSION_RE = /\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i;

const isImageItem = (item: DropzoneItem): boolean => {
  if (item.kind === "local") return item.file.type.startsWith("image/");
  if (item.file.type) return item.file.type.startsWith("image/");
  // No mime type from the API — fall back to guessing from the name.
  return IMAGE_EXTENSION_RE.test(item.file.name);
};

interface DropzoneProps extends Omit<
  ComponentProps<"div">,
  "onDrop" | "onDragOver" | "onSubmit"
> {
  maxFiles?: number;
  /** A preset ("pdf", "image", "doc", "spreadsheet", "video", "audio", "any")
   *  or a raw accept string like ".pdf,.png" / "image/*" */
  accept?: AcceptValue;
  /** Files that already exist on your server, e.g. fetched from your API
   *  before this renders. Shown alongside newly picked/dropped files.
   *  Pass a stable array reference (memoize it) — a new array identity
   *  on every render will keep re-syncing remote items. */
  initialFiles?: RemoteDropzoneFile[];
  /** Called with the newly picked/dropped (not-yet-uploaded) files
   *  whenever that set changes. Remote files are never included here. */
  onFilesChange?: (files: File[]) => void;
  /** Called with the new (local) files when DropzoneSubmitButton is
   *  clicked. Can be async (e.g. an upload request) — the button
   *  disables itself and shows a pending state until it resolves. */
  onSubmit?: (files: File[]) => void | Promise<void>;
  /** Called when a file's remove button is clicked, for BOTH kinds.
   *  For a "remote" item this is where you'd call your DELETE endpoint.
   *  The item is only removed from the list after this resolves —
   *  throw (or reject) to keep it and surface an error instead. */
  onRemove?: (item: DropzoneItem) => void | Promise<void>;
}

interface DropzoneContextProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  maxFiles: number;
  accept: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  /** Combined, derived list — remote (from initialFiles) + local (picked/dropped).
   *  Read-only from here; use setLocalItems to add/remove local files. */
  items: DropzoneItem[];
  setLocalItems: Dispatch<SetStateAction<LocalDropzoneItem[]>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  isDragActive: boolean;
  setIsDragActive: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  isSubmitting: boolean;
  handleRemove: (item: DropzoneItem) => void;
  removingIds: Set<string>;
}

//——————————————————————————————————
//1-—————— Context —————————————————
//——————————————————————————————————

const DropzoneContext = createContext({} as DropzoneContextProps);

//——————————————————————————————————
//2-—————— Dropzone ————————————————
//——————————————————————————————————

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
  // Only locally picked/dropped files live in state — remote files come
  // entirely from the initialFiles prop, so they don't need to be copied
  // into state at all (that copying is exactly what caused the effect
  // warning). removedRemoteIds optimistically hides a remote item the
  // moment its removal succeeds, in case your initialFiles refetch is slow.
  const [localItems, setLocalItems] = useState<LocalDropzoneItem[]>([]);
  const [removedRemoteIds, setRemovedRemoteIds] = useState<Set<string>>(
    new Set(),
  );
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const resolvedAccept = resolveAccept(accept);

  // Auto-clear the error after 5s. Guarded so it only arms a timer while
  // there IS an error — setting error back to null here doesn't cause
  // this effect to re-run pointlessly, since the early return short
  // circuits before scheduling anything once error is already null.
  useEffect(() => {
    if (!error) return;
    const timerId = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timerId);
  }, [error]);

  // Derived, not stateful: remote items are just initialFiles minus
  // whatever's been optimistically removed. Computed during render, so
  // there's no extra render cycle the way an effect+setState causes.
  const remoteItems = useMemo(
    (): RemoteDropzoneItem[] =>
      (initialFiles ?? [])
        .filter((file) => !removedRemoteIds.has(file.id))
        .map((file) => ({ kind: "remote", id: file.id, file })),
    [initialFiles, removedRemoteIds],
  );

  const items = useMemo(
    (): DropzoneItem[] => [...remoteItems, ...localItems],
    [remoteItems, localItems],
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
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
    if (localFiles.length === 0 || isSubmitting) return;
    try {
      setIsSubmitting(true);
      await onSubmit?.(localFiles);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (item: DropzoneItem) => {
    try {
      setRemovingIds((prev) => new Set(prev).add(item.id));
      await onRemove?.(item);
      if (item.kind === "local") {
        updateLocalItems((prev) => prev.filter((i) => i.id !== item.id));
      } else {
        setRemovedRemoteIds((prev) => new Set(prev).add(item.id));
      }
    } catch {
      setError(`failed to remove ${getItemName(item)}`);
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
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
          handleClick,
          isDragActive,
          handleSubmit,
          isSubmitting,
          setIsDragActive,
          setLocalItems: updateLocalItems,
          accept: resolvedAccept,
          handleRemove,
          removingIds,
        }}
      >
        {children}
      </DropzoneContext.Provider>
    </div>
  );
};

//—————————————————————————————————————————
//3-—————— DropzoneArea ———————————————————
//—————————————————————————————————————————
// Renders the actual drop target + the hidden <input>. It no longer owns
// the ref or the item state — it just reads/writes them from context so
// DropzoneButton (a sibling) can trigger the same input.

// The native `accept` attribute on <input type="file"> only filters what
// shows up in the OS file picker — it does NOT stop someone from dragging
// a non-matching file straight onto the drop area. So for drag-and-drop we
// re-check each file's extension/MIME type against `accept` ourselves.
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
      setError(`only ${accept} files are allowed`);
      return;
    }
    if (items.length + incoming.length > maxFiles) {
      setError(`max upload files is ${maxFiles}`);
      return;
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
    // reset so selecting the same file again still fires onChange
    e.target.value = "";
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Only clear when the pointer actually leaves the boundary, not when it
    // moves over a child element inside it (dragleave fires for those too).
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

  // Clicking anywhere on the boundary opens the file picker, same as
  // DropzoneButton — both just trigger a click on the shared inputRef.
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

//—————————————————————————————————————————
//3-—————— DropzoneWrapper ————————————————
//—————————————————————————————————————————

export const DropzoneWrapper = ({ children }: ComponentProps<"div">) => {
  return <div>{children}</div>;
};

//—————————————————————————————————————————
//4-—————— DropzoneButton —————————————————
//—————————————————————————————————————————
// add file
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
  const { handleClick: handleAddFile } = useContext(DropzoneContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddFile(e);
    onClick?.();
  };

  return (
    <button onClick={handleClick} {...props}>
      {children ?? "Browse files"}
    </button>
  );
};

//—————————————————————————————————————————
//5-—————— DropzoneSubmitButton ———————————
//—————————————————————————————————————————

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
  const { handleSubmit, items, isSubmitting } = useContext(DropzoneContext);
  const hasLocalFiles = items.some((item) => item.kind === "local");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled ?? (!hasLocalFiles || isSubmitting)}
      {...props}
    >
      {children ?? (isSubmitting ? "Submitting..." : "Submit")}
    </button>
  );
};

//—————————————————————————————————————————
//6-—————— DropzoneImagePreview ———————————
//—————————————————————————————————————————

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
      />
    </div>
  );
};

//—————————————————————————————————————————
//7-—————— DropzoneFileList ————————————————
//—————————————————————————————————————————
// Renders both local (pending) and remote (already-uploaded) files with
// a remove button on each. Removing calls the shared handleRemove, which
// runs your onRemove callback and only drops the item once it resolves.
// Image files get a thumbnail via DropzoneImagePreview; everything else
// falls back to the plain name/size row.

interface DropzoneFileListProps extends ComponentProps<"ul"> {
  itemClassName?: string;
  /** Dropzone has no idea how your backend authenticates requests, so it
   *  can't fetch a protected remote image's bytes itself. If your image
   *  route needs a token (as opposed to being a plain public URL), pass
   *  a component here that fetches and renders it yourself — e.g. one
   *  built on an RTK Query endpoint. Called only for "remote" items. */
  renderRemotePreview: (item: RemoteDropzoneItem) => React.ReactNode;
  /** Same idea as renderRemotePreview, but for clicking the filename to
   *  download. Leave unset if item.file.url is a plain public URL (the
   *  built-in <a download> handles that fine). Provide this if your
   *  download route also needs an auth header — fetch the blob yourself
   *  and trigger the save (e.g. via a temporary object URL + <a>.click()). */
  onDownload?: (item: RemoteDropzoneItem) => void;
}

export const DropzoneFileList = ({
  children,
  itemClassName,
  renderRemotePreview,
  ...props
}: DropzoneFileListProps) => {
  const { items, error, handleRemove, removingIds } =
    useContext(DropzoneContext);

  return (
    <>
      <ul {...props}>
        {!!items.length &&
          items.map((item, i) => {
            const isRemoving = removingIds.has(item.id);
            return (
              <li
                key={item.id}
                aria-busy={isRemoving}
                className={cn("relative", itemClassName)}
              >
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
                        {getItemSize(item) / (1024 * 1024) <= 0.1
                          ? (getItemSize(item) / 1024).toFixed(2) + " KB"
                          : (getItemSize(item) / (1024 * 1024)).toFixed(2) +
                            " Mb"}
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
                  disabled={isRemoving}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(item);
                  }}
                  className="absolute top-1 right-1 bg-b-primary flex-center size-5 rounded-full opacity-50 disabled:opacity-40 hover:text-alert transition duration-200 delay-75"
                >
                  <span className="mb-0.5">{isRemoving ? "…" : "×"}</span>
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

/* 
? Example usage:

  <Dropzone
    maxFiles={5}
    accept="image"
    initialFiles={existingFiles}
    onFilesChange={(files) => console.log("pending upload:", files)}
    onSubmit={async (files) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      await fetch(`${BASE_URL}/my-suite/packages/${packageId}/images`, {
        method: "POST",
        body: formData,
      });
    }}
    onRemove={async (item) => {
      if (item.kind === "remote") {
        await fetch(
          `${BASE_URL}/my-suite/packages/${packageId}/images/${item.file.name}`,
          { method: "DELETE" },
        );
       }
      * local items need no backend call — just let them be removed
    }}
  >
    <DropzoneArea
      className="border-2 border-dashed p-6 rounded-lg cursor-pointer
                transition-colors data-[active]:border-blue-500
                data-[active]:bg-blue-50"
    >
      <DropzoneWrapper>
        <p>Drag & drop images here, or click anywhere, or</p>
        <DropzoneButton>Choose files</DropzoneButton>
      </DropzoneWrapper>
      <DropzoneFileList />
    </DropzoneArea>
    <DropzoneSubmitButton />
  </Dropzone>

  * accept also takes any raw string for custom cases:
  <Dropzone accept=".svg,.ai">...</Dropzone>

  DropzoneArea sets `data-active="true"` on itself while a file is being
  dragged over it — use the data-[active] Tailwind variant (or a plain
  `[data-active] { ... }` CSS selector) to style the highlighted state.

  Pass `type` (mime type) in each RemoteDropzoneFile if you have it — it
  lets the component detect images without guessing from the filename.
*/
