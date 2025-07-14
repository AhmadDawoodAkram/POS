import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Square from "./squareClient";

export async function calculateTotal(order: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Missing access token" }), {
      status: 401,
    });
  }
  const client = Square({ session });

  try {
    const response = await client.orders.calculate({
      order,
    });

    return response.order;
  } catch (error) {
    return error;
  }
}
