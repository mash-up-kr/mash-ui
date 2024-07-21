import {
  type RefObject,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { modalManager } from "../modal-manager";

const useModalManager = (ref: RefObject<HTMLElement>, isOpen?: boolean) => {
  const [index, setIndex] = useState(0);

  const modals = useSyncExternalStore(
    modalManager.subscribe.bind(modalManager),
    modalManager.getSnapshot.bind(modalManager),
  );

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

  return {
    index,
  };
};

export default useModalManager;
