import type { TableRow } from "@/shared";

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
  "View All" | "Action Required" | "In Review" | "Ready to Send";

// api resp type
// the actual payload you want to work with everywhere in your app
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

// MySuiteTab Comp
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
export interface GetPackageProps {
  packageId: string;
  fileName: string;
}
