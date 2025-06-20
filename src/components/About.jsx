import React from 'react';
import './About.css';
import profileImg from '../assets/profile.png';

export default function About() {
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
        <div className="about-content">
          <div className="about-left">
            <h3 className="about-name">Im Nicko Balmes</h3>
            <div className="about-tagline"><span className="indented">“UI/UX That Works.</span>Front-End That Performs”</div>
            <button className="about-btn"><span className="about-btn-icon">↗</span> More About me</button>
          </div>
          <div className="about-right">
            <img src={profileImg} alt="Nicko Balmes" className="about-img" />
          </div>
        </div>
      </div>
      <div className="marquee-container">
        <div className="marquee">
          <span>• UI/UX Designer</span>
          <span>• Frontend Developer</span>
          <span>• Web Designer</span>
          <span>• Mobile Designer</span>
          <span>• Responsiveness</span>
          <span>• UI/UX Designer</span>
          <span>• Frontend Developer</span>
          <span>• Web Designer</span>
          <span>• Mobile Designer</span>
          <span>• Responsiveness</span>
        </div>
      </div>
    </section>
  );
} 