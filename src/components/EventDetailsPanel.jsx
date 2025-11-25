import React from "react";
import "./EventDetailsPanel.css";

const Calendar = ({ className }) => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const MapPin = ({ className }) => (
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
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const Award = ({ className }) => (
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
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const EventDetailsPanel = ({ event }) => {
  return (
    <div className="details-panel">
      <div className="details-header">
        <div className="type-badge">
          <Award />
          <span>{event.type}</span>
        </div>

        <h2 className="details-title">{event.title}</h2>

        <div className="meta-info">
          <div className="meta-item">
            <Calendar />
            <span>{event.date}</span>
          </div>
          <div className="meta-item">
            <MapPin />
            <span>{event.location}</span>
          </div>
          <div className="role-badge">{event.role}</div>
        </div>

        <p className="organization">{event.organization}</p>
        <p className="description">{event.description}</p>

        <div className="highlights-section">
          <h3 className="highlights-title">Key Highlights</h3>
          <div className="highlights-container">
            {event.highlights.map((highlight, index) => (
              <span key={index} className="highlight-tag">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPanel;
