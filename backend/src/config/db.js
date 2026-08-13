import fs from "fs";
import env from "./env.js";
import postgres from "postgres";

const files = {
  users: "./src/db/users.json",
  suites: "./src/db/suites.json",
  shipping: "./src/db/shipping.json",
  payment: "./src/db/payment.json",
  address: "./src/db/address.json",
};

const connectionString = env.dbPostgresUrl;

if (!connectionString) {
  throw new Error("POSTGRES_URL is not set in .env");
}

const sql = postgres(connectionString, {
  ssl: "require",
});

export default sql;

export const connectDB = {
  readData: (collection) => {
    let users = [];
    try {
      const data = fs.readFileSync(files[collection], "utf-8");
      users = data.trim() ? JSON.parse(data) : [];
    } catch (err) {
      if (err.code === "ENOENT") {
        users = []; // file not created yet, start empty
      } else {
        throw err;
      }
    }
    return users;
  },
  writeData: (collection, data) => {
    try {
      fs.writeFileSync(
        files[collection],
        JSON.stringify(data, null, 2),
        "utf-8",
      );

      return data;
    } catch (err) {
      throw new Error("Error DB: " + err.message);
    }
  },
};
