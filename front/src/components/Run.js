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
            var temp = j.x.map((x, index) => ({ x, y: j.y[index] }))

            let newData = temp.map(item => {
                return {
                    date: item.x,
                    km: item.y
                }
            });

            console.log(newData)
            setData(newData)
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return <div>
        {isLoading ? <Loading /> :
            <div>
                <body>
                    <h1>
                        distance ran
                    </h1>
                    <LineChart
                        width={500}
                        height={250}
                        data={data}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="km" activeDot={{ r: 2 }} strokeWidth={4} isAnimationActive={false} />
                    </LineChart>
                </body>
            </div>
        }

    </div>
};

export default Run;
