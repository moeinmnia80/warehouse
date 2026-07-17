import type { TableRow } from "@/shared";

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
export interface ShippingRow {
  shipmentId: string;
  userId: string;
  carrier: string;
  description: string;
  invoice: {
    file: string;
    type: string;
  };
  charge: "100";
  status: "register" | "delivered";
  notice: string | null;
  timestamps: {
    created_at: string;
    shipped_at: string | null;
    delivered_at: string | null;
  };
  packages: TableRow[];
}
export interface ShippingResponse {
  status: "success" | "fail";
  message: string;
  data: ShippingRow[];
}
