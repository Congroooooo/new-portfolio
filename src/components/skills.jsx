import React, { useState, useEffect } from 'react';
import './skills.css';

const techStack = [
  { name: 'HTML', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', proficiency: 'Expert', percentage: 80 },
  { name: 'CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', proficiency: 'Expert', percentage: 80 },
  { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', proficiency: 'Advanced', percentage: 60 },
  { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', proficiency: 'Intermediate', percentage: 50 },
  { name: 'ReactJS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 'Intermediate', percentage: 50 },
  { name: 'Tailwind', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', proficiency: 'Intermediate', percentage: 50 },
  { name: 'PHP', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', proficiency: 'Advanced', percentage: 60 },
  { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 'Beginner', percentage: 30 },
  { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', proficiency: 'Beginner', percentage: 30 },
  { name: 'C++', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', proficiency: 'Beginner', percentage: 30 },
];

const tools = [
  { name: 'Figma', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', description: 'Design', percentage: 80 },
  { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', description: 'Version Control', percentage: 60 },
  { name: 'GitHub', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', description: 'Project Management', percentage: 70 },
  { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', description: 'Database Management', percentage: 80 },
  { name: 'NPM', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', description: 'Package Manager', percentage: 30 },
  { name: 'Jira', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', description: 'Project Tracking', percentage: 50 },
  { name: 'Notion', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg', description: 'Project Management', percentage: 50 },
];

const allSkills = [...techStack, ...tools];

function CircularMeter({ percentage, animate, showLabel }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (animate) {
      let start = 0;
      const duration = 800;
      const startTime = performance.now();
      function animateMeter(now) {
        const elapsed = now - startTime;
        const next = Math.min(percentage, Math.round((elapsed / duration) * percentage));
        setProgress(next);
        if (next < percentage) requestAnimationFrame(animateMeter);
      }
      requestAnimationFrame(animateMeter);
    } else {
      setProgress(0);
    }
  }, [animate, percentage]);
  const radius = 22;
  const stroke = 5;
  const norm = 2 * Math.PI * radius;
  const offset = norm * (1 - progress / 100);
  return (
    <div className="circular-meter">
      <svg width="50" height="50">
        <circle
          cx="25" cy="25" r={radius}
          stroke="#8b8888" strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="25" cy="25" r={radius}
          stroke="#222"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={norm}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: animate ? 'stroke-dashoffset 0.8s cubic-bezier(.4,2,.6,1)' : 'none' }}
        />
        {showLabel && (
          <text
            x="50%" y="50%"
            textAnchor="middle" dominantBaseline="central"
            fontSize="15" fontWeight="bold" fill="#222"
          >
            {progress}%
          </text>
        )}
      </svg>
    </div>
  );
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const getSkills = () => {
    switch (activeFilter) {
      case 'Tech Stack':
        return techStack;
      case 'Tools':
        return tools;
      default:
        return allSkills;
    }
  };

  const isTechStack = (skill) => techStack.some(t => t.name === skill.name);

  return (
    <section className="skills-section">
      <h2 className="skills-header">Skills</h2>
      <div className="skills-underline"></div>
      <div className="skills-filter">
        <button
          className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>
        <button
          className={`filter-btn ${activeFilter === 'Tech Stack' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Tech Stack')}
        >
          Tech Stack
        </button>
        <button
          className={`filter-btn ${activeFilter === 'Tools' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Tools')}
        >
          Tools
        </button>
      </div>
      <div className="skills-grid">
        {getSkills().map((skill) => (
          <div
            key={skill.name}
            className={`skill-card${hovered === skill.name ? ' hovered' : ''}`}
            onMouseEnter={() => setHovered(skill.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={skill.iconUrl} alt={`${skill.name} logo`} className={`skill-icon${hovered === skill.name ? ' zoomed' : ''}`} />
            <div className="skill-info">
              <span className="skill-title">{skill.name}</span>
              {hovered === skill.name && isTechStack(skill) && (
                <>
                  <span className="skill-proficiency">{skill.proficiency}</span>
                </>
              )}
              {hovered === skill.name && !isTechStack(skill) && (
                <span className="skill-description">{skill.description}</span>
              )}
            </div>
            <div className="skill-meter-horizontal">
              <CircularMeter percentage={skill.percentage} animate={hovered === skill.name} showLabel={hovered === skill.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}