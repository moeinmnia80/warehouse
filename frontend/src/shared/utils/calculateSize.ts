export const calcSize = (size: number, decimal = 2) => {
  const KB = 1024;
  const MB = 1024 * 1024;
  return size < MB
    ? (size / KB).toFixed(decimal) + " Kb"
    : (size / MB).toFixed(decimal) + " Mb";
};
