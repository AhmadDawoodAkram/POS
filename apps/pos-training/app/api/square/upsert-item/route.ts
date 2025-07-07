import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Square from "@/utils/squareClient";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Missing access token" }), {
      status: 401,
    });
  }

  const client = Square({ session });

  try {
    const response = await client.catalog.object.upsert({
      idempotencyKey: "af3d1afc-7212-4300-b463-0bfc5314a5be",
      object: {
        type: "ITEM",
        id: "#Coffee",
        itemData: {
          abbreviation: "Co",
          description: "Hot Chocolate",
          name: "Coffee",
          variations: [
            {
              type: "ITEM_VARIATION",
              id: "#Small",
              itemVariationData: {
                itemId: "#Coffee",
                name: "Small",
                pricingType: "VARIABLE_PRICING",
              },
            },
            {
              type: "ITEM_VARIATION",
              id: "#Large",
              itemVariationData: {
                itemId: "#Coffee",
                name: "Large",
                pricingType: "FIXED_PRICING",
                priceMoney: {
                  amount: BigInt("400"),
                  currency: "USD",
                },
              },
            },
          ],
        },
      },
    });

    return new Response(
      JSON.stringify({ success: true, data: response }, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      ),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
