import { Suspense } from "react";
import ProductsListContainer from "@/containers/ProductsList.container";
import FallBack from "@/components/FallBack";
import { Box, Flex } from "@/styled-system/jsx";
import { getSquareCatalogMeta } from "@/utils/getCategories-Discounts";
import DashboardHeaderContainer from "@/containers/DashboardHeaderContainer/DashboardHeader.container";

export default async function Dashboard() {
  return (
    <Flex w="100%" align="flex-start">
      <Box css={{ flex: 1 }}>
        <Flex w="100%" align="flex-start">
          <Box css={{ flex: 1 }}>
            <Suspense fallback={<div></div>}>
              <DashboardHeaderWrapper />
            </Suspense>
            <Suspense fallback={<FallBack />}>
              <ProductsListContainer />
            </Suspense>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

async function DashboardHeaderWrapper() {
  const res = await getSquareCatalogMeta();
  const data = await res.json();
  const categories = data.data.filter((item: any) => item.type === "CATEGORY");
  return <DashboardHeaderContainer categories={categories} />;
}
