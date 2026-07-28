import { NextRequest, NextResponse } from "next/server";

import { ForbiddenError, UnauthorizedError } from "@/lib/errors";
import { isOriginAllowed } from "@/lib/server/allowed-origins";
import { verifyApiKey } from "@/lib/server/api-keys";
import { createAdminClient } from "@/lib/supabase/admin";

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get("origin");

  if (!origin) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        Allow: "POST, OPTIONS",
      },
    });
  }

  const supabase = createAdminClient();
  if (await isOriginAllowed(supabase, origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, x-api-key",
        Vary: "Origin",
      },
    });
  }

  return new NextResponse(null, {
    status: 403,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const origin = request.headers.get("origin");
    const x_api_key = request.headers.get("x-api-key");

    if (!origin) {
      throw new ForbiddenError("Missing Origin header");
    }

    if (!x_api_key) {
      throw new UnauthorizedError("Missing API key");
    }

    const api_key = await verifyApiKey(x_api_key);
    if (!api_key) {
      throw new UnauthorizedError("Invalid API key");
    }

    const supabase = createAdminClient();
    const allowed = await isOriginAllowed(supabase, origin, api_key.id);
    if (!allowed) {
      throw new ForbiddenError("Origin not allowed for this API key");
    }

    const body = await request.json();
    const { error } = await supabase.from("logs").insert({
      project_id: api_key.project_id,
      timestamp: body.timestamp,
      level: body.level,
      service: body.service,
      message: body.message,
      environment: body.environment,
      meta: body.metadata,
    });

    if (error) {
      throw new Error("Failed to insert log(s) into database", {
        cause: error,
      });
    }

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          Vary: "Origin",
        },
      },
    );
  } catch (error) {
    // Unauthorized Error
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Forbidden Error
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    // Internal Server Error
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
