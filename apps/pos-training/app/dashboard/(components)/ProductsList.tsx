import { css } from "@/styled-system/css";
import { HStack, VStack } from "@/styled-system/jsx";
import React from "react";
import ProductCard from "./Card";
import { Heading, Paragraph } from "@pallas-ui/components/src/ui/typography";

const ProductsList = ({ items }: { items: any[] }) => {
  return (
    <>
      <HStack justify="flex-end" m="4">
        {/* <AddItem /> */}
      </HStack>

      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: "6",
          px: "4",
          sm: { px: "32" },
          overflowX: "hidden",
        })}
      >
        {items.map((item) => {
          return (
            <VStack key={item.id}>
              <div
                className={css({
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "lg",
                  transition: "all 0.3s ease",
                })}
              >
                <div
                  className={css({
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.3s ease",
                    animation: "fadeInSlideUp",
                    _hover: { transform: "scale(1.05)" },
                  })}
                >
                  <ProductCard item={item} />
                </div>
              </div>
              {(() => {
                const prices = item.itemData.variations
                  ?.map(
                    (v) => Number(v.itemVariationData?.priceMoney?.amount) / 100
                  )
                  .filter((price) => !isNaN(price));

                let priceDisplay = "N/A";
                if (prices && prices.length > 0) {
                  const min = Math.min(...prices);
                  const max = Math.max(...prices);
                  priceDisplay = min === max ? `${min}$` : `${min}-${max}$`;
                }

                return <Paragraph css={{ pl: "2" }}>{priceDisplay}</Paragraph>;
              })()}
            </VStack>
          );
        })}
      </div>
    </>
  );
};

export default ProductsList;
