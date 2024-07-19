import type React from "react";

export interface IModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalBody = ({ children, ...props }: IModalBodyProps) => {
  return (
    <div className="modal-body" {...props}>
      {children}
    </div>
  );
};

export default ModalBody;
