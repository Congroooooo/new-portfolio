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
    description: 'Aut commodi neque aut quas neque ea autem aspernatur quo nisi internos in officiis nihil? Ea quas possimus aut corporis iusto ut iusto consequatur ut animi enim sit dolor corrupti. Eos quia tenetur aut quas ipsam et aliquam dolores.',
  },
  {
    image: FreeCodeCampCerti,
    title: 'FreeCodeCamp',
    description: 'Responsive Web Design certification from freeCodeCamp.',
  },
  {
    image: SololearnWeb,
    title: 'SoloLearn',
    description: 'Web Development certificate from SoloLearn.',
  },
  {
    image: SololearnIntroJS,
    title: 'SoloLearn',
    description: 'Introduction to JavaScript certificate from SoloLearn.',
  },
  {
    image: SololearnInterJS,
    title: 'SoloLearn',
    description: 'Intermediate JavaScript certificate from SoloLearn.',
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
    <section className="certi-section">
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