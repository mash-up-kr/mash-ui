import {
  type RefObject,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { modalManager } from "../utils/modal-manager";

export interface IUseModalManagerProps {
  ref: RefObject<HTMLElement>;
  isOpen?: boolean;
  closeOnOverlayClick?: boolean;
}

const useModalManager = ({
  ref,
  isOpen,
  closeOnOverlayClick = true,
}: IUseModalManagerProps) => {
  const [index, setIndex] = useState(0);

  const modals = useSyncExternalStore(
    modalManager.subscribe.bind(modalManager),
    modalManager.getSnapshot.bind(modalManager),
  );

  const addModal = (node: HTMLElement) => {
    const index = modalManager.add(node);
    modalManager.setCloseOnOverlayClick(closeOnOverlayClick);
    setIndex(index);
  };
  const removeModal = (node: HTMLElement) => {
    modalManager.remove(node);
    modalManager.setCloseOnOverlayClick(true);
    setIndex(modals.size);
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (isOpen) {
      addModal(node);
    } else {
      removeModal(node);
    }

    return () => {
      modalManager.remove(node);
      setIndex(0);
    };
  }, [isOpen]);

  return {
    index,
  };
};

export default useModalManager;
