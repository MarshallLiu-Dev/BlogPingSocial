/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Dashboard from './pages/Dashboard'
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Profile from './pages/Profile';
import About from './pages/About';



function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setIsAuth(true);
      setUserName(auth.currentUser.displayName);
      setUserPhotoURL(auth.currentUser.photoURL);
    } else {
      setIsAuth(false);
      setUserName("");
      setUserPhotoURL("");
    }
  }, [auth.currentUser]);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      setUserName("");
      setUserPhotoURL("");
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav className="navigation">
        <a href="/" className="brand-name">
          <span className="letterp">P</span>
          <span className="letteri">i</span>
          <span className="lettern">n</span>
          <span className="letterg">g</span>
          <span className="letter">.</span>
          <span className="letterp">S</span>
          <span className="letteri">o</span>
          <span className="lettern">c</span>
          <span className="letterg">i</span>
          <span className="letterp">a</span>
          <span className="letteri">l</span>
          

        </a>

        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {isAuth && <Link to="/createpost">Postar</Link>}
            </li>
            <li>
              {isAuth && <Link to="/dashboard">Dashboard</Link>}
            </li>
            <li>
              {isAuth && <Link to="/perfil">Perfil</Link>}
            </li>
            <li>
              {!isAuth && <Link to="/about">Sobre</Link>}
            </li>
            <li>
              {isAuth && <Link to="/about">Sobre</Link>}
            </li>
            <li>
              {!isAuth ? (
                <Link to="/login">Login</Link>
              ) : (
                <>
                    <button class="button" onClick={signUserOut}>
                      <svg class="bell" viewBox="0 0 448 512"></svg>
                      Sair
                      <div class="arrow">›</div>
                    </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
