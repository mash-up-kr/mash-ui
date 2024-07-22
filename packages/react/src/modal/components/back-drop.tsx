import type React from "react";
import { useSyncExternalStore } from "react";
import { modalManager } from "../utils/modal-manager";
import { useModalContext } from "./modal";

export interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

const Backdrop = ({ ...props }: IBackdropProps) => {
  const closeOnOverlayClick = useSyncExternalStore(
    modalManager.subscribe.bind(modalManager),
    modalManager.getCloseOnOverlayClickSnapshot.bind(modalManager)
  );

  const { isVisible, onClose } = useModalContext();

  const closeModal = () => {
    onClose();
  };

  return (
    isVisible && (
      <div
        className="modal-backdrop"
        style={defaultStyle}
        {...props}
        onClick={() => {
          closeOnOverlayClick ? closeModal() : null;
        }}
      />
    )
  );
};

export default Backdrop;

const defaultStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: Number.MAX_SAFE_INTEGER - 1,
  inset: 0,
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};
