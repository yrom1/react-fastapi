import React, { useState, useEffect } from 'react';

function Header() {
    const [page, setPage] = useState(window.location.pathname);

    function handleLinkClick(e, location) {
        e.preventDefault();
        window.history.pushState({}, '', location);
        setPage(location);
    }

    return (
        <header>
            <h3><a href="/" onClick={e => handleLinkClick(e, '/')}>Home</a></h3>
            <h3><a href="/dashboard" onClick={e => handleLinkClick(e, '/dashboard')}>Dashboard</a></h3>
            <h3><a href="/projects" onClick={e => handleLinkClick(e, '/projects')}>Projects</a></h3>
        </header>
    );
}

export default Header;
