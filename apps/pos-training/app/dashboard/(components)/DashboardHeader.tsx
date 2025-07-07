"use client";
import { Button } from "@pallas-ui/components/src/ui/button";
import { Heading } from "@pallas-ui/components/src/ui/typography";
import { css } from "@/styled-system/css";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

const DashboardHeader = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
  };

  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "space-between",
        m: 4,
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          fontSize: "3xl",
          fontWeight: "bold",
          animation: "fadeInSlideUp",
        })}
      >
        <Heading variant="accent" level={2} color="secondary">
          POS
        </Heading>
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          p: 4,
        })}
      >
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="default"
          className={css({ fontSize: "lg", bg: "white" })}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
