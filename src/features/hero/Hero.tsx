import { useTypewriter, useScrambleText, useAnimatedTrails } from '@/hooks';
import { EmailIcon } from '@/components/icons';

const ROLES = ['Nicko Balmes', 'UI/UX Designer', 'Frontend Developer'];

export function Hero() {
  const { text: displayedRole } = useTypewriter(ROLES, {
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 1200,
    loop: true,
  });

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
    <section
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#1a1a1a] text-white max-lg:px-10 max-md:h-[calc(100vh-80px)] max-md:px-5 max-sm:h-[calc(100vh-70px)] max-sm:px-4 min-[1201px]:px-20"
      id="home"
    >
      <div className="absolute inset-0 z-[1]">
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent via-40% to-black/55 to-90%" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="pointer-events-none absolute inset-0">
          {activeTrails.map((trail) => (
            <div
              key={trail.id}
              className="animate-fall absolute -top-[100px] h-20 w-px rounded-[0.5px] shadow-[0_0_4px_rgba(255,255,255,0.3)] max-md:h-[60px] max-sm:h-[50px] max-sm:w-[0.8px] max-sm:opacity-70"
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
      <div className="relative z-[2] flex flex-col items-center justify-center text-center">
        <h1 className="mb-8 text-center text-5xl font-normal [text-shadow:0_2px_10px_rgba(0,0,0,0.3)] max-lg:mb-7 max-lg:text-[2.4rem] max-md:mb-6 max-md:text-[2rem] max-md:leading-tight max-sm:mb-5 max-sm:text-[1.6rem] max-sm:leading-[1.1] min-[1201px]:mb-10 min-[1201px]:text-[3.5rem]">
          Welcome, I'm{' '}
          <span className="font-normal text-white">
            {displayedRole}
            <span className="animate-cursor-blink inline-block w-[1ch]">|</span>
          </span>
        </h1>

        <p className="mb-5 max-w-[700px] text-center text-xl font-light text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)] max-lg:mb-4 max-lg:max-w-[650px] max-lg:text-[1.15rem] max-md:mb-4 max-md:max-w-[600px] max-md:text-[1.1rem] max-md:leading-normal max-sm:mb-3 max-sm:max-w-[95%] max-sm:text-[0.9rem] max-sm:leading-normal min-[1201px]:mb-6 min-[1201px]:max-w-[800px] min-[1201px]:text-[1.3rem]">
          I am a 4th Year Computer Science student and aspiring Frontend
          Developer and UI/UX Designer, passionate about creating user-friendly,
          visually appealing, and functional web interfaces.
        </p>

        <div className="mt-8 flex gap-6 max-md:mt-6 max-md:w-full max-md:flex-col max-md:items-center max-md:gap-4 max-sm:mt-5 max-sm:gap-3">
          <button
            className="group relative z-[3] flex cursor-pointer items-center gap-3 overflow-hidden rounded-[20px] border-2 border-white bg-white/10 px-10 py-4 font-['DM_Serif_Display',serif] text-[1.75rem] font-normal text-white shadow-[0_8px_32px_rgba(255,255,255,0.3)] transition-all duration-300 hover:translate-y-[-2px] hover:scale-[1.02] hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 max-lg:rounded-[18px] max-lg:px-9 max-lg:py-[14px] max-lg:text-[1.6rem] max-md:w-full max-md:max-w-[280px] max-md:justify-center max-md:gap-[10px] max-md:rounded-2xl max-md:px-7 max-md:py-3 max-md:text-[1.3rem] max-sm:max-w-[240px] max-sm:gap-2 max-sm:rounded-xl max-sm:px-6 max-sm:py-[10px] max-sm:text-[1.1rem] min-[1201px]:rounded-[24px] min-[1201px]:px-[45px] min-[1201px]:py-[18px] min-[1201px]:text-[1.9rem]"
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            onMouseDown={(e) => e.currentTarget.blur()}
            onClick={handleContactClick}
            aria-label="Contact me via email"
          >
            <span className="pointer-events-none absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-[left] duration-500 group-hover:left-full" />

            <span className="font-['Courier_New',monospace] tracking-[0.05em] transition-all duration-100 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
              {buttonText}
            </span>

            <EmailIcon className="h-8 w-8 transition-all duration-300 group-hover:scale-110 max-lg:h-[30px] max-lg:w-[30px] max-md:h-7 max-md:w-7 max-sm:h-5 max-sm:w-5 min-[1201px]:h-9 min-[1201px]:w-9" />
          </button>
        </div>
      </div>
    </section>
  );
}
