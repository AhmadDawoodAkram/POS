import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Suspense } from "react";
import ProductsList from "./(components)/ProductsList";
import { getCatalogItems } from "@/utils/getCatalogItems";
import { HStack } from "@/styled-system/jsx";
import { getCategories } from "@/utils/getCategories";

export default async function Dashboard() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        <div style={{ flex: 1 }}>
          <Suspense fallback={<FallBack />}>
            <ProductsListWrapper />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function ProductsListWrapper() {
  const res = await getCatalogItems();
  const data = await res.json();

  const categoryRes = await getCategories();
  const categoryData = await categoryRes.json();

  return <ProductsList items={data} categories={categoryData.data} />;
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
