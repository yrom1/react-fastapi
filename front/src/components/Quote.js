import React, { useState, useEffect } from 'react';
import Loading from './Loading';

import './Quote.css'

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
            const data = json;
            setData(data)
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div>
            {isLoading ? <Loading /> :
                <div>
                    <body>
                        <h1>
                            quote
                        </h1>
                        <p>
                            {quote.quote}
                        </p>
                        <p>
                            <figcaption>—{quote.author}, {quote.book}</figcaption>
                        </p>
                    </body>
                </div>
            }
        </div>
    );
}

export default Dashboard;
