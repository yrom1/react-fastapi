import React, { useState, useEffect } from 'react';

function Dashboard() {
    useEffect(() => {
        document.title = "Ryan | Dashboard";
    }, []);

    const [quote, setData] = useState(null);
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
            {quote && <p>{quote}</p>}

            <p>Dashboard</p>
        </div>
    );
}

export default Dashboard;
