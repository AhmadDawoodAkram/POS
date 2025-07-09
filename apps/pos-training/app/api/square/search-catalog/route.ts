import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Square from "@/utils/squareClient";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Missing access token" }), {
      status: 401,
    });
  }

  const client = Square({ session });

  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type");
  if (!type) {
    return;
  }

  try {
    const response = await client.catalog.search({
      includeRelatedObjects: false,
      objectTypes: [type as any],
    });
    return new Response(
      JSON.stringify({ success: true, data: response.objects }, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      ),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 }
    );
  }
}
