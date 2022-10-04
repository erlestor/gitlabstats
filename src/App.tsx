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
  const [showAuthenticationPage, setShowAuthenticationPage] = useState(!hasRepoInformation());

  if (!showAuthenticationPage) {
    return (
      <>
        <Header setShowAuthenticationPage={setShowAuthenticationPage} />
        <StatsPage />
      </>
    )
  }

  return (
    <>
      <AuthenticationPage
        callback={(repoInformation: RepoInformation) => {
          saveRepoInformation(repoInformation);
          setShowAuthenticationPage(false);
        }}
      /> 
    </>
  )
}

export default App
