import { useState } from 'react';
import type { Competition } from '@/data/competitionsData';

interface EventsProps {
  eventsData: Competition[];
}

export function Events({ eventsData }: EventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<Competition | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (event: Competition) => {
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
    <section
      id="competitions"
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] px-8 py-20 before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] before:bg-[length:50px_50px] before:content-[''] max-md:px-4 max-md:py-12"
    >
      <div className="relative z-[10] mx-auto max-w-[1400px]">
        <div className="mb-16 text-center">
          <h1 className="relative z-[2] mb-3 text-center font-['Playfair_Display',serif] text-5xl font-normal text-white max-lg:text-[2.8rem] max-md:text-4xl max-sm:text-3xl">
            Events
          </h1>
          <div className="relative z-[2] mx-auto mb-12 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              onClick={() => openModal(event)}
            >
              <div className="relative h-[300px] w-full overflow-hidden max-md:h-[250px]">
                <img
                  src={event.mainImage}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-3 bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.7)_50%,transparent_100%)] p-6">
                  <h3 className="m-0 text-2xl leading-tight font-bold text-white max-md:text-xl">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-block rounded-md bg-white px-3 py-1 text-sm font-semibold text-black shadow-[0_4px_6px_rgba(255,255,255,0.3)]">
                      {event.achievement}
                    </span>
                    <span className="inline-block rounded-md bg-white/15 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur-[10px]">
                      {event.displayDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <p className="m-0 text-[0.95rem] leading-[1.6] text-white/80">
                  {event.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-[1000] flex animate-[fadeIn_0.3s_ease] items-center justify-center bg-black/[0.98] p-0 backdrop-blur-[10px]"
          onClick={closeModal}
        >
          <button
            className="fixed top-10 right-10 z-[1002] flex h-[50px] w-[50px] items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl leading-none text-white transition-all duration-300 hover:rotate-90 hover:bg-white/20 max-[480px]:top-4 max-[480px]:right-4 max-[480px]:h-10 max-[480px]:w-10 max-[480px]:text-2xl max-md:top-6 max-md:right-6 max-md:h-[45px] max-md:w-[45px] max-md:text-[1.75rem]"
            onClick={closeModal}
          >
            &times;
          </button>

          {selectedEvent.images.length > 1 && (
            <>
              <button
                className="fixed top-1/2 left-10 z-[1001] flex h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white backdrop-blur-[10px] transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)] max-[480px]:left-2 max-[480px]:h-[45px] max-[480px]:w-[45px] max-[480px]:text-xl max-md:left-4 max-md:h-[50px] max-md:w-[50px] max-md:text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                &#10094;
              </button>
              <button
                className="fixed top-1/2 right-10 z-[1001] flex h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white backdrop-blur-[10px] transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)] max-[480px]:right-2 max-[480px]:h-[45px] max-[480px]:w-[45px] max-[480px]:text-xl max-md:right-4 max-md:h-[50px] max-md:w-[50px] max-md:text-2xl"
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
            className="flex h-full w-full animate-[slideUp_0.3s_ease] flex-col items-center justify-center gap-8 px-8 py-16 max-[480px]:gap-4 max-[480px]:px-4 max-[480px]:py-10 max-md:gap-6 max-md:px-6 max-md:py-12"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="m-0 flex-shrink-0 text-center text-[2.5rem] leading-tight font-bold text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.8)] max-[480px]:text-2xl max-md:text-[1.75rem]">
              {selectedEvent.title}
            </h2>

            <div className="relative flex min-h-0 w-[90%] max-w-[1400px] flex-1 items-center justify-center max-md:w-[95%]">
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              />
              {selectedEvent.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-[2rem] border border-white/10 bg-black/80 px-5 py-2 text-sm font-medium text-white backdrop-blur-[10px] max-md:bottom-4 max-md:px-4 max-md:py-[0.4rem] max-md:text-xs">
                  {currentImageIndex + 1} / {selectedEvent.images.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
