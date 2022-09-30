import React, { useState } from 'react';
import './App.css';
import { FrontPage } from './frontPage';
import StatsPage from './stats-page';
import Header from './header/header'
import { hasRepoInformation, saveRepoInformation, RepoInformation } from './getRepoInformation';

function App() {
  /**
   * Set showFrontPage state based on if the application has repository information
   */
  const [showFrontPage, setShowFrontPage] = useState(!hasRepoInformation());

  /**
   * If the application do have repository information it displays stats page
   */
  if (!showFrontPage) {
    return <>
      <Header setShowFrontPage={setShowFrontPage} />
      <StatsPage />
    </>
  }

  /**
   * If the application do not have repository information it displays frontpage
   */
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
