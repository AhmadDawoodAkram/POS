import { getServerSession } from "next-auth";
import Square from "@/utils/squareClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCatalogItems() {
  const session = await getServerSession(authOptions);
  if (!session || session === undefined) {
    return new Response(JSON.stringify({ error: "No Logged in Session" }), {
      status: 401,
    });
  }

  if (
    !session.user ||
    !("accessToken" in session.user) ||
    !session.user.accessToken
  ) {
    return new Response(
      JSON.stringify({ error: "No Square access token found in session" }),
      {
        status: 403,
      }
    );
  }

  const client = Square({ session });

  try {
    const temp = await client.catalog.searchItems({});
    const items = temp.items || [];

    for (const item of items) {
      const imageIds = item?.itemData?.imageIds;
      if (Array.isArray(imageIds) && imageIds.length > 0) {
        // Fetch all image objects in parallel for this item
        const imageObjects = await Promise.all(
          imageIds.map(async (imageId: string) => {
            const res = await client.catalog.object.get({
              objectId: imageId,
            });

            return res?.object?.imageData?.url || null;
          })
        );
        item.imageUrls = imageObjects;
      } else {
        item.imageUrls = [];
      }
    }

    const safeData = JSON.parse(
      JSON.stringify(items, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return new Response(JSON.stringify(safeData), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
