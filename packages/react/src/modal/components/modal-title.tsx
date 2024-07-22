import type React from "react";

export interface IModalTitleProps {
  title?: string;
  onClickClose: () => void;
  children?: React.ReactNode;
}

const ModalTitle = ({ title, children, onClickClose }: IModalTitleProps) => {
  return (
    <>
      {typeof title === "string" ? (
        <>
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="close"
            onClick={onClickClose}
            style={defaultStyle}
            aria-label="Close"
          >
            <span>&times;</span>
          </button>
        </>
      ) : (
        children && children
      )}
    </>
  );
};

export default ModalTitle;

const defaultStyle: React.CSSProperties = {
  color: "#aaa",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "1.5rem",
  textShadow: "0 1px 0 #fff",
  padding: 0,
  cursor: "pointer",
};
