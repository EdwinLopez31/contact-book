import { supabasePublicKey, supabaseUrl } from "@/globals";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(`${supabaseUrl}`, `${supabasePublicKey}`);
