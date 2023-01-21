import React, { useEffect, useState } from 'react';

import DualComponent from "./components/DualComponent"
import Dashboard from "./components/Dashboard"
import Projects from "./components/Projects"
import Footer from "./components/Footer"
import Quote from "./components/Quote"
import Theme from "./components/Theme"
import Hi from "./components/Hi"
import FunBar from "./components/FunBar"
import Run from "./components/Run"
import './App.css';

const components = [Hi, Run, Footer, FunBar];

const App = () => {
  return (
    <div className='App' style={{ height: '100%' }}>
      <div>
        {
          components.map((component, index) => (
            <>
              {component()}
              {index !== components.length - 1 && <hr />}
            </>
          ))
        }
      </div>
    </div>
  );
};

export default App;
