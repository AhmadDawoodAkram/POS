"use client";
import { Box, HStack } from "@/styled-system/jsx";
import { Search } from "lucide-react";
import Dropdown from "./Dropdown";
import { Input } from "@pallas-ui/components/src/ui/input";
import { useCartStore } from "@/store/cartStore";

interface DashboardHeaderProps {
  onCategoryChange: (category: string) => void;
  categories: any[];
  isSearching: boolean;
  onSetSearchTerm: (val: string) => void;
  hasSearched: boolean;
  onSetHasSearched: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onCategoryChange,
  categories,
  isSearching,
  onSetSearchTerm,
  hasSearched,
  onSetHasSearched,
}) => {
  const { isCartOpen } = useCartStore();
  return (
    <HStack
      justify="center"
      m="2"
      css={{
        marginRight: isCartOpen ? "350px" : "0",
        transition: "margin 0.3s ease-in-out",
      }}
    >
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
          size="lg"
          isLoading={isSearching}
        />
      </Box>
      <div
        style={{
          position: "relative",
          width: "50%",
        }}
      >
        <Input size="lg">
          <Input.Text
            placeholder="Search"
            onChange={(e) => {
              onSetSearchTerm(e.target.value);
              if (!hasSearched) {
                onSetHasSearched();
              }
            }}
          />
          <Input.Postfix>
            <Search size={16} />
          </Input.Postfix>
        </Input>
      </div>
    </HStack>
  );
};

export default DashboardHeader;
