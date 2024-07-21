import { type MutableRefObject, useEffect } from "react";
import { modalManager } from "../utils/modal-manager";

interface UseOnExitProps {
  callback: () => void;
  modalRef?: MutableRefObject<HTMLElement> | any;
}

const useOnExit = ({ callback, modalRef }: UseOnExitProps) => {
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

export default useOnExit;
