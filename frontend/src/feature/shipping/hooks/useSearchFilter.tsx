import {
  type SearchFilterProps,
  checkInDateFilterRange,
} from "@/feature/shipping";

export const useSearchFilter = ({
  data,
  search,
  dateFilter,
}: SearchFilterProps) => {
  if (!data) return [];
  if (!search && !dateFilter.preset) return data;

  const lowerSearch = search.toLowerCase();
  const matchSearch = data.filter(
    ({ description, invoice }) =>
      description?.toLowerCase().includes(lowerSearch) ||
      invoice?.name?.toLowerCase().includes(lowerSearch),
  );

  return matchSearch.filter(({ createdAt }) =>
    checkInDateFilterRange({
      dateFilterRange: dateFilter.range,
      date: createdAt,
    }),
  );
};
