import type { TabsType } from "@/feature/suite/index";

export const tabs: TabsType[] = [
  {
    id: 0,
    key: "viewAll",
    className: "h-9 btn-third font-semibold",
    value: "View All",
  },
  {
    id: 1,
    key: "actionRequired",
    className: "h-9 btn-third font-semibold",
    value: "Action Required",
  },
  {
    id: 2,
    key: "inReview",
    className: "h-9 btn-third font-semibold",
    value: "In Review",
  },
  {
    id: 3,
    key: "readyToSend",
    className: "h-9 btn-third font-semibold",
    value: "Ready to Send",
  },
];
