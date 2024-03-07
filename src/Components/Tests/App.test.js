import { render, screen } from "@testing-library/react";
import App from "../../App";

test("renders Welcome to My App as a text", () => {
  render(<App />);
  const welcometomyappelement = screen.getByText("Welcome to My App");
  expect(welcometomyappelement).toBeInTheDocument();
});
