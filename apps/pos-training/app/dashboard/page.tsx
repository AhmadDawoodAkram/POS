import { Suspense } from "react";
import ProductsListContainer from "@/containers/ProductsList.container";
import FallBack from "@/components/FallBack";
import { Box, Flex } from "@/styled-system/jsx";

export default async function Dashboard() {
  return (
    <Flex w="100%" align="flex-start">
      <Box css={{ flex: 1 }}>
        <Suspense fallback={<FallBack />}>
          <ProductsListContainer />
        </Suspense>
      </Box>
    </Flex>
  );
}
