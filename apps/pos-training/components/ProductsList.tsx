"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ShoppingBag, X } from "lucide-react";
import { Box } from "@/styled-system/jsx";
import CartContainer from "@/containers/CartContainer/Cart.container";
import ProductCard from "@/components/Card";
import { useProductsStore } from "@/store/productsStore";
import { Button } from "~/ui/button";
import { useCartStore } from "@/store/cartStore";
const ProductsList = ({
  items,
  discounts,
  taxes,
}: {
  items: any[];
  discounts: any[];
  taxes: any[];
}) => {
  const { products, setProducts } = useProductsStore();
  const { isCartOpen, setIsCartOpen } = useCartStore();
  const displayItems = products.length >= 0 ? products : items;
  const [cart, setCart] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && items.length) {
      setProducts(items);
      initialized.current = true;
    }
  }, [items, setProducts]);

  const resetCart = useCallback(async () => setCart([]), []);
  const handleUpdateQuantity = useCallback(
    (id: string, variantId: string, quantity: number) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id && item.variantId === variantId
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );
  //effect for window resizing event listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 970);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateCart = (
    item: { itemData: { variations: any[] }; id: string },
    variantId: string
  ) => {
    const variant = item.itemData.variations.find((v) => v.id === variantId);
    setCart((prev) => {
      const existing = prev.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.variantId === variantId
      );
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id && cartItem.variantId === variantId
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, variantId, variant, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = useCallback((id: string, variantId: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.variantId === variantId))
    );
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      <Box
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "6",
          px: "4",
          md: { px: "16" },
          sm: { px: "32" },
          overflowX: "hidden",
          marginTop: "6",
          marginRight: !isMobile && isCartOpen ? "350px" : "0",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        {displayItems.length > 0 &&
          displayItems.map((item) => (
            <ProductCard key={item.id} item={item} onAddToCart={updateCart} />
          ))}
      </Box>

      {/* Cart toggle button */}
      {!isCartOpen && (
        <Button
          size="icon"
          shape="circle"
          css={{
            bg: "text",
            position: "fixed",
            bottom: 10,
            right: 10,
            width: "56px",
            height: "56px",
            _hover: {
              bg: "gray.800",
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
          }}
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag size={24} />
        </Button>
      )}

      {/* Desktop sidebar */}
      {!isMobile && isCartOpen && (
        <Box
          css={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "350px",
            height: "100vh",
            background: "#fff",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
            borderLeft: "1px solid border",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1001,
            }}
          >
            <Button
              size="icon"
              shape="circle"
              css={{
                bg: "white",
                color: "black",
                _hover: { bg: "border" },
              }}
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
            >
              <X size={20} />
            </Button>
          </div>
          <CartContainer
            cart={cart}
            resetCart={resetCart}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            discounts={discounts}
            taxes={taxes}
          />
        </Box>
      )}

      {/* Mobile sidebar*/}
      {isMobile && isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "90vw",
            maxWidth: 350,
            height: "100vh",
            background: "#fff",
            zIndex: 1000,
            boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
            transition: "transform 0.3s",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              fontSize: 28,
              cursor: "pointer",
              zIndex: 1001,
            }}
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            &times;
          </button>
          <CartContainer
            resetCart={resetCart}
            cart={cart}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            discounts={discounts}
            taxes={taxes}
          />
        </div>
      )}
    </>
  );
};

export default ProductsList;
