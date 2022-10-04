import { render, screen } from "@testing-library/react"
import Header from "../components/header/Header"
import { LocalStorageMock } from "./LocalstorageMock"

describe("Header", () => {
  beforeAll(() => {
    global.localStorage = LocalStorageMock()
  })

  it("should be able to authenticate with repo information", async () => {
    const logOutFunc = jest.fn();

    render(<Header setShowAuthenticationPage={logOutFunc} />)
    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("header-log-out")).toBeInTheDocument()
    expect(screen.getByText("GitLab Stats Pro")).toBeInTheDocument()

    // check if function called on logout is actually true
    expect(logOutFunc).toBeCalledTimes(0)
    screen.getByTestId("header-log-out").click()
    expect(logOutFunc).toBeCalledTimes(1)
  })
})
