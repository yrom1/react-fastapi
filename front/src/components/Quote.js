import React, { useState, useEffect } from 'react';
import Loading from './Loading';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [quote, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8080/quote', {
                mode: 'no-cors',
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ob)
            })
            // fetch('http://localhost:8000/quote');
            const text = await response.text();
            setData(text);
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
