import React, { useState } from "react";
import "./CertificatesSection.css";

const CertificatesSection = ({ certificatesData }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="certificates" className="certificates-section">
      <div className="certificates-container">
        <div className="certificates-header">
          <h1 className="certificates-title">Certificates</h1>
        </div>

        <div className="certificates-grid">
          {certificatesData.map((cert) => (
            <div key={cert.id} className="certificate-card">
              <div
                className="certificate-image-wrapper"
                onClick={() => openModal(cert)}
              >
                <img
                  src={cert.mainImage}
                  alt={cert.title}
                  className="certificate-image"
                />
              </div>

              <div className="certificate-content">
                <div className="certificate-header-section">
                  <h3 className="certificate-card-title">{cert.title}</h3>
                  <div className="certificate-meta">
                    <span className="date-badge">{cert.displayDate}</span>
                  </div>
                </div>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="certificate-skills">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCert && (
        <div className="certificate-modal" onClick={closeModal}>
          <div
            className="certificate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={selectedCert.mainImage}
              alt={selectedCert.title}
              className="modal-certificate-image"
            />
            <div className="modal-certificate-info">
              <h3>{selectedCert.title}</h3>
              <span>{selectedCert.displayDate}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
