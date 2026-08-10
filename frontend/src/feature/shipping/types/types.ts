import type { TableRow } from "@/shared";
import type { ComponentProps } from "react";
// store
export type DatePreset = "30d" | "60d" | "90d" | "1y" | "custom" | null;
export interface DateRange {
  from: string | null; // ISO string, e.g. "2026-06-08T10:00:00.000Z"
  to: string | null;
}
export interface SortState {
  key: string | null;
  type: "asc" | "desc";
}
export interface ShippingState {
  search: string;
  sort: SortState;
  dateFilter: {
    preset: DatePreset;
    range: DateRange;
  };
}
export interface ShippingRow {
  shipmentId: string;
  userId: string;
  carrier: string;
  description: string;
  invoice: {
    file: string;
    type: string;
  };
  charge: "100";
  status: "register" | "delivered";
  notice: string | null;
  timestamps: {
    created_at: string;
    shipped_at: string | null;
    delivered_at: string | null;
  };
  packages: TableRow[];
}
// comp
export interface OptionItem {
  id: string;
  label: string;
  price?: number;
}

export type BrandCardType = "visa" | "mastercard";
export interface PaymentMethodsType {
  id: string;
  brand: BrandCardType;
  last4: string;
  expiry: string;
  isDefault: boolean;
}
export interface ShippingAddressType {
  id: string;
  name: string;
  address: string;
  phone: string;
  isDefault: boolean;
}
export interface EntryHeaderProps extends ComponentProps<"div"> {
  data: {
    id: string;
    isDefault: boolean;
    brand?: BrandCardType;
  };
  title: string;
}
export interface InfoRowProps extends ComponentProps<"p"> {
  label?: string;
  value: string;
}
// hooks
export interface SearchFilterProps {
  data: ShippingRow[] | undefined;
  search: string;
  dateFilter: {
    preset: DatePreset;
    range: DateRange;
  };
}
// services
export interface ShippingResponse {
  status: "success" | "fail";
  message: string;
  data: ShippingRow[];
}
export interface PaymentMethodsPayload {
  id: string;
  brand: BrandCardType;
  cardNumber: string;
  last4: string;
  isDefault: boolean;
  expiry: string;
}
export interface UserPaymentResponse {
  status: "success" | "fail";
  message: string;
  data: PaymentMethodsPayload[];
}
export interface UserAddressPayload {
  id: string;
  userId: string;
  addressPrimary: string;
  addressSecondary: string;
  fullName: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  countryCode: string;
  phoneNumber: string;
  isDefault: boolean;
}
export interface UserAddressResponse {
  status: "success" | "fail";
  message: string;
  data: UserAddressPayload[];
}
