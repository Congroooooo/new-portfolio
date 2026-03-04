import { useState } from 'react';
import { DotGrid } from '@/components/effects';
import { CloseIcon } from '@/components/icons';
import type { Certificate } from '@/data/certificatesData';

interface CertificatesProps {
  certificatesData: Certificate[];
}

export function Certificates({ certificatesData }: CertificatesProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const openModal = (cert: Certificate) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section
      id="certificates"
      className="bg-primary-bg relative min-h-screen overflow-hidden px-8 py-20 max-md:px-4 max-md:py-12"
    >
      <DotGrid />
      <div className="relative z-[10] mx-auto max-w-[1400px]">
        <div className="mb-16 text-center">
          <h1 className="font-playfair relative z-[2] mb-3 text-center text-5xl font-normal text-white max-lg:text-[2.8rem] max-md:text-4xl max-sm:text-3xl">
            Certificates
          </h1>
          <div className="relative z-[2] mx-auto mb-12 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            >
              <div
                className="flex h-[280px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-t-3xl bg-black/30 max-md:h-[250px]"
                onClick={() => openModal(cert)}
              >
                <img
                  src={cert.mainImage}
                  alt={cert.title}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div className="flex flex-col gap-3">
                  <h3 className="font-lato m-0 text-[1.35rem] leading-tight font-bold text-white max-md:text-xl">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-block rounded-md bg-white/15 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur-[10px]">
                      {cert.displayDate}
                    </span>
                  </div>
                </div>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="font-lato inline-block rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:border-white/40 hover:bg-white/15 hover:shadow-[0_4px_12px_rgba(255,255,255,0.2)]"
                      >
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
        <div
          className="fixed inset-0 z-[9999] flex animate-[fadeIn_0.3s_ease] items-center justify-center bg-black/95 p-8 max-md:p-4"
          onClick={closeModal}
        >
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] animate-[modalSlideIn_0.4s_ease] flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fixed top-8 right-8 z-[10000] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-[10px] transition-all duration-300 hover:rotate-90 hover:border-white/40 hover:bg-white/20 max-md:top-4 max-md:right-4 max-md:h-9 max-md:w-9"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
            <img
              src={selectedCert.mainImage}
              alt={selectedCert.title}
              className="max-h-[calc(90vh-100px)] max-w-full rounded-lg border border-white/10 object-contain shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
            />
            <div className="text-center text-white">
              <h3 className="font-playfair m-0 mb-2 text-2xl font-bold text-white max-md:text-xl">
                {selectedCert.title}
              </h3>
              <span className="font-lato text-base text-white/70 max-md:text-sm">
                {selectedCert.displayDate}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
