import { expect, test } from "vitest";
import { getByTestId, render, queryByTestId } from "@testing-library/react";
import { Tobe } from "../tobe";

test("toBeInTheDocument test", () => {
  render(<Tobe />);

  expect(
    getByTestId(document.documentElement, "html-element")
  ).toBeInTheDocument();

  expect(
    queryByTestId(document.documentElement, "does-not-exist")
  ).not.toBeInTheDocument();

  expect(
    queryByTestId(document.documentElement, "svg-element")
  ).toBeInTheDocument();
});
