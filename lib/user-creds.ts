import { supabase } from "./db";
import { decrypt } from "./crypto";
import { getSessionUser } from "./auth";

export async function getUserCreds() {
  const session = await getSessionUser();
  if (!session) return null;

  const { data: row } = await supabase
    .from("api_keys")
    .select("api_key_enc, api_secret_enc, account_group")
    .eq("user_id", session.userId)
    .single();

  if (!row) return null;

  return {
    apiKey: decrypt(row.api_key_enc),
    apiSecret: decrypt(row.api_secret_enc),
    accountGroup: row.account_group,
    userId: session.userId,
  };
}
