import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Modal } from "../modal/modal";

test("모달을 렌더링 하는지", () => {
  const { getByTestId } = render(<Modal />);
  const openButton = getByTestId(/myBtn/i);
  expect(openButton).toBeInTheDocument();
});

test("모달을 잘 열고 닫는지", () => {
  const { getByTestId, queryByText } = render(<Modal />);
  const openButton = getByTestId(/myBtn/i);

  /** 처음에 modal-content가 렌더링 안되었는지 체크 */
  expect(queryByText(/Some text in the Modal../i)).not.toBeInTheDocument();
  fireEvent.click(openButton);

  /** 모달 open버튼 클릭 후 modal-content가 렌더링 되었는지 체크 */
  expect(queryByText(/Some text in the Modal../i)).toBeInTheDocument();

  fireEvent.click(getByTestId(/closeBtn/i));

  /** 모달 close버튼 클릭 후 modal-content가 렌더링 안되었는지 체크 */
  expect(queryByText(/Some text in the Modal../i)).not.toBeInTheDocument();
});
