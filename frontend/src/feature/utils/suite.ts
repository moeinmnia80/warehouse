import { RAW_DATA } from "@/shared/constants/table";

export const checkStatus = (status: string) => {
  switch (status) {
    case "ready to send":
      return "ready";
    case "in review":
      return "review";
    case "action required":
      return "required";

    default:
      throw "unknown status";
  }
};
//
const required = RAW_DATA.filter((item) => item.status === "Action Required");
const review = RAW_DATA.filter((item) => item.status === "In Review");
const ready = RAW_DATA.filter((item) => item.status === "Ready to Send");
//
export const tabStatus = [
  RAW_DATA.length,
  required.length,
  review.length,
  ready.length,
];
