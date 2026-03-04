import { skillsData } from '@/data/skillsData';

export function Skills() {
  return (
    <section
      className="relative bg-[#0a0a0a] px-[5%] py-20 text-white before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] before:bg-[length:50px_50px] before:content-[''] max-md:py-[60px]"
      id="skills"
    >
      <h2 className="relative z-[2] mb-3 text-center font-['Playfair_Display',serif] text-5xl font-normal text-white max-lg:text-[2.8rem] max-md:text-4xl max-sm:text-3xl">
        Skills
      </h2>
      <div className="relative z-[2] mx-auto mb-[60px] h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />

      <div className="relative z-[2] mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5 max-[1200px]:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-[1200px]:gap-[18px] max-[480px]:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] max-[480px]:gap-3 max-md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] max-md:gap-[15px]">
        {skillsData.map((skill) => (
          <div
            key={skill.name}
            className="relative flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-[30px] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-[5px] hover:border-white/30 hover:bg-white/8 hover:shadow-[0_8px_24px_rgba(255,255,255,0.1)] max-[480px]:min-h-[160px] max-[480px]:px-3 max-[480px]:py-5 max-md:min-h-[180px] max-md:px-[15px] max-md:py-[25px]"
          >
            <div className="mb-2 flex h-[60px] w-[60px] items-center justify-center max-[480px]:h-[45px] max-[480px]:w-[45px] max-md:h-[50px] max-md:w-[50px]">
              <img
                src={skill.iconUrl}
                alt={`${skill.name} icon`}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-110 [&[alt='Github_icon']]:brightness-0 [&[alt='Github_icon']]:invert"
                loading="lazy"
              />
            </div>
            <div className="text-center text-[1.1rem] font-semibold tracking-[0.3px] text-white max-[480px]:text-[0.95rem] max-md:text-base">
              {skill.name}
            </div>
            <div className="text-center text-xs font-medium tracking-[1px] text-white/60 uppercase max-md:text-[0.7rem]">
              {skill.category}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
