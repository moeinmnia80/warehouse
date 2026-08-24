import dotenv from "dotenv";
dotenv.config();

const env = {
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "production",
  cookieKey: process.env.COOKIE_SECRET,
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbName: process.env.DB_NAME || "",
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "",
  dbPrivateKey: process.env.DB_PRIVATE_KEY || "",
  dbExpiredKey: process.env.DB_EXPIRED_KEY || "",
  dbGoogleClientId: process.env.DB_GOOGLE_CLIENT_ID || "",
  dbPostgresUrl: process.env.POSTGRES_URL,
  dbURL: process.env.DB_URL || "",
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  supabaseRoleKey: process.env.SUPABASE_ROLE_KEY || "",
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  redisUrl: process.env.UPSTASH_REDIS_URL || "",
};

export default env;
