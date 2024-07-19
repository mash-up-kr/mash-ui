import type React from "react";
import { useRef, useSyncExternalStore } from "react";
import { useModalManager } from "./hooks/useModalManager";
import { Modal } from "./modal";
import { modalManager } from "./modal-manager";

export type ModalComponentProps = {
  isOpen: boolean;
  closeOutsideClick?: boolean;
  onClose: () => void;
  onOpen?: () => void;
};

export const ModalComponent: React.FC<ModalComponentProps> = (props) => {
  const { isOpen } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const { index } = useModalManager(modalRef, isOpen);

  useSyncExternalStore(
    modalManager.subscribe.bind(modalManager),
    modalManager.getSnapshot.bind(modalManager),
    modalManager.getSnapshot.bind(modalManager)
  );

  return <Modal ref={modalRef} modalIndex={index} {...props} />;
};
