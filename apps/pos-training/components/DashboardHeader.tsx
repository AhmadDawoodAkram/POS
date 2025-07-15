"use client";
import { css } from "@/styled-system/css";
import { HStack } from "@/styled-system/jsx";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Search } from "lucide-react";

interface DashboardHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: any[];
  isSearching: boolean;
  searchTerm: string;
  onSetSearchTerm: (val: string) => void;
  hasSearched: boolean;
  onSetHasSearched: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedCategory,
  onCategoryChange,
  categories,
  isSearching,
  searchTerm,
  onSetSearchTerm,
  hasSearched,
  onSetHasSearched,
}) => {
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
        disabled={isSearching}
      >
        <option value="">--Categories--</option>
        {Array.isArray(categories)
          ? categories.map((cat: any, index: number) => (
              <option key={index} value={cat.id}>
                {cat.categoryData?.name}
              </option>
            ))
          : null}
      </select>
      <div
        style={{
          position: "relative",
          width: "50%",
          margin: "4",
        }}
      >
        <input
          style={{
            width: "100%",
            padding: "6px 32px 6px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          value={searchTerm}
          onChange={(e) => {
            onSetSearchTerm(e.target.value);
            if (!hasSearched) {
              onSetHasSearched();
            }
          }}
          placeholder="Search Items..."
        />
        {isSearching ? (
          <Spinner
            style={{
              position: "absolute",
              right: "10px",
              top: "6px",
              pointerEvents: "none",
            }}
          />
        ) : (
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
        )}
      </div>
    </HStack>
  );
};

export default DashboardHeader;
