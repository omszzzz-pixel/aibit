import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// service_role 키: 서버에서만 사용, RLS 우회
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
