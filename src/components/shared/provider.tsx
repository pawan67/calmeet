"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider, useTheme } from "next-themes";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import StreamClientProvider from "../video/video-meet";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const { theme } = useTheme();

  const primaryHsl =
    theme === "dark" ? "hsl(60 9.1% 97.8%)" : "hsl(24 9.8% 10%)";

  return (
    <>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: primaryHsl, // change this value (you can get it from you're css variables, make sure to include 'hsl' and commas)
          },
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="calmeet-theme"
        >
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
          <Toaster richColors position="bottom-center" />
        </ThemeProvider>

        <Analytics />
      </ClerkProvider>
    </>
  );
};

export default Providers;
