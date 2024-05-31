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
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, []);
  return;
};

export default useOnExit;
