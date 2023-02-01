import React, { useState, useEffect } from "react";

const Click = () => {
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8000/clicks");
            const data = await response.json();
            setClicks(data.clicks);
        };
        fetchData();
    }, []);

    const handleClick = async () => {
        await fetch("http://localhost:8000/clicks", {
            method: "PUT"
        });
        // The number of clicks is incremented on the backend, so we just need to refetch the data
        const fetchData = async () => {
            const response = await fetch("http://localhost:8000/clicks");
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
