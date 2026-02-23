import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { type ReactNode } from "react";
import { CloseButton } from "../CloseButton";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "container mx-auto",
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = "md",
  className,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={() => { }} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            className={clsx(
              "relative transform w-full  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
              sizeClasses[size],
              className,
            )}
          >
            <CloseButton
              onClick={onClose}
              className="absolute -top-5 -right-5"
            />
            <div>{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

Modal.displayName = "Modal";
