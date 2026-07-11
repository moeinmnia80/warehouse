export const getCookie = (name: string): string | null => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!match) return null;

  const value = match.split("=")[1];
  return decodeURIComponent(value);
};
export const setCookies = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; secure; samesite=strict; path=/`;
};
