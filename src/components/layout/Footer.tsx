import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/icons';
import { socialLinks } from '@/config';

const ICON_MAP = {
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Github: GithubIcon,
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-bg text-text-secondary relative px-5 pt-[60px] pb-5">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-[1] h-full w-full"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="relative z-[2] mx-auto flex max-w-[1200px] items-center justify-center">
        <div className="text-center">
          <h3
            className="font-lato text-text-primary mb-[30px] inline-block border-b-2 border-white/20 pb-2.5 text-2xl font-normal transition-colors duration-300 hover:border-white/40"
            style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)' }}
          >
            Connect With Me
          </h3>
          <ul className="m-0 flex list-none flex-wrap justify-center gap-10 p-0 md:gap-5">
            {socialLinks.map((link) => {
              const Icon = ICON_MAP[link.name as keyof typeof ICON_MAP];

              return (
                <li key={link.name} className="mb-0">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="group font-lato text-text-secondary hover:text-text-primary hover:shadow-light relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-base font-normal no-underline transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-gradient-to-r before:from-white/60 before:to-white/20 before:transition-[width] before:duration-300 before:content-[''] hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:before:w-full md:px-4 md:py-2.5 md:text-[0.9rem]"
                    style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}
                  >
                    <span className="h-5 w-5 transition-transform duration-300 group-hover:scale-125">
                      <Icon />
                    </span>
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="relative z-[2] mt-[50px] border-t border-white/10 pt-5 text-center text-sm text-[#888]">
        <p>&copy; {currentYear} Nicko Balmes. All rights reserved.</p>
      </div>
    </footer>
  );
}
