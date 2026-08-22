import db, { connectDB } from "../../config/db.js";

export const findSuiteByUserId = (id) =>
  db.suite.findFirst({ where: { userId: id }, include: { packages: true } });

export const createNewSuite = (newSuite) =>
  db.suite.create({
    data: {
      userId: newSuite.userId,
      name: newSuite.name,
      zonePrefix: newSuite?.zonePrefix,
      description: newSuite.description ?? null,
    },
  });

export const updateSuite = (updatedSuite) => {
  const data = connectDB.readData("suites");
  const newData = data.map((s) =>
    s.userId === updatedSuite.userId ? updatedSuite : s,
  );
  connectDB.writeData("suites", newData);
  return updatedSuite;
};
