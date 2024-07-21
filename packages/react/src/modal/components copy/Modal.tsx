import type React from "react";
import { forwardRef } from "react";
import useModal from "../hooks/useModal";
import useOnExit from "../hooks/useOnExit";
import { mergeRefs } from "../utils/mergeRefs";
import Backdrop from "./Backdrop";
import ModalBody from "./ModalBody";
import ModalContainer from "./ModalContainer";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import ModalTitle from "./ModalTitle";
import Portal from "./Portal";

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
  zIndex: Number.MAX_SAFE_INTEGER,
};

const backdropDefaultStyle: React.CSSProperties = {
  zIndex: Number.MAX_SAFE_INTEGER,
};
