"use client";
import React from "react";
import { Button } from "@pallas-ui/components/src/ui/button";
import { Heading, Paragraph } from "@pallas-ui/components/src/ui/typography";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Box, HStack, VStack } from "@/styled-system/jsx";
import { css } from "@/styled-system/css";
import ModeSelector from "@/components/ModeSelector";
import Product from "@/interfaces/Product.interface";
import type Cart from "@/interfaces/Cart.interface";
import Dropdown from "./Dropdown";
import { X } from "lucide-react";

const Cart: React.FC<Cart> = ({
  cart,
  onUpdateQuantity,
  isLoading,
  discountArr,
  onRemove,
  handleDiscountChange,
  billMode,
  setBillMode,
  discounts,
  isDiscountApplicableToItem,
  handleTaxChange,
  taxes,
  total,
  netTotal,
  discount,
  handleCheckout,
  setOrderTax,
  setOrderDiscount,
}) => {
  return (
    <Box
      minH="100vh"
      minW="300px"
      maxW="350px"
      p="16px"
      bg="white"
      css={{
        height: "100vh",
        overflowY: "auto",
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
          <Box maxH="40vh" mb="8" css={{ overflowY: "auto" }}>
            {cart.map((cartItem: Product, index: number) => {
              const cartKey = `${cartItem.id}-${cartItem.variantId}`;
              return (
                <VStack
                  key={cartKey}
                  mb="6"
                  align="center"
                  bg="surface.layout"
                  css={{
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
                        border: "1px solid border",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>
                        {cartItem.itemData.name}
                        {cartItem.variant?.itemVariationData?.name
                          ? ` (${cartItem.variant.itemVariationData.name})`
                          : ""}
                      </div>
                      <Paragraph color="tertiary" size="compact">
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
                        <Paragraph
                          color="tertiary"
                          size={
                            !isLoading && discountArr[index] > 0
                              ? "compact"
                              : "base"
                          }
                          css={{
                            fontWeight: 500,
                            textDecoration:
                              discountArr[index] > 0 ? "line-through" : "none",
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
                        {!isLoading && discountArr[index] > 0 && (
                          <Paragraph
                            color="error"
                            css={{
                              fontWeight: 700,
                              marginLeft: 2,
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
                      </HStack>
                    </div>

                    <Button
                      size="icon"
                      shape="circle"
                      color="white"
                      css={{
                        background: "error.active",
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
                      <X size={16} />
                    </Button>
                  </HStack>
                  {/* Tax and Discount Dropdown */}
                  {billMode === "line" && (
                    <HStack>
                      {/* Discount Selector */}
                      <Paragraph size="compact" css={{ w: "100px" }}>
                        <Dropdown
                          name="Discount"
                          options={discounts.filter((discount) =>
                            isDiscountApplicableToItem(discount, cartItem)
                          )}
                          onChange={(e) => handleDiscountChange(cartKey, e)}
                          getLabel={(option) =>
                            `${option.discountData?.name || "Unnamed Discount"} (${option.discountData?.percentage}%)`
                          }
                        />
                      </Paragraph>
                      {/* Tax Selector */}
                      <Paragraph size="compact" css={{ w: "100px" }}>
                        <Dropdown
                          name="Tax"
                          options={taxes}
                          onChange={(e) => handleTaxChange(cartKey, e)}
                          getLabel={(option) =>
                            `${option.taxData?.name || "Unnamed Tax"} (${option.taxData?.percentage}%)`
                          }
                        />
                      </Paragraph>
                    </HStack>
                  )}
                </VStack>
              );
            })}
          </Box>
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
          {/* <Paragraph size="subscript">10% GST applied*</Paragraph> */}
          <VStack>
            <ModeSelector billMode={billMode} setBillMode={setBillMode} />
            {billMode === "order" && (
              <>
                <Dropdown
                  name="Discount"
                  options={discounts}
                  onChange={(itemId) => setOrderDiscount(itemId)}
                  getLabel={(option) =>
                    `${option.discountData?.name || "Unnamed Discount"} (${option.discountData?.percentage}%)`
                  }
                />
                <Dropdown
                  name="Tax"
                  options={taxes}
                  onChange={(itemId) => setOrderTax(itemId)}
                  getLabel={(option) =>
                    `${option.taxData?.name || "Unnamed Tax"} (${option.taxData?.percentage}%)`
                  }
                />
              </>
            )}
          </VStack>
          <Button
            width="full"
            css={{
              color: "text",
              marginTop: 8,
              padding: 4,
              background: "border.secondary",
              borderRadius: 6,
              _hover: { background: "border" },
            }}
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="default" /> : null}
            Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default React.memo(Cart);
