import React, { useEffect, useState } from 'react';

import Dashboard from "./components/Dashboard"
import Projects from "./components/Projects"
import Footer from "./components/Footer"
import Quote from "./components/Quote"

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
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addListener(handleThemeChange);
    localStorage.setItem('theme', theme); // not needed, except maybe to talk to plotly
    document.body.className = theme;
    return () => mediaQuery.removeListener(handleThemeChange);
  }, [theme]);


  // const toggleTheme = () => {
  //   if (theme === 'light') {
  //     setTheme('dark');
  //   } else {
  //     setTheme('light');
  //   }
  // };

  return (
    <div className={`App ${theme}`}>
      {/* TODO what's an attractive way to arrange these? */}
      <div>
        <h1>theme</h1>
        <body>The operating system's theme is: {theme}.</body>
      </div>
      {/* <Dashboard />
      <Projects />
      <p>–</p>
      <Quote />
      <p>–</p>
      <Footer /> */}
    </div>
  );
};

export default App;

// import React, { useEffect, useState } from 'react';

// import Dashboard from "./components/Dashboard"
// import Projects from "./components/Projects"
// import Footer from "./components/Footer"
// import Quote from "./components/Quote"
// import Theme from "./components/Theme"

// import './App.css';

// const components = [Dashboard, Projects, Footer, Quote, Theme];

// const App = () => {
//   return (
//     <div>
//       <>
//         {components.map(Component => (
//           <>
//             <hr />
//             <Component />
//             <hr />
//           </>
//         ))}
//       </>
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useState } from 'react';

// function Theme() {
//   const [theme, setTheme] = useState('light');


//   return (
    // <div>
    //   <h1>theme</h1>
    //   <body>The operating system's theme is: {theme}.</body>
    // </div>
//   );
// }

// export default Theme;
