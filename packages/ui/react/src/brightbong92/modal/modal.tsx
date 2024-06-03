"use client";

import { mergeRefs } from "@mash-ui/utils";
import { forwardRef, useRef } from "react";
import Portal from "../portal/portal";
import useOnExit from "./hooks/useOnExit";
import "./modal.css";

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

    if (!isOpen) return;

    return (
      <Portal id="sunflower">
        {/* Modal background dimmed */}
        <div
          data-testid="dimmed"
          className={"dimmed show"}
          onClick={closeOutsideClick ? onClose : undefined}
        />

        <div
          ref={mergeRefs([modalRef, ref])}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          id="myModal"
          className={isOpen ? "show modal" : "no-show"}
          {...props}
        >
          {/* Modal content */}
          {isOpen && (
            <div className="modal-content">
              <div className="modal-header">
                <h2 id="dialog-title">Modal Title</h2>
                <span
                  className="close"
                  data-testid="closeBtn"
                  onClick={onClose}
                >
                  &times;
                </span>
              </div>

              {/* Modal body */}
              <div className="modal-body">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  a, sint cumque tempora laudantium modi fugit maxime quos
                  error. Similique eligendi, magnam adipisci distinctio
                  veritatis facere! Nostrum blanditiis excepturi vitae?
                </p>
              </div>

              {/* Modal footer */}
              <div className="modal-footer">
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
