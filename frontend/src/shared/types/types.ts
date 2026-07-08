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
    label: string;
    details: string;
  };
  details: {
    recipient: string;
    address: string;
    items: string[];
    carrier: string;
  };
  invoices?: { id: string; name: string; url?: string }[];
}
