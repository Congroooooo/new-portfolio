// src/components/navbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';
import resumePDF from '../assets/Balmes-Nicko-resume.pdf';

const TARGET_TEXT = "Download CV";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);
  
  // Encrypt button state
  const intervalRef = useRef(null);
  const [buttonText, setButtonText] = useState(TARGET_TEXT);

  // Encrypt button functions
  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setButtonText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setButtonText(TARGET_TEXT);
  };

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(currentY > 10);
          if (currentY > lastScrollY.current && currentY > 60) {
            setHidden(true);
          } else if (currentY < lastScrollY.current) {
            setHidden(false);
          }

          // Detect active section
          const sections = ['home', 'about', 'skills', 'projects', 'certificates'];
          const windowHeight = window.innerHeight;
          const scrollPosition = currentY + windowHeight / 2;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section) {
              const sectionTop = section.offsetTop;
              if (scrollPosition >= sectionTop) {
                setActiveSection(sections[i]);
                break;
              }
            }
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar-bg' : ' navbar-transparent'}${hidden ? ' navbar-hidden' : ''}`}>
      <div className="logo">Nicko Balmes</div>
      <ul className="nav-links">
        {[
          { name: 'Home', id: 'home' },
          { name: 'About', id: 'about' },
          { name: 'Skills', id: 'skills' },
          { name: 'Projects', id: 'projects' },
          { name: 'Certificates', id: 'certificates' }
        ].map((item) => (
          <li key={item.name}>
            <a 
              href={`#${item.id}`} 
              className={`nav-link${activeSection === item.id ? ' active' : ''}`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <a 
        href={resumePDF}
        download="Balmes-Nicko-resume.pdf"
        className="download-btn"
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        onMouseDown={(e) => e.target.blur()}
      >
        {buttonText} <span className="download-icon"><DownloadIcon /></span>
      </a>
    </nav>
  );
}