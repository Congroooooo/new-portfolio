import { useEffect, useRef, useState, MouseEvent } from 'react';
import { useScrambleText } from '@/hooks';
import { ViewIcon } from '@/components/icons';
import { cn } from '@/lib/cn';
import type { SectionId } from '@/types';
import resumePDF from '@/assets/Balmes Resume.pdf';

const NAV_LINKS = [
  { name: 'Home', id: 'home' as SectionId },
  { name: 'About', id: 'about' as SectionId },
  { name: 'Skills', id: 'skills' as SectionId },
  { name: 'Projects', id: 'projects' as SectionId },
  { name: 'Events', id: 'competitions' as SectionId },
  { name: 'Certificates', id: 'certificates' as SectionId },
];

const SCROLL_THRESHOLD = 10;
const HIDE_THRESHOLD = 60;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(window.scrollY);
  const ticking = useRef(false);

  const {
    text: buttonText,
    scramble,
    stopScramble,
  } = useScrambleText('View CV');

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(currentY > SCROLL_THRESHOLD);
          if (currentY > lastScrollY.current && currentY > HIDE_THRESHOLD) {
            setHidden(true);
          } else if (currentY < lastScrollY.current) {
            setHidden(false);
          }

          const sections: SectionId[] = [
            'home',
            'about',
            'skills',
            'projects',
            'competitions',
            'certificates',
          ];

          const windowHeight = window.innerHeight;
          const scrollPosition = currentY + windowHeight / 2;
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section) {
              const sectionTop = section.offsetTop;
              if (scrollPosition >= sectionTop) {
                setActiveSection(sections[i]);
                break;
              }
            }
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    sectionId: SectionId,
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-[100] box-border grid w-full items-center px-16 py-6 transition-all duration-300',
        'grid-cols-[1fr_auto_1fr]',
        'xl:px-20 xl:py-6',
        'lg:px-[60px] lg:py-5',
        'md:grid-cols-[auto_1fr_auto] md:px-10 md:py-4',
        'sm:px-5 sm:py-4',
        'max-[480px]:px-4 max-[480px]:py-3',
        scrolled &&
          'border-b border-white/10 bg-[rgba(26,26,26,0.9)] shadow-[0_4px_32px_rgba(0,0,0,0.3)] backdrop-blur-[20px]',
        !scrolled && 'bg-transparent',
        hidden && 'pointer-events-none -translate-y-full'
      )}
    >
      <div
        className="flex w-fit cursor-pointer items-center justify-start transition-all duration-300 select-none"
        onClick={(e) =>
          handleNavClick('home', e as unknown as MouseEvent<HTMLAnchorElement>)
        }
      >
        <div
          className="font-['Courier_New',monospace] text-[2rem] font-bold text-white transition-all duration-300 hover:translate-y-[-2px]"
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
        >
          &lt;nbDev/&gt;
        </div>
      </div>
      <ul className="col-start-2 m-0 hidden list-none items-center gap-10 justify-self-center p-0 md:flex lg:gap-[35px] xl:gap-[50px]">
        {NAV_LINKS.map((item) => (
          <li key={item.name}>
            <a
              href="#"
              className={cn(
                'relative py-1 text-lg font-light text-white no-underline transition-all duration-300',
                'lg:text-[1.125rem]',
                'md:text-[0.95rem]',
                'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-white/80 after:to-white/40 after:transition-[width] after:duration-300 after:content-[""]',
                'hover:text-white/90 hover:after:w-full',
                'focus:text-white/90 focus:outline-none focus:after:w-full',
                activeSection === item.id && 'text-white/90 after:w-full'
              )}
              style={{
                textShadow:
                  activeSection === item.id
                    ? '0 0 8px rgba(255, 255, 255, 0.3)'
                    : 'none',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textShadow =
                  '0 0 8px rgba(255, 255, 255, 0.3)')
              }
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.textShadow = 'none';
                }
              }}
              onClick={(e) => handleNavClick(item.id, e)}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={resumePDF}
        target="_blank"
        rel="noopener noreferrer"
        className="relative col-start-3 flex hidden items-center justify-self-end overflow-hidden rounded-2xl border-2 border-white bg-white/10 px-6 py-2 font-['Courier_New',monospace] text-xl font-normal tracking-[0.05em] text-white no-underline shadow-[0_8px_32px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] md:flex md:px-4 md:py-1.5 md:text-base lg:px-5 lg:py-1.5 lg:text-[1.1rem]"
        style={{
          textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
        }}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        onMouseDown={(e) => (e.target as HTMLElement).blur()}
      >
        {buttonText}{' '}
        <span className="ml-2 text-2xl transition-transform duration-300">
          <ViewIcon />
        </span>
        <span className="pointer-events-none absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-[left] duration-500 hover:left-full"></span>
      </a>
      <button
        className={cn(
          'z-[101] col-start-3 flex h-[30px] w-[30px] cursor-pointer flex-col justify-around justify-self-end border-none bg-transparent p-0 md:hidden',
          'max-[480px]:h-[25px] max-[480px]:w-[25px]'
        )}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
      >
        <span
          className={cn(
            'h-[3px] w-[30px] origin-[1px] rounded-[3px] bg-white transition-all duration-[0.3s]',
            'max-[480px]:h-[2px] max-[480px]:w-[25px]',
            mobileMenuOpen && 'rotate-45'
          )}
        ></span>
        <span
          className={cn(
            'h-[3px] w-[30px] origin-[1px] rounded-[3px] bg-white transition-all duration-[0.3s]',
            'max-[480px]:h-[2px] max-[480px]:w-[25px]',
            mobileMenuOpen && 'opacity-0'
          )}
        ></span>
        <span
          className={cn(
            'h-[3px] w-[30px] origin-[1px] rounded-[3px] bg-white transition-all duration-[0.3s]',
            'max-[480px]:h-[2px] max-[480px]:w-[25px]',
            mobileMenuOpen && '-rotate-45'
          )}
        ></span>
      </button>
      <div
        className={cn(
          'fixed top-0 z-[99] box-border flex h-screen w-[280px] flex-col gap-10 border-l border-white/10 bg-[rgba(26,26,26,0.98)] px-10 pt-[100px] pb-10 backdrop-blur-[20px] transition-[right] duration-300',
          'max-[480px]:right-[-100vw] max-[480px]:w-screen max-[480px]:px-[30px] max-[480px]:pt-20 max-[480px]:pb-[30px]',
          mobileMenuOpen ? 'right-0' : 'right-[-100%]'
        )}
      >
        <ul className="m-0 flex list-none flex-col gap-[30px] p-0">
          {NAV_LINKS.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={cn(
                  'border-b border-white/10 py-2.5 text-xl font-light text-white no-underline transition-all duration-300',
                  'max-[480px]:text-[1.1rem]',
                  'hover:text-white/90',
                  activeSection === item.id && 'text-white/90'
                )}
                style={{
                  textShadow:
                    activeSection === item.id
                      ? '0 0 8px rgba(255, 255, 255, 0.3)'
                      : 'none',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textShadow =
                    '0 0 8px rgba(255, 255, 255, 0.3)')
                }
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.textShadow = 'none';
                  }
                }}
                onClick={(e) => handleNavClick(item.id, e)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={resumePDF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-white/10 px-5 py-3 font-['Courier_New',monospace] text-[1.1rem] font-normal text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 max-[480px]:px-4 max-[480px]:py-2.5 max-[480px]:text-base"
          onClick={() => setMobileMenuOpen(false)}
        >
          View CV <ViewIcon />
        </a>
      </div>
    </nav>
  );
}
