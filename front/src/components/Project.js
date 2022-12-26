import React from 'react';

const Project = ({ name, readme, tagline }) => (
    <div>
        <h2>{name}</h2>
        <div dangerouslySetInnerHTML={{ __html: readme }} />
        <p>{tagline}</p>
    </div>
);

export default Project;
