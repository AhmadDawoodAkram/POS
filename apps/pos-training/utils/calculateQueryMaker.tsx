import { CartItem } from "@/app/dashboard/(components)/CartSidebar";

export function buildOrderPayload(
  cart: CartItem[],
  selectedDiscounts: { [key: string]: string },
  discounts: any[]
): any {
  // 1. Get all selected discount IDs
  const selectedDiscountIds = Object.values(selectedDiscounts).filter(Boolean);
  const uniqueDiscounts = discounts.filter((d: any) =>
    selectedDiscountIds.includes(d.id)
  );

  // 2. Build line items with applied discounts
  const lineItems = cart.map((item: CartItem) => {
    const cartKey = `${item.id}-${item.variantId}`;
    const selectedDiscountId = selectedDiscounts[cartKey];
    const lineItem: any = {
      catalogObjectId: item.variantId,
      quantity: String(item.quantity),
    };
    if (selectedDiscountId) {
      lineItem.appliedDiscounts = [{ discountUid: selectedDiscountId }];
    }
    return lineItem;
  });

  // 3. Build the discounts array for the order
  const orderDiscounts = uniqueDiscounts.map((discount: any) => ({
    uid: discount.id,
    catalogObjectId: discount.id,
    scope: "LINE_ITEM",
  }));

  // 4. Taxes (static for now)
  const taxes = [
    {
      catalogObjectId: "TWWXFIX3SDCGVN3R4DA6RV6A",
      uid: "gst",
      scope: "ORDER",
    },
  ];

  // 5. Build and return the payload
  return {
    idempotencyKey: crypto.randomUUID(),
    order: {
      locationId: "L2GYMH3VTH0FG",
      lineItems,
      discounts: orderDiscounts,
      taxes,
      pricingOptions: {
        autoApplyDiscounts: false,
        autoApplyTaxes: false,
      },
    },
  };
}
