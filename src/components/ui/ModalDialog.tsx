import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name announced when the dialog opens. */
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * Thin wrapper over the native <dialog>: the browser provides the focus trap,
 * Escape-to-close, inert background and focus restoration. Children only mount
 * while open, so heavy images inside don't load until they're needed.
 */
export function ModalDialog({ open, onClose, label, className, children }: ModalDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={cn("sheet", className)}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {open ? children : null}
    </dialog>
  );
}
