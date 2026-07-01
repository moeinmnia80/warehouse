export const checkPath = (value: string) => {
  const pathname = location.pathname;

  return pathname.includes(value);
};
