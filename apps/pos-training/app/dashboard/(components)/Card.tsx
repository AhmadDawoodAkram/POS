import Heading from "@pallas-ui/components/src/ui/typography/heading";
import { HStack, VStack } from "@/styled-system/jsx";

const ProductCard = ({ item }) => {
  return (
    <VStack
      h="100%"
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
          transform: "scale(1.05)",
        },
      }}
      style={{
        backgroundImage: `url(${item.imageUrls[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <HStack
        justify="center"
        css={{
          bgBlur: "lg",
        }}
      >
        <Heading variant="accent" level={2} color="secondary">
          {item.itemData.name}
        </Heading>
      </HStack>
      {/* <Paragraph
        css={{
          mt: "auto",
        }}
      >
        {" "}
        Gello
      </Paragraph> */}
    </VStack>
  );
};

export default ProductCard;
