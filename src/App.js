import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";import MyProfile from "./Pages/MyProfile";



function App() {

  return (
    <div className="flex flex-col justify-between h-screen bg-indigo-900 overflow-auto">
        <Router>
          <Header />         
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/:username" element={<Profile />} />   
            </Routes>
          <ToastContainer className={"mt-16 mr-5"}/>
          <Footer />
        </Router>

    </div>
  );
}

export default App;
