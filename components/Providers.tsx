"use client";

import React from "react";
import { Toaster } from "sonner";
import { ConfirmProvider } from "@/components/ui/confirm-dialog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--surface)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-custom)",
            borderRadius: "12px",
            fontSize: "13px",
          },
        }}
      />
    </ConfirmProvider>
  );
}
