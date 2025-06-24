import React, { useRef, useState } from 'react';
import './Conclusion.css';

// Encrypt button constants
const TARGET_TEXT = "Hire Me";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

function EmailIcon({ className = '' }) {
  return (
    <svg className={`btn-svg ${className}`} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4h20v16H2V4zm2 2v.01L12 13l8-6.99V6H4zm0 2.236V18h16V8.236l-8 6.99-8-6.99z"/></svg>
  );
}

export default function Conclusion() {
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

  return (
    <section className="conclusion-section">
      <h2 className="conclusion-header">
        Let's Connect !
      </h2>
      <p className="conclusion-desc">
        Thank you for visiting my portfolio! I appreciate your time and look forward to connecting with like-minded individuals. I'm excited to connect and collaborate.
      </p>
      <div className="conclusion-btns">
        <button 
          className="conclusion-btn"
          onMouseEnter={scramble}
          onMouseLeave={stopScramble}
        >
          <span className="btn-text">{buttonText}</span>
          <EmailIcon className="btn-icon" />
        </button>
      </div>
    </section>
  );
} 