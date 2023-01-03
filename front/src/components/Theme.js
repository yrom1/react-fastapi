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
                <h1>
                    theme
                </h1>
                The operating system's theme is: {theme}
            </body>
        </div>
    );

}

export default Theme
