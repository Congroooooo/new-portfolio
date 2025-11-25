import { useState, useEffect } from "react";
import "./EventCarousel.css";

// Fallback arrow components if lucide-react is not installed
const ChevronLeft = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const EventCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    setCurrentIndex(0);
    setImageError({});
  }, [images]);

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleImageError = (index) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  if (!images || images.length === 0) {
    return (
      <div className="carousel-error">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="carousel-wrapper">
      <div className="carousel-image-container">
        {imageError[currentIndex] ? (
          <div className="carousel-error">
            <p>Image not found</p>
          </div>
        ) : (
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
            onError={() => handleImageError(currentIndex)}
          />
        )}

        <div className="carousel-overlay" />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="carousel-arrow carousel-arrow-left"
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={goToNext}
            className="carousel-arrow carousel-arrow-right"
            aria-label="Next image"
          >
            <ChevronRight />
          </button>

          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`carousel-dot ${
                  index === currentIndex
                    ? "carousel-dot-active"
                    : "carousel-dot-inactive"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="carousel-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default EventCarousel;
