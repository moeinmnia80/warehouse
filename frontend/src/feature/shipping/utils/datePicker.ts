import { PRESETS } from "@/feature/shipping/index";
import type { DatePreset, DateRange } from "@/feature/shipping/index";

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

const formatDate = (iso: string | null) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const activePresetLabel = (dateFilter: {
  preset: DatePreset;
  range: DateRange;
}) => PRESETS.find((p) => p.value === dateFilter.preset)?.label ?? "Select";

const rangeLabel = (dateFilter: { preset: DatePreset; range: DateRange }) => {
  return dateFilter.range.from && dateFilter.range.to
    ? `${formatDate(dateFilter.range.from)} - ${formatDate(dateFilter.range.to)}`
    : "No range selected";
};

const getTimeFromISO = (date: string) => new Date(date).getTime();

const checkInDateFilterRange = ({
  dateFilterRange,
  date,
}: {
  dateFilterRange: DateRange;
  date: string;
}) => {
  if (!dateFilterRange.from || !dateFilterRange.to) return;

  const time = getTimeFromISO(date);
  const from = getTimeFromISO(dateFilterRange.from);
  const to = getTimeFromISO(dateFilterRange.to);

  return time >= from && time < to;
};

export {
  formatDate,
  rangeLabel,
  getTimeFromISO,
  activePresetLabel,
  getRangeFromPreset,
  checkInDateFilterRange,
};
