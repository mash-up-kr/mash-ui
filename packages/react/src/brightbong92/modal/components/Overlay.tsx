import type React from "react";

/**
 * @description overlay
 * @returns
 */

export interface IOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOutsideClick?: boolean;
  onClose?: () => void;
}

const Overlay = ({
  closeOutsideClick = false,
  onClose,
  ...props
}: IOverlayProps) => {
  return (
    <div
      className="modal-overlay"
      onClick={closeOutsideClick ? onClose : undefined}
      style={defaultStyle}
      {...props}
    />
  );
};

export default Overlay;

const defaultStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 99,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};
