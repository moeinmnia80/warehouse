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
    label: "view all" | "in review" | "action required" | "ready to send";
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
  invoices:
    | {
        id: string;
        url: string;
        name: string;
        size: number;
        type: string;
      }[]
    | [];
  images:
    | {
        id: string;
        url: string;
        name: string;
        size: number;
        type: string;
      }[]
    | [];
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
