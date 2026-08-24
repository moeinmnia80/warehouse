import { createClient } from "@supabase/supabase-js";

import env from "./env.js";

const supabaseUrl = env.supabaseUrl;
const supabaseAnonKey = env.supabaseAnonKey;
const supabaseRoleKey = env.supabaseRoleKey;

export const supabase = createClient(
  supabaseUrl,
  supabaseRoleKey || supabaseAnonKey,
);
