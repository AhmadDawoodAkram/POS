import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBillCalculations } from "./useBillCalculation";
import { buildOrderPayload } from "@/utils/calculateQueryMaker";
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

interface UseCartLogicProps {
  cart: Product[];
  discounts: any[];
  taxes: any[];
  resetCart: () => void;
}

export const useCartLogic = ({
  cart,
  discounts,
  taxes,
  resetCart,
}: UseCartLogicProps) => {
  // State management
  const [selectedDiscounts, setSelectedDiscounts] = useState<{
    [key: string]: string;
  }>({});
  const [selectedTax, setSelectedTax] = useState<{
    [key: string]: string;
  }>({});
  const [orderTax, setOrderTax] = useState<string>("");
  const [orderDiscount, setOrderDiscount] = useState<string>("");
  const [billMode, setBillMode] = useState<string>("order");

  // Build order payload
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

  // Fetch bill summary
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

  // Calculate totals and discounts
  const { discount, netTotal, discountArr } = useBillCalculations(data);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.variant?.itemVariationData?.priceMoney?.amount) / 100) *
        (item.quantity || 1),
    0
  );

  // Event handlers
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

  const handleBillModeChange = (val: string) => {
    if (billMode !== val) {
      setBillMode(val);
      setSelectedDiscounts({});
      setSelectedTax({});
      setOrderTax("");
      setOrderDiscount("");
    }
  };

  // Filter discounts and taxes for order level
  const orderLevelDiscounts = discounts.filter((discount: any) =>
    cart.every((item: Product) => isDiscountApplicableToItem(discount, item))
  );

  const orderLevelTaxes = taxes.filter((tax: any) =>
    cart.every((item: Product) => {
      return true;
    })
  );

  return {
    // State
    selectedDiscounts,
    selectedTax,
    orderTax,
    orderDiscount,
    billMode,

    // Computed values
    total,
    netTotal,
    discount,
    discountArr,
    isLoading,

    // Filtered data
    orderLevelDiscounts,
    orderLevelTaxes,

    // Event handlers
    handleCheckout,
    handleDiscountChange,
    handleTaxChange,
    handleBillModeChange,
    setOrderTax,
    setOrderDiscount,

    // Utility functions
    isDiscountApplicableToItem,
  };
};
