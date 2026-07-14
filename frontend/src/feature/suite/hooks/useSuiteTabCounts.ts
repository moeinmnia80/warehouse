import type { SuiteResponse } from "@/feature/suite/index";

export function useSuiteTabCounts(data?: SuiteResponse) {
  const packages = data?.data.packages ?? [];
  return packages.reduce(
    (acc, item) => {
      acc.viewAll++;
      if (item.status.label === "in review") acc.inReview++;
      if (item.status.label === "action required") acc.actionRequired++;
      if (item.status.label === "ready to send") acc.readyToSend++;
      return acc;
    },
    { inReview: 0, actionRequired: 0, readyToSend: 0, viewAll: 0 },
  );
}
