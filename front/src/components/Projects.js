import React, { useState, useEffect } from 'react';
import Project from './Project';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const names = ['cloud-dictionary', 'mypandas', 'ty-command', 'exception-logging', 'postgrespy'];
    useEffect(() => {
        const fetchProjects = async () => {
            const promises = names.map(name =>
                fetch(`http://localhost:8000/projects/${name}`)
                    .then(response => response.json())
            );
            const projectData = await Promise.all(promises);
            setProjects(projectData);
            setIsLoading(false);
        }
        fetchProjects();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                projects.map(project => (
                    <Project key={project.name} {...project} />
                ))
            )}
        </div>
    );
};

export default Projects;
