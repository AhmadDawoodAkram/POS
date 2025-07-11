"use client";
import { css } from "@/styled-system/css";
import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "./Card";
import DashboardHeader from "./DashboardHeader";
import CartSidebar from "./CartSidebar";
import { ShoppingCart } from "lucide-react";

const ProductsList = ({
  items,
  categories,
  discounts,
}: {
  items: any[];
  categories: any[];
  discounts: any[];
}) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        <div style={{ flex: 1 }}>
          <DashboardHeader
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            setFilteredItems={setFilteredItems}
            categories={categories}
          />

          <div
            className={css({
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: "6",
              px: "4",
              sm: { px: "32" },
              overflowX: "hidden",
              marginTop: "6",
            })}
          >
            {filteredItems.length > 0 &&
              filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onAddToCart={updateCart}
                />
              ))}
          </div>
        </div>
        {/* Mobile cart toggle button */}
        {isMobile && !isCartOpen && (
          <button
            className={css({
              position: "fixed",
              bottom: 8,
              right: 12,
              zIndex: 1001,
              padding: 4,
              borderRadius: "50%",
              bg: "#222",
              color: "#fff",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              fontSize: 24,
              _hover: { bg: "gray.300" },
            })}
            style={{}}
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingCart />
          </button>
        )}
        {/* Desktop sidebar */}
        {!isMobile && (
          <CartSidebar
            cart={cart}
            resetCart={resetCart}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            discounts={discounts}
          />
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
            <CartSidebar
              resetCart={resetCart}
              cart={cart}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              discounts={discounts}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
