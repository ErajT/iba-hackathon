import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
// import Login from "./components/Login"; 
import UserHome from "./Pages/Home/UserHome";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/LoginAndSignup/Login";
import RoleAuthorizer from "./components/RoleAuthorizer";

const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   html, body {
//     height: 100%;
//     overflow: auto;
//   }
// `;

const AppContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   width: 100vw;
//   background-color: #ecf0f1;
// `;

const MainContent = styled.div`
  // flex-grow: 1;
`;

const AppLayout = () => {
  return (
    <AppContainer className="text-gray-900 dark:text-white">
      <MainContent>
        <Routes>
          <Route path="/" element={<UserHome/>} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login1" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          {/* Protected Routes for trainee */}
          <Route element={<RoleAuthorizer allowedRole="user" />}>
          </Route>
          <Route element={<RoleAuthorizer allowedRole="admin" />}>
          </Route>
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
