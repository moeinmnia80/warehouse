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
export const removeCookie = () => {
  document.cookie =
    "auth-token" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
};
