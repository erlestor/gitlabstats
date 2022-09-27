import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { FrontPage } from './frontPage';
import StatsPage from './stats-page';

function App() {

  // TODO: set to save value from localStorage
  const [showFrontPage, setShowFrontPage] = useState(true);

  if (!showFrontPage) {
    return <StatsPage/>
  }

  return (
    <FrontPage callback={(token, password) => {
      setShowFrontPage(false);
    }}/>
  );
}

export default App;
