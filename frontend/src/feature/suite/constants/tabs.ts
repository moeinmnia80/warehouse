import type { TabsType } from "@/feature/suite/index";

export const tabs: TabsType[] = [
  {
    id: 0,
    key: "viewAll",
    className: "h-9 btn-third font-semibold",
    value: "view all",
  },
  {
    id: 1,
    key: "actionRequired",
    className: "h-9 btn-third font-semibold",
    value: "action required",
  },
  {
    id: 2,
    key: "inReview",
    className: "h-9 btn-third font-semibold",
    value: "in review",
  },
  {
    id: 3,
    key: "readyToSend",
    className: "h-9 btn-third font-semibold",
    value: "ready to send",
  },
];
