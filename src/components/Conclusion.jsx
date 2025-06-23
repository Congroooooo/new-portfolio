import React from 'react';
import './Conclusion.css';

function EmailIcon({ className = '' }) {
  return (
    <svg className={`btn-svg ${className}`} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4h20v16H2V4zm2 2v.01L12 13l8-6.99V6H4zm0 2.236V18h16V8.236l-8 6.99-8-6.99z"/></svg>
  );
}

export default function Conclusion() {
  return (
    <section className="conclusion-section">
      <h2 className="conclusion-header">
        Let's Connect !
      </h2>
      <p className="conclusion-desc">
        Thank you for visiting my portfolio! I appreciate your time and look forward to connecting with like-minded individuals. I'm excited to connect and collaborate.
      </p>
      <div className="conclusion-btns">
        <button className="conclusion-btn">
          <span className="btn-text">Hire Me</span>
          <EmailIcon className="btn-icon" />
        </button>
      </div>
    </section>
  );
} 