import React, { useState, useEffect } from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const names = ['ty-command', 'mypandas'];
            const promises = names.map(name =>
                fetch(`http://localhost:8000/projects/${name}`)
                    .then(response => response.json())
            );
            const projectData = await Promise.all(promises);
            setProjects(projectData);
        }
        fetchProjects();
    }, []);

    return (
        <div>
            {projects.map(project => (
                <div key={project.name}>
                    <h2>{project.name}</h2>
                    <div dangerouslySetInnerHTML={{ __html: project.readme }} />
                    <p>{project.tagline}</p>
                </div>
            ))}
        </div>
    );
};

export default Projects;
