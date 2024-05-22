import "@testing-library/jest-dom";

import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { HiddenMessage } from "../hidden-message";

test("show the children when the checkbox is checked", () => {
  const testMessage = "Test Message";
  render(<HiddenMessage>{testMessage}</HiddenMessage>);

  /**
   * @expect
   * 테스트를 작성할 때 값이 특정 조건을 충족하는지 확인& 검증 할수있는 다양한 matcher에 대한 액세스를 제공
   *
   * @toBeNull
   * .toBeNull()은 .toBe(null)과 동일하지만 오류 메시지가 조금 더 좋습니다. 따라서 무언가가 null인지 확인하려면 .toBeNull()을 사용하세요.
   *
   * @ByText
   * 엘리먼트가 가지고 있는 텍스트 값으로 DOM을 선택한다. 정규식을 넣을수 있다.
   */
  expect(screen.queryByText(testMessage)).toBeNull();

  /**
   * @fireEvent
   * 이 함수는 이벤트를 발생시킨다.
   *
   * @ByLabelText
   * label이 있는 input의 label내용을 선택한다.
   */
  fireEvent.click(screen.getByLabelText(/message/i));

  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
