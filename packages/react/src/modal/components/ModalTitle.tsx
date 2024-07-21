import type React from "react";

export interface IModalTitleProps {
  title: string;
  onClickClose: () => void;
}

const ModalTitle = ({ title, onClickClose }: IModalTitleProps) => {
  return (
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
};
