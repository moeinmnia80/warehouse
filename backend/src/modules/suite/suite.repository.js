import { connectDB } from "../../config/db.js";

export const fineSuiteByUserId = (id) => {
  const data = connectDB.readData("suites");
  return data.find((suite) => suite.userId === id) || null;
};

export const createNewSuite = (newSuiteData) => {
  const data = connectDB.readData("suites");
  const newData = [...data, newSuiteData];
  const suite = connectDB.writeData("suites", newData);
  return suite[0] || null;
};
