import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wxxfcdhoslvbyuzaprvp.supabase.co";
const supabaseAnonKey = "sb_publishable_H0fxiH2PV6lL5eMK3A9O_g_VZCSG3PP";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);