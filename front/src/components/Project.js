import React from 'react';

const Project = ({ name, readme, tagline }) => (
    <div>
        <div dangerouslySetInnerHTML={{ __html: readme }} />
    </div>
);

export default Project;
