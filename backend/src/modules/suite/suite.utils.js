import { Errors } from "../../utils/errors.js";
import { findSuiteByUserId } from "./suite.repository.js";

export const findPackageOrThrow = async (userId, packageId) => {
  const suite = await findSuiteByUserId(userId);
  if (!suite) throw Errors.notFound("Suite");

  const pkg = suite.packages.find((p) => p.packageId === packageId);
  if (!pkg) throw Errors.notFound("Package not found in your suite");

  return { suite, pkg };
};
