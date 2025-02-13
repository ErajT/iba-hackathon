import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Login from "./components/login"; // Ensure correct capitalization
import UserHome from "./Pages/Home/UserHome";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow: auto;
  }
`;

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background-color: #ecf0f1;
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

const AppLayout = () => {
  return (
    <AppContainer className="text-gray-900 dark:text-white">
      <MainContent>
        <Routes>
          <Route path="/login" element={<UserHome/>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppLayout />
      </Router>
    </>
  );
};

export default App;
