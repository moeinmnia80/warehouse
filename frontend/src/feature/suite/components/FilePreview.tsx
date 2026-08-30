import { calculateFileSize, cn } from "@/shared";
import { DownloadIcon } from "lucide-react";
import {
  type FilePreviewProps,
  useGetPackageImageQuery,
  useGetPackageInvoiceQuery,
} from "@/feature/suite";

export const FilePreview = ({
  item,
  packageId,
  className,
}: FilePreviewProps) => {
  const isPdf = item.type === "pdf";

  const imageQuery = useGetPackageImageQuery(
    { packageId, fileName: item.name },
    { skip: isPdf },
  );
  const invoiceQuery = useGetPackageInvoiceQuery(
    // for auto download from idm split pdf ext
    { packageId, fileName: item.name.split(".")[0] },
    { skip: !isPdf },
  );
  const { data, isFetching, isError } = isPdf ? invoiceQuery : imageQuery;

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
      {data && isPdf ? (
        <div className="flex justify-center flex-col w-full h-full p-2 text-xs cursor-default">
          <p className="line-clamp-2">{item.name}</p>
          <p className="opacity-30">{calculateFileSize(item.size)}</p>
          <a
            href={data.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-1 left-1 flex-center size-5 bg-b-primary rounded-full opacity-55"
            download={`${item.name}`}
          >
            <DownloadIcon className="size-3 stroke-tx-primary hover:stroke-success" />
          </a>
        </div>
      ) : (
        <>
          {data && (
            <img
              src={data.fileUrl}
              alt={item.name}
              className={cn("w-full h-full object-cover", className)}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          )}
          {data && (
            <a
              href={data.fileUrl}
              rel="noopener noreferrer"
              download={`${item.name}`}
              className="absolute bottom-1 left-1 flex-center size-5 bg-b-primary rounded-full opacity-55"
            >
              <DownloadIcon className="size-3 stroke-tx-primary hover:stroke-success" />
            </a>
          )}
        </>
      )}
    </div>
  );
};
