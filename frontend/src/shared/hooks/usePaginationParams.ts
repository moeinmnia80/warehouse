import { useSearchParams } from "react-router";

export const usePaginationParams = (defaultPage = 1, paramKey = "page") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = Number(searchParams.get(paramKey));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : defaultPage;

  const setPage = (newPage: number) => {
    setSearchParams(
      (prev) => {
        prev.set(paramKey, String(newPage));
        return prev;
      },
      { replace: true },
    );
  };

  return { page, setPage };
};
