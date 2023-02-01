import React, { useState, useEffect } from "react";

const Click = () => {
    const [clicks, setClicks] = useState(0);
    const endpoint = (process.env.NODE_ENV == 'production' ? 'http://rymo.xyz' : 'http://localhost') + ':8000/clicks'

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(endpoint);
            const data = await response.json();
            setClicks(data.clicks);
        };
        fetchData();
    }, []);

    const handleClick = async () => {
        await fetch(endpoint, {
            method: "PUT"
        });
        // The number of clicks is incremented on the backend, so we just need to refetch the data
        const fetchData = async () => {
            const response = await fetch(endpoint);
            const data = await response.json();
            setClicks(data.clicks);
        };
        fetchData();
    };

    return (
        <div>
            This <button onClick={handleClick}>⠀⠀⠀</button> has been clicked {clicks} times
        </div>
    );
};

export default Click;
