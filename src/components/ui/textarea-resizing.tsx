"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaResizing = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, onChange, ...props }, ref) => {
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
    onChange?.(e);
  };

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.height = "auto";
      innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <textarea
      ref={(el) => {
        innerRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      onChange={handleInput}
      data-slot="textarea"
      className={cn(
        "flex w-full min-h-16 rounded-md overflow-hidden border border-input bg-transparent px-3 py-2 text-base md:text-sm outline-none transition-[color,box-shadow] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive resize-none",
        className
      )}
      {...props}
    />
  );
});

TextareaResizing.displayName = "Textarea";
export { TextareaResizing };
