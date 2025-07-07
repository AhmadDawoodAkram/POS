// apps/pos-training/app/SignInButtons.tsx
"use client";

import { signIn } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { css } from "@/styled-system/css";
import { LogIn } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import Dashboard from "../dashboard/page";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export function SignInButtons({ session }: { session: any }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6",
          textAlign: "center",
        })}
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
            {isLoading ? (
              <Spinner />
            ) : (
              <Button
                onClick={() => {
                  setIsLoading(true);
                  signIn("square", { callbackUrl: "/" });
                }}
                variant="primary"
                shape="rounded"
                icon={<LogIn className={css({ fontSize: "2xl" })} />}
                iconPosition="end"
                className={css({ padding: "8", fontSize: "2xl" })}
              >
                Sign in with Square
              </Button>
            )}
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
      </div>
    </>
  );
}
