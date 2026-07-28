/**
 * Allowed API key types.
 */
export const API_KEY_TYPES = ["publishable", "secret"] as const;

/**
 * Type representing allowed API key types.
 */
export type ApiKeyType = (typeof API_KEY_TYPES)[number];
