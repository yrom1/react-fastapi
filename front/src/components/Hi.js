import React from 'react'

function Hi() {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="love-park.jpg" style={{ width: '100px', height: '100px', borderRadius: '5%' }} />
                <body style={{ flex: 3, padding: '10px', margin: '0' }}>

                    <h1 style={{ margin: '0' }}>
                        Ryan Moore
                    </h1>
                    <p style={{ margin: '0' }}>Hi! I live in Toronto. I like data</p>
                </body>
            </div>
        </div >
    );
}

export default Hi
