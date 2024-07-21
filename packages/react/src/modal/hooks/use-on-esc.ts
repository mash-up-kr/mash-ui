import { type MutableRefObject, useEffect } from "react";
import { modalManager } from "../utils/modal-manager";

interface UseOnEscProps {
  callback: () => void;
  modalRef?: MutableRefObject<HTMLElement> | any;
}

const useOnEsc = ({ callback, modalRef }: UseOnEscProps) => {
  useEffect(() => {
    const onEsc = (ev: KeyboardEvent) => {
      if (ev.key === "Escape" && modalManager.isTopModal(modalRef.current)) {
        callback();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, []);
  return;
};

export default useOnEsc;
