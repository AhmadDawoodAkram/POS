import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import { HStack } from "@/styled-system/jsx";
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

export default FallBack;
