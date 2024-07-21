import type React from "react";
import { useSyncExternalStore } from "react";
import useModal from "../hooks/use-modal";
import { modalManager } from "../utils/modal-manager";
import { useModalContext } from "./modal";

export interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

const Backdrop = ({ ...props }: IBackdropProps) => {
  const { modals } = useModal({});

  const closeOnOverlayClick = useSyncExternalStore(
    modalManager.subscribe.bind(modalManager),
    modalManager.getCloseOnOverlayClickSnapshot.bind(modalManager)
  );

  const { hide, setIsVisible } = useModalContext();

  const closeModal = () => {
    console.log("closeOnOverlayClick", closeOnOverlayClick);

    setIsVisible(false);
    // hide();
  };

  return (
    <>
      <div
        className="modal-backdrop"
        style={defaultStyle}
        {...props}
        onClick={() => {
          closeOnOverlayClick ? closeModal() : null;
        }}
      />
    </>
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
