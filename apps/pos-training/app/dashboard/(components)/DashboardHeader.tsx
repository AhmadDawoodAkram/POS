import { HStack } from "@/styled-system/jsx";
import React from "react";

const DashboardHeader = ({ selectedCategory, onCategoryChange }) => {
  return (
    <HStack justify="center" m="2">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{
          width: "150px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">--Categories--</option>
        <option value="Drinks">Drinks</option>
        <option value="Clothing">Clothing</option>
      </select>
    </HStack>
  );
};

export default DashboardHeader;
