import type React from "react";
import { forwardRef } from "react";
import Portal from "./components/Portal";
import useModal from "./hooks/useModal";
import { mergeRefs } from "./utils/mergeRefs";

export interface IModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = forwardRef<HTMLDivElement, IModalProps>(
  ({ isOpen = false, children, onClose, ...props }, ref) => {
    const { isVisible, modalRef, index } = useModal({
      isOpen,
    });

    if (!isVisible) return null;

    return (
      <Portal modalIndex={index}>
        <div
          ref={mergeRefs([modalRef, ref])}
          role="dialog"
          aria-modal="true"
          id={`modal-id-${index}`}
          style={modalDefaultStyle}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  }
);

export default Modal;

const modalDefaultStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 1000000,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "block",
};
