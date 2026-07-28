import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import {
  allowedOriginSchema,
  type AllowedOrigin,
} from "@/schemas/allowed-origin";

/**
 * Fetches allowed origins.
 * @param supabase Supabase client
 * @param api_key_id API key ID
 * @returns Array of `AllowedOrigin` objects
 */
export async function getAllowedOrigins(
  supabase: SupabaseClient,
  api_key_id?: string,
): Promise<AllowedOrigin[]> {
  const query = supabase.from("allowed_origins").select("*");

  if (api_key_id) query.eq("api_key_id", api_key_id);

  const { data, error } = await query;

  if (error) {
    throw new Error("Failed to fetch allowed origins from Supabase");
  }

  const parsed = allowedOriginSchema.array().safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid allowed origins data");
  }

  return parsed.data;
}

/**
 * Checks if a given origin is allowed for a specific API key.
 * @param supabase Supabase client
 * @param origin The origin to check
 * @param api_key_id API key ID
 * @returns A boolean indicating if the origin is allowed
 */
export async function isOriginAllowed(
  supabase: SupabaseClient,
  origin: string,
  api_key_id?: string,
): Promise<boolean> {
  const allowed_origins = (await getAllowedOrigins(supabase, api_key_id)).map(
    (o) => o.origin,
  );

  return allowed_origins.includes(origin);
}
