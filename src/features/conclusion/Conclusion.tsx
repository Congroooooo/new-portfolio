import { useScrambleText, useAnimatedTrails } from '@/hooks';
import { EmailIcon } from '@/components/icons';

export function Conclusion() {
  const {
    text: buttonText,
    scramble,
    stopScramble,
  } = useScrambleText('Hire Me');

  const activeTrails = useAnimatedTrails({
    gridSize: 50,
    duration: 3.5,
    minDelay: 1000,
    maxDelay: 5000,
  });

  const handleContactClick = () => {
    window.open('mailto:nckoblms@gmail.com', '_blank');
  };

  return (
    <section className="bg-primary-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-[100px] text-center text-white max-md:py-20">
      {/* Background */}
      <div className="absolute inset-0 z-[1]">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Falling trails */}
        <div className="pointer-events-none absolute inset-0">
          {activeTrails.map((trail) => (
            <div
              key={trail.id}
              className="animate-fall absolute -top-[100px] h-20 w-px rounded-[0.5px] shadow-[0_0_4px_rgba(255,255,255,0.3)]"
              style={{
                left: `${trail.left}%`,
                animationDuration: `${trail.duration}s`,
                background:
                  'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.6), rgba(255,255,255,0.9))',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center justify-center">
        <h2 className="font-playfair relative z-[2] mb-3 text-center text-5xl font-normal text-white max-lg:text-[2.8rem] max-md:text-4xl max-sm:text-3xl">
          Let's Connect !
        </h2>
        <div className="relative z-[2] mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
        <p className="font-lato text-text-muted mb-10 max-w-[700px] text-xl leading-[1.6] font-light shadow-[0_2px_12px_rgba(0,0,0,0.6)] max-[480px]:text-base max-md:text-lg">
          Thank you for taking the time to explore my portfolio! I'm excited
          about the opportunity to connect and collaborate, and I look forward
          to what we can create together.
        </p>
        <div className="flex gap-6">
          <button
            onClick={handleContactClick}
            className="group bg-glass-bg font-playfair hover:bg-glass-bg-hover relative z-[3] flex cursor-pointer items-center gap-3 overflow-hidden rounded-[20px] border-2 border-white px-10 py-4 text-[1.75rem] font-normal text-white shadow-[0_8px_32px_rgba(255,255,255,0.3)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 max-[480px]:px-8 max-[480px]:py-[14px] max-[480px]:text-2xl max-md:text-2xl"
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            onMouseDown={(e) => e.currentTarget.blur()}
            aria-label="Contact me via email"
          >
            <span className="pointer-events-none absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-[left] duration-500 group-hover:left-full" />
            <span className="font-['Courier_New',monospace] tracking-[0.05em] transition-all duration-100 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
              {buttonText}
            </span>
            <EmailIcon className="relative z-[2] h-8 w-8 transition-all duration-300 group-hover:scale-110" />
          </button>
        </div>
      </div>
    </section>
  );
}
