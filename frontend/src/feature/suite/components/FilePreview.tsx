import { cn, useObjectUrl } from "@/shared";
import { DownloadIcon } from "lucide-react";
import {
  useGetPackageImageQuery,
  useGetPackageInvoiceQuery,
} from "@/feature/suite";
import { Suspense } from "react";
export interface RemoteDropzoneFile {
  id: string;
  name: string;
  size: number;
  url?: string;
  type?: string;
}
export const FilePreview = ({
  packageId,
  item,
  className,
}: {
  packageId: string;
  item: RemoteDropzoneFile;
  className?: string;
}) => {
  const isPdf = item.type === "pdf";

  const imageQuery = useGetPackageImageQuery(
    { packageId, fileName: item.name.split(".")[0] },
    { skip: isPdf },
  );
  const invoiceQuery = useGetPackageInvoiceQuery(
    // for auto download from idm split pdf ext
    { packageId, fileName: item.name.split(".")[0] },
    { skip: !isPdf },
  );
  const { data: blob, isFetching, isError } = isPdf ? invoiceQuery : imageQuery;
  const objectUrl = useObjectUrl(blob);
  if (isError) {
    return (
      <div className={className}>
        <span className="text-xs opacity-60">failed to load</span>
      </div>
    );
  }
  if (isFetching) {
    return (
      <div
        className={`${className} absolute inset-0 animate-pulse bg-white/10`}
      />
    );
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute inset-0 w-full h-full **:transition **:duration-150 **:delay-75"
    >
      {objectUrl && isPdf ? (
        <Suspense fallback={<>Loading</>}>
          <div className="flex item justify-center flex-col w-full h-full p-2 text-xs line-clamp-1">
            <p>{item.name}</p>
            <p className="opacity-35">
              {item.size / (1024 * 1024) <= 0.1
                ? (item.size / 1024).toFixed(2) + " KB"
                : (item.size / (1024 * 1024)).toFixed(2) + " Mb"}
            </p>
            <a
              href={objectUrl}
              className="absolute bottom-1 left-1 flex-center size-5 bg-b-primary z-10 rounded-full opacity-55 "
              target="_blank"
              download
            >
              <DownloadIcon className="size-3 stroke-tx-primary hover:stroke-success" />
            </a>
          </div>
        </Suspense>
      ) : (
        <>
          <img
            src={objectUrl}
            alt={item.name}
            className={cn("w-full h-full object-cover", className)}
            draggable={false}
            loading="eager"
            decoding="async"
          />
          {objectUrl && (
            <a
              className="absolute bottom-1 left-1 flex-center size-5 bg-b-primary z-10 rounded-full opacity-55"
              href={objectUrl}
              target="_blank"
              download
            >
              <DownloadIcon className="size-3 stroke-tx-primary hover:stroke-success" />
            </a>
          )}
        </>
      )}
    </div>
  );
};
