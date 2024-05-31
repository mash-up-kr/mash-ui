import { useEffect } from "react";

interface UseOnExitProps {
  callback: () => void;
}

const useOnExit = ({ callback }: UseOnExitProps) => {
  useEffect(() => {
    const onEsc = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        callback();
      }
    };
    window.addEventListener("keyup", onEsc);
    return () => {
      window.removeEventListener("keyup", onEsc);
    };
  }, []);
  return;
};

export default useOnExit;
