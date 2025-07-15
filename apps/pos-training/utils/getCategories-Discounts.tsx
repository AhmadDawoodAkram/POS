import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Square from "./squareClient";

export const getSquareCatalogMeta = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Missing access token" }), {
      status: 401,
    });
  }

  const client = Square({ session });

  try {
    const response = await client.catalog.search({
      includeRelatedObjects: false,
      objectTypes: ["CATEGORY", "DISCOUNT", "TAX"],
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
};
