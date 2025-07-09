"use client";
import React, { useEffect, useState } from "react";
import { css } from "@/styled-system/css";
import { HStack } from "@/styled-system/jsx";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Search } from "lucide-react";

interface DashboardHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  data: { data: { categoryData: { name: string } }[] };
  status: string;
  searchTerm: string;
  setSearchTerm: (value: string) => {};
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedCategory,
  onCategoryChange,
  data,
  status,
  searchTerm,
  setSearchTerm,
}) => {
  if (status === "loading") return <Spinner />;

  if (status === "success") {
    return (
      <HStack justify="center" m="2">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={css({
            width: "150px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          })}
        >
          <option value="">--Categories--</option>
          {data.data.map((cat: any, index: number) => (
            <option key={index} value={cat.categoryData.name}>
              {cat.categoryData.name}
            </option>
          ))}
        </select>
        <div
          style={{
            position: "relative",
            width: "50%",
          }}
        >
          <input
            className={css({
              width: "100%",
              padding: "6px 32px 6px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Items..."
          />
          <Search
            size={18}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#888",
              pointerEvents: "none",
            }}
          />
        </div>
      </HStack>
    );
  }
};

export default DashboardHeader;
