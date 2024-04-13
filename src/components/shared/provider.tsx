"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <ClerkProvider>
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
