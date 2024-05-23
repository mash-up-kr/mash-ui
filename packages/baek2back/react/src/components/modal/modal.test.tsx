import { describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "..";
import React from "react";

describe("Modal", () => {
  it("should render correctly", () => {
    const view = render(<Modal isOpen />);
    expect(() => view.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Modal ref={ref} isOpen />);
    expect(ref.current).not.toBeNull();
  });

  it("should have the proper 'aria' attributes", async () => {
    render(<Modal isOpen />);
    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("role", "dialog");
    const modalHeader = screen.getByText("Modal header");
    expect(modal).toHaveAttribute("aria-labelledby", modalHeader.id);
    const modalBody = screen.getByText("Modal body");
    expect(modal).toHaveAttribute("aria-describedby", modalBody.id);
  });

  it("should fire 'onOpenChange' callback when close button is clicked", async () => {
    const onOpenChange = vi.fn();
    render(<Modal isOpen onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledOnce();
  });

  it("prevent body scroll when 'isOpen' is true", () => {
    const view = render(<Modal isOpen />);
    expect(view.baseElement).toHaveStyle("overflow: hidden;");
    view.rerender(<Modal isOpen={false} />);
    expect(view.baseElement).toHaveStyle("overflow: ;");
  });

  it("should close the modal when pressing the escape key", () => {
    const onOpenChange = vi.fn();
    render(<Modal isOpen onOpenChange={onOpenChange} />);
    const modal = screen.getByRole("dialog");
    fireEvent.keyDown(modal, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledOnce();
  });

  it("should close the modal when click backdrops of modal", () => {
    const onOpenChange = vi.fn();
    const view = render(<Modal isOpen onOpenChange={onOpenChange} />);
    fireEvent.mouseDown(view.baseElement);
    expect(onOpenChange).toHaveBeenCalledOnce();
  });

  // it("can be compatible with controlled and uncontrolled mode", () => {
  //   //   // TODO: controlled, uncontrolled 모두 지원하는 지 테스트
  // });

  // it("can be controlled with declarative and imperative way", () => {
  //   //   // TODO: 선언적, 명령적 방식 모두 사용 가능한지 테스트
  // });
});
