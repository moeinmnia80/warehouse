import { connectDB } from "../../config/db.js";

export const findSuiteByUserId = (id) => {
  const data = connectDB.readData("suites");
  return data.find((suite) => suite.userId === id) || null;
};

export const createNewSuite = (newSuiteData) => {
  const data = connectDB.readData("suites");
  const newData = [...data, newSuiteData];
  connectDB.writeData("suites", newData);
  return newSuiteData;
};

export const updateSuite = (updatedSuite) => {
  const data = connectDB.readData("suites");
  const newData = data.map((s) =>
    s.userId === updatedSuite.userId ? updatedSuite : s,
  );
  connectDB.writeData("suites", newData);
  return updatedSuite;
};
