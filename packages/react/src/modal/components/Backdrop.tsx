import type React from "react";

/**
 * @description backdrop
 * @returns
 */

export interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOutsideClick?: boolean;
  onClose?: () => void;
}

const Backdrop = ({
  closeOutsideClick = false,
  onClose,
  ...props
}: IBackdropProps) => {
  return (
    <div
      className="modal-backdrop"
      onClick={closeOutsideClick ? onClose : undefined}
      style={defaultStyle}
      {...props}
    />
  );
};

export default Backdrop;

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
