import { useState } from "react";
import EventCarousel from "./EventCarousel";
import EventDetailsPanel from "./EventDetailsPanel";
import { eventsData } from "../data/eventsData";
import "./CertificatesSection.css";

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

const CertificatesSection = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const currentEvent = eventsData[currentEventIndex];

  const goToPrevEvent = () => {
    setCurrentEventIndex(
      (prev) => (prev - 1 + eventsData.length) % eventsData.length
    );
  };

  const goToNextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % eventsData.length);
  };

  return (
    <section id="certificates" className="certificates-section">
      <div className="grid-background">
        <div className="grid-pattern" />
      </div>

      <div className="glow-effect-1" />
      <div className="glow-effect-2" />

      <div className="certificates-container">
        <div className="section-header">
          <h1 className="section-title">
            CERTIFICATES
            <span className="section-title-accent"> & EVENTS</span>
          </h1>
          <div className="title-divider" />
          <p className="section-description">
            Recognition, achievements, and professional engagements that shape
            my journey
          </p>
        </div>

        <div className="content-card">
          {eventsData.length > 1 && (
            <div className="event-navigation">
              <button
                onClick={goToPrevEvent}
                className="nav-button"
                aria-label="Previous event"
              >
                <ChevronLeft />
              </button>
              <span className="nav-counter">
                {currentEventIndex + 1} / {eventsData.length}
              </span>
              <button
                onClick={goToNextEvent}
                className="nav-button"
                aria-label="Next event"
              >
                <ChevronRight />
              </button>
            </div>
          )}

          <div className="content-grid">
            <div className="carousel-container">
              <EventCarousel images={currentEvent.images} />
            </div>

            <div>
              <EventDetailsPanel event={currentEvent} />
            </div>
          </div>
        </div>

        {eventsData.length > 1 && (
          <div className="navigation-dots">
            {eventsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentEventIndex(index)}
                className={`dot-button ${
                  index === currentEventIndex
                    ? "dot-button-active"
                    : "dot-button-inactive"
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;
