import { render, screen } from "@testing-library/react";
import HiddenMessage from "../hidden-message";

test("show the children when the checkbox is checked", () => {
  const testMessage = "Test Message";
  render(<HiddenMessage>{testMessage}</HiddenMessage>);

  expect(screen.queryByText(testMessage)).toBeNull();
});
