import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Run = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const endpoint = (process.env.NODE_ENV == 'production' ? 'http://rymo.xyz:8000' : 'http://localhost:8000') + '/plots/strava_runs'

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(endpoint)
            var j = await response.json();
            var data = []
            for (let i = 0; i < j.x.length; i++) {
                console.log(j.x[i], j.y[i]);
                data.push([{ x: j.x[i], y: j.y[i] }])
            }
            data = j.x.map((x, index) => ({ x, y: j.y[index] }))
            console.log(42, data)
            // console.log(data)
            setData(data)
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return <div>
        <LineChart
            width={400}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        {/* {isLoading ? <Loading /> : <div>{api.x}</div>} */}
    </div>
};

export default Run;
