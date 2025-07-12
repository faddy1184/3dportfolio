import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Element } from "react-scroll";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, Footer, StarsCanvas } from "./components";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );
  const [loginClicked, setLoginClicked] = useState(false);

  useEffect(() => {
    localStorage.setItem("auth", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  return (
    <Router>
      <MainContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        loginClicked={loginClicked}
        setLoginClicked={setLoginClicked}
      />
    </Router>
  );
};

const MainContent = ({ isAuthenticated, setIsAuthenticated, loginClicked, setLoginClicked }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  // Reset `loginClicked` when user navigates back to "/"
  useEffect(() => {
    if (location.pathname === "/") {
      setLoginClicked(false);
    }
  }, [location.pathname]);

  return (
    <div className="app">
      {/* Navbar always visible */}
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setLoginClicked={setLoginClicked} // Pass function to track login click
      />

      {/* Show Hero page initially, but hide if login is clicked */}
      {!isAuthPage && (
        <Element name="hero" id="hero">
          <Hero />
        </Element>
      )}

      {/* Show Main Sections only if authenticated */}
      {!isAuthPage && isAuthenticated && (
        <>
          <Element name="about" id="about"><About /></Element>
          <Element name="experience" id="experience"><Experience /></Element>
          <Element name="works" id="works"><Works /></Element>
          <Element name="tech" id="tech"><Tech /></Element>
          <Element name="feedbacks" id="feedbacks"><Feedbacks /></Element>
          <Element name="contact" id="contact"><Contact /></Element>
        </>
      )}

      {/* Always Visible */}
      {!isAuthPage && <StarsCanvas />}
      {!isAuthPage && <Footer />}

      {/* Authentication Routes */}
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
