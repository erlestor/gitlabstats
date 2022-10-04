import { useState } from "react"
import { AuthenticationPage } from "./components/authentication/AuthenticationPage"
import {
  hasRepoInformation,
  RepoInformation,
  saveRepoInformation,
} from "./services/getRepoInformation"
import Header from "./components/header/Header"
import StatsPage from "./components/stats-page"

function App() {
  const [showFrontPage, setShowFrontPage] = useState(!hasRepoInformation())

  if (!showFrontPage) {
    return (
      <>
        <Header setShowFrontPage={setShowFrontPage} />
        <StatsPage />
      </>
    )
  }

  return (
    <>
      <AuthenticationPage
        callback={(repoInformation: RepoInformation) => {
          saveRepoInformation(repoInformation)
          setShowFrontPage(false)
        }}
      />
    </>
  )
}

export default App
