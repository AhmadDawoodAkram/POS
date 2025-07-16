"use client";
import { css } from "@/styled-system/css";
import { Box, HStack } from "@/styled-system/jsx";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Search } from "lucide-react";
import Dropdown from "./Dropdown";

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
      <Box
        css={{
          width: "150px",
        }}
      >
        <Dropdown
          name="Categories"
          options={categories}
          onChange={(cat) => onCategoryChange(cat)}
          getLabel={(cat) => cat.categoryData.name}
          isLoading={isSearching}
        />
      </Box>
      <div
        style={{
          position: "relative",
          width: "50%",
        }}
      >
        <input
          className={css({
            width: "100%",
            padding: "8px 32px 6px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          })}
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
