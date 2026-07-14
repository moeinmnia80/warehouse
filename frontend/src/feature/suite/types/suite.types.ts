// use in row content details - my suite table > row content
export type LineItem = {
  id: string;
  name: string;
  scheduleCode: string;
  qty: number;
  valuePerUnit: number;
  totalValue: number;
  warning?: string;
};
export type CategoryType =
  | "View All"
  | "Action Required"
  | "In Review"
  | "Ready to Send";

// api resp type
export interface SuiteResponse {
  id: string;
  message: string;
  data: {
    id: string;
    userId: string;
    packages: [
      {
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
      },
    ];
  };
}
// MySuiteTable Comp
export interface MySuiteTableProps {
  data: SuiteResponse | undefined;
  isLoading: boolean;
}
// MySuiteTab Comp
export interface TabsType {
  id: number;
  key: "inReview" | "actionRequired" | "readyToSend" | "viewAll";
  className: string;
  value: CategoryType;
}
export interface MySuiteTabProps {
  tabCount: {
    inReview: number;
    actionRequired: number;
    readyToSend: number;
    viewAll: number;
  };
}
