
import React from "react";
import { render, screen } from "@testing-library/react";
import ValidationForm from "./ValidationForm";

test("renders learn react link", () => {
  render(<ValidationForm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
