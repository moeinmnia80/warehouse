import { useEffect, type RefObject } from "react";

export function useObjectUrlOnImg(
  blob: Blob | undefined,
  imgRef: RefObject<HTMLImageElement | null>,
) {
  useEffect(() => {
    if (!blob || !imgRef.current) return;
    const url = URL.createObjectURL(blob);
    imgRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [blob, imgRef]);
}
