import React from 'react';
import './Footer.css';

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
            <li><a href="https://www.facebook.com/nicko.balmes.1" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.linkedin.com/in/nicko-balmes-39a896263/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/nckoblms" target="_blank" rel="noopener noreferrer">Github</a></li>
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