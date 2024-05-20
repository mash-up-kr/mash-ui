import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "..";
import React from "react";

describe("Modal", () => {
  it("should render correctly", () => {
    const wrapper = render(<Modal isOpen />);

    expect(() => wrapper.unmount()).not.toThrow();
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
    // TODO: 모달이 열린 상태일 때 body scroll을 제대로 제한하는 지 테스트
  })

  it("focus trapped when 'isOpen' is true", () => {
    // TODO: 모달이 열린 상태일 때 모달 내부에 focus가 잘 가둬지는 지 테스트
  })

  it("can be compatible with controlled and uncontrolled mode", () => {
    // TODO: controlled, uncontrolled 모두 지원하는 지 테스트
  })

  it("can be controlled with declarative and imperative way", () => {
    // TODO: 선언적, 명령적 방식 모두 사용 가능한지 테스트
  })

  it("should close the modal when pressing the escape key", () => {
    // TODO: ESC 키를 입력했을 때 모달이 정상적으로 닫히는 지 테스트
  })

  it("should close the modal when click backdrops of modal", () => {
    // TODO: 모달 외부 영역을 클릭 했을 때 정상적으로 닫히는 지 테스트
  })

  it("has exit animation before unmount", () => {
    // TODO: exit animation이 수행된 이후에 모달이 unmount되는 지 테스트
  })
});
