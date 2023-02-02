import React, { useState, useEffect } from 'react';
import Loading from './Loading';

import './Quote.css'

function Quote() {
    const [isLoading, setIsLoading] = useState(true);
    const [quote, setData] = useState(null);
    const endpoint = (process.env.NODE_ENV == 'production' ? 'https://rymo.xyz:8000' : 'http://localhost:8000') + '/quote'

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(endpoint)
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

export default Quote;
