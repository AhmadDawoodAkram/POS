import { useState } from "react";
import CartContainerProps from "@/interfaces/CartContainer.interface";
import CartItem from "@/interfaces/CartItem.interface";
import { useQuery } from "@tanstack/react-query";
import { useBillCalculations } from "@/hooks/billCalculation";
import { buildOrderPayload } from "@/utils/calculateQueryMaker";
import Cart from "@/components/Cart";

const fetchBillSummary = async (orderPayload: any) => {
  const response = await fetch("/api/square/calculate-total", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to calculate total");
  }

  return await response.json();
};

const isDiscountApplicableToItem = (
  discount: any,
  cartItem: CartItem
): boolean => {
  const match = discount.discountData?.name?.match(/Category:([^)]+)/);
  if (match && match[1]) {
    const discountCategory = match[1].trim();

    return cartItem.categoryData?.some(
      (cat: any) => cat.categoryData?.name === discountCategory
    );
  }
  // No category in discount name, so it's applicable to all
  return true;
};

const CartContainer: React.FC<CartContainerProps> = ({
  cart,
  resetCart,
  onRemove,
  onUpdateQuantity,
  discounts,
}) => {
  const [selectedDiscounts, setSelectedDiscounts] = useState<{
    [key: string]: string;
  }>({});
  const [autoDiscount, setAutoDiscount] = useState<string>("auto");

  const orderPayload = buildOrderPayload(
    cart,
    selectedDiscounts,
    discounts,
    autoDiscount
  );

  const { data, isPending: isLoading } = useQuery({
    queryKey: ["bill-summary", cart, selectedDiscounts, autoDiscount],
    queryFn: () => fetchBillSummary(orderPayload),
    enabled: cart.length > 0,
    refetchOnWindowFocus: false,
  });
  const { discount, netTotal, discountArr } = useBillCalculations(data);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.variant?.itemVariationData?.priceMoney?.amount) / 100) *
        (item.quantity || 1),
    0
  );

  const handleCheckout = async () => {
    const response = await fetch("/api/square/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Order creation failed:", errorData);
      return;
    }
    const data = await response.json();
    console.log("Order Creation Response => ", data);
    resetCart();
  };

  const handleDiscountChange = (cartKey: string, discountId: string) => {
    setSelectedDiscounts((prev) => ({
      ...prev,
      [cartKey]: discountId,
    }));
  };

  return (
    <Cart
      cart={cart}
      onUpdateQuantity={onUpdateQuantity}
      isLoading={isLoading}
      discountArr={discountArr}
      onRemove={onRemove}
      selectedDiscounts={selectedDiscounts}
      handleDiscountChange={handleDiscountChange}
      autoDiscount={autoDiscount}
      setAutoDiscount={setAutoDiscount}
      discounts={discounts}
      isDiscountApplicableToItem={isDiscountApplicableToItem}
      total={total}
      netTotal={netTotal}
      discount={discount}
      handleCheckout={handleCheckout}
    />
  );
};

export default CartContainer;
