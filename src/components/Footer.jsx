import React from 'react';
import './Footer.css';

const FacebookIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0.28-1.74 1.76-1.74H17V2.14C16.17 2.09 15.35 2 14.28 2c-2.84 0-4.78 1.73-4.78 4.93V9.5H7v4h2.5v7h4v-7Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-list">
            <li>Frontend development</li>
            <li>UI / UX designer</li>
            <li>Web design</li>
            <li>Mobile design</li>
            <li>Responsiveness</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Social Links</h3>
          <ul className="footer-list">
            <li><a href="https://www.facebook.com/nicko.balmes.1" target="_blank" rel="noopener noreferrer"><FacebookIcon />Facebook</a></li>
            <li><a href="https://www.linkedin.com/in/nicko-balmes-39a896263/" target="_blank" rel="noopener noreferrer"><LinkedInIcon />LinkedIn</a></li>
            <li><a href="https://github.com/nckoblms" target="_blank" rel="noopener noreferrer"><GithubIcon />Github</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Contacts</h3>
          <ul className="footer-list">
            <li>Address: Brgy. Lual Pob. Don Juancho St. Mauban, Quezon</li>
            <li>Email: nckoblms@gmail.com</li>
            <li>Phone: +63 963 4902 175</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nicko Balmes. All rights reserved.</p>
      </div>
    </footer>
  );
} 