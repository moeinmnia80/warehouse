import type { Package } from "@/shared";
import type { SuitePayload } from "@/feature/suite";

export const getReadyPackages = (
  data: SuitePayload | undefined,
  requestPackages: Package[],
) => {
  if (!data) return [];

  return data.packages.filter(
    (pkg) =>
      pkg.statusLabel === "ready to send" &&
      !requestPackages.some((reqPkg) => reqPkg.packageId === pkg.packageId),
  );
};
