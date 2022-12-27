import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import BarChart from './BarChart';

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

    // TODO this is the dynamic part you'll need to replace in javacsript
    // this is probably a job for a fast api endpoint
    // maybe the /kpi/{name} endpoint??
    // ye sounds good get to it
    {/* <td><strong>{LEETCODE_SUBMISSIONS_THIS_MONTH()}</strong><span class="day">{space}({per_day(LEETCODE_SUBMISSIONS_THIS_MONTH())}/day)</span></td>
<td><strong>{LEETCODE_QUESTIONS_THIS_MONTH()}</strong><span class="day">{space}({per_day(LEETCODE_QUESTIONS_THIS_MONTH())}/day)</span></td>
<td><strong>{KMS_RAN_THIS_MONTH()}</strong><span class="day">{space}({per_day(KMS_RAN_THIS_MONTH())}/day)</span></td> */}

    return (
        <div>
            {isLoading ? <Loading /> : <p>{quote}</p>}
            <p>Dashboard</p>
            <BarChart plotName="strava_runs" />
        </div>
    );
}

export default Dashboard;
