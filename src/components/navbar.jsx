// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Nicko Balmes</div>
      <ul className="nav-links">
        {['Home', 'About', 'Services', 'Projects', 'Certificates'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          </li>
        ))}
      </ul>
      <a href="#" className="download-btn">
        Download CV <span className="download-icon"><DownloadIcon /></span>
      </a>
    </nav>
  );
}