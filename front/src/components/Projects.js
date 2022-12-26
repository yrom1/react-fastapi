import React, { useState, useEffect } from 'react';

function Projects() {
    useEffect(() => {
        document.title = "Ryan | Projects";
    }, []);

    return <p>Projects</p>;
}

export default Projects;
