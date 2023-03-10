import React, { useEffect } from 'react'

function Hi() {
    const theme = localStorage.getItem('theme');

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://platform.twitter.com/widgets.js'
        script.async = true
        script.charset = 'utf-8'
        document.body.appendChild(script)
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <blockquote class="twitter-tweet" data-theme={theme === 'dark' ? 'dark' : undefined}>
                <p lang="en" dir="ltr">How to become expert at thing:<br></br>1 iteratively take on concrete projects and accomplish
                    them depth wise, learning “on demand” (ie don’t learn bottom up breadth wise)<br></br>2 teach/summarize
                    everything you learn in your own words<br></br>3 only compare yourself to younger you, never to others</p>&mdash;
                Andrej Karpathy (@karpathy) <a
                    href="https://twitter.com/karpathy/status/1325154823856033793?ref_src=twsrc%5Etfw">November 7, 2020</a>
            </blockquote>
        </div>
    );
}

export default Hi
