import React, { useState, useEffect } from 'react';
import './certi.css';

import FreeCodeCampCerti from '../assets/FreeCodeCampCerti.png';
import NailsByKheleyCerti from '../assets/NailsByKheleyCerti.jpg';
import SololearnInterJS from '../assets/SololearnInterJS.png';
import SololearnIntroJS from '../assets/SololearnIntroJS.jpg';
import SololearnWeb from '../assets/SololearnWeb.jpg';

const certificateData = [
  {
    image: NailsByKheleyCerti,
    title: 'NailsByKheley',
    description: 'Awarded in recognition of our group’s excellence in database management, this certificate highlights our collective ability to design, implement, and optimize databases. It reflects our proficiency in structured query language (SQL) and data management principles to ensure efficient and effective information handling.',
  },
  {
    image: FreeCodeCampCerti,
    title: 'Responsive Web Design',
    description: 'This certification acknowledges my ability to create responsive and mobile-friendly web interfaces. It covers modern CSS techniques, Flexbox, Grid, and accessibility best practices, ensuring seamless user experiences across different devices.',
  },
  {
    image: SololearnWeb,
    title: 'Web Development',
    description: 'This certificate validates my foundational knowledge of web development, covering essential concepts in HTML, CSS, and JavaScript. It represents my starting point in building functional and visually appealing websites.',
  },
  {
    image: SololearnIntroJS,
    title: 'Introduction to JavaScript',
    description: 'This certificate demonstrates my understanding of JavaScript fundamentals, including variables, functions, loops, and event handling. It solidifies my skills in writing dynamic and interactive web applications.',
  },
  {
    image: SololearnInterJS,
    title: 'Intermediate JavaScript',
    description: 'This certificate validates my intermediate knowledge of JavaScript, including advanced concepts like closures, prototypes, and asynchronous programming. It demonstrates my ability to build more complex and efficient web applications.',
  },
];

const Certi = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);

  useEffect(() => {
    const calculateOffset = () => {
      const isMobile = window.innerWidth <= 900;
      const slideWidth = isMobile ? 80 : 60;
      const slideMargin = 1.5 * 2;
      const totalSlideWidth = slideWidth + slideMargin;
      const newOffset = (100 - totalSlideWidth) / 2 - (currentIndex * totalSlideWidth);
      setSliderOffset(newOffset);
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    return () => window.removeEventListener('resize', calculateOffset);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? certificateData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === certificateData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="certi-section" id="certificates">
      <h2 className="certi-header">CERTIFICATES</h2>
      <div className="certi-underline"></div>
      <div className="certi-slider">
        <div className="certi-slider-wrapper" style={{ transform: `translateX(${sliderOffset}%)` }}>
          {certificateData.map((cert, index) => (
            <div className={`certi-slide ${index === currentIndex ? 'active' : ''}`} key={index}>
              <div className="certi-image-container">
                <img src={cert.image} alt={cert.title} className="certi-image" />
              </div>
              <div className="certi-content">
                <h3 className="certi-title">{cert.title}</h3>
                <p className="certi-description">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-arrow prev" onClick={goToPrevious}>&#10094;</button>
        <button className="slider-arrow next" onClick={goToNext}>&#10095;</button>
      </div>
    </section>
  );
};

export default Certi;