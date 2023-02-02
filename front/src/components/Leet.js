import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Leet = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    const endpoint = (process.env.NODE_ENV == 'production' ? 'https://rymo.xyz:8000' : 'http://localhost:8000') + '/plots/leetcode_questions'

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(endpoint)
            var j = await response.json();
            const bothArr = j.x.concat(j.y);
            setMin(Math.min(...bothArr));
            setMax(Math.max(...bothArr));
            var temp = j.x.map((x, index) => ({ x, y: j.y[index], z: j.z[index] }));

            let newData = temp.map(item => {
                return {
                    date: item.x,
                    python3: item.y,
                    mysql: item.z
                }
            });
            console.log(newData)
            setData(newData)
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return <div style={{ display: "flex", justifyContent: "center" }}>
        {isLoading ? <Loading /> :
            <div>
                <body>
                    <h1>
                        Distance Ran
                    </h1>
                    <p>This is a plot of how much I've ran recently</p>

                    <LineChart
                        width={500}
                        height={500}
                        data={data}
                    // margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />
                        <YAxis domain={[{ min }, { max }]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" stroke="#8884d8" dataKey="python3" activeDot={{ r: 1 }} strokeWidth={2} isAnimationActive={false} />
                        <Line type="monotone" stroke="#82ca9d" dataKey="mysql" activeDot={{ r: 1 }} strokeWidth={2} isAnimationActive={false} />

                    </LineChart>
                    <h3>Source</h3>
                    <p>GitHub Actions <a href="https://github.com/yrom1/strava-tracker">strava-tracker</a></p>
                    <p>AWS RDS <a href="https://github.com/yrom1/star-schema/">star-schema</a></p>
                </body>
            </div>
        }

    </div >
};

export default Leet;
