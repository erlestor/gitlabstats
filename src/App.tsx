import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./header/header";
import StatsPage from "./stats-page";

function App() {
  return (
    <>
      <Header />
      <StatsPage />
    </>
  );
}

export default App;
