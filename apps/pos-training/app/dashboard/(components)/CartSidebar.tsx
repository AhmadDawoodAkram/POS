import { Button } from "@pallas-ui/components/src/ui/button";
import React, { useState, useEffect } from "react";
import { Heading, Paragraph } from "@pallas-ui/components/src/ui/typography";
import { css } from "@pallas-ui/components/src/lib/css";

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
  onRemove: (id: string, variantId: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cart, onRemove }) => {
  const total = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.variant?.itemVariationData?.priceMoney?.amount) / 100) *
        (item.quantity || 1),
    0
  );

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <span>Total:</span>
            <span>{total.toFixed(2)}$</span>
          </div>
          <Button
            style={{
              width: "100%",
              color: "black",
              marginTop: 16,
              padding: 8,
              background: "#eee",
              border: "none",
              borderRadius: 4,
            }}
          >
            Checkout
          </Button>
        </>
      )}
    </aside>
  );
};

export default CartSidebar;
