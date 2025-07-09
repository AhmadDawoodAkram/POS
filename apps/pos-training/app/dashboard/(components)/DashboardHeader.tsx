"use client";
import React, { useEffect, useState } from "react";
import { css } from "@/styled-system/css";
import { HStack } from "@/styled-system/jsx";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Search } from "lucide-react";
import useDebounce from "@/app/hooks/debounce";
import { useQuery } from "@tanstack/react-query";

interface DashboardHeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  setFilteredItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const getter = async () => {
  const res = await fetch(`../api/square/get-categories?type=CATEGORY`);
  const data = await res.json();
  return data;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedCategory,
  onCategoryChange,
  setFilteredItems,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isSearching, setIsSearching] = useState(false);
  const { data, status } = useQuery({
    queryKey: ["CatalogCategories"],
    queryFn: getter,
  });

  useEffect(() => {
    const search = async () => {
      setIsSearching(true);
      const result = await fetch(
        `../api/square/search-catalog?searchText=${debouncedSearchTerm}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selectedCategory }),
        }
      );
      const items = await result.json();
      setFilteredItems(items.data);
      setIsSearching(false);
    };
    search();
  }, [debouncedSearchTerm, selectedCategory]);

  return (
    <HStack justify="center" m="2">
      {status === "pending" && <Spinner />}
      {status === "success" && (
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
            <option key={index} value={cat.id}>
              {cat.categoryData.name}
            </option>
          ))}
        </select>
      )}
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
        {isSearching && (
          <Spinner
            style={{
              position: "absolute",
              right: "10px",
              top: "6px",
              pointerEvents: "none",
            }}
          />
        )}

        {!isSearching && (
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
