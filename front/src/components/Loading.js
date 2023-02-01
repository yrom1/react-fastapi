import React, { useState, useEffect } from 'react';
import './Loading.css'

const Loading = () => {
    // State to keep track of the current loading character
    const [currentChar, setCurrentChar] = useState(0);

    // Array of loading characters to rotate through
    const loadingChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

    // Use effect to update the current character every 100ms
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentChar((currentChar + 1) % loadingChars.length);
        }, 100);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, [currentChar]);

    return (
        <>
            < span > {loadingChars[currentChar]}</span >
        </>
    );
};

export default Loading;
