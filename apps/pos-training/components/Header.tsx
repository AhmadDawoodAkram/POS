"use client";
import { Button } from "@pallas-ui/components/src/ui/button";
import { Heading } from "@pallas-ui/components/src/ui/typography";
import { css } from "@/styled-system/css";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { HStack } from "@/styled-system/jsx";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import Image from "next/image";

const Header = () => {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
  };

  return (
    <HStack justify="space-between">
      <HStack
        align="center"
        css={{
          fontSize: "3xl",
          fontWeight: "bold",
          flex: 1,
        }}
      >
        <Link href={"./"} className={css({ m: "4" })}>
          <Heading variant="accent" level={2}>
            <HStack gap="1">
              <Image
                src="/square.png"
                alt="Square logo"
                width={34}
                height={34}
              />
              SquarePOS
            </HStack>
          </Heading>
        </Link>
      </HStack>
      <HStack p="4" align="baseline">
        {status === "loading" && <Spinner />}
        {session && (
          <>
            {isLoggingOut ? <Spinner /> : null}
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="text"
              css={{ fontSize: "lg", cursor: "pointer" }}
            >
              Logout
            </Button>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
