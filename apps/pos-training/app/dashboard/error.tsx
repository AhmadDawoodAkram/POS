"use client";

import ErrorProps from "@/interfaces/ErrorProps.interface";
import { VStack } from "@/styled-system/jsx";
import { Heading, Paragraph } from "@pallas-ui/components/src/ui/typography";
import { Button } from "@pallas-ui/components/src/ui/button";

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <VStack
      css={{
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        width: "100%",
      }}
    >
      <Heading>Something went wrong!</Heading>
      <Paragraph>{error.message}</Paragraph>
      <Button onClick={() => reset()}>Try again</Button>
    </VStack>
  );
};

export default Error;
