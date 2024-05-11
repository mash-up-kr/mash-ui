"use client";

import React, { useState } from "react";
import "./modal.css";

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Trigger/Open The Modal */}
      <button id="myBtn" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {/* The Modal */}

      {/* Modal background */}
      <div className={isOpen ? "show background" : "no-show"} />

      <div id="myModal" className={isOpen ? "show modal" : "no-show"}>
        {/* Modal content */}
        <div className="modal-content">
          <span className="close" onClick={() => setIsOpen(false)}>
            &times;
          </span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </>
  );
};
