export interface contextType {
  /* initial value */
  theme: string | null;
  /* This way is better instead of pass state fn as props */
  themeToggler: () => void;
}

// in store.ts
export interface AreaType {
  name: string;
  desc: string;
  src: string;
  lang: string;
}
export interface DataState {
  areas: AreaType[];
  selectedArea: AreaType;
  setArea: (data: AreaType) => void;
}

// table
export interface TableRow {
  barcode: string;
  packageId: string;
  vendor: string;
  dataReceived: string;
  itemValues: string;
  totalValues: string;
  weight: string;
  status: {
    label: "In Review" | "Action Required" | "Ready ro Send";
    details: string | null;
  };
  details: {
    recipient: string;
    address: string;
    items: [
      {
        id: string;
        name: string;
        qty: string;
        valuePerUnit: string;
        notice: string | null;
      },
    ];
  };
}

// Toast Store
export type ToastType = "error" | "success" | "info";
export interface ToastItem {
  id: string;
  text: string;
  type: ToastType;
}
export interface ToastState {
  toasts: ToastItem[];
  add: (text: string, type?: ToastType) => string;
  remove: (id: string) => void;
}
