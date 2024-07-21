import { mergeRefs } from "@mash-ui/utils";
import { forwardRef, useRef } from "react";
import Portal from "../portal/portal";
import useOnExit from "./hooks/useOnExit";

export type ModalProps = {
  isOpen: boolean;
  closeOutsideClick?: boolean;
  modalIndex: number;
  onClose: () => void;
  onOpen?: () => void;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      closeOutsideClick = false,
      isOpen,
      modalIndex,
      onClose,
      onOpen,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLElement>();

    useOnExit({ callback: onClose, modalRef });

    if (!isOpen) return null;

    return (
      <Portal modalIndex={modalIndex}>
        {/* Modal background dimmed */}
        {/* 
        <div
          style={dimmedStyle}
          onClick={closeOutsideClick ? onClose : undefined}
        /> */}

        <div
          ref={mergeRefs([modalRef, ref])}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          id={`modal-id-${modalIndex}`}
          style={modalStyle}
          {...props}
        >
          {/* Modal content */}

          {isOpen && (
            <div
              className="modal-content"
              style={{
                backgroundColor: "#fefefe",
                color: "#000",
                margin: "auto",
                border: "1px solid #888",
                width: "100%",
              }}
            >
              <div
                className="modal-header"
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 id="dialog-title">Modal Title</h2>
                <span
                  className="close"
                  data-testid="closeBtn"
                  style={{
                    color: "#aaaaaa",
                    fontSize: "28px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={onClose}
                >
                  &times;
                </span>
              </div>

              {/* Modal body */}
              <div className="modal-body" style={{ padding: "15px" }}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  a, sint cumque tempora laudantium modi fugit maxime quos
                  error. Similique eligendi, magnam adipisci distinctio
                  veritatis facere! Nostrum blanditiis excepturi vitae?
                </p>
              </div>

              {/* Modal footer */}
              <div
                className="modal-footer"
                style={{
                  padding: "15px",
                  borderTop: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button type="button" role="button" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Portal>
    );
  }
);

const dimmedStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 99,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};

const modalStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 999,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "block",
};
