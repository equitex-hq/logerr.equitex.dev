import "server-only";

import { createHash } from "crypto";

import { createAdminClient } from "@/lib/supabase/admin";
import { apiKeySchema, type ApiKey } from "@/schemas/api-key";

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
 * @returns API key object if valid, otherwise `null`
 */
export async function verifyApiKey(
  api_key: string,
  is_secret: boolean = false,
): Promise<ApiKey | null> {
  const token = is_secret ? hashApiKey(api_key) : api_key;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .eq("token", token)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to validate API key", { cause: error });
  }

  if (!data) return null;

  const parsed = apiKeySchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid API key data");
  }

  return parsed.data;
}
