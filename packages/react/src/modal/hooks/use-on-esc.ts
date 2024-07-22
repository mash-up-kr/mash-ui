import { type MutableRefObject, useEffect } from "react";
import { modalManager } from "../utils/modal-manager";

interface UseOnEscProps {
  isOpen: boolean;
  callback: () => void;
  modalRef?: MutableRefObject<HTMLElement> | any;
}

const useOnEsc = ({ isOpen, callback, modalRef }: UseOnEscProps) => {
  useEffect(() => {
    const onEsc = (ev: KeyboardEvent) => {
      if (!isOpen) return;
      if (ev.key === "Escape" && modalManager.isTopModal(modalRef.current)) {
        callback();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen]);

  return;
};

export default useOnEsc;
