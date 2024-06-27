import type React from "react";
import { useRef } from "react";
import { useModalManager } from "./hooks/useModal";
import { Modal } from "./modal";

export type ModalComponentProps = {
  isOpen: boolean;
  closeOutsideClick?: boolean;
  onClose: () => void;
  onOpen?: () => void;
};

export const ModalComponent: React.FC<ModalComponentProps> = (props) => {
  const { isOpen } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const modalIndex = useModalManager(modalRef, isOpen);

  return <Modal ref={modalRef} modalIndex={modalIndex} {...props} />;
};
