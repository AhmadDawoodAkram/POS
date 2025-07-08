import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Suspense } from "react";
import ProductsList from "./(components)/ProductsList";
import { getCatalogItems } from "@/utils/getCatalogItems";
import { HStack } from "@/styled-system/jsx";

export default async function Dashboard() {
  return (
    <>
      <Suspense fallback={<FallBack />}>
        <ProductsListWrapper />
      </Suspense>
    </>
  );
}

async function ProductsListWrapper() {
  const res = await getCatalogItems();
  const data = await res.json();

  return <ProductsList items={data} />;
}

const FallBack = () => {
  return (
    <HStack
      css={{
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        width: "100%",
      }}
    >
      <Spinner size="lg" />
    </HStack>
  );
};
