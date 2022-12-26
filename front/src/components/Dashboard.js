import React, { useState, useEffect } from 'react';

function Dashboard() {
    useEffect(() => {
        document.title = "Ryan | Dashboard";
    }, []);

    return <p>Dashboard</p>;
}

export default Dashboard;
