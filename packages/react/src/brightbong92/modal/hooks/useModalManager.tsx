import { type RefObject, useEffect, useState } from "react";
import { modalManager } from "../modal-manager";

export function useModalManager(ref: RefObject<HTMLElement>, isOpen?: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (isOpen) {
      const index = modalManager.add(node);
      setIndex(index);
    } else {
      modalManager.remove(node);
      setIndex(0);
    }

    return () => {
      modalManager.remove(node);
      setIndex(0);
    };
  }, [isOpen, ref]);

  return index;
}
