import React, { useState } from 'react';
import { FrontPage } from './frontPage';
import StatsPage from './stats-page';
import Header from './header/header'
import { hasRepoInformation, saveRepoInformation, RepoInformation } from './getRepoInformation';

function App() {

  const [showFrontPage, setShowFrontPage] = useState(!hasRepoInformation());

  if (!showFrontPage) {
    return <>
      <Header setShowFrontPage={setShowFrontPage} />
      <StatsPage />
    </>
  }

  return (
    <>
      <FrontPage callback={(repoInformation: RepoInformation) => {
        saveRepoInformation(repoInformation);
        setShowFrontPage(false);
      }} />
    </>
  );
}

export default App;
