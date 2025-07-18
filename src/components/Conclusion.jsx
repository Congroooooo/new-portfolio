import React, { useRef, useState, useEffect } from "react";
import "./Conclusion.css";

const TARGET_TEXT = "Hire Me";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

function EmailIcon({ className = "" }) {
  return (
    <svg
      className={`btn-svg ${className}`}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 4h20v16H2V4zm2 2v.01L12 13l8-6.99V6H4zm0 2.236V18h16V8.236l-8 6.99-8-6.99z" />
    </svg>
  );
}

export default function Conclusion() {
  const intervalRef = useRef(null);
  const [buttonText, setButtonText] = useState(TARGET_TEXT);
  const [activeTrails, setActiveTrails] = useState([]);

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
    const createRandomTrail = () => {
      const gridSize = 50;
      const viewportWidth = window.innerWidth;
      const numberOfGridLines = Math.floor(viewportWidth / gridSize) + 1;
      const randomGridLine = Math.floor(Math.random() * numberOfGridLines);
      const gridLinePosition = randomGridLine * gridSize;
      const leftPercentage = (gridLinePosition / viewportWidth) * 100;

      const newTrail = {
        id: Date.now() + Math.random(),
        left: leftPercentage,
        duration: 3.5,
      };

      setActiveTrails((prev) => [...prev, newTrail]);

      setTimeout(() => {
        setActiveTrails((prev) =>
          prev.filter((trail) => trail.id !== newTrail.id)
        );
      }, newTrail.duration * 1000);
    };

    const scheduleNextTrail = () => {
      const randomDelay = 1000 + Math.random() * 4000;
      setTimeout(() => {
        createRandomTrail();
        scheduleNextTrail();
      }, randomDelay);
    };

    scheduleNextTrail();

    createRandomTrail();
  }, []);

  return (
    <section className="conclusion-section">
      <div className="conclusion-background">
        <div className="conclusion-grid-pattern"></div>
        <div className="conclusion-falling-trails">
          {activeTrails.map((trail) => (
            <div
              key={trail.id}
              className="conclusion-light-trail"
              style={{
                left: `${trail.left}%`,
                animationDuration: `${trail.duration}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="conclusion-content">
        <h2 className="conclusion-header">Let's Connect !</h2>
        <p className="conclusion-desc">
          Thank you for taking the time to explore my portfolio! I'm excited
          about the opportunity to connect and collaborate, and I look forward
          to what we can create together.
        </p>
        <div className="conclusion-btns">
          <button
            onClick={() => window.open("mailto:nckoblms@gmail.com", "_blank")}
            className="conclusion-btn"
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            onMouseDown={(e) => e.target.blur()}
          >
            <span className="btn-text">{buttonText}</span>
            <EmailIcon className="btn-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
