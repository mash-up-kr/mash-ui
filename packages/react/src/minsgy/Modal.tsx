import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { CSSProperties, ReactNode } from "react";

export interface ModalRootProps {
  children: ReactNode;
  isOpen: boolean;
}

const Root = ({ children, isOpen }: ModalRootProps) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && isOpen
    ? createPortal(
        <div
          style={{
            inset: 0,
            position: "fixed",
            zIndex: 1000,
          }}
          id="modalPortal"
          ref={modalRef}
        >
          {children}
        </div>,
        document.body,
      )
    : null;
};

Root.displayName = "Modal.Root";

const Overlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        minHeight: "150vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    />
  );
};

Overlay.displayName = "Modal.Overlay";

interface ContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Container = ({ children, style }: ContainerProps) => {
  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "white",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

Container.displayName = "Modal.Container";

interface HeaderProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Header = ({ children, style }: HeaderProps) => {
  return <div style={style}>{children}</div>;
};

Header.displayName = "Modal.Header";

interface BodyProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Body = ({ children, style }: BodyProps) => {
  return <div style={style}>{children}</div>;
};

Body.displayName = "Modal.Body";

interface FooterProps {
  children: ReactNode;
  className?: string;
}

const Footer = ({ children, className }: FooterProps) => {
  return <div className={className}>{children}</div>;
};

export const Modal = {
  Body,
  Container,
  Footer,
  Header,
  Overlay,
  Root,
};
