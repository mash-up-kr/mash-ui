"use client";
import { mergeRefs } from "@mash-ui/utils";
import { forwardRef, useRef } from "react";
import Portal from "../portal/portal";
import useOnExit from "./hooks/useOnExit";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  closeOutsideClick?: boolean;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, onOpen, closeOutsideClick = false, ...props }, ref) => {
    const modalRef = useRef<HTMLDivElement>();

    useOnExit({ callback: onClose });

    if (!isOpen) return null; // Return null when modal is not open

    // Styles for modal background and modal itself
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
      display: "block", // Ensure modal is displayed
    };

    return (
      <Portal id="sunflower">
        {/* Modal background dimmed */}
        <div
          data-testid="dimmed"
          className={"dimmed show"}
          style={dimmedStyle}
          onClick={closeOutsideClick ? onClose : undefined}
        />

        <div
          ref={mergeRefs([modalRef, ref])}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          id="myModal"
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
                <button role="button" onClick={onClose}>
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
