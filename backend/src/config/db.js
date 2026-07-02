import fs from "fs";

export const connectDB = {
  readData: () => {
    let users = [];
    try {
      const data = fs.readFileSync("./src/db/users.json", "utf-8");
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
  writeData: (data) => {
    try {
      fs.writeFileSync(
        "./src/db/users.json",
        JSON.stringify(data, null, 2),
        "utf-8",
      );

      return data;
    } catch (err) {
      throw new Error("Error DB: " + err.message);
    }
  },
};
