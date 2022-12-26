import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {

    useEffect(() => {
        document.title = "Ryan | Home";
    }, []);

    return (
        <div>
            <p>Hi!</p>
            <p>My name is Ryan. I live in Toronto.</p>
            <div>
                <img src="/love-park.jpg" alt="Love Park" className="centered-image" />
            </div>
        </div>
    );
}

export default Home;
