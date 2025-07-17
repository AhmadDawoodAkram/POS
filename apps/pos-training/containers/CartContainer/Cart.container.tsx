import React from "react";
import CartContainerProps from "@/interfaces/CartContainer.interface";
import Cart from "@/components/Cart";
import { useCartLogic } from "@/containers/CartContainer/useCartLogic";

const CartContainer: React.FC<CartContainerProps> = ({
  cart,
  resetCart,
  onRemove,
  onUpdateQuantity,
  discounts,
  taxes,
}) => {
  const {
    // State
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
  } = useCartLogic({ cart, discounts, taxes, resetCart });

  return (
    <Cart
      cart={cart}
      onUpdateQuantity={onUpdateQuantity}
      isLoading={isLoading}
      discountArr={discountArr}
      onRemove={onRemove}
      handleDiscountChange={handleDiscountChange}
      // --- DISCOUNT PROPS ---
      billMode={billMode}
      setBillMode={handleBillModeChange}
      discounts={orderLevelDiscounts}
      isDiscountApplicableToItem={isDiscountApplicableToItem}
      // --- TAX PROPS ---
      handleTaxChange={handleTaxChange}
      taxes={orderLevelTaxes}
      total={total}
      netTotal={netTotal}
      discount={discount}
      handleCheckout={handleCheckout}
      // --- Order Level Tax/Dis
      setOrderTax={setOrderTax}
      setOrderDiscount={setOrderDiscount}
    />
  );
};

export default CartContainer;
