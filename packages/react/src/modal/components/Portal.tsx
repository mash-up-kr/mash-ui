import type React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  modalIndex?: number;
}

const Portal = ({ children, modalIndex }: PortalProps): JSX.Element => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    // elRef.current.setAttribute("id", `root-modal-${modalIndex}`);
    // elRef.current.setAttribute("class", `root-modal-${modalIndex}`);
  }

  useEffect(() => {
    document.body.appendChild(elRef.current || document.createElement("div"));
    return () => {
      document.body.removeChild(elRef.current || document.createElement("div"));
    };
  }, []);

  return createPortal(children, elRef.current);
};

export default Portal;
