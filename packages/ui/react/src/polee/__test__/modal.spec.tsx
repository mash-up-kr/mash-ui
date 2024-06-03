import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "../components";

const noop = () => {
  alert("modal");
};

describe("Modal Component", () => {
  it("should display Modal correctly", async () => {
    render(
      <Modal isOpen onClose={noop}>
        Test-Modal
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should toggle isOpen state and remove modal from DOM", async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(true);
      return (
        <div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            Toggle-Modal-Button
          </button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            Toggle-Modal
          </Modal>
        </div>
      );
    };
    render(<TestComponent />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Toggle-Modal-Button"));

    expect(screen.queryByText("Toggle-Modal")).not.toBeInTheDocument();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Modal ref={ref} isOpen onClose={noop}>
        Modal-Ref-Test
      </Modal>
    );

    expect(ref.current).not.toBeNull();
  });

  it("should be overflow hidden to body with preventBackgroundScroll true", async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(true);
      return (
        <div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            Toggle-Modal-Button
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            preventBackgroundScroll
          >
            Toggle-Modal
          </Modal>
        </div>
      );
    };
    render(<TestComponent />);

    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByText("Toggle-Modal-Button"));

    expect(document.body.style.overflow).toBe("");
  });

  it("should not be overflow hidden to body with preventBackgroundScroll false", async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(true);
      return (
        <div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            Toggle-Modal-Button
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            preventBackgroundScroll={false}
          >
            Toggle-Modal
          </Modal>
        </div>
      );
    };
    render(<TestComponent />);

    expect(document.body.style.overflow).toBe("");
    fireEvent.click(screen.getByText("Toggle-Modal-Button"));

    expect(document.body.style.overflow).toBe("");
  });

  it("should have correct role and aria-* attributes", async () => {
    const ariaLabelledby = "modal-title";
    const ariaDescribedby = "modal-description";

    render(
      <Modal
        isOpen
        onClose={noop}
        ariaLabelledby={ariaLabelledby}
        ariaDescribedby={ariaDescribedby}
      >
        <h1>Modal Title</h1>
        <p>Modal Description</p>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", ariaLabelledby);
    expect(dialog).toHaveAttribute("aria-describedby", ariaDescribedby);
  });

  it("should render modal in the specified mount point", async () => {
    const mountPoint = document.createElement("div");
    document.body.appendChild(mountPoint);

    const TestComponent = () => {
      const [isOpen, setIsOpen] = React.useState(true);
      return (
        <div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            Toggle Modal
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            mountNode={{ current: mountPoint }}
          >
            Toggle-Modal
          </Modal>
        </div>
      );
    };
    render(<TestComponent />);

    expect(mountPoint).toContainElement(screen.getByRole("dialog"));
    document.body.removeChild(mountPoint);
  });

  it("should close the modal on ESC key press when shouldCloseOnEsc is true", async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} shouldCloseOnEsc>
        Test-Modal-ESC
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape", code: "Escape", keyCode: 27 });

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("should not close the modal on ESC key press when shouldCloseOnEsc is false", async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} shouldCloseOnEsc={false}>
        Test-Modal-ESC
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape", code: "Escape", keyCode: 27 });

    expect(onClose).not.toHaveBeenCalledOnce();
  });

  it("should close the modal on overlay click when shouldCloseOnOverlayClick is true", async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} shouldCloseOnDimClick>
        Test-Modal-Overlay-Click
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const overlay = screen.getByRole("dialog").firstChild as HTMLElement;
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it("should not close the modal on overlay click when shouldCloseOnOverlayClick is false", async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} shouldCloseOnDimClick={false}>
        Test-Modal-Overlay-Click
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const overlay = screen.getByRole("dialog").firstChild as HTMLElement;
    fireEvent.click(overlay);

    expect(onClose).not.toHaveBeenCalled();
  });
});
