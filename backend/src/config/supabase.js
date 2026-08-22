import { createClient } from "@supabase/supabase-js";

import env from "./env.js";

const supabaseUrl = env.supabaseUrl;
const supabaseKey = env.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
