import { render, screen } from "@testing-library/react";
import Profile from "./../Profile/Profile";

test("renders Complete Your Profile as a text", () => {
  render(<Profile />);
  const completeyouprofile = screen.getByText("Complete Your Profile");
  expect(completeyouprofile).toBeInTheDocument();
});
