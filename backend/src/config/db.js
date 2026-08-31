import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import env from "./env.js";

const pool = new Pool({
  connectionString: env.dbURL,
  max: 10,
  ssl: {
    rejectUnauthorized: false,
  },
});

const adapter = new PrismaPg(pool);

const db = new PrismaClient({ adapter, errorFormat: "pretty" });
export default db;
