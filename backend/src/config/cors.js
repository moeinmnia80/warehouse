import env from "./env.js";

const corsOption = {
  origin: [env.clientUrl, "https://warehouse-markist.vercel.app"],
  method: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOption;
