import React from 'react';

const DualComponent = ({ component1, component2 }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
                {component1}
            </div>
            <div style={{ flex: 1 }}>
                {component2}
            </div>
        </div>
    );
};

export default DualComponent;
