import type React from "react";
import { createContext, forwardRef, useContext } from "react";
import useModal from "../hooks/use-modal";
import useOnEsc from "../hooks/use-on-esc";
import { mergeRefs } from "../utils/mergeRefs";
import Backdrop from "./back-drop";
import ModalBody from "./modal-body";
import ModalContainer from "./modal-container";
import ModalFooter from "./modal-footer";
import ModalHeader from "./modal-header";
import ModalTitle from "./modal-title";
import Portal from "./portal";

interface ModalContextProps {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export interface IModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  /**
   * @description esc키를 눌러 종료합니다.
   * @default true
   */
  closeOnEsc?: boolean;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

const Modal = forwardRef<HTMLDivElement, IModalProps>(
  (
    {
      isOpen = false,
      children,
      onClose,
      closeOnOverlayClick = true,
      closeOnEsc = true,
      ...props
    },
    ref,
  ) => {
    const { isVisible, modalRef, index, show, hide, setIsVisible } = useModal({
      isOpen,
      closeOnOverlayClick,
    });

    closeOnEsc && useOnEsc({ callback: onClose, modalRef });

    // Ensure `setIsVisible` is correctly set
    console.log("Modal isVisible:", isVisible);
    if (!isVisible) return null;

    return (
      <Portal>
        <ModalContext.Provider
          value={{ isVisible: isOpen, show, hide, setIsVisible }}
        >
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
        </ModalContext.Provider>
      </Portal>
    );
  },
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
