import { useRef } from "react";
import { cn, useObjectUrlOnImg } from "@/shared";
import { useGetPackageImageQuery } from "@/feature/suite";

export const PackageImageThumbnail = ({
  packageId,
  fileName,
  className,
}: {
  packageId: string;
  fileName: string;
  className?: string;
}) => {
  const {
    data: blob,
    isFetching,
    isError,
  } = useGetPackageImageQuery({
    packageId,
    fileName,
  });
  const imgRef = useRef<HTMLImageElement>(null);
  useObjectUrlOnImg(blob, imgRef);

  if (isError) {
    return (
      <div className={className}>
        <span className="text-xs opacity-60">failed to load</span>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {isFetching && (
        <div
          className={`${className} absolute inset-0 animate-pulse bg-white/10`}
        />
      )}
      <img
        ref={imgRef}
        alt={fileName}
        className={cn("w-full h-full object-cover", className)}
        draggable={false}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
