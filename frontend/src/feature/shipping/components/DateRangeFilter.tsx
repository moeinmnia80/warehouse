import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setDatePreset,
  setCustomDateRange,
  type DatePreset,
} from "@/feature/shipping/store/shippingSlice"; // adjust path to wherever your slice lives

// The 4 preset buttons. Adding a new one later = one line here
// + one case in getRangeFromPreset (slice file).
const PRESETS: { label: string; value: DatePreset }[] = [
  { label: "30 Days", value: "30d" },
  { label: "60 Days", value: "60d" },
  { label: "90 Days", value: "90d" },
  { label: "1 Year", value: "1y" },
];

const formatDate = (iso: string | null) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export default function DateRangeFilter() {
  const dispatch = useAppDispatch();

  // Replace `any` with your real RootState type once wired into the store.
  const { dateFilter } = useAppSelector((state) => state.shipping);

  const [open, setOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePresetClick = (preset: DatePreset) => {
    dispatch(setDatePreset(preset));
    setOpen(false);
  };

  const handleApplyCustom = () => {
    if (!customFrom || !customTo) return;
    dispatch(
      setCustomDateRange({
        from: new Date(customFrom).toISOString(),
        to: new Date(customTo).toISOString(),
      }),
    );
    setOpen(false);
  };

  const activePresetLabel =
    PRESETS.find((p) => p.value === dateFilter.preset)?.label ?? "Select";

  const rangeLabel =
    dateFilter.range.from && dateFilter.range.to
      ? `${formatDate(dateFilter.range.from)} - ${formatDate(dateFilter.range.to)}`
      : "No range selected";

  return (
    <div className="relative inline-block text-sm" ref={containerRef}>
      {/* pill container: left = preset dropdown trigger, right = read-only range display */}
      <div className="flex items-stretch overflow-hidden rounded-lg border border-slate-300 bg-white">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span className="font-medium">{activePresetLabel}</span>
          <ChevronDown
            size={15}
            className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div className="w-px bg-slate-200" />

        <div className="flex items-center px-3 py-2 text-slate-500 whitespace-nowrap">
          {rangeLabel}
        </div>
      </div>

      {open && (
        <div className="absolute z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-white shadow-lg p-3">
          <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Quick ranges
          </p>

          <div className="flex flex-col gap-1">
            {PRESETS.map((preset) => {
              const isActive = dateFilter.preset === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handlePresetClick(preset.value)}
                  className={`text-left rounded-md px-2 py-1.5 transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="my-3 border-t border-slate-100" />

          <p className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Custom range
          </p>

          <div className="flex flex-col gap-2 px-1">
            <label className="flex flex-col gap-1 text-xs text-slate-500">
              From
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="rounded-md border border-slate-300 px-2 py-1 text-slate-700"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-slate-500">
              To
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="rounded-md border border-slate-300 px-2 py-1 text-slate-700"
              />
            </label>

            <button
              type="button"
              onClick={handleApplyCustom}
              disabled={!customFrom || !customTo}
              className="mt-1 rounded-md bg-slate-900 px-2 py-1.5 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
