import env from "./env.js";

const corsOption = {
  origin: env.clientUrl,
  method: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"],
  credential: true,
};

export default corsOption;
