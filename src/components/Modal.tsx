import type React from "react";
import type { CSSProperties, ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface IModal {
  isOpen: boolean;
  children: ReactNode;
  title: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  centered?: boolean;
  showCancelBtn?: boolean;
  submitText?: string;
  cancelText?: string;
  showFooter?: boolean;
  footerCustom?: React.ReactNode;
  className?: string;
  description?: string;
  disabled?: boolean;
  style?: CSSProperties;
}
export default function Modal({
  isOpen,
  children,
  title,
  onCancel,
  onSubmit,
  centered,
  showCancelBtn,
  submitText = "Submit",
  cancelText = "Cancel",
  showFooter = true,
  footerCustom,
  className,
  description,
  disabled,
  style,
}: Readonly<IModal>) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent
        className={`flex max-h-[90vh] flex-col  ${className}`}
        style={style}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div
          className={`scrollbar-hidden grow overflow-y-auto text-sm ${centered && "text-center"}`}
        >
          {children}
        </div>
        {/* Footer Modal */}
        {showFooter ? (
          <DialogFooter>
            {showCancelBtn && (
              <Button
                data-testid="cancel-button"
                type="button"
                onClick={onCancel}
                variant="outline"
                className="basis-1/2"
              >
                {cancelText}
              </Button>
            )}
            <Button
              data-testid="submit-button"
              type="submit"
              className={`${showCancelBtn ? "basis-1/2" : "w-full"}`}
              onClick={onSubmit}
              disabled={disabled}
            >
              {submitText}
            </Button>
          </DialogFooter>
        ) : (
          footerCustom && footerCustom
        )}
      </DialogContent>
    </Dialog>
  );
}
