export const getCookie = (name: string): string | null => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!match) return null;

  const value = match.slice(match.indexOf("=") + 1);
  return decodeURIComponent(value);
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; secure; samesite=strict; path=/`;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; secure; samesite=strict`;
};
