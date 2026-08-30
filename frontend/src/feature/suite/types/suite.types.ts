import type { Item, Package, PaginationData } from "@/shared";

// components/*
export interface TableDataRowProps {
  item: Package;
}
export interface ExpandedRowDetailsProps {
  data: Package;
}
export interface InvoiceModalProps {
  handleCloseModal: () => void;
}
export interface AddInvoiceModalProps {
  item: Package | undefined;
  packageId: string | null;
}
export interface ExpandedRowPackageItemProps {
  item: Item;
  index: number;
}
export interface FilePreviewProps {
  packageId: string;
  className?: string;
  item: {
    id?: string;
    name: string;
    size: number;
    url?: string;
    type?: string;
  };
}

export type CategoryType =
  "view all" | "action required" | "in review" | "ready to send";

// service/*
export interface SuitePayload {
  id: string;
  name: string;
  zonePrefix: string;
  userId: string;
  packages: Package[];
  pagination: PaginationData;
}
export interface SuiteResponse {
  id: string;
  message: string;
  data: SuitePayload;
}
export interface UploadPayload {
  credentials: FormData;
  type: "pdf" | "images";
  id: string;
}
export interface UploadResponse {
  status: "success" | "fail";
  message: string;
  data: string;
}

export interface PackagePayload {
  packageId: string;
  fileName: string;
}
// MySuiteTab Component
export interface TabsType {
  id: number;
  key: "inReview" | "actionRequired" | "readyToSend" | "viewAll";
  className: string;
  value: CategoryType;
}
export interface TabsCountType {
  inReview: number;
  actionRequired: number;
  readyToSend: number;
  viewAll: number;
}
// utils
export interface SuiteSummary {
  itemValues: number;
  totalWeight: number;
  subTotal: number;
}
