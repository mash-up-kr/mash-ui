import { useEffect, useRef, useState } from "react";
import useModalManager from "./useModalManager";

export interface IUseModalProps {
  isOpen?: boolean;
}

const useModal = ({ isOpen }: IUseModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { index } = useModalManager(modalRef, isVisible);

  const show = () => {
    setIsVisible(true);
  };
  const hide = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isOpen) {
      show();
    } else {
      hide();
    }
  }, [isOpen]);

  return {
    index,
    modalRef,
    isVisible,
    show,
    hide,
  };
};

export default useModal;
