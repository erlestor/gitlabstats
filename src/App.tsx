import { useState } from "react";
import { AuthenticationPage } from "./authentication/authenticationPage";
import { hasRepoInformation, RepoInformation, saveRepoInformation } from "./authentication/getRepoInformation";
import Header from "./header/header";
import StatsPage from "./stats-page";

function App() {
  const [showFrontPage, setShowFrontPage] = useState(!hasRepoInformation());

  if (!showFrontPage) {
    return (
      <>
        <Header setShowFrontPage={setShowFrontPage} />
        <StatsPage />
      </>
    );
  }

  return (
    <>
      <AuthenticationPage
        callback={(repoInformation: RepoInformation) => {
          saveRepoInformation(repoInformation);
          setShowFrontPage(false);
        }}
      />
    </>
  );
}

export default App;
