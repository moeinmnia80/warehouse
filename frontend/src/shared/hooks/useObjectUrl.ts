export function useObjectUrl(blob: Blob | undefined) {
  return blob ? URL.createObjectURL(blob) : undefined;
}
