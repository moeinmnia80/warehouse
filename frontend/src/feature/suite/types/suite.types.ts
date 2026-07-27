import type { TableRow } from "@/shared";

// components/*
export interface TableDataRowProps {
  item: TableRow;
}
export interface ExpandedRowDetailsProps {
  data: TableRow;
}
export interface InvoiceModalProps {
  handleCloseModal: () => void;
}
export interface AddInvoiceModalProps {
  item: TableRow | undefined;
  packageId: string | null;
}
export interface LineItem {
  id: string;
  name: string;
  qty: number;
  scheduleCode: string;
  valuePerUnit: number;
  totalValue: number;
  warning?: string;
}
export interface LineItemRowProps {
  item: {
    id: string;
    name: string;
    qty: string;
    valuePerUnit: string;
    notice: string | null;
  };
  index: number;
}
export type CategoryType =
  "view all" | "action required" | "in review" | "ready to send";

// service/*
export interface SuitePayload {
  id: string;
  userId: string;
  packages: TableRow[];
}

export interface SuiteResponse {
  id: string;
  message: string;
  data: SuitePayload;
}

export interface UploadResponse {
  status: "success" | "fail";
  message: string;
  data: string;
}
export interface MutationDataType {
  credentials: FormData;
  type: "pdf" | "images";
  id: string;
}
export interface GetPackageProps {
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
export interface TabCountType {
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
