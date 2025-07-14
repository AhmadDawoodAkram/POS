export default interface CartItem {
  categoryData: any;
  id: string;
  variantId: string;
  itemData: { name: string };
  variant?: {
    itemVariationData?: { name?: string; priceMoney?: { amount?: number } };
  };
  quantity: number;
  imageUrls: string[];
  categoryName?: string;
}
