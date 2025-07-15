import Product from "@/interfaces/Product.interface";

export function buildOrderPayload(
  cart: Product[],
  selectedDiscounts: { [key: string]: string },
  discounts: any[],
  billMode: string,
  selectedTax: { [key: string]: string },
  taxes: any[],
  orderTax: string,
  orderDiscount: string
) {
  console.log("BUILDERRR ", orderTax);

  // 1. Get all selected discount IDs
  const selectedDiscountIds = Object.values(selectedDiscounts).filter(Boolean);
  const uniqueDiscounts = discounts.filter((d: any) =>
    selectedDiscountIds.includes(d.id)
  );

  const selectedTaxIds = Object.values(selectedTax).filter(Boolean);
  const uniqueTaxes = taxes.filter((t: any) => selectedTaxIds.includes(t.id));

  // 2. Build line items with applied discounts
  const lineItems = cart.map((item: Product) => {
    const cartKey = `${item.id}-${item.variantId}`;
    const selectedDiscountId = selectedDiscounts[cartKey];
    const selectedTaxId = selectedTax[cartKey];
    const lineItem: any = {
      catalogObjectId: item.variantId,
      quantity: String(item.quantity),
    };
    if (selectedDiscountId) {
      lineItem.appliedDiscounts = [{ discountUid: selectedDiscountId }];
    }
    if (selectedTaxId) {
      lineItem.appliedTaxes = [{ taxUid: selectedTaxId }];
    }
    return lineItem;
  });

  // 3. Build the discounts array for the order
  if (billMode === "line") {
    const orderDiscounts = uniqueDiscounts.map((discount: any) => ({
      uid: discount.id,
      catalogObjectId: discount.id,
      scope: "LINE_ITEM",
    }));

    const orderTaxes = uniqueTaxes.map((tax: any) => ({
      uid: tax.id,
      catalogObjectId: tax.id,
      scope: "LINE_ITEM",
    }));

    return {
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId: "L2GYMH3VTH0FG",
        lineItems,
        discounts: orderDiscounts,
        taxes: orderTaxes,
      },
    };
  } else {
    const orderDiscounts = {
      catalogObjectId: orderDiscount,
      scope: "ORDER",
    };

    const orderTaxes = {
      catalogObjectId: orderTax,
      scope: "ORDER",
    };

    const finalObj: any = {
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId: "L2GYMH3VTH0FG",
        lineItems,
      },
    };

    orderTax !== "" ? (finalObj.order.taxes = [orderTaxes]) : null;
    orderDiscount !== "" ? (finalObj.order.discounts = [orderDiscounts]) : null;

    return finalObj;
  }
}
