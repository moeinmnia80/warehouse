export const SUITE_CATEGORY = {
  ACTION_REQUIRED: "action required",
  READY_TO_SEND: "ready to send",
  IN_REVIEW: "in review",
} as const;

export const SUITE_TABLE_HEADER_COLUMNS = [
  {
    name: "Form",
    key: "vendor",
    sortable: true,
    tabs: ["view all", "action required", "in review", "ready to send"],
    className: "min-w-30 flex-2 shrink-0 py-4",
  },
  {
    name: "PackageId",
    key: "packageId",
    sortable: true,
    tabs: ["view all", "action required", "in review", "ready to send"],
    className: "min-w-25 flex-2 shrink-0 py-4",
  },
  {
    name: "Data Received",
    key: "dataReceived",
    sortable: true,
    tabs: ["view all", "action required", "in review", "ready to send"],
    className: "min-w-20 flex-2 shrink-0 py-4",
  },
  {
    name: "Item Values",
    key: "itemValues",
    sortable: true,
    tabs: ["view all", "ready to send"],
    className: "min-w-20 flex-1 shrink-0 py-4",
  },
  {
    name: "Total Values",
    key: "totalValues",
    sortable: true,
    tabs: ["in review"],
    className: "min-w-20 flex-1 shrink-0 py-4",
  },
  {
    name: "Weight",
    key: "weight",
    sortable: true,
    tabs: ["view all", "in review", "ready to send"],
    className: "min-w-20 flex-1 shrink-0 py-4 justify-center",
  },
  {
    name: "Status",
    key: "status",
    sortable: false,
    tabs: ["view all", "action required"],
    className: "min-w-30 flex-2 shrink-0 py-4 justify-center",
  },
  {
    name: "Action",
    key: "action",
    sortable: false,
    tabs: ["view all", "action required", "in review", "ready to send"],
    className: "min-w-25 flex-1 shrink-0 py-4 justify-center",
  },
];
