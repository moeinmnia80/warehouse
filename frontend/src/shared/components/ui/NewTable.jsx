import React, { useState, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Heart,
  Package,
} from "lucide-react";

const STATUS_STYLES = {
  Delivered: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  "In Transit": "bg-amber-500/10 text-amber-400 ring-amber-500/30",
  Pending: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
};

function Checkbox({ checked, indeterminate, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={label}
      onClick={onChange}
      className={`h-4.5 w-4.5 shrink-0 rounded-[5px] border transition-colors flex items-center justify-center
        ${
          checked || indeterminate
            ? "bg-indigo-500 border-indigo-500"
            : "border-slate-600 hover:border-slate-400 bg-transparent"
        }`}
      style={{ width: 18, height: 18 }}
    >
      {checked && !indeterminate && (
        <svg viewBox="0 0 12 10" className="w-2.5 h-2.5" fill="none">
          <path
            d="M1 5L4.2 8.2L11 1"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {indeterminate && <div className="w-2 h-0.5 bg-white rounded-full" />}
    </button>
  );
}

export const CustomTable = () => {
  const [checkedRows, setCheckedRows] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const allChecked =
    RAW_DATA.length > 0 && RAW_DATA.every((r) => checkedRows[r.id]);
  const someChecked = RAW_DATA.some((r) => checkedRows[r.id]) && !allChecked;

  function toggleAll() {
    if (allChecked) {
      setCheckedRows({});
    } else {
      const next = {};
      RAW_DATA.forEach((r) => (next[r.id] = true));
      setCheckedRows(next);
    }
  }

  function toggleRow(id) {
    setCheckedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleExpand(id) {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleSort(key) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return { key: null, dir: "asc" };
    });
  }

  const sortedData = useMemo(() => {
    if (!sort.key) return RAW_DATA;
    const arr = [...RAW_DATA];
    arr.sort((a, b) => {
      let av = a[sort.key];
      let bv = b[sort.key];
      // numeric-ish fields
      if (sort.key === "itemValues") {
        av = parseFloat(av.replace(/[^0-9.]/g, ""));
        bv = parseFloat(bv.replace(/[^0-9.]/g, ""));
      } else if (sort.key === "weight") {
        av = parseFloat(av);
        bv = parseFloat(bv);
      } else if (sort.key === "dataReceived") {
        av = new Date(av).getTime();
        bv = new Date(bv).getTime();
      } else {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      }
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [sort]);

  return (
    <div className="min-h-full w-full bg-[#0d1117] p-6 flex items-start justify-center font-[system-ui]">
      <div className="w-full max-w-5xl rounded-2xl border border-slate-800 bg-[#12161c] overflow-hidden">
        <div
          className="grid items-center px-5 py-3.5 border-b border-slate-800 bg-[#161b22]"
          style={{
            gridTemplateColumns: `28px ${COLUMNS.map((c) => c.width).join(" ")}`,
          }}
        >
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
            label="Select all rows"
          />
          {COLUMNS.map((col) => (
            <button
              key={col.key}
              type="button"
              disabled={!col.sortable}
              onClick={() => col.sortable && handleSort(col.key)}
              className={`flex items-center gap-1.5 text-[13px] font-medium text-slate-200 text-left
                ${col.sortable ? "cursor-pointer hover:text-white group" : "cursor-default"}`}
            >
              <span>{col.label}</span>
              {col.sortable && (
                <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                  {sort.key === col.key ? (
                    sort.dir === "asc" ? (
                      <ChevronUp size={13} strokeWidth={2.5} />
                    ) : (
                      <ChevronDown size={13} strokeWidth={2.5} />
                    )
                  ) : (
                    <ChevronsUpDown
                      size={13}
                      strokeWidth={2}
                      className="opacity-50"
                    />
                  )}
                </span>
              )}
            </button>
          ))}
        </div>

        <div>
          {sortedData.map((row, idx) => {
            const isChecked = !!checkedRows[row.id];
            const isExpanded = !!expandedRows[row.id];
            return (
              <div
                key={row.id}
                className={
                  idx !== sortedData.length - 1
                    ? "border-b border-slate-800/70"
                    : ""
                }
              >
                <div
                  className="grid items-center px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                  style={{
                    gridTemplateColumns: `28px ${COLUMNS.map((c) => c.width).join(" ")}`,
                  }}
                >
                  <Checkbox
                    checked={isChecked}
                    onChange={() => toggleRow(row.id)}
                    label={`Select row ${row.vendor}`}
                  />
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-slate-100 truncate">
                      {row.vendor}
                    </div>
                    <div className="text-[12px] text-indigo-300/70 truncate tracking-wide">
                      {row.id}
                    </div>
                  </div>
                  <div className="text-[13px] text-slate-400 truncate">
                    {row.dataReceived}
                  </div>
                  <div className="text-[13px] text-slate-300 truncate">
                    {row.itemValues}
                  </div>
                  <div className="text-[13px] text-slate-400 truncate">
                    {row.weight}
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ring-1 ring-inset ${STATUS_STYLES[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleExpand(row.id)}
                      aria-expanded={isExpanded}
                      aria-label={`Toggle details for ${row.vendor}`}
                      className={`h-8 w-8 flex items-center justify-center rounded-lg border transition-colors
                        ${
                          isExpanded
                            ? "bg-rose-500/15 border-rose-500/40 text-rose-400"
                            : "border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/40"
                        }`}
                    >
                      <Heart
                        size={15}
                        fill={isExpanded ? "currentColor" : "none"}
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-4 pt-1 bg-[#0f1319] border-t border-slate-800/70">
                    <div className="ml-[28px] mt-2 rounded-xl border border-slate-800 bg-[#12161c] p-4">
                      <div className="flex items-center gap-2 mb-3 text-slate-300">
                        <Package size={14} />
                        <span className="text-[13px] font-medium">
                          Package details
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                          <span className="text-slate-500">Recipient</span>
                          <span className="text-slate-200">
                            {row.details.recipient}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                          <span className="text-slate-500">Carrier</span>
                          <span className="text-slate-200">
                            {row.details.carrier}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/60 pb-1.5 col-span-2">
                          <span className="text-slate-500">Address</span>
                          <span className="text-slate-200">
                            {row.details.address}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500 block mb-1.5">
                            Items
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {row.details.items.map((item) => (
                              <span
                                key={item}
                                className="px-2 py-1 rounded-md bg-slate-800/70 text-slate-300 text-[12px]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
