import { useState } from "react";
import { AuthenticationPage } from "./authentication/authenticationPage";
import { hasRepoInformation, RepoInformation, saveRepoInformation } from "./authentication/getRepoInformation";
import Header from "./header/header";
import StatsPage from "./stats-page";

function App() {
  const [showAuthenticationPage, setShowAuthenticationPage] = useState(!hasRepoInformation());

  if (!showAuthenticationPage) {
    return (
      <>
        <Header setShowAuthenticationPage={setShowAuthenticationPage} />
        <StatsPage />
      </>
    );
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
  );
}

export default App;
