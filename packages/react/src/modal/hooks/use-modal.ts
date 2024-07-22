import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { modalManager } from "../utils/modal-manager";
import useModalManager from "./use-modal-manager";

export interface IUseModalProps {
  isOpen?: boolean;
  closeOnOverlayClick?: boolean;
}

const useModal = ({ isOpen, closeOnOverlayClick }: IUseModalProps) => {
  const modals = useSyncExternalStore(
    modalManager.subscribe.bind(modalManager),
    modalManager.getSnapshot.bind(modalManager),
  );

  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(isOpen);

  const { index } = useModalManager({
    ref: modalRef,
    isOpen: isVisible,
    closeOnOverlayClick,
  });

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isOpen) show();
    else hide();
  }, [isOpen]);

  return {
    index,
    modalRef,
    isVisible,
    modals,
    closeOnOverlayClick,
    setIsVisible,
    show,
    hide,
  };
};

export default useModal;
