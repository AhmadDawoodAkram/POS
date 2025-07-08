"use client";
import { css } from "@/styled-system/css";
import React, { useState, useEffect } from "react";
import ProductCard from "./Card";
import DashboardHeader from "./DashboardHeader";
import CartSidebar from "./CartSidebar";

const ProductsList = ({ items }: { items: any[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 970);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredItems = selectedCategory
    ? items.filter((item) =>
        item.categoryData?.some(
          (cat) => cat.categoryData?.name === selectedCategory
        )
      )
    : items;

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  // Now updateCart receives both item and variantId
  const updateCart = (item, variantId) => {
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

  const handleRemoveFromCart = (id: string, variantId: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.variantId === variantId))
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
      <div style={{ flex: 1 }}>
        <DashboardHeader
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
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
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} onAddToCart={updateCart} />
          ))}
        </div>
      </div>
      {/* Desktop sidebar */}
      {!isMobile && <CartSidebar cart={cart} onRemove={handleRemoveFromCart} />}
      {/* Mobile sidebar as overlay/drawer */}
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
          <CartSidebar cart={cart} onRemove={handleRemoveFromCart} />
        </div>
      )}
    </div>
  );
};

export default ProductsList;
