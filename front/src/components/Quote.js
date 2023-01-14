import React, { useState, useEffect } from 'react';
import Loading from './Loading';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [quote, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://rymo.xyz:8000/quote', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            })
            const json = await response.json();
            const data = json.quote;
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
