import { Errors } from "../../utils/errors.js";
import { createNewSuite, fineSuiteByUserId } from "./suite.repository.js";
import env from "../../config/env.js";

export const getSuiteData = (req) => {
  const { id } = req.user;
  const existingSuite = fineSuiteByUserId(id);

  if (!existingSuite) {
    throw Errors.notFound("Suite");
  }
  const { packages } = existingSuite;
  return {
    status: "success",
    message: "suite is already exist",
    data: { id, packages },
  };
};
export const createSuite = ({ id }) => {
  const existingSuite = fineSuiteByUserId(id);

  if (existingSuite) {
    throw Errors.conflict("A suite is available with this ID.");
  }
  const newSuite = {
    id: "XC" + env.dbUniqueId,
    userId: id,
    packages: [],
  };

  const suite = createNewSuite(newSuite);

  if (!suite) {
    throw Errors.internal("Error occurred while creating suite");
  }
  const { id: suiteId, packages } = suite;
  env.dbUniqueId = env.dbUniqueId + 1;
  return {
    status: "success",
    message: "suite founded successfully",
    data: { id: suiteId, packages },
  };
};
