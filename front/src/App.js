import React, { useEffect, useState } from 'react';

import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Projects from "./components/Projects"
import Footer from "./components/Footer"

import './App.css';

const App = () => {
  const [page, setPage] = useState(window.location.pathname);
  const [currentComponent, setCurrentComponent] = useState(null);

  // const [theme, setTheme] = useState('light');
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    setCurrentComponent(null);
  }

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        setCurrentComponent(<Home />);
        break;
      case '/dashboard':
        setCurrentComponent(<Dashboard />);
        break;
      case '/projects':
        setCurrentComponent(<Projects />);
        break;
      default:
        setCurrentComponent(null);
    }
  }, [window.location.pathname]);

  return (
    <div className={`App ${theme}`}>
      <header>
        <h3><a href="/" onClick={e => handleLinkClick(e, '/')}>Home</a></h3>
        <h3><a href="/dashboard" onClick={e => handleLinkClick(e, '/dashboard')}>Dashboard</a></h3>
        <h3><a href="/projects" onClick={e => handleLinkClick(e, '/projects')}>Projects</a></h3>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </header>
      {currentComponent}
      <Footer />
    </div>
  );
};

export default App;
