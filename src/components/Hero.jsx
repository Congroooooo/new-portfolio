import React, { useEffect, useState } from 'react';
import './Hero.css';
import heroBg from '../assets/heroo.png';

const roles = [
  'Nicko Balmes',
  'UI/UX Designer',
  'Frontend Developer',
];

function EmailIcon({ className = '' }) {
  return (
    <svg className={`btn-svg ${className}`} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4h20v16H2V4zm2 2v.01L12 13l8-6.99V6H4zm0 2.236V18h16V8.236l-8 6.99-8-6.99z" fill="#111"/></svg>
  );
}
function ArrowIcon({ className = '' }) {
  return (
    <svg className={`btn-svg ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

export default function Hero() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const typingSpeed = 80;
  const pause = 1200;

  useEffect(() => {
    let timeout;
    if (!deleting && charIndex < roles[roleIndex].length) {
      timeout = setTimeout(() => {
        setText(roles[roleIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(roles[roleIndex].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typingSpeed / 2);
    } else if (!deleting && charIndex === roles[roleIndex].length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(44, 44, 44, 0.6), rgba(44, 44, 44, 0.6)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="hero-header">
        Welcome, Im <span className="typewriter">{text}<span className="type-cursor">|</span></span>
      </h1>
      <p className="hero-desc">
      I am a 4th Year Computer Science student and aspiring Frontend Developer and UI/UX Designer, passionate about creating a user-friendly, visually appealing, and functional web interfaces.
      </p>
      <div className="hero-btns">
        <button className="hero-btn">
          <span className="btn-text">Hire Me</span>
          <EmailIcon className="btn-icon" />
        </button>
      </div>
    </section>
  );
} 