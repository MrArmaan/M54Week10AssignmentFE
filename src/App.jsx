import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/landingPage";
import SocialMediaPage from "./components/SocialMedaPage";
import { Navigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(far);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div
        style={{
          backgroundColor: "grey",
          color: "black",
          padding: "20px",
          textAlign: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
            <li style={{ display: "inline" }}>
              {!loggedIn && (
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    marginRight: "10px",
                  }}
                >
                  Login
                </Link>
              )}
              {!loggedIn && (
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Signup
                </Link>
              )}
              {loggedIn && (
                <Link
                  to="/social-media"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Social Media
                </Link>
              )}
            </li>
          </ul>
          {loggedIn && (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "orange",
                color: "black",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                ":hover": {
                  backgroundColor: "darkorange",
                },
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/social-media"
            element={loggedIn ? <SocialMediaPage /> : <Navigate to="/login" />}
          />
          {!loggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
