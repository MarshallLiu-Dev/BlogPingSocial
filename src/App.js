/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

import Profile from './components/Profile';
import About from './components/About';
import PostDetails from './pages/PostDetails';
import AdminPage from './pages/AdminPage';
import CommentDashboard from './components/CommentDashboard';
import Home from './pages/Home';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import Dashboard from './components/Dashboard'
import ExplorePage from './components/ExplorePage';

import logoMible from './img/logo.jpg';
import logo from './img/IMG_4473.JPG'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";



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
        
        {/* <a href="/" className="brand-name">
          <span className="letterP">P</span>
          <span className="letteri">i</span>
          <span className="letterN">n</span>
          <span className="letterG">g</span>
          <span className="letter">{" "}</span>
          <span className="letterS">S</span>
          <span className="letterO">o</span>
          <span className="letterC">c</span>
          <span className="letterI">i</span>
          <span className="letterA">a</span>
          <span className="letterL">L</span>
        </a> */}


        <a href="/" className="brand-name-mobile">
          <img src={logo} alt="logo" />
        </a>

        <a href="/" className="brand-name">
          <img src={logo} alt="logo" />
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
            {/* <li>
              {isAuth && <Link to="/explorar">Explorar</Link>}
            </li> */}
            <li>
              {isAuth && <Link to="/editpage">Dashboard</Link>}
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
                <></>
              )}
            </li>
            <li>
              {isAuth && <Link to="/" onClick={signUserOut}>Sair</Link>}
              
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/explorar" element={<ExplorePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editpage" element={<AdminPage />} />
        <Route path="/editcomments" element={<CommentDashboard />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


