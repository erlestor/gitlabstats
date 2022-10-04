import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { LocalStorageMock } from "./LocalstorageMock";
import * as gitlabService from "../services/gitlabService";

describe("App", () => {
  beforeAll(() => {
    global.localStorage = LocalStorageMock();
  });

  const testToken = "testToken";
  const testProjectId = "414312";

  it("renders App component", async () => {
    render(<App />);
    expect(screen.getByText("OK")).toBeInTheDocument();
    // insert token and project id
    fireEvent.change(screen.getByPlaceholderText("ProjectID"), {
      target: { value: testProjectId },
    });
    fireEvent.change(screen.getByPlaceholderText("Token"), {
      target: { value: testToken },
    });
    // mock validate token function
    jest.spyOn(gitlabService, "validateRepoInformation").mockResolvedValue(true)  
    // click login button
    userEvent.click(screen.getByTestId("loginBtn"));
    // check if login was successful
    await waitFor(() => expect(screen.queryByText("OK")).not.toBeInTheDocument());

    // should get straight to stats page
    render(<App />);
    expect(screen.queryByText("OK")).not.toBeInTheDocument();
  });
});
