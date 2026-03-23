"use client";

import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn("font-sans", inter.variable)}>
      <body>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-right"
            containerStyle={{ top: 70 }}
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--bg-input)",
                color: "var(--text-white)",
                border: "1px solid var(--border-gray-800)",
              },
            }}
          />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
