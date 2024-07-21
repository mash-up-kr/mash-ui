import type React from "react";
import { forwardRef } from "react";
import useModal from "../hooks/use-modal";
import useOnExit from "../hooks/use-on-exit";
import { mergeRefs } from "../utils/mergeRefs";
import Backdrop from "./back-drop";
import ModalBody from "./modal-body";
import ModalContainer from "./modal-container";
import ModalFooter from "./modal-footer";
import ModalHeader from "./modal-header";
import ModalTitle from "./modal-title";
import Portal from "./portal";

export interface IModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  closeOutsideClick?: boolean;
}

const Modal = forwardRef<HTMLDivElement, IModalProps>(
  ({ isOpen = false, children, onClose, ...props }, ref) => {
    const { isVisible, modalRef, index, hide } = useModal({
      isOpen,
    });

    useOnExit({ callback: onClose, modalRef });

    if (!isVisible) return null;
    return (
      <Portal>
        <div
          ref={mergeRefs([ref, modalRef])}
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

export default Object.assign(Modal, {
  Overlay: Backdrop,
  Body: ModalBody,
  Title: ModalTitle,
  Header: ModalHeader,
  Footer: ModalFooter,
  Container: ModalContainer,
});

const modalDefaultStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: Number.MAX_SAFE_INTEGER,
};

const backdropDefaultStyle: React.CSSProperties = {
  zIndex: Number.MAX_SAFE_INTEGER,
};
