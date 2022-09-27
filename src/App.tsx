import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FrontPage } from './frontPage';
import StatsPage from './stats-page';
import Header from './header/header'

function App() {

  const [showFrontPage, setShowFrontPage] = useState(true);

  if (!showFrontPage) {
    return <>
      <Header setShowFrontPage={setShowFrontPage} />
      <StatsPage />
    </>
  }

  return (
    <>
      <FrontPage callback={(token, password) => {
        setShowFrontPage(false);
      }} />
    </>
  );
}

export default App;
