export type LineItem = {
  id: string;
  name: string;
  scheduleCode: string;
  qty: number;
  valuePerUnit: number;
  totalValue: number;
  warning?: string;
};
