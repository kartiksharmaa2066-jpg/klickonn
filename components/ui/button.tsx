import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          // Variants
          variant === "primary" && "bg-primary text-text-inverse hover:bg-primary/95 shadow-sm",
          variant === "secondary" && "bg-secondary text-text-inverse hover:bg-secondary/95 shadow-sm",
          variant === "outline" && "border border-border-custom bg-surface text-text-secondary hover:bg-muted-surface hover:text-text-primary",
          variant === "ghost" && "text-text-secondary hover:bg-muted-surface hover:text-text-primary",
          variant === "destructive" && "bg-accent text-text-inverse hover:bg-accent/95 shadow-sm",
          variant === "link" && "text-secondary underline-offset-4 hover:underline bg-transparent p-0 active:scale-100",
          // Sizes
          size === "sm" && "h-9 px-3 text-xs rounded-sm",
          size === "md" && "h-11 px-5 text-sm rounded-md",
          size === "lg" && "h-12 px-6 text-base rounded-lg",
          size === "icon" && "h-10 w-10 rounded-md p-0",
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
