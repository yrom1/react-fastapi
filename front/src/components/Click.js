import React, { useState, useEffect } from "react";
import Loading from './Loading';

const Click = () => {
    const [clicks, setClicks] = useState(0);
    const [loading, setLoading] = useState(false);
    const endpoint = (process.env.NODE_ENV == 'production' ? 'http://rymo.xyz' : 'http://localhost') + '/clicks'

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(endpoint);
            const data = await response.json();
            setClicks(data.clicks);
        };
        fetchData();
    }, []);

    const handleClick = async () => {
        setLoading(true);
        await fetch(endpoint, {
            method: "PUT"
        });
        // The number of clicks is incremented on the backend, so we just need to refetch the data
        const fetchData = async () => {
            const response = await fetch(endpoint);
            const data = await response.json();
            setClicks(data.clicks);
            setLoading(false);
        };
        fetchData();
    };

    return (
        <div>
            This <button style={{ width: '3em', height: '1.5em' }} onClick={handleClick} ></button> has been clicked {loading ? <Loading /> : clicks} times
        </div >
    );
};

export default Click;
