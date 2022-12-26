import React, { useState, useEffect } from 'react';

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        document.title = "Ryan | Home";
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/quote');
            const text = await response.text();
            setData(text);
        }
        fetchData();
    }, []);

    return (
        <div>
            <p>Hi!</p>
            <p>My name is Ryan. I live in Toronto.</p>
            {data && <p>{data}</p>}
        </div>
    );
}

export default Home;
