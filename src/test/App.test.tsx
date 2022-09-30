import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { LocalStorageMock } from "./LocalstorageMock";

describe("App", () => {
  beforeAll(() => {
    global.localStorage = LocalStorageMock();
  });

  const testToken = "testToken";
  const testProjectId = "414312";

  it("renders App component", () => {
    render(<App />);
    expect(screen.getByText("Logg inn")).toBeInTheDocument();
    // insert token and project id
    fireEvent.change(screen.getByPlaceholderText("ProjectID"), {
      target: { value: testProjectId },
    });
    fireEvent.change(screen.getByPlaceholderText("Token"), {
      target: { value: testToken },
    });
    // click login button
    userEvent.click(screen.getByTestId("loginBtn"));
    // check if login was successful
    expect(screen.queryByText("Logg inn")).not.toBeInTheDocument();

    // should get straight to stats page
    render(<App />);
    expect(screen.queryByText("Logg inn")).not.toBeInTheDocument();
  });
});
