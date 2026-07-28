import { z } from "zod";

/**
 * Validation schema for allowed origins.
 *
 * @property id - UUID v4 identifier
 * @property api_key_id - API key ID associated with the allowed origin
 * @property origin - Origin URL
 * @property created_at - Timestamp of creation
 */
export const allowedOriginSchema = z.object({
  id: z.uuid(),
  api_key_id: z.uuid(),
  origin: z.string(),
  created_at: z.iso.datetime({ offset: true }).optional(),
});

/**
 * Type inferred from allowedOriginSchema.
 *
 * @property id - UUID v4 identifier
 * @property api_key_id - API key ID associated with the allowed origin
 * @property origin - Origin URL
 * @property created_at - Timestamp of creation
 */
export type AllowedOrigin = z.infer<typeof allowedOriginSchema>;
