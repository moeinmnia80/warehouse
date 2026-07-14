import type { TableRow } from "@/shared";
import { useAppSelector } from "@/store/redux/store";

export const useSuiteFilter = (data: TableRow[]) => {
  const sort = useAppSelector((state) => state.suite.sort);
  const category = useAppSelector((state) => state.suite.category);

  if (!data) return;
  const filterData =
    category === "View All"
      ? data
      : data.filter(
          (item) => item.status.label === category.toLocaleLowerCase(),
        );

  const sortedData = () => {
    if (!sort.key) return filterData;
    const key = sort.key as keyof TableRow;
    const arr = [...filterData];

    arr.sort((a, b) => {
      let av: string | number = a[key] as string;
      let bv: string | number = b[key] as string;

      if (key === "itemValues") {
        av = parseFloat((av as string).replace(/[^0-9.]/g, ""));
        bv = parseFloat((bv as string).replace(/[^0-9.]/g, ""));
      } else if (key === "packageId") {
        av = Number((av as string).split("-").pop());
        bv = Number((bv as string).split("-").pop());
      } else if (key === "weight") {
        av = parseFloat(av as string);
        bv = parseFloat(bv as string);
      } else if (key === "dataReceived") {
        av = new Date(av as string).getTime();
        bv = new Date(bv as string).getTime();
      } else if (key === "vendor") {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      } else {
        return 0;
      }

      if (av < bv) return sort.type === "asc" ? -1 : 1;
      if (av > bv) return sort.type === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  };
  return sortedData();
};
