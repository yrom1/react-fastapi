import React, { useState, useEffect } from 'react';

function Project({ name }) {
    const [project, setProject] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/projects/${name}`);
            const data = await response.json();
            setProject(data);
        }
        fetchData();
    }, [name]);

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.tagline}</p>
            <div dangerouslySetInnerHTML={{ __html: project.readme }} />
        </div>
    );
}

export default Project;
