import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/shared/provider";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Calmeet",
  description: "Efficient scheduling and seamless video meetings for all.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers>
          <div vaul-drawer-wrapper="" className="bg-background">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
