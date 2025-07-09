import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Square from "@/utils/squareClient";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Missing access token" }), {
      status: 401,
    });
  }

  const client = Square({ session });

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("searchText");

  try {
    const { selectedCategory } = await req.json();
    const response = await client.catalog.searchItems({
      textFilter: query || "",
      ...(selectedCategory ? { categoryIds: [selectedCategory] } : {}),
    });

    console.log(selectedCategory);

    // console.log(response.items);

    const allCategoryIds = new Set<string>();
    const items = response.items || [];

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

    return new Response(
      JSON.stringify({ success: true, data: items }, (_, value) =>
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
