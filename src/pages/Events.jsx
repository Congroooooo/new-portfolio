import React, { useState } from "react";
import "./Events.css";

const Events = ({ eventsData }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (event) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const goToPrevious = () => {
    if (selectedEvent && selectedEvent.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedEvent.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedEvent && selectedEvent.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedEvent.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <section id="competitions" className="events-section">
      <div className="events-container">
        <div className="events-header">
          <h1 className="events-title">Events</h1>
        </div>

        <div className="events-grid">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => openModal(event)}
            >
              <div className="event-image-wrapper">
                <img
                  src={event.mainImage}
                  alt={event.title}
                  className="event-image"
                />
                <div className="event-overlay">
                  <h3 className="event-card-title">{event.title}</h3>
                  <div className="event-card-badges">
                    <span className="achievement-badge">
                      {event.achievement}
                    </span>
                    <span className="date-badge">{event.displayDate}</span>
                  </div>
                </div>
              </div>

              <div className="event-content">
                <p className="event-description">{event.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <button className="event-modal-close" onClick={closeModal}>
            &times;
          </button>

          {selectedEvent.images.length > 1 && (
            <>
              <button
                className="event-modal-arrow event-modal-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                &#10094;
              </button>
              <button
                className="event-modal-arrow event-modal-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                &#10095;
              </button>
            </>
          )}

          <div
            className="event-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="event-modal-title">{selectedEvent.title}</h2>

            <div className="event-modal-image-container">
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                className="event-modal-image"
              />
              {selectedEvent.images.length > 1 && (
                <div className="event-modal-image-counter">
                  {currentImageIndex + 1} / {selectedEvent.images.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
