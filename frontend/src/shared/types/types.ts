export interface contextType {
  theme: string | null;
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
export type Gender = "male" | "female";
export type Role = "manager" | "admin";
export type Provider = "local" | "google" | "facebook";
export type PhoneType = "primary" | "secondary" | "alternate" | "fax";
export type Status = "register" | "delivered";

export interface UserPhone {
  id: number;
  userId: string;
  phoneType: PhoneType;
  phoneNumber: string;
}

export interface UserAddress {
  addressId: number;
  userId: string;
  addressPrimary: string;
  addressSecondary?: string | null;
  fullName: string;
  country: string;
  province?: string | null;
  city?: string | null;
  postalCode: string;
  countryCode?: string | null;
  phoneNumber: string;
}

export interface Item {
  id: string;
  name: string;
  qty: number;
  valuePerUnit: number | string;
  notice?: string | null;
  packageId: string;
}

export interface Invoice {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  packageId: string;
  shipmentId?: string | null;
}

export interface ImageType {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  packageId: string;
}

export interface Package {
  packageId: string;
  shipmentId?: string | null;
  suiteId?: number | null;
  barcode: string;
  vendor: string;
  dataReceived: string | Date;
  itemValues: number | string;
  totalValues: number | string;
  weight: number | string;
  statusLabel: string;
  statusDetails?: string | null;
  recipient: string;
  address: string;

  suite?: Suite | null;
  packageRef?: Shipping | null;
  items?: Item[];
  invoices?: Invoice[];
  images?: ImageType[];
}

export interface Shipping {
  shipmentId: string;
  userId: string;
  carrier: string;
  status: Status;
  notice?: string | null;
  description?: string | null;
  charge?: number | string | null;
  createdAt: string | Date;
  shippedAt?: string | Date | null;
  deliveredAt?: string | Date | null;

  packages?: Package[];
  invoice?: Invoice | null;
}

export interface Suite {
  id: number;
  name: string;
  zonePrefix: string;
  description?: string | null;
  userId: string;

  packages?: Package[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: Gender;
  role: Role;
  provider: Provider;
  createdAt?: string | Date;

  phones?: UserPhone[];
  addresses?: UserAddress[];
  shipping?: Shipping[];
  suites?: Suite | null;
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
export interface TableEmptyProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}
