import type { SuitePayload } from "@/feature/suite/index";

export function useSuiteTabCounts(data?: SuitePayload) {
  const packages = data?.packages ?? [];
  return packages.reduce(
    (acc, item) => {
      acc.viewAll++;
      if (item.statusLabel === "in review") acc.inReview++;
      if (item.statusLabel === "action required") acc.actionRequired++;
      if (item.statusLabel === "ready to send") acc.readyToSend++;
      return acc;
    },
    { inReview: 0, actionRequired: 0, readyToSend: 0, viewAll: 0 },
  );
}
