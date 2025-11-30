import React from "react";
import "./Events.css";

const Events = ({ eventsData }) => {
  return (
    <section id="competitions" className="events-section">
      <div className="events-container">
        <div className="events-header">
          <h1 className="events-title">Events</h1>
        </div>

        <div className="events-grid">
          {eventsData.map((event) => (
            <div key={event.id} className="event-card">
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

                <div className="event-technologies">
                  {event.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
