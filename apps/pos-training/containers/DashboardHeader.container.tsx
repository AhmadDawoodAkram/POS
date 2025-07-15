import DashboardHeader from "@/components/DashboardHeader";
import useDebounce from "@/hooks/debounce";
import { useProductsStore } from "@/store/productsStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface DashboardHeaderContainerProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  // setFilteredItems: React.Dispatch<React.SetStateAction<any[]>>;
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

const DashboardHeaderContainer: React.FC<DashboardHeaderContainerProps> = ({
  selectedCategory,
  onCategoryChange,
  // setFilteredItems,
  categories,
}) => {
  const { setProducts } = useProductsStore();
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: filteredItemsData, isLoading: isSearching } = useQuery<any>({
    queryKey: ["FilteredItems", debouncedSearchTerm, selectedCategory],
    queryFn: fetchFilteredItems,
    enabled: hasSearched || !!selectedCategory,
  });

  useEffect(() => {
    if (filteredItemsData?.data) {
      setProducts(filteredItemsData.data);
    }
  }, [filteredItemsData, setProducts]);

  // useEffect(() => {
  //   if (filteredItemsData?.data) {
  //     setFilteredItems(filteredItemsData.data);
  //   }
  // }, [filteredItemsData, setFilteredItems]);

  return (
    <DashboardHeader
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
      categories={categories}
      isSearching={isSearching}
      searchTerm={searchTerm}
      onSetSearchTerm={(val: string) => setSearchTerm(val)}
      hasSearched={hasSearched}
      onSetHasSearched={() => setHasSearched(true)}
    />
  );
};

export default DashboardHeaderContainer;
