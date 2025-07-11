import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { Suspense } from "react";
import ProductsList from "./(components)/ProductsList";
import { getCatalogItems } from "@/utils/getCatalogItems";
import { HStack } from "@/styled-system/jsx";
import { getCategories } from "@/utils/getCategories-Discounts";

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
  const [res, categoryRes] = await Promise.all([
    getCatalogItems(),
    getCategories(),
  ]);

  // Wait for both JSON bodies in parallel as well
  const [data, categoryData] = await Promise.all([
    res.json(),
    categoryRes.json(),
  ]);
  const categories = categoryData.data.filter(
    (item: any) => item.type === "CATEGORY"
  );
  const discounts = categoryData.data.filter(
    (item: any) => item.type === "DISCOUNT"
  );

  return (
    <ProductsList items={data} categories={categories} discounts={discounts} />
  );
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
