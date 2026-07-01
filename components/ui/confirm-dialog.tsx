"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    options: ConfirmOptions;
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({ options, resolve });
    });
  }, []);

  const handleConfirm = () => {
    state?.resolve(true);
    setState(null);
  };

  const handleCancel = () => {
    state?.resolve(false);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <AnimatePresence>
        {state && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-surface rounded-2xl border border-border-custom shadow-2xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
                  state.options.variant === "danger"
                    ? "bg-error/10"
                    : state.options.variant === "warning"
                    ? "bg-warning/10"
                    : "bg-primary/10"
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    state.options.variant === "danger"
                      ? "text-error"
                      : state.options.variant === "warning"
                      ? "text-warning"
                      : "text-primary"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  {state.options.title && (
                    <h3 className="text-sm font-bold text-text-primary mb-1">
                      {state.options.title}
                    </h3>
                  )}
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {state.options.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  {state.options.cancelLabel || "Cancel"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleConfirm}
                  className={
                    state.options.variant === "danger"
                      ? "bg-error hover:bg-error/90 text-white"
                      : ""
                  }
                >
                  {state.options.confirmLabel || "Confirm"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}
