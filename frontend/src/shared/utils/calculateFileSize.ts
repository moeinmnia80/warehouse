export const calculateFileSize = (size: number, decimal = 2) => {
  if (isNaN(size) || size < 0) {
    throw new Error("Invalid file size: size must be a non-negative number.");
  }

  if (isNaN(decimal) || decimal < 0) {
    throw new Error("Invalid decimal: decimal must be a non-negative number.");
  }

  const KB = 1024;
  const MB = 1024 * 1024;

  return size < MB
    ? (size / KB).toFixed(decimal) + " Kb"
    : (size / MB).toFixed(decimal) + " Mb";
};
