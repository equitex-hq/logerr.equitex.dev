/**
 * Current runtime environment.
 *
 * Determined from `NODE_ENV` and `NEXT_PUBLIC_VERCEL_ENV` environment variables.
 */
export const ENVIRONMENT =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? "preview"
    : process.env.NODE_ENV;

/**
 * Production domain.
 *
 * Available only in production environment.
 */
export const PRODUCTION_DOMAIN =
  ENVIRONMENT === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : null;

/**
 * Preview domain.
 *
 * Available only in preview environment.
 */
export const PREVIEW_DOMAIN =
  ENVIRONMENT === "preview" ? process.env.NEXT_PUBLIC_VERCEL_URL : null;

/**
 * Port for local development server.
 *
 * Defaults to `3000` if not specified in environment variables.
 */
export const PORT = process.env.PORT || 3000;

/**
 * Host URL.
 */
export const HOST = PRODUCTION_DOMAIN
  ? `https://${PRODUCTION_DOMAIN}`
  : PREVIEW_DOMAIN
    ? `https://${PREVIEW_DOMAIN}`
    : `http://localhost:${PORT}`;
