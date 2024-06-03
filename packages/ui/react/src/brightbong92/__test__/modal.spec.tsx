import { fireEvent, render } from "@testing-library/react";
import { useRef, useState } from "react";
import { expect, test } from "vitest";
import { Modal } from "../modal/modal";
import Portal from "../portal/portal";

const queryByTextRegex =
  /Lorem ipsum dolor sit amet consectetur adipisicing elit./i;
const openModalBtnIdRegex = /openModalBtn/i;

const TestComponent = ({ closeOutsideClick = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button data-testid="openModalBtn" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        closeOutsideClick={closeOutsideClick}
      />
    </>
  );
};

test("모달을 렌더링 하는지", () => {
  const { getByTestId } = render(<TestComponent />);
  const openButton = getByTestId(openModalBtnIdRegex);
  expect(openButton).toBeInTheDocument();
});

test("모달을 잘 열고 닫는지", () => {
  const { getByTestId, queryByText } = render(<TestComponent />);
  const openButton = getByTestId(openModalBtnIdRegex);

  /** 처음에 modal-content가 렌더링 안되었는지 체크 */
  expect(queryByText(queryByTextRegex)).not.toBeInTheDocument();
  fireEvent.click(openButton);

  /** 모달 open버튼 클릭 후 modal-content가 렌더링 되었는지 체크 */
  /** isOpen 상태일 때 모달이 제대로 노출되는지 */
  expect(queryByText(queryByTextRegex)).toBeInTheDocument();

  fireEvent.click(getByTestId(/closeBtn/i));

  /** 모달 close버튼 클릭 후 modal-content가 렌더링 안되었는지 체크 */
  /** !isOpen 상태일 때 모달이 DOM에서 잘 제거되었는지 */
  expect(queryByText(queryByTextRegex)).not.toBeInTheDocument();
});

test("role, aria-* 관련 속성이 제대로 부여되어 있는지", () => {
  const { getByTestId, getByRole } = render(<TestComponent />);
  const openButton = getByTestId(openModalBtnIdRegex);
  fireEvent.click(openButton);

  const dialog = getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
  expect(dialog).toHaveAttribute("aria-labelledby", "dialog-title");
});

test("forwardRef가 제대로 전달되는지", () => {
  const TestComponentWithRef = () => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
      <>
        <button data-testid="openModalBtn" onClick={handleOpen}>
          Open Modal
        </button>
        <Modal ref={modalRef} isOpen={isOpen} onClose={handleClose} />
        <button
          onClick={() => {
            if (modalRef.current) {
              modalRef.current.style.backgroundColor = "rgb(255, 0, 0)";
            }
          }}
          data-testid="changeColorBtn"
        >
          Change Background Color
        </button>
      </>
    );
  };

  const { getByTestId } = render(<TestComponentWithRef />);
  const openButton = getByTestId(openModalBtnIdRegex);
  fireEvent.click(openButton);

  const changeColorButton = getByTestId(/changeColorBtn/i);
  fireEvent.click(changeColorButton);

  const modal = document.getElementById("myModal");
  expect(modal).toHaveStyle("background-color: rgb(255, 0, 0)");
});

test("ESC 키를 눌렀을 때 모달이 닫히는지", () => {
  const { getByTestId, queryByText } = render(<TestComponent />);
  const openButton = getByTestId(openModalBtnIdRegex);

  fireEvent.click(openButton);
  expect(queryByText(queryByTextRegex)).toBeInTheDocument();

  fireEvent.keyDown(document, { key: "Escape" });
  expect(queryByText(queryByTextRegex)).not.toBeInTheDocument();
});

test("dimmed 배경을 클릭하면 모달이 닫히는지 (closeOutsideClick=true)", () => {
  const { getByTestId, queryByText, container } = render(
    <TestComponent closeOutsideClick={true} />
  );
  const openButton = getByTestId(openModalBtnIdRegex);
  fireEvent.click(openButton);
  expect(queryByText(queryByTextRegex)).toBeInTheDocument();

  const dimmed = getByTestId(/dimmed/i);
  if (dimmed) {
    fireEvent.click(dimmed);
  }
  expect(queryByText(queryByTextRegex)).not.toBeInTheDocument();
});

test("dimmed 배경을 클릭해도 모달이 닫히지 않는지 (closeOutsideClick=false)", () => {
  const { getByTestId, queryByText, container } = render(
    <TestComponent closeOutsideClick={false} />
  );
  const openButton = getByTestId(openModalBtnIdRegex);

  fireEvent.click(openButton);
  expect(queryByText(queryByTextRegex)).toBeInTheDocument();

  const dimmedBackground = container.querySelector(".dimmed");
  if (dimmedBackground) fireEvent.click(dimmedBackground);

  expect(queryByText(queryByTextRegex)).toBeInTheDocument();
});

test("포탈에 id와 children이 정상적으로 렌더링되는지", () => {
  const { getByTestId, queryByText } = render(
    <Portal id="test-portal">
      <div data-testid="portalChild">Portal Child</div>
    </Portal>
  );

  const portalChild = getByTestId("portalChild");
  expect(portalChild).toBeInTheDocument();
  expect(queryByText("Portal Child")).toBeInTheDocument();

  // Check if the portal div has the correct id
  const portalElement = document.getElementById("test-portal");
  expect(portalElement).toBeInTheDocument();
});
