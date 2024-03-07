import { render, screen } from "@testing-library/react";
import SignIn from "../SignIn";

test("renders Forgot Password as a text", () => {
  render(<SignIn />);
  const forgetpasswordelement = screen.getByText("Forgot Password");
  expect(forgetpasswordelement).toBeInTheDocument();
});
