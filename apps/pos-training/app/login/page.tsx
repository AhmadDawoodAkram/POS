"use client";

import { signIn } from "next-auth/react";
import { Button } from "@pallas-ui/components/src/ui/button";
import { css } from "@/styled-system/css";
import { LogIn } from "lucide-react";
import { Heading } from "@pallas-ui/components/src/ui/typography";
import { useState } from "react";
import { Spinner } from "@pallas-ui/components/src/ui/spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VStack } from "@/styled-system/jsx";

export function SignInButtons({ session }: { session: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <>
      <VStack
        align="center"
        gap="6"
        css={{
          textAlign: "center",
        }}
      >
        <Heading
          css={{
            fontSize: "3xl",
            fontWeight: "bold",
            animation: "fadeInSlideUp",
          }}
        >
          Welcome to the app {session ? session.user.name : "👋"}
        </Heading>
        {!session && (
          <>
            <p
              className={css({
                fontSize: "lg",
                color: "gray.600",
                maxWidth: "md",
                animation: "fadeInSlideUp",
              })}
            >
              Get started by connecting your Square account below.
            </p>
            <Button
              onClick={() => {
                setIsLoading(true);
                signIn("square", { callbackUrl });
              }}
              variant="primary"
              shape="rounded"
              icon={<LogIn />}
              iconPosition="end"
              className={css({
                padding: "8",
                fontSize: "2xl",
                display: "flex",
                alignItems: "center",
                gap: "2",
              })}
              disabled={isLoading}
            >
              {isLoading && <Spinner className={css({ marginRight: "2" })} />}
              Sign in with Square
            </Button>
          </>
        )}
        {session && (
          <Link
            href="../dashboard"
            className={css({ animation: "fadeInSlideUp" })}
            prefetch={true}
          >
            <Button size="lg">Move to Dashboard</Button>
          </Link>
        )}
      </VStack>
    </>
  );
}
