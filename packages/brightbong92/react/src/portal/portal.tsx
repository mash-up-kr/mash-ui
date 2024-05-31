import type React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const Portal = ({ id, className, children }: PortalProps): JSX.Element => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.setAttribute("id", id ?? "root-modal");
    elRef.current.setAttribute("class", className ?? "root-modal");
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
