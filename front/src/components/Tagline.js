import React from 'react';

const Tagline = ({ name, readme, tagline }) => (
    <div>
        <p><b>{name}:</b> {tagline}</p>
    </div >
);

export default Tagline;
