import env from "./env.js";

const corsOption = {
  origin: [env.clientUrl, "http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOption;
