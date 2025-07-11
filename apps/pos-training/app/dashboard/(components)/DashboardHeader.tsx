"use client";
import React, { useEffect, useState } from "react";
import { css } from "@/styled-system/css";
import { HStack } from "@/styled-system/jsx";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Search } from "lucide-react";
import useDebounce from "@/hooks/debounce";
import { useQuery } from "@tanstack/react-query";

interface DashboardHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  setFilteredItems: React.Dispatch<React.SetStateAction<any[]>>;
  categories: any[];
}

const fetchFilteredItems = async (context: any) => {
  const [_key, searchText, selectedCategory] = context.queryKey;
  const res = await fetch(
    `/api/square/search-catalog?searchText=${searchText}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedCategory }),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch catalog");
  return res.json();
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedCategory,
  onCategoryChange,
  setFilteredItems,
  categories,
}) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: filteredItemsData, isLoading: isSearching } = useQuery<any>({
    queryKey: ["FilteredItems", debouncedSearchTerm, selectedCategory],
    queryFn: fetchFilteredItems,
    enabled: hasSearched,
  });

  useEffect(() => {
    if (filteredItemsData?.data) {
      setFilteredItems(filteredItemsData.data);
    }
  }, [filteredItemsData, setFilteredItems]);

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
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!hasSearched) {
              setHasSearched(true);
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
