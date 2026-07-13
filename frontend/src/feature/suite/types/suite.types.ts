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

//
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
          label: "View All" | "In Review" | "Action Required" | "Ready to Send";
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

export interface TabsType {
  id: number;
  className: string;
  value: CategoryType;
}
