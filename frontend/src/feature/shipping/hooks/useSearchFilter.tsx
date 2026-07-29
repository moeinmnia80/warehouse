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

  if (data) {
    const matchSearch = data.filter(
      ({ description, invoice }) =>
        description.includes(search) || invoice.file === search,
    );
    // matchDateFilter
    return matchSearch.filter(({ timestamps }) =>
      checkInDateFilterRange({
        dateFilterRange: dateFilter.range,
        date: timestamps.created_at,
      }),
    );
  }
};
