"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import { VStack } from "@/styled-system/jsx";
import { css } from "@/styled-system/css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <SessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable}`}
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className={css({ px: "4", py: "2" })}>
            <Header />
          </div>
          <VStack css={{ flex: 1 }}>{children}</VStack>
        </body>
      </SessionProvider>
    </html>
  );
}
