import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";

const roles = ["Nicko Balmes", "UI/UX Designer", "Frontend Developer"];

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
function ArrowIcon({ className = "" }) {
  return (
    <svg
      className={`btn-svg ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [activeTrails, setActiveTrails] = useState([]);

  const intervalRef = useRef(null);
  const [buttonText, setButtonText] = useState(TARGET_TEXT);

  const typingSpeed = 80;
  const pause = 1200;

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
    <section className="hero-section" id="home">
      <div className="hero-background">
        <div className="grid-pattern"></div>
        <div className="falling-trails">
          {activeTrails.map((trail) => (
            <div
              key={trail.id}
              className="light-trail"
              style={{
                left: `${trail.left}%`,
                animationDuration: `${trail.duration}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <h1 className="hero-header">
          Welcome, Im{" "}
          <span className="typewriter">
            {text}
            <span className="type-cursor">|</span>
          </span>
        </h1>
        <p className="hero-desc">
          I am a 4th Year Computer Science student and aspiring Frontend
          Developer and UI/UX Designer, passionate about creating a
          user-friendly, visually appealing, and functional web interfaces.
        </p>
        <div className="hero-btns">
          <button
            className="hero-btn"
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            onMouseDown={(e) => e.target.blur()}
            onClick={() => window.open("mailto:nckoblms@gmail.com", "_blank")}
          >
            <span className="btn-text">{buttonText}</span>
            <EmailIcon className="btn-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
