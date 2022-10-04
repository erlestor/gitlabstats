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
    expect(screen.getByTestId("loginBtn")).toBeInTheDocument();
    // insert token and project id
    fireEvent.change(screen.getByPlaceholderText("ProjectID"), {
      target: { value: testProjectId },
    });
    fireEvent.change(screen.getByPlaceholderText("Token"), {
      target: { value: testToken },
    });
    // mock validate token function
    jest.spyOn(gitlabService, "validateRepoInformation").mockResolvedValue(); 
    // click login button
    userEvent.click(screen.getByTestId("loginBtn"));
    // check if login was successful
    await screen.findByText("GitLab Stats Pro")

    // should get straight to stats page
    render(<App />);
    expect(screen.queryByTestId("loginBtn")).not.toBeInTheDocument();
  });
});
