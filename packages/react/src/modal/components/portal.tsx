import type React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

const Portal = ({ children }: PortalProps): JSX.Element => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
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
