import "server-only";

import { createHash } from "crypto";

import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Hashes API key using SHA-256.
 * @param api_key API key to hash
 * @returns Hashed API key as a hexadecimal string
 */
export function hashApiKey(api_key: string): string {
  return createHash("sha256").update(api_key).digest("hex");
}

/**
 * Verifies if the API key is valid.
 * @param api_key API key to be validated
 * @param is_secret Whether the API key is secret or not (`false` default)
 * @returns Project ID associated with the API key if valid, otherwise `null`
 */
export async function verifyApiKey(
  api_key: string,
  is_secret: boolean = false,
): Promise<string | null> {
  const token = is_secret ? hashApiKey(api_key) : api_key;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("api_keys")
    .select("project_id")
    .eq("token", token)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to validate API key", { cause: error });
  }

  return data?.project_id ? data.project_id : null;
}
