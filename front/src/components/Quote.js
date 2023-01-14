import React, { useState, useEffect } from 'react';
import Loading from './Loading';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [quote, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000')//, { mode: 'no-cors' })
            const json = await response.json();
            const data = json.Hello;
            setData(data)
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div>
            {isLoading ? <Loading /> : <p>{quote}</p>}
        </div>
    );
}

export default Dashboard;
