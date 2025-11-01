import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui";
import clsx from "clsx";
import { cn } from "@/lib";

interface ModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  titleStyle?: string;
  mainStyle?: string;
  title?: string;
}

export default function Modal2({
  open,
  setIsOpen,
  children,
  className,
  titleStyle,
  title,
  mainStyle,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild />
      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className={clsx(
          `sm:max-w-md p-0 gap-0 bg-background rounded-2xl overflow-y-auto  max-h-[95vh] h-fit scrollbar-hide border-none`,
          className
        )}
      >
        <DialogHeader className="hidden">
          <DialogTitle className={cn("text-white font-medium", titleStyle)}>
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <div className={clsx("p-4", mainStyle)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
