import React, { useEffect, useState } from 'react';

import Dashboard from "./components/Dashboard"
import Projects from "./components/Projects"
import Footer from "./components/Footer"
import Quote from "./components/Quote"
import Theme from "./components/Theme"
import Hi from "./components/Hi"

import './App.css';

const components = [Hi, Theme, Dashboard, Projects, Footer, Quote];

const App = () => {
  return (
    <div className='App'>
      {/* TODO what's an attractive way to arrange these? */}
      <div>
        <>
          {components.map(Component => (
            <>
              <hr />
              <Component />
              <hr />
            </>
          ))}
        </>
      </div>
    </div>
  );
};

export default App;
