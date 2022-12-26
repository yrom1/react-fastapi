import React, { useState, useEffect } from 'react';
import Project from './Project';

function Projects() {
    useEffect(() => {
        document.title = "Ryan | Projects";
    }, []);

    return (
        <div>
            <Project name="ty-command" />
            <Project name="mypandas" />
            <Project name="cloud-dictionary" />
        </div>
    )
}

export default Projects;
