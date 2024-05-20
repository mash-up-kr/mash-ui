import { forwardRef, useState } from "react";

export interface ModalProps {
  isOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);

  return (
    isOpen && (
      <div
        ref={ref}
        aria-modal={isOpen && "true"}
        role="dialog"
        aria-labelledby="header"
        aria-describedby="body"
      >
        <span id="header">Modal header</span>
        <span id="body">Modal body</span>
        <button
          onClick={() => {
            setIsOpen(false);
            props.onOpenChange?.(false);
          }}
        >
          Close
        </button>
      </div>
    )
  );
});
