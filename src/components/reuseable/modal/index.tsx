import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  open,
  setIsOpen,
  children,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild />
      <DialogContent
        className={cn(
          "sm:max-w-md p-0 gap-0 bg-white rounded-lg overflow-hidden border-none",
          className
        )}
      >
        <DialogHeader className="bg-red-500 text-white p-4">
          <DialogTitle className="text-white font-medium">
            Report this video
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
