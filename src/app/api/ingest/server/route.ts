import { NextRequest, NextResponse } from "next/server";

import { UnauthorizedError } from "@/lib/errors";
import { verifyApiKey } from "@/lib/server/api-keys";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const x_api_key = request.headers.get("x-api-key");

    if (!x_api_key) {
      throw new UnauthorizedError("Missing API key");
    }

    const api_key = await verifyApiKey(x_api_key, true);
    if (!api_key) {
      throw new UnauthorizedError("Invalid API key");
    }

    const body = await request.json();
    const supabase = createAdminClient();
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Unauthorized Error
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Internal Server Error
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
