import React from 'react';
import { cn } from '@/lib/cn';
import { useContinuousRotation, useIntersectionObserverOnce } from '@/hooks';
import { DotGrid } from '@/components/effects';
import profileImg from '@/assets/nbdev.jpg';

const SERVICES = [
  'Frontend Development',
  'UI/UX Design',
  'Web Design',
  'Mobile Design',
  'Responsiveness',
];

const STATS = [
  { value: '2+', label: 'Years of\nExperience' },
  { value: '3+', label: 'Projects\nCompleted' },
  { value: '4th', label: 'Year BSCS\nStudent' },
  { value: '7+', label: 'Verified\nCertificates' },
];

interface SpinningTextProps {
  services: string[];
  interval?: number;
}

function SpinningText({ services, interval = 3000 }: SpinningTextProps) {
  const { rotation } = useContinuousRotation(services.length, interval);
  const numServices = services.length;
  const angle = 360 / numServices;
  const radius = 120 / 2 / Math.tan(Math.PI / numServices); // Increased for better depth

  // Calculate depth-based opacity for each plane
  const getPlaneStyle = (i: number) => {
    const planeRotation = i * angle;
    const currentRotation = rotation % 360;
    // Calculate relative rotation to determine if plane is in front or back
    let relativeRotation = (planeRotation - currentRotation + 360) % 360;
    if (relativeRotation > 180) relativeRotation -= 360;

    // Calculate depth opacity: planes at back should be darker
    const depthFactor = Math.cos((relativeRotation * Math.PI) / 180);
    const opacity = 0.4 + depthFactor * 0.6; // Range from 0.4 to 1.0
    const brightness = 40 + depthFactor * 60; // Range from 40% to 100%

    return {
      transform: `rotateX(${i * angle}deg) translateZ(${radius}px)`,
      opacity,
      filter: `brightness(${brightness}%)`,
    };
  };

  return (
    <div className="relative h-[120px] w-[600px] flex-shrink-0 [perspective:1200px] max-md:h-20 max-md:w-full max-md:max-w-[400px] max-md:[perspective:900px]">
      <div
        className="absolute h-full w-full origin-center transition-transform duration-[1.2s] ease-in-out [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${-rotation}deg)` }}
      >
        {services.map((service, i) => (
          <span
            key={i}
            className="absolute flex h-full w-full items-center justify-center rounded-2xl border-2 border-[#2c2c2c] bg-[#2c2c2c] px-5 py-2.5 text-center font-['Poppins',sans-serif] text-5xl font-light text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] [backface-visibility:visible] before:absolute before:top-0 before:left-0 before:h-full before:w-[3px] before:bg-gradient-to-b before:from-transparent before:via-white/30 before:to-transparent before:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-[3px] after:bg-gradient-to-b after:from-transparent after:via-white/30 after:to-transparent after:content-[''] max-md:text-[2.5rem]"
            style={getPlaneStyle(i)}
          >
            {/* Top edge line */}
            <span className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {/* Bottom edge line */}
            <span className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const [contentRef, isVisible] = useIntersectionObserverOnce<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px',
  });

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] px-8 py-24 max-md:px-4 max-md:py-16"
      id="about"
    >
      <DotGrid />
      <h2 className="relative z-[2] mb-3 text-center font-['Playfair_Display',serif] text-5xl font-normal text-white max-lg:text-[2.8rem] max-md:text-4xl max-sm:text-3xl">
        About Me
      </h2>
      <div className="relative z-[2] mx-auto mb-20 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 max-md:mb-16 max-sm:mb-12" />

      {/* Stats Grid */}
      <div className="relative z-[2] mx-auto mb-12 flex max-w-[1200px] flex-wrap justify-center gap-6 max-md:mb-10 max-sm:mb-8">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className="group relative flex h-[180px] min-w-[220px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-white/10 bg-white/[0.02] px-[15px] py-[5px] font-['Playfair_Display',serif] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)]"
          >
            {/* Shimmer effect */}
            <span className="pointer-events-none absolute top-0 left-[-100%] z-[1] h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-[left] duration-500 group-hover:left-full" />

            <div className="relative z-[2] mb-0 text-[2.25rem] leading-tight font-semibold text-white">
              {stat.value}
            </div>
            <div className="relative z-[2] mt-0 font-['Playfair_Display',serif] text-2xl leading-tight font-normal text-white">
              {stat.label.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < stat.label.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* About Content */}
      <div className="relative z-[2] mx-auto box-border flex w-full justify-center px-20 py-8 max-lg:px-8 max-md:px-4 max-md:py-6">
        <div
          ref={contentRef}
          className={cn(
            'relative grid w-full max-w-[1100px] [transform:translateY(40px)] grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] grid-rows-[auto_1fr] items-center gap-x-[60px] gap-y-5 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] px-[60px] py-12 opacity-0 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-[20px] transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.4,2,0.6,1)] after:pointer-events-none after:absolute after:inset-0 after:z-[1] after:bg-[url(https://www.transparenttextures.com/patterns/noise.png)] after:opacity-[0.08] max-[1100px]:grid-cols-1 max-[1100px]:gap-10 max-[1100px]:px-[8vw] max-[1100px]:py-10 max-md:gap-8 max-md:px-[8vw] max-md:py-10',
            isVisible && '[transform:translateY(0)] opacity-100'
          )}
        >
          {/* Title Group */}
          <div className="col-span-2 mb-8 text-center max-[1100px]:col-span-1 max-[900px]:mb-0">
            <h3 className="mb-4 text-[2.25rem] font-normal text-white">
              Im Nicko Balmes
            </h3>
            <div className="mb-0 text-center font-['Poppins',sans-serif] text-[1.75rem] font-medium text-white max-[1100px]:mb-6 max-[1100px]:text-xl">
              <span className="inline-block">"UI/UX That Works.</span> Front-End
              That Performs"
            </div>
          </div>

          {/* Image Container */}
          <div className="relative flex items-center justify-center">
            <img
              src={profileImg}
              alt="Nicko Balmes"
              className="animate-floating relative z-[2] h-[280px] w-[280px] rounded-full border-[2px] border-white bg-white object-cover shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-shadow duration-200 hover:shadow-[0_12px_48px_0_#8b5cf680,0_8px_32px_rgba(0,0,0,0.25)] max-[1100px]:h-[140px] max-[1100px]:w-[140px]"
            />
          </div>

          {/* Description */}
          <div className="flex items-center justify-center">
            <p className="m-0 text-left font-['Poppins',sans-serif] text-lg leading-[1.8] font-light text-white max-[1100px]:text-center max-[1100px]:text-base">
              <span className="block indent-8 max-[1100px]:indent-0">
                I'm a 4th year Bachelor of Science in Computer Science student
                with a strong passion for Frontend Development and UI/UX Design.
                I specialize in creating clean, responsive, and user-friendly
                interfaces that not only look good but also offer seamless
                functionality across devices. My goal is to build websites that
                provide meaningful digital experiences by combining thoughtful
                design with practical development. As I continue to grow in this
                field, I aim to improve my skills and contribute to projects
                that prioritize usability and visual clarity.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Spinning Text */}
      <div className="relative z-[2] flex min-h-[200px] flex-wrap items-center justify-center gap-24 px-8 py-16 max-md:flex-col max-md:gap-6 max-md:text-center">
        <h3 className="mb-0 flex-shrink-0 font-['Poppins',sans-serif] text-5xl font-medium text-white max-md:text-[2.2rem]">
          What I can serve
        </h3>
        <SpinningText services={SERVICES} />
      </div>
    </section>
  );
}
