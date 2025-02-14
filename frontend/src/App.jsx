import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
// import Login from "./components/Login"; 
import UserHome from "./Pages/Home/UserHome";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/LoginAndSignup/Login";
import { Layout } from "./components/Layout";
import { AdminHome } from "./Pages/Home/AdminHome";
import UsersCRUD from "./Pages/UserMgt/UsersCRUD";

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
        <Route element={<Layout />}>

          <Route path="/home-admin" element={<AdminHome/>} />
          <Route path="/admin/users" element={<UsersCRUD />} />
          
          
          <Route path="/home" element={<UserHome/>} />
        </Route>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Landing />} />
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
