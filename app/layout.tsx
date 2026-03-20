"use client";

import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-right"
            containerStyle={{ top: 80 }}
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
