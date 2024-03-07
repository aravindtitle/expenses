import WelcomePage from "../Welcome";
import { render, screen } from "@testing-library/react";

describe("Welcomepage Component", () => {
  test('render "Welcome back",  as a text', () => {
    render(<WelcomePage />);
    const welcomeOutputElement = screen.getByText("Welcome back", {
      exact: false,
    });
    expect(welcomeOutputElement).toBeInTheDocument();
  });
  test('render "Welcome to Expense Tracker",  as a text', () => {
    render(<WelcomePage />);
    const welcomeexpenseElement = screen.getByText(
      "Welcome to Expense Tracker",
      {
        exact: false,
      }
    );
    expect(welcomeexpenseElement).toBeInTheDocument();
  });
  test('render "Logoutr",  as a text', () => {
    render(<WelcomePage />);
    const logoutElement = screen.getByText("Logout", {
      exact: false,
    });
    expect(logoutElement).toBeInTheDocument();
  });
});
