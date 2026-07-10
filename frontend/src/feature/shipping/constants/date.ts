import type { DatePreset } from "../store/shippingSlice";

export const PRESETS: { label: string; value: DatePreset }[] = [
  { label: "30 Days", value: "30d" },
  { label: "60 Days", value: "60d" },
  { label: "90 Days", value: "90d" },
  { label: "1 Year", value: "1y" },
];
