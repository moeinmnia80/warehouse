// ---- Types ----------------------------------------------------

export type DatePreset = "30d" | "60d" | "90d" | "1y" | "custom" | null;
export interface DateRange {
  from: string | null; // ISO string, e.g. "2026-06-08T10:00:00.000Z"
  to: string | null;
}
export interface SortState {
  key: string | null;
  type: "asc" | "desc";
}
export interface ShippingState {
  search: string;
  sort: SortState;
  dateFilter: {
    preset: DatePreset;
    range: DateRange;
  };
}
