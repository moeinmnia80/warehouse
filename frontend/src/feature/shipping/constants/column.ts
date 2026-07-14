export const SHIPPING_COLUMNS = [
  {
    name: "Date",
    key: "dataReceived",
    sortable: true,
    className: "min-w-30 flex-1 shrink-0 py-4",
  },
  {
    name: "Invoice",
    key: "invoice",
    sortable: false,
    className: "min-w-25 flex-1 shrink-0 py-4",
  },
  {
    name: "Type",
    key: "type",
    sortable: true,
    className: "min-w-20 flex-1 shrink-0 py-4",
  },
  {
    name: "Description",
    key: "itemValues",
    sortable: true,
    className: "min-w-20 flex-2 shrink-0 py-4",
  },
  {
    name: "Charge",
    key: "charge",
    sortable: false,
    className: "min-w-20 flex-1 shrink-0 py-4 justify-center",
  },
  {
    name: "Action",
    key: "action",
    sortable: false,
    className: "min-w-20 flex-1 shrink-0 py-4 justify-center",
  },
];
