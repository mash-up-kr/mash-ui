"use client";

import React, { useState } from "react";
import "./modal.css";

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <!-- Trigger/Open The Modal --> */}
      <button id="myBtn">Open Modal</button>

      {/* <!-- The Modal --> */}

      <div id="myModal" className="modal">
        {/* <!-- Modal content --> */}
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </>
  );
};
