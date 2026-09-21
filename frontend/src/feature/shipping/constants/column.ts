export const SHIPPING_COLUMNS = [
  {
    name: "Date",
    key: "dataReceived",
    sortable: true,
    className: "flex-1 py-4",
  },
  {
    name: "Invoice",
    key: "invoice",
    sortable: false,
    className: "flex-1 py-4",
  },
  {
    name: "Type",
    key: "type",
    sortable: true,
    className: "flex-1 py-4",
  },
  {
    name: "Description",
    key: "itemValues",
    sortable: true,
    className: "flex-2 py-4",
  },
  {
    name: "Charge",
    key: "charge",
    sortable: false,
    className: "flex-1 py-4 justify-center",
  },
  {
    name: "Action",
    key: "action",
    sortable: false,
    className: "flex-1 py-4 justify-center",
  },
];

export const NEW_SHIPPING_COLUMNS = [
  {
    name: "Form",
    key: "vendor",
    sortable: true,
    className: "flex-2 py-4",
  },
  {
    name: "Package ID",
    key: "packageId",
    sortable: false,
    className: "flex-1 py-4",
  },
  {
    name: "Total Value",
    key: "totalValues",
    sortable: false,
    className: "flex-1 py-4",
  },
  {
    name: "weight",
    key: "weight",
    sortable: false,
    className: "flex-1 py-4 justify-center",
  },
  {
    name: "Action",
    key: "action",
    sortable: false,
    className: "flex-1 py-4 justify-center",
  },
];
