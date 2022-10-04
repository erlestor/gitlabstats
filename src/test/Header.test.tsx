import { render, screen } from "@testing-library/react"
import Header from "../components/header/Header"
import { LocalStorageMock } from "./LocalstorageMock"

describe("Header", () => {
  beforeAll(() => {
    global.localStorage = LocalStorageMock()
  })

  it("should be able to authenticate with repo information", async () => {
    let funcCalled = false

    const checkIfLogout = () => {
      funcCalled = true
    }

    render(<Header setShowAuthenticationPage={checkIfLogout} />)
    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("header-log-out")).toBeInTheDocument()
    expect(screen.getByText("GitLab Stats Pro")).toBeInTheDocument()

    // check if function called on logout is actually true
    screen.getByTestId("header-log-out").click()
    expect(funcCalled).toBeTruthy()
  })
})
