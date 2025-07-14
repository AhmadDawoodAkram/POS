"use client";
import React from "react";
import { Button } from "@pallas-ui/components/src/ui/button";
import { Heading, Paragraph } from "@pallas-ui/components/src/ui/typography";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { HStack, VStack } from "@/styled-system/jsx";
import { css } from "@/styled-system/css";
import ModeSelector from "@/components/ModeSelector";
import CartItem from "@/interfaces/CartItem.interface";
import type Cart from "@/interfaces/Cart.interface";

const Cart: React.FC<Cart> = ({
  cart,
  onUpdateQuantity,
  isLoading,
  discountArr,
  onRemove,
  selectedDiscounts,
  handleDiscountChange,
  autoDiscount,
  setAutoDiscount,
  discounts,
  isDiscountApplicableToItem,
  total,
  netTotal,
  discount,
  handleCheckout,
}) => {
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
          {cart.map((cartItem: CartItem, index: number) => {
            const cartKey = `${cartItem.id}-${cartItem.variantId}`;
            return (
              <VStack
                key={cartKey}
                mb="6"
                align="center"
                css={{
                  background: "#f9f9f9",
                  borderRadius: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  position: "relative",
                }}
              >
                <HStack
                  align="center"
                  gap="6"
                  p="6 6 0 6"
                  css={{ alignSelf: "flex-start" }}
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
                    <Paragraph css={{ color: "#888", fontSize: "15" }}>
                      Qty:
                      <button
                        style={{ margin: "0 4px" }}
                        onClick={() =>
                          cartItem.quantity > 1 &&
                          onUpdateQuantity(
                            cartItem.id,
                            cartItem.variantId,
                            cartItem.quantity - 1
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      {cartItem.quantity}
                      <button
                        style={{ margin: "0 4px" }}
                        onClick={() =>
                          onUpdateQuantity(
                            cartItem.id,
                            cartItem.variantId,
                            cartItem.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </Paragraph>
                    <HStack align="center" gap="2">
                      {!isLoading ? (
                        <>
                          <Paragraph
                            css={{
                              color: "#888",
                              fontWeight: 500,
                              textDecoration:
                                discountArr[index] > 0
                                  ? "line-through"
                                  : "none",
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
                                marginLeft: 2,
                              }}
                            >
                              {(
                                (Number(
                                  cartItem.variant?.itemVariationData
                                    ?.priceMoney?.amount
                                ) *
                                  Number(cartItem.quantity)) /
                                  100 -
                                discountArr[index]
                              ).toFixed(2)}
                              $
                            </Paragraph>
                          )}
                        </>
                      ) : (
                        <>...</>
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
                </HStack>
                <Paragraph size="compact">
                  <select
                    className={css({ padding: "2" })}
                    value={selectedDiscounts[cartKey] || ""}
                    onChange={(e) =>
                      handleDiscountChange(cartKey, e.target.value)
                    }
                    disabled={autoDiscount === "auto"}
                  >
                    <option value="">No Discount</option>
                    {discounts
                      .filter((discount) =>
                        isDiscountApplicableToItem(discount, cartItem)
                      )
                      .map((discount) => (
                        <option key={discount.id} value={discount.id}>
                          {discount.discountData?.name || "Unnamed Discount"} (
                          {discount.discountData?.percentage}%)
                        </option>
                      ))}
                  </select>
                </Paragraph>
              </VStack>
            );
          })}
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

          <ModeSelector
            autoDiscount={autoDiscount}
            setAutoDiscount={setAutoDiscount}
          />

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

export default React.memo(Cart);
