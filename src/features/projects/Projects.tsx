import { projectsData } from '@/data/projectsData';
import { DotGrid } from '@/components/effects';
import { EyeIcon, GithubProjectIcon } from '@/components/icons';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    demo?: string;
    github: string;
    tech: Array<{
      name: string;
      icon: string;
    }>;
  };
  index: number;
}

/**
 * ProjectCard Component
 *
 * Individual project card displaying project details, technologies,
 * and action buttons for demo and GitHub repository.
 */
function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div
      className="flex items-stretch justify-center max-md:px-5"
      style={{ zIndex: index + 1 }}
    >
      <div
        className="group relative h-[450px] w-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center bg-no-repeat shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-[400ms] ease-[ease] hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-[1200px]:h-[400px] max-[1024px]:h-[450px] max-[480px]:h-[400px]"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        {/* Border shimmer effect */}
        <div className="pointer-events-none absolute inset-0 z-[1] rounded-3xl bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.1),transparent)] [mask-composite:exclude] p-0.5 opacity-0 transition-opacity duration-[400ms] [-webkit-mask-composite:xor] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] group-hover:opacity-100" />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(135deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)] opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100" />

        {/* Content */}
        <div className="absolute top-[30px] right-10 bottom-[100px] left-10 z-[3] flex [transform:translateY(20px)] flex-col overflow-hidden text-white opacity-0 transition-all delay-[100ms] duration-[400ms] group-hover:[transform:translateY(0)] group-hover:opacity-100 max-[1024px]:top-[25px] max-[1024px]:right-[30px] max-[1024px]:bottom-[90px] max-[1024px]:left-[30px] max-[480px]:top-[18px] max-[480px]:right-5 max-[480px]:bottom-[85px] max-[480px]:left-5 max-md:top-5 max-md:right-[25px] max-md:bottom-[90px] max-md:left-[25px]">
          <h3 className="m-0 mb-4 max-w-full flex-shrink-0 [transform:translateY(20px)] font-['DM_Serif_Display',serif] text-[2.2rem] leading-[1.2] text-white transition-transform delay-[200ms] duration-[400ms] [text-shadow:0_4px_16px_rgba(0,0,0,0.8)] group-hover:[transform:translateY(0)] max-[1024px]:text-[2rem] max-[480px]:mb-[10px] max-[480px]:text-2xl max-md:mb-3 max-md:text-[1.8rem]">
            {project.title}
          </h3>
          <div className="mb-4 flex flex-shrink-0 [transform:translateY(20px)] flex-wrap gap-[10px] transition-transform delay-[300ms] duration-[400ms] group-hover:[transform:translateY(0)] max-[480px]:mb-3 max-[480px]:gap-2">
            {project.tech.map((tech, i) => (
              <img
                key={i}
                src={tech.icon}
                alt={tech.name}
                className="h-9 w-9 rounded-[10px] border border-white/30 bg-white/15 p-[7px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-white/25 hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)] max-[480px]:h-8 max-[480px]:w-8"
                title={tech.name}
                loading="lazy"
              />
            ))}
          </div>
          <p className="min-h-0 flex-1 [transform:translateY(20px)] overflow-x-hidden overflow-y-auto rounded-xl border border-white/10 bg-black/40 p-4 font-['Poppins',sans-serif] text-[0.95rem] leading-[1.6] text-white/95 backdrop-blur-[10px] transition-transform delay-[400ms] duration-[400ms] [scrollbar-color:rgba(255,255,255,0.3)_rgba(255,255,255,0.1)] [scrollbar-width:thin] [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] group-hover:[transform:translateY(0)] max-[1024px]:text-[0.9rem] max-[480px]:p-3 max-[480px]:text-[0.85rem] max-md:p-[14px] max-md:text-[0.88rem]">
            {project.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="absolute bottom-10 left-10 z-[3] flex [transform:translateY(20px)] gap-4 opacity-0 transition-all delay-[500ms] duration-[400ms] group-hover:[transform:translateY(0)] group-hover:opacity-100 max-[1024px]:bottom-[30px] max-[1024px]:left-[30px] max-[480px]:bottom-5 max-[480px]:left-5 max-[480px]:gap-2 max-md:bottom-[25px] max-md:left-[25px] max-md:flex-row max-md:gap-[10px]">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl border-2 border-white/30 bg-black/80 px-7 py-[14px] font-['Poppins',sans-serif] text-base font-semibold text-white backdrop-blur-[15px] transition-all duration-300 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] hover:-translate-y-[3px] hover:border-white/50 hover:bg-white/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 max-[480px]:px-[18px] max-[480px]:py-[10px] max-[480px]:text-[0.82rem] max-md:px-6 max-md:py-3 max-md:text-[0.9rem]"
              onMouseDown={(e) => e.currentTarget.blur()}
            >
              <span className="pointer-events-none absolute top-0 left-[-100%] h-full w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] transition-[left] duration-500 group-hover/btn:left-full" />
              <EyeIcon className="h-[1.2em] w-[1.2em] transition-transform duration-300 group-hover/btn:scale-110" />{' '}
              Live Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl border-2 border-white/30 bg-black/80 px-7 py-[14px] font-['Poppins',sans-serif] text-base font-semibold text-white backdrop-blur-[15px] transition-all duration-300 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] hover:-translate-y-[3px] hover:border-white/50 hover:bg-white/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 max-[480px]:px-[18px] max-[480px]:py-[10px] max-[480px]:text-[0.82rem] max-md:px-6 max-md:py-3 max-md:text-[0.9rem]"
            onMouseDown={(e) => e.currentTarget.blur()}
          >
            <span className="pointer-events-none absolute top-0 left-[-100%] h-full w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] transition-[left] duration-500 group-hover/btn:left-full" />
            <GithubProjectIcon className="h-[1.2em] w-[1.2em] transition-transform duration-300 group-hover/btn:scale-110" />{' '}
            View Code
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Projects Section Component
 *
 * Showcase section displaying portfolio projects in a grid layout.
 * Each project card includes:
 * - Project image background
 * - Title and description
 * - Technology stack icons
 * - Links to live demo and GitHub repository
 *
 * @example
 * ```tsx
 * <Projects />
 * ```
 */
export function Projects() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
      id="projects"
    >
      <DotGrid />
      <div className="relative z-[10] px-5 pt-[100px] pb-[50px] text-center">
        <h2 className="relative z-[2] mb-3 text-center font-['Playfair_Display',serif] text-5xl font-normal text-white max-lg:text-[2.8rem] max-md:text-4xl max-sm:text-3xl">
          Projects
        </h2>
        <div className="relative z-[2] mx-auto mb-12 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 max-md:mb-16 max-sm:mb-12" />
      </div>
      <div className="relative z-[10] mx-auto grid max-w-[1600px] grid-cols-2 gap-[30px] px-[3%] pb-[100px] max-[1200px]:grid-cols-1 max-[1200px]:px-[4%]">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
