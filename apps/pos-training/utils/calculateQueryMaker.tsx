import Product from "@/interfaces/Product.interface";

export function buildOrderPayload(
  cart: Product[],
  selectedDiscounts: { [key: string]: string },
  discounts: any[],
  autoDiscount: string
): any {
  // 1. Get all selected discount IDs
  const selectedDiscountIds = Object.values(selectedDiscounts).filter(Boolean);
  const uniqueDiscounts = discounts.filter((d: any) =>
    selectedDiscountIds.includes(d.id)
  );

  // 2. Build line items with applied discounts
  const lineItems = cart.map((item: Product) => {
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

  if (autoDiscount === "auto") {
    return {
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId: "L2GYMH3VTH0FG",
        lineItems,
        discounts: orderDiscounts,
        taxes,
        pricingOptions: {
          autoApplyDiscounts: true,
          autoApplyTaxes: false,
        },
      },
    };
  }

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
