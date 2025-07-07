import { getCatalogItems } from "@/utils/getCatalogItems";

export async function GET() {
  return await getCatalogItems();
}
