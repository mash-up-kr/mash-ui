import type React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  id?: string;
}

const Portal = ({ id, children }: PortalProps): JSX.Element => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.setAttribute("id", id ?? "root-modal");
    elRef.current.setAttribute("class", id ?? "root-modal");
  }

  useEffect(() => {
    if (elRef.current) document.body.appendChild(elRef.current);
    return () => {
      if (elRef.current) document.body.removeChild(elRef.current);
    };
  }, []);

  return createPortal(children, elRef.current);
};

export default Portal;
