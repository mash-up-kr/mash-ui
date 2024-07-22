import type React from "react";

export interface IModalFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalFooter = ({ children, ...props }: IModalFooterProps) => {
  return (
    <div className="modal-footer" style={defaultStyle} {...props}>
      {children}
    </div>
  );
};

export default ModalFooter;

const defaultStyle: React.CSSProperties = {
  borderTop: "1px solid #ddd",
  padding: "15px",
  display: "flex",
  justifyContent: "flex-end",
};
