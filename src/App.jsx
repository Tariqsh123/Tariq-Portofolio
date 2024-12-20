import { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import Contact from './Contact';
import Skill from './Skill';
import About from './About';
import Project from './Project';
import './App.css'; 

function App() {
  const [navVisible, setNavVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const sidebarRef = useRef(null); // Create a ref for the sidebar

  const toggleMenu = () => {
    setNavVisible(!navVisible);
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
  };

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/contact', name: 'Contact' },
    { path: '/project', name: 'Project' },
    { path: '/skill', name: 'Skills' },
    { path: '/about', name: 'About' },
  ];

  // Close sidebar if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && navVisible) {
        setNavVisible(false);
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navVisible]);

  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <nav>
        <Link to="/" className="logo"></Link>
        <div id="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <button onClick={toggleTheme} style={{
          background: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          position: 'absolute',
          top: '20px',
          right: '60px',
        }}>
          <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} style={{ color: 'black' }} />
        </button>
      </nav>

      <motion.div
        ref={sidebarRef} // Attach the ref to the sidebar
        className={`sidebar ${navVisible ? 'visible' : ''}`}
        initial={{ width: 0 }}
        animate={{ width: navVisible ? '300px' : '0' }}
        transition={{ duration: 0.5 }}
      >
        <motion.ul>
          {navLinks.map((link, index) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: 20 }} // Start off-screen and invisible
              animate={{ opacity: navVisible ? 1 : 0, y: navVisible ? 0 : 20 }} // Move up and fade in
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link to={link.path} onClick={toggleMenu}>
                {link.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <Routes>
        <Route path="/" element={<Home isDarkTheme={isDarkTheme} />} />
        <Route path="/contact" element={<Contact isDarkTheme={isDarkTheme} />} />
        <Route path="/skill" element={<Skill isDarkTheme={isDarkTheme} />} />
        <Route path="/project" element={<Project isDarkTheme={isDarkTheme} />} />
        <Route path="/about" element={<About isDarkTheme={isDarkTheme} />} />
      </Routes>
    </div>
  );
}

export default App;
