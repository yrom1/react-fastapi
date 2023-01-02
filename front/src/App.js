import React, { useEffect, useState } from 'react';

import Dashboard from "./components/Dashboard"
import Projects from "./components/Projects"
import Footer from "./components/Footer"

import './App.css';

const App = () => {
  // const [theme, setTheme] = useState('light');
  const [theme, setTheme] = useState(
    // localStorage.getItem('theme') || 'light'
    // TODO do set the theme based on:
    //      I don't think this updatess when you change the thing?
    //      maybe need to useEffect this matchMedia?
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
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

  return (
    <div className={`App ${theme}`}>
      {/* TODO what's an attractive way to arrange these? */}
      <Dashboard />
      <Projects />
      <Footer />
    </div>
  );
};

export default App;
