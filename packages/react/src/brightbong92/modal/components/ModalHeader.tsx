import type React from "react";

export interface IModalHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalHeader = ({ children, ...props }: IModalHeaderProps) => {
  return (
    <div className="modal-header" style={defaultStyle} {...props}>
      {children}
    </div>
  );
};

export default ModalHeader;

const defaultStyle = {
  borderBottom: "1px solid #ddd",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
