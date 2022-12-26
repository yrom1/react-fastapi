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
            <a href="/" onClick={e => handleLinkClick(e, '/')}>Home</a>
            <a href="/projects" onClick={e => handleLinkClick(e, '/projects')}>Projects</a>
            <a href="/dashboard" onClick={e => handleLinkClick(e, '/dashboard')}>Dashboard</a>
        </header>
    );
}

export default Header;
