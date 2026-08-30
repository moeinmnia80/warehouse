import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import env from "./env.js";

const pool = new Pool({
  connectionString: env.dbURL,
});

const adapter = new PrismaPg(pool);

const db = new PrismaClient({ adapter, errorFormat: "pretty" });
console.log(
  "DEBUG: Connecting to DB host:",
  env.dbURL?.split("@")[1]?.split("/")[0],
);
export default db;
