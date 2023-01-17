import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const Run = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const endpoint = (process.env.NODE_ENV == 'production' ? 'http://rymo.xyz:8000' : 'http://localhost:8000') + '/plots/strava_runs'

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

    return <div>
        {isLoading ? <Loading /> : <div>{data.x}</div>}
    </div>
    // <div id="curve_chart" style={{ width: '100%', height: '20%' }} />;
};

export default Run;
