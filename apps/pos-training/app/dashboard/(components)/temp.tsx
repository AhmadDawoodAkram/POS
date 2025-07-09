"use client";
import { useQuery } from "@tanstack/react-query";
import ProductsList from "./ProductsList";
import { HStack } from "@/styled-system/jsx";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";

async function getter() {
  const res = await fetch("../api/square/get-catalog-items");
  const data = await res.json();

  return data;
}

export default function ProductsListWrapperTanStack() {
  const { data, status, isPending } = useQuery({
    queryKey: ["catalogItems"],
    queryFn: getter,
  });

  if (isPending) return <FallBack />;

  if (status === "success") return <ProductsList items={data} />;
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
