import dotenv from "dotenv";
dotenv.config();

const env = {
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  port: process.env.PORT || 5000,
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbName: process.env.DB_NAME || "",
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "",
  dbUniqueId: process.env.DB_UNIQUE_ID || "",
  dbPrivateKey: process.env.DB_PRIVATE_KEY || "",
  dbExpiredKey: process.env.DB_EXPIRED_KEY || "",
};

export default env;
