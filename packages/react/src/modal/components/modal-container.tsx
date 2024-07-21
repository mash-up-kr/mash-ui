import type React from "react";

export interface IModalContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalContainer = ({ children, ...props }: IModalContainerProps) => {
  return (
    <div className="modal-container" style={defaultStyle} {...props}>
      {children}
    </div>
  );
};

export default ModalContainer;

const defaultStyle: React.CSSProperties = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "fixed",
  backgroundColor: "white",
  zIndex: Number.MAX_SAFE_INTEGER,
};
