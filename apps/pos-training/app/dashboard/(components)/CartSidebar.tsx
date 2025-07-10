"use client";
import { Button } from "@pallas-ui/components/src/ui/button";
import React, { useEffect, useState } from "react";
import { Heading, Paragraph } from "@pallas-ui/components/src/ui/typography";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { HStack } from "@/styled-system/jsx";

interface CartItem {
  id: string;
  variantId: string;
  itemData: { name: string };
  variant?: {
    itemVariationData?: { name?: string; priceMoney?: { amount?: number } };
  };
  quantity: number;
}

interface CartSidebarProps {
  cart: CartItem[];
  resetCart: () => {};
  onRemove: (id: string, variantId: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  resetCart,
  onRemove,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [netTotal, setNetTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = async () => {
      const response = await fetch("/api/square/calculate-total", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Calculating Total: ", errorData);
        return;
      }
      const data = await response.json();
      setDiscount(
        Number((data.data.totalDiscountMoney.amount / 100).toFixed(2))
      );
      setNetTotal(
        Number((data.data.netAmountDueMoney.amount / 100).toFixed(2))
      );
    };
    calculateTotal();
  }, [cart]);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.variant?.itemVariationData?.priceMoney?.amount) / 100) *
        (item.quantity || 1),
    0
  );

  const lineItems = cart.map((item) => ({
    catalogObjectId: item.variantId,
    quantity: String(item.quantity),
  }));

  const orderPayload = {
    idempotencyKey: crypto.randomUUID(),
    order: {
      locationId: "L2GYMH3VTH0FG",
      lineItems,
      //   fulfillments: [
      //     {
      //       type: "PICKUP",
      //       state: "PROPOSED",
      //       pickupDetails: {
      //         recipient: {
      //           displayName: "Dawood",
      //           phoneNumber: "+923000000000",
      //         },
      //         pickupAt: "2024-08-28T15:30:00Z",
      //       },
      //     },
      //   ],
      taxes: [
        {
          catalogObjectId: "TWWXFIX3SDCGVN3R4DA6RV6A",
          uid: "gst",
          scope: "ORDER",
        },
      ],
      pricingOptions: {
        autoApplyDiscounts: true,
        autoApplyTaxes: false,
      },
    },
  };

  const handleCheckout = async () => {
    setIsLoading(true);

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

    // setCheckoutStatus(true);
    const data = await response.json();
    console.log("Order Creation Response => ", data);
    setIsLoading(false);
    resetCart();
  };

  useEffect(() => {}, []);

  return (
    <aside
      style={{
        minWidth: 300,
        maxWidth: 350,
        height: "100vh",
        overflowY: "auto",
        padding: 16,
        borderLeft: "1px solid #eee",
        background: "#fff",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
      }}
    >
      <Heading level={3} style={{ marginBottom: 16 }}>
        Shopping Cart
      </Heading>
      {/* Cart List */}
      {cart.length === 0 ? (
        <Paragraph>Your cart is empty.</Paragraph>
      ) : (
        <>
          {cart.map((cartItem) => (
            <div
              key={`${cartItem.id}-${cartItem.variantId}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span>
                {cartItem.itemData.name}
                {cartItem.variant?.itemVariationData?.name
                  ? ` (${cartItem.variant.itemVariationData.name})`
                  : ""}
              </span>
              <span>Qty: {cartItem.quantity}</span>
              <span>
                {Number(
                  cartItem.variant?.itemVariationData?.priceMoney?.amount
                ) / 100}
                $
              </span>
              <Button
                size="sm"
                style={{
                  marginLeft: 8,
                  color: "#fff",
                  background: "#e74c3c",
                  border: "none",
                  borderRadius: "100%",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onClick={() => onRemove(cartItem.id, cartItem.variantId)}
                aria-label="Remove item"
              >
                &times;
              </Button>
            </div>
          ))}
          <hr style={{ width: "100%", margin: "12px 0" }} />

          {/* Bill */}
          <HStack
            justify="space-between"
            css={{
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <Paragraph>Total:</Paragraph>
            <Paragraph>{total.toFixed(2)}$</Paragraph>
          </HStack>
          <HStack
            justify="space-between"
            css={{
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <Paragraph>Discount</Paragraph>
            <Paragraph color="error">-{discount.toFixed(2)}$</Paragraph>
          </HStack>
          <HStack justify="space-between" css={{ fontWeight: "bold" }}>
            <Paragraph>Net Total:</Paragraph>
            <Paragraph>{netTotal.toFixed(2)}$</Paragraph>
          </HStack>
          <Paragraph size="subscript">10% GST applied*</Paragraph>
          <Button
            width="full"
            style={{
              color: "black",
              marginTop: 16,
              padding: 8,
              background: "#eee",
              border: "none",
              borderRadius: 4,
            }}
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="solid" /> : null}
            Checkout
          </Button>
        </>
      )}
    </aside>
  );
};

export default React.memo(CartSidebar);
