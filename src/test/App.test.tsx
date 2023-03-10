import { findByText, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as gitlabService from "../services/gitlabService";
import { LocalStorageMock } from "./LocalstorageMock";


describe("App", () => {
  beforeAll(() => {
    global.localStorage = LocalStorageMock();
  });
  const testToken = "testToken";
  const testProjectId = "414312";

  it("should be able to authenticate with repo information", async () => {
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
    await waitFor(() => expect(screen.queryByTestId("loginBtn")).not.toBeInTheDocument());

    // should get straight to stats page
    render(<App />);
    expect(screen.queryByTestId("loginBtn")).not.toBeInTheDocument();
  });
});
