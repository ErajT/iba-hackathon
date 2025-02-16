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
import CreateCollab from "./Pages/CreateCollab/CreateCollab";
import ViewCollectionp from "./Pages/CreateCollab/ViewCollectionp";
import RoleAuthorizer from "./components/RoleAuthorizer";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
// import Test from "./Pages/Test";
import VIewPublic from "./Pages/ViewAll/VIewPublic";
import IndividualCollection from "./Pages/ViewOne/IndividualCollection";
import FlashcardPage from "./Pages/FlashCard/FlashcardPage";
import { ChatBox } from "./Pages/Chatbot/Chatbox";

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
        <Toaster />
        
        <Routes>

          {/* <Route path="/login" element={<UserHome/>} />
          <Route path="/" element={<Login />} /> */}

          {/* ROutes without layout */}
          <Route path="/login" element={<Login />} />       
          <Route path="/" element={<Landing />} />


        <Route element={<Layout />}>

        
          <Route path="/home" element={<UserHome/>} />
          <Route path="/create" element={<CreateCollab/>} />
          <Route path="/view-public" element={<VIewPublic />} />
          <Route path="/collection/:id" element={<IndividualCollection />} />
          <Route path="/file/:materialId" element={<ViewCollectionp/>} />
          <Route path="/flashcards/:id" element={<FlashcardPage/>} />
          <Route path="/chat/:id" element={<ChatBox/>} />
        
          <Route element={<RoleAuthorizer allowedRole="user" />}>
          {/* protected routes for user */}


          </Route>




          <Route element={<RoleAuthorizer allowedRole="admin" />}>
          
          <Route path="/home-admin" element={<AdminHome/>} />
          
          <Route path="/home-admin" element={<AdminHome/>} />
          <Route path="/admin/users" element={<UsersCRUD />} />
          {/* protected routes for admin */}
          
          
          </Route>
        
        
        
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