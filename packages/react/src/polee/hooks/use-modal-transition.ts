import { useEffect, useState, type CSSProperties } from "react";
import useRenderState from "./use-render-state";

const useModalTransition = (
  isOpen: boolean,
  initial?: CSSProperties,
  animate?: CSSProperties,
  exit?: CSSProperties,
) => {
  const [state, transition] = useRenderState("unmounted");
  const [styles, setStyles] = useState(initial);

  useEffect(() => {
    if (isOpen && state === "unmounted") {
      transition("mounting");
      setStyles({ ...initial, transition: "all 0.3s" });

      setTimeout(() => {
        transition("mounted");
        setStyles({
          ...animate,
          transition: "all 0.3s",
        });
      }, 100);
    } else if (!isOpen && state === "mounted") {
      transition("unmounting");
      setStyles({
        ...exit,
        transition: "all 0.3s",
      });

      setTimeout(() => {
        transition("unmounted");
      }, 300);
    }
  }, [isOpen, state, initial, animate, exit, transition]);

  return { state, styles };
};

export default useModalTransition;
