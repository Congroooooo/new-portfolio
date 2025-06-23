import React, { useState, useEffect } from 'react';
import './About.css';
import profileImg from '../assets/profile.png';

const services = [
  'Frontend Developer', 
  'UI/UX Designer', 
  'Web Designer', 
  'Mobile Designer', 
  'Responsiveness'
];

const SpinningText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const numServices = services.length;
  const angle = 360 / numServices;
  const radius = (100 / 2) / Math.tan(Math.PI / numServices);

  return (
    <div className="spinning-text-box-wrapper">
      <div
        className="spinning-text-box"
        style={{ transform: `rotateX(${-index * angle}deg)` }}
      >
        {services.map((service, i) => (
          <span
            key={i}
            className="spinning-text-face"
            style={{
              transform: `rotateX(${i * angle}deg) translateZ(${radius}px)`,
            }}
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function About() {
  const [cardVisible, setCardVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setCardVisible(true), 200);
  }, []);
  return (
    <section className="about-section">
      <h2 className="about-header">About Me</h2>
      <div className="about-underline"></div>
      <div className="about-stats">
        <div className="stat-card">
          <div className="stat-top">3+</div>
          <div className="stat-bottom">Years of<br/>Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-top">3+</div>
          <div className="stat-bottom">Projects<br/>Completed</div>
        </div>
        <div className="stat-card stat-bold">
          <div className="stat-top">4th year</div>
          <div className="stat-bottom">BSCS<br/>Student</div>
        </div>
        <div className="stat-card">
          <div className="stat-top">7+</div>
          <div className="stat-bottom">Verified<br/>Certificates</div>
        </div>
      </div>
      <div className="about-content-container">
        <div className={`about-content${cardVisible ? ' about-content-visible' : ''}`}>
          <div className="about-title-group">
            <h3 className="about-name">Im Nicko Balmes</h3>
            <div className="about-tagline"><span className="indented">"UI/UX That Works.</span> Front-End That Performs"</div>
          </div>
          <div className="about-image-container">
            <div className="about-img-accent"></div>
            <img src={profileImg} alt="Nicko Balmes" className="about-img floating-img" />
          </div>
          <div className="about-description-wrapper">
            <p className="about-description">
              <span className="description-indent">I'm a 4th year Bachelor of Science in Computer Science student with a strong passion for Frontend Development and UI/UX Design. I specialize in creating clean, responsive, and user-friendly interfaces that not only look good but also offer seamless functionality across devices. My goal is to build websites that provide meaningful digital experiences by combining thoughtful design with practical development. As I continue to grow in this field, I aim to refine my skills and contribute to projects that prioritize usability and visual clarity.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="spinning-text-container">
        <h3 className="spinning-text-static">What I can serve</h3>
        <SpinningText />
      </div>
    </section>
  );
} 