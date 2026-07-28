import { z } from "zod";

import { API_KEY_TYPES } from "@/lib/constants/api-key";

/**
 * Validation schema for API keys.
 *
 * @property id - UUID v4 identifier
 * @property project_id - Project ID associated with the API key
 * @property name - API key name
 * @property prefix - API key prefix
 * @property token - API key token
 * @property type - API key type
 * @property scope - API key scope
 * @property is_active - Whether the API key is temporarily disabled
 * @property created_at - Timestamp of creation
 * @property expires_at - API key expiration time
 * @property revoked_at - Timestamp of revocation
 */
export const apiKeySchema = z.object({
  id: z.uuid(),
  project_id: z.uuid(),
  name: z.string(),
  prefix: z.string(),
  token: z.string(),
  type: z.enum(API_KEY_TYPES),
  scope: z.string(),
  is_active: z.boolean(),
  created_at: z.iso.datetime({ offset: true }).optional(),
  expires_at: z.iso.datetime({ offset: true }).nullable().optional(),
  revoked_at: z.iso.datetime({ offset: true }).nullable().optional(),
});

/**
 * Type inferred from apiKeySchema.
 *
 * @property id - UUID v4 identifier
 * @property project_id - Project ID associated with the API key
 * @property name - API key name
 * @property prefix - API key prefix
 * @property token - API key token
 * @property type - API key type
 * @property scope - API key scope
 * @property is_active - Whether the API key is temporarily disabled
 * @property created_at - Timestamp of creation
 * @property expires_at - API key expiration time
 * @property revoked_at - Timestamp of revocation
 */
export type ApiKey = z.infer<typeof apiKeySchema>;
