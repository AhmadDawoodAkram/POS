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
    // Fetch items
    const temp = await client.catalog.searchItems({});
    const items = temp.items || [];

    // Collect all unique category IDs
    const allCategoryIds = new Set<string>();

    for (const item of items) {
      if (item.type === "ITEM" && "itemData" in item && item.itemData) {
        const imageIds = item.itemData.imageIds as string[] | null | undefined;
        if (Array.isArray(imageIds) && imageIds.length > 0) {
          // Fetch all image objects in parallel for this item
          const imageObjects = await Promise.all(
            imageIds.map(async (imageId: string) => {
              const res = await client.catalog.object.get({
                objectId: imageId,
              });
              // Only access imageData if this is an IMAGE type
              if (
                res?.object &&
                res.object.type === "IMAGE" &&
                "imageData" in res.object
              ) {
                return (res.object as any).imageData?.url || null;
              }
              return null;
            })
          );
          (item as any).imageUrls = imageObjects;
        } else {
          (item as any).imageUrls = [];
        }

        // Collect category IDs
        const categories = item.itemData.categories as
          | { id: string }[]
          | null
          | undefined;
        if (Array.isArray(categories)) {
          for (const cat of categories) {
            if (cat?.id) allCategoryIds.add(cat.id);
          }
        }
      } else {
        (item as any).imageUrls = [];
      }
    }

    // Fetch all categories in parallel with includeRelatedObjects: false
    const categoryIdArr = Array.from(allCategoryIds);
    const categoryResults = await Promise.all(
      categoryIdArr.map(async (catId) => {
        const res = await client.catalog.object.get({
          objectId: catId,
          includeRelatedObjects: false,
        });
        return { id: catId, data: res?.object };
      })
    );
    const categoryMap = new Map<string, any>(
      categoryResults.map((r) => [r.id, r.data])
    );

    // Attach category data to each item
    for (const item of items) {
      if (item.type === "ITEM" && "itemData" in item && item.itemData) {
        const categories = item.itemData.categories as
          | { id: string }[]
          | null
          | undefined;
        if (Array.isArray(categories)) {
          (item as any).categoryData = categories
            .map((cat) => (cat?.id ? categoryMap.get(cat.id) : null))
            .filter(Boolean);
        } else {
          (item as any).categoryData = [];
        }
      } else {
        (item as any).categoryData = [];
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
