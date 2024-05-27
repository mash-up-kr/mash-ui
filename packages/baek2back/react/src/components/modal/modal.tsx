import { forwardRef, useRef, type ComponentPropsWithoutRef } from "react";
import { mergeRefs } from "../../utils/merge-refs";
import { useClickOutside } from "../../utils/use-click-outside";
import { useControllableState } from "../../utils/use-controllable-state";
import { useKeyStroke } from "../../utils/use-key-stroke";
import { useLockBodyScroll } from "../../utils/use-lock-body-scroll";
import { Portal } from "../portal";

const Backdrop = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: Number.MAX_SAFE_INTEGER - 1,
        ...props.style,
      }}
    />
  );
};

export interface ModalProps {
  isOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useControllableState({
    value: props.isOpen,
    onChange: props.onOpenChange,
    defaultValue: false,
  });

  useLockBodyScroll({ locked: isOpen });

  useClickOutside(
    modalRef,
    () => {
      setIsOpen(false);
    },
    { event: "mousedown" }
  );

  useKeyStroke(["Escape"], (event) => {
    setIsOpen(false);
  });

  if (!isOpen) return null;

  return (
    <Portal>
      <Backdrop />
      <div
        role="dialog"
        ref={mergeRefs([ref, modalRef])}
        aria-modal="true"
        aria-labelledby="header"
        aria-describedby="body"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: Number.MAX_SAFE_INTEGER,
        }}
      >
        <span id="header">Modal header</span>
        <span id="body">Modal body</span>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Close
        </button>
      </div>
    </Portal>
  );
});
