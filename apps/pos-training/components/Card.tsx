"use client";
import React, { useState } from "react";
import Heading from "@pallas-ui/components/src/ui/typography/heading";
import { Paragraph } from "@pallas-ui/components/src/ui/typography";
import { Button } from "@pallas-ui/components/src/ui/button";
import Segmented from "@pallas-ui/components/src/ui/segmented";
import { HStack, VStack } from "@/styled-system/jsx";

interface ProductItem {
  id: string;
  imageUrls: string[];
  itemData: {
    name: string;
    description?: string;
    variations: Array<{
      id: string;
      itemVariationData: {
        name?: string;
        priceMoney?: { amount?: number };
      };
    }>;
  };
}

const ProductCard = React.memo(function ProductCard({
  item,
  onAddToCart,
}: {
  item: ProductItem;
  onAddToCart: (x: ProductItem, y: string) => void;
}) {
  const variations = item?.itemData.variations;
  const [selectedVariantId, setSelectedVariantId] = useState(variations[0]?.id);

  const selectedVariant = variations.find((v) => v.id === selectedVariantId);

  const priceDisplay = () => {
    if (!selectedVariant) return "N/A";
    const price =
      Number(selectedVariant.itemVariationData?.priceMoney?.amount) / 100;
    return !isNaN(price) ? `${price}$` : "N/A";
  };

  return (
    <VStack>
      <VStack
        w="100%"
        minH="300px"
        css={{
          border: "1px solid",
          borderColor: { base: "border", _dark: "gray.700" },
          borderRadius: "lg",
          transition: "all 0.2s ease",
          _hover: {
            boxShadow:
              "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            // transform: "scale(1.05)",
          },
        }}
        style={{
          backgroundImage: `url(${item.imageUrls[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      ></VStack>

      <VStack w="100%" h="100%" justify="flex-end" align="flex-seart" pb="4">
        <Heading level={3}>{item.itemData.name}</Heading>
        <HStack>
          Price: <Paragraph>{priceDisplay()}</Paragraph>{" "}
          <Paragraph>{item.itemData.description}</Paragraph>
        </HStack>
        <Segmented.Root
          value={selectedVariantId}
          onValueChange={setSelectedVariantId}
        >
          {variations.map((variant) => (
            <Segmented.Option key={variant.id} value={variant.id}>
              <Segmented.Text>{variant.itemVariationData.name}</Segmented.Text>
            </Segmented.Option>
          ))}
        </Segmented.Root>
        <Button
          onClick={() => onAddToCart(item, selectedVariantId)}
          disabled={!selectedVariantId}
        >
          Add to Cart
        </Button>
      </VStack>
    </VStack>
  );
});

export default ProductCard;
