import React, { useState, useEffect } from 'react';
import Project from './Project';
import Tagline from './Tagline';
import Loading from './Loading';

const Projects = () => {
    const endpoint = (process.env.NODE_ENV == 'production' ? 'https://rymo.xyz:8000' : 'http://localhost:8000') + '/projects/'
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const names = ['cloud-dictionary', 'mypandas', 'ty-command', 'exception-logging', 'postgrespy'];
    useEffect(() => {
        const fetchProjects = async () => {
            const promises = names.map(name =>
                fetch(endpoint + `${name}`)
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
            <body>
                <h1 style={{ textAlign: "left" }}>
                    Projects
                </h1>
                <ul>
                    {isLoading ? (
                        <div><Loading /></div>
                    ) : (
                        projects.map(project => (
                            <div style={{ textAlign: "left" }}>
                                <li><a href={project.link}>{project.name}</a> · {project.description}</li>
                            </div>
                        ))
                    )}
                </ul>
            </body>
        </div>

    );
};

export default Projects;

// return (
//     <div>
//         {isLoading ? (
//             <div><Loading /></div>
//         ) : (
//             projects.map(project => (
//                 <p><a href="{project.link}">{project.name}</a> {project.description}</p>
//             ))
//         )}
//     </div>
// );
