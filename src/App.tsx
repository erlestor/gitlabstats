import { useState } from "react";
import { AuthenticationPage } from "./components/authentication/AuthenticationPage";
import {
  hasRepoInformation,
  RepoInformation,
  saveRepoInformation,
} from "./services/getRepoInformation";
import Header from "./components/header/Header";
import StatsPage from "./components/stats-page";

function App() {
  const [showAuthenticationPage, setShowAuthenticationPage] = useState(
    !hasRepoInformation()
  );

  if (!showAuthenticationPage) {
    /**
     * If the application do have repository information it displays stats page
     */
    return (
      <>
        <Header setShowAuthenticationPage={setShowAuthenticationPage} />
        <StatsPage />
      </>
    );
  }

  /**
   * If the application do not have repository information it displays frontpage
   */
  return (
    <>
      <AuthenticationPage
        callback={(repoInformation: RepoInformation) => {
          saveRepoInformation(repoInformation);
          setShowAuthenticationPage(false);
        }}
      />
    </>
  );
}

export default App;
