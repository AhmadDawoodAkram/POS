import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Square from "@/utils/squareClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Missing access token" }), {
      status: 401,
    });
  }

  const client = Square({ session });

  try {
    const { idempotencyKey, order } = await req.json();
    const response = await client.orders.create({
      idempotencyKey,
      order,
    });

    const orderId = response?.order?.id ?? "";

    // const paymentResponse = await client.payments.create({
    //   sourceId: "cnon:card-nonce-ok",
    //   idempotencyKey: crypto.randomUUID(),
    //   amountMoney: response.order?.netAmountDueMoney,
    //   orderId: orderId,
    //   locationId: response.order?.locationId,
    // });

    // console.log("OBJ => ", paymentResponse);

    return new Response(
      JSON.stringify({ success: true, data: response.order }, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      ),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 }
    );
  }
}
