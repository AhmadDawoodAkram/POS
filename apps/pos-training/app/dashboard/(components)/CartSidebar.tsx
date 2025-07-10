"use client";
import { Button } from "@pallas-ui/components/src/ui/button";
import React, { useEffect, useState } from "react";
import { Heading, Paragraph } from "@pallas-ui/components/src/ui/typography";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { HStack } from "@/styled-system/jsx";
import { useQuery } from "@tanstack/react-query";
import { useBillCalculations } from "@/hooks/billCalculation";

interface CartItem {
  id: string;
  variantId: string;
  itemData: { name: string };
  variant?: {
    itemVariationData?: { name?: string; priceMoney?: { amount?: number } };
  };
  quantity: number;
  imageUrls: string[];
}

interface CartSidebarProps {
  cart: CartItem[];
  resetCart: () => {};
  onRemove: (id: string, variantId: string) => void;
}

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

const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  resetCart,
  onRemove,
}) => {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ["bill-summary", cart],
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

  const lineItems = cart.map((item) => ({
    catalogObjectId: item.variantId,
    quantity: String(item.quantity),
  }));

  const orderPayload = {
    idempotencyKey: crypto.randomUUID(),
    order: {
      locationId: "L2GYMH3VTH0FG",
      lineItems,
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
          {cart.map((cartItem, index) => {
            return (
              <div
                key={`${cartItem.id}-${cartItem.variantId}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#f9f9f9",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  padding: 12,
                  marginBottom: 12,
                  position: "relative",
                }}
              >
                <img
                  src={cartItem.imageUrls[0] || "/placeholder.png"}
                  alt={cartItem.itemData.name}
                  style={{
                    width: 56,
                    height: 56,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #eee",
                    background: "#fff",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>
                    {cartItem.itemData.name}
                    {cartItem.variant?.itemVariationData?.name
                      ? ` (${cartItem.variant.itemVariationData.name})`
                      : ""}
                  </div>
                  <Paragraph css={{ color: "#888", fontSize: "13" }}>
                    Qty: {cartItem.quantity}x
                  </Paragraph>
                  <HStack align="center" gap="2">
                    {!isLoading && (
                      <>
                        <Paragraph
                          css={{
                            color: "#888",
                            fontWeight: 500,
                            textDecoration: `${discountArr[index] > 0 ? "line-through" : ""}`,
                            fontSize: 15,
                          }}
                        >
                          {(
                            (Number(
                              cartItem.variant?.itemVariationData?.priceMoney
                                ?.amount
                            ) *
                              Number(cartItem.quantity)) /
                            100
                          ).toFixed(2)}
                          $
                        </Paragraph>
                        {discountArr[index] > 0 && (
                          <Paragraph
                            css={{
                              color: "#e74c3c",
                              fontWeight: 700,
                              fontSize: 16,
                              marginLeft: 6,
                            }}
                          >
                            {(
                              (Number(
                                cartItem.variant?.itemVariationData?.priceMoney
                                  ?.amount
                              ) *
                                Number(cartItem.quantity)) /
                                100 -
                              discountArr[index]
                            ).toFixed(2)}
                            $
                          </Paragraph>
                        )}
                      </>
                    )}
                  </HStack>
                </div>
                <Button
                  size="sm"
                  css={{
                    background: "#e74c3c",
                    borderRadius: "50%",
                    width: 6,
                    height: 6,
                    fontSize: 18,
                    cursor: "pointer",
                    position: "absolute",
                    top: 8,
                    right: 4,
                  }}
                  onClick={() => onRemove(cartItem.id, cartItem.variantId)}
                  aria-label="Remove item"
                >
                  &times;
                </Button>
              </div>
            );
          })}
          <hr style={{ width: "100%", margin: "12px 0" }} />

          {/* Bill */}
          <>
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
              {!isLoading ? (
                <Paragraph color="error">-{discount.toFixed(2)}$</Paragraph>
              ) : (
                <>...</>
              )}
            </HStack>
            <HStack justify="space-between" css={{ fontWeight: "bold" }}>
              <Paragraph>Net Total:</Paragraph>
              {!isLoading ? (
                <Paragraph>{netTotal.toFixed(2)}$</Paragraph>
              ) : (
                <>...</>
              )}
            </HStack>
            <Paragraph size="subscript">10% GST applied*</Paragraph>
          </>
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
