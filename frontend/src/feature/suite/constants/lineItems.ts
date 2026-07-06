import type { LineItem } from "@/feature/suite/index";
export const lineItems: LineItem[] = [
  {
    id: "1",
    name: "Greeting Cards Printed",
    scheduleCode: "4909.00.4000",
    qty: 1,
    valuePerUnit: 3.4,
    totalValue: 3.4,
  },
  {
    id: "2",
    name: "Fishing Reel",
    scheduleCode: "9507.30.5000",
    qty: 1,
    valuePerUnit: 3.4,
    totalValue: 3.4,
  },
  {
    id: "3",
    name: "Computer Laptops & Notebooks",
    scheduleCode: "8471.30.0100",
    qty: 1,
    valuePerUnit: 3.4,
    totalValue: 3.4,
    warning:
      "This product contains a lithium battery, additional charges may be required.",
  },
];
