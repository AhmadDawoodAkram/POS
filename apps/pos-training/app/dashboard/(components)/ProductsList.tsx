"use client";
import { css } from "@/styled-system/css";
import React, { useState, useEffect } from "react";
import ProductCard from "./Card";
import DashboardHeader from "./DashboardHeader";
import CartSidebar from "./CartSidebar";

const ProductsList = ({ items }: { items: any[] }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  //effect for window resizing event listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 970);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // const filteredItems = selectedCategory
  //   ? items.filter((item) =>
  //       item.categoryData?.some(
  //         (cat: any) => cat.categoryData?.name === selectedCategory
  //       )
  //     )
  //   : items;

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

  const handleRemoveFromCart = React.useCallback(
    (id: string, variantId: string) => {
      setCart((prev) =>
        prev.filter((item) => !(item.id === id && item.variantId === variantId))
      );
    },
    []
  );

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        <div style={{ flex: 1 }}>
          <DashboardHeader
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            setFilteredItems={setFilteredItems}
          />
          {/* Mobile cart toggle button */}
          {isMobile && (
            <button
              style={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 1001,
                padding: 16,
                borderRadius: "50%",
                background: "#222",
                color: "#fff",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                fontSize: 24,
              }}
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
            >
              🛒
            </button>
          )}
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: "6",
              px: "4",
              sm: { px: "32" },
              overflowX: "hidden",
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
        {/* Desktop sidebar */}
        {!isMobile && (
          <CartSidebar
            cart={cart}
            resetCart={React.useCallback(async () => setCart([]), [])}
            onRemove={handleRemoveFromCart}
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
              resetCart={React.useCallback(async () => setCart([]), [])}
              cart={cart}
              onRemove={handleRemoveFromCart}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
