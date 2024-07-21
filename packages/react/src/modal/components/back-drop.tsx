import type React from "react";

export interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const Backdrop = ({ onClose, ...props }: IBackdropProps) => {
  return <div className="modal-backdrop" style={defaultStyle} {...props} />;
};

export default Backdrop;

const defaultStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: Number.MAX_SAFE_INTEGER - 1,
  inset: 0,
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};
