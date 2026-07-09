import type {
  DatePreset,
  DateRange,
} from "@/feature/shipping/store/shippingSlice";

// Turns a preset like "30d" into an actual from/to ISO range.
// Keeping this logic here (not in the component) means the component
// never has to know *how* "last 30 days" is calculated.
export const getRangeFromPreset = (preset: DatePreset): DateRange => {
  if (!preset || preset === "custom") return { from: null, to: null };

  const to = new Date();
  const from = new Date();

  switch (preset) {
    case "30d":
      from.setDate(to.getDate() - 30);
      break;
    case "60d":
      from.setDate(to.getDate() - 60);
      break;
    case "90d":
      from.setDate(to.getDate() - 90);
      break;
    case "1y":
      from.setFullYear(to.getFullYear() - 1);
      break;
  }

  return { from: from.toISOString(), to: to.toISOString() };
};
