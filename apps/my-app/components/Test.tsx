"use client";

import Modal from "@brightbong92/react-ui/src/modal";
import { useState } from "react";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        role="button"
        id="myBtn"
        data-testid="myBtn"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOutsideClick
      />
    </>
  );
};

export default Test;
