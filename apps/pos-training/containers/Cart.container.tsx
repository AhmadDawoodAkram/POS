import { useState } from "react";
import CartContainerProps from "@/interfaces/CartContainer.interface";
import { useQuery } from "@tanstack/react-query";
import { useBillCalculations } from "@/hooks/billCalculation";
import { buildOrderPayload } from "@/utils/calculateQueryMaker";
import Cart from "@/components/Cart";
import Product from "@/interfaces/Product.interface";

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
  cartItem: Product
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
  taxes,
}) => {
  const [selectedDiscounts, setSelectedDiscounts] = useState<{
    [key: string]: string;
  }>({});
  const [selectedTax, setSelectedTax] = useState<{
    [key: string]: string;
  }>({});
  const [orderTax, setOrderTax] = useState<string>("");
  const [orderDiscount, setOrderDiscount] = useState<string>("");
  const [billMode, setBillMode] = useState<string>("order");

  const orderPayload = buildOrderPayload(
    cart,
    selectedDiscounts,
    discounts,
    billMode,
    selectedTax,
    taxes,
    orderTax,
    orderDiscount
  );

  console.log("CONTAINER RECEIVING ORDER PAYLOAD ", orderPayload);

  const { data, isPending: isLoading } = useQuery({
    queryKey: [
      "bill-summary",
      cart,
      selectedDiscounts,
      billMode,
      selectedTax,
      orderTax,
      orderDiscount,
    ],
    queryFn: () => fetchBillSummary(orderPayload),
    enabled: cart.length > 0,
    refetchOnWindowFocus: false,
  });

  // console.log(data);

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

  const handleTaxChange = (cartKey: string, taxId: string) => {
    setSelectedTax((prev) => ({
      ...prev,
      [cartKey]: taxId,
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
      // --- DISCOUNT PROPS ---
      billMode={billMode}
      setBillMode={(val) => {
        setBillMode(val);
        setSelectedDiscounts({});
        setSelectedTax({});
        setOrderTax("");
        setOrderDiscount("");
      }}
      discounts={discounts}
      isDiscountApplicableToItem={isDiscountApplicableToItem}
      // --- TAX PROPS ---
      selectedTax={selectedTax}
      handleTaxChange={handleTaxChange}
      taxes={taxes}
      total={total}
      netTotal={netTotal}
      discount={discount}
      handleCheckout={handleCheckout}
      // --- Order Level Tax/Dis
      setOrderTax={(val) => setOrderTax(val)}
      setOrderDiscount={(val) => setOrderDiscount(val)}
    />
  );
};

export default CartContainer;
