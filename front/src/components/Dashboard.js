import React, { useState, useEffect } from 'react';
import Loading from './Loading';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        document.title = "Ryan | Dashboard";
    }, []);

    const [quote, setData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/quote');
            const text = await response.text();
            setData(text);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div>
            {isLoading ? <Loading /> : <p>{quote}</p>}
            <p>Dashboard</p>
        </div>
    );
}

export default Dashboard;
