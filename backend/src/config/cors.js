import env from "./env.js";

const corsOption = {
  origin: [env.clientUrl, "https://warehouse-markist.vercel.app"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOption;
