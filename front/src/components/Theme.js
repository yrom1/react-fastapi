import React, { useEffect, useState } from 'react'

function Theme() {
    const [theme, setTheme] = useState(
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
        <div>
            <body>
                System's theme is: {theme} <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=998903">[🐧]</a>
            </body>
        </div >
    );

}

export default Theme
