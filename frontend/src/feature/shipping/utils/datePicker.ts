import { PRESETS } from "@/feature/shipping/index";
import type { DatePreset, DateRange } from "@/feature/shipping/index";

// Turns a preset like "30d" into an actual from/to ISO range.
// Keeping this logic here (not in the component) means the component
// never has to know *how* "last 30 days" is calculated.
const getRangeFromPreset = (preset: DatePreset): DateRange => {
  if (!preset || preset === "custom") return { from: null, to: null };

  const to = new Date();
  const from = new Date();

  switch (preset) {
    case "30d":
      from.setDate(to.getDate() - 30 - 1);
      break;
    case "60d":
      from.setDate(to.getDate() - 60 - 1);
      break;
    case "90d":
      from.setDate(to.getDate() - 90 - 1);
      break;
    case "1y":
      from.setFullYear(to.getFullYear() - 1);
      break;
  }

  return { from: from.toISOString(), to: to.toISOString() };
};
// change date format
const formatDate = (iso: string | null) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};
// set correct value to show in label
const activePresetLabel = (dateFilter: {
  preset: DatePreset;
  range: DateRange;
}) => PRESETS.find((p) => p.value === dateFilter.preset)?.label ?? "Select";

// set correct value to show in range
const rangeLabel = (dateFilter: { preset: DatePreset; range: DateRange }) =>
  dateFilter.range.from && dateFilter.range.to
    ? `${formatDate(dateFilter.range.from)} - ${formatDate(dateFilter.range.to)}`
    : "No range selected";

export { getRangeFromPreset, formatDate, activePresetLabel, rangeLabel };
