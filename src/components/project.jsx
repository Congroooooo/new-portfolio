import React, { useState } from 'react';
import './project.css';
import NailsByKheleyImg from '../assets/NailsByKheley.png';
import PAMOImg from '../assets/PAMO.png';
import GWAImg from '../assets/GWA.png';

const techIcons = {
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  Javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
};

const EyeIcon = () => (
  <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
);

const GithubIcon = () => (
  <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" fill="currentColor"/></svg>
);

const projectData = [
  {
    title: 'Nails By Kheley',
    description: 'A portfolio website for a nail artist to showcase her work and book appointments.',
    tech: [
      { name: 'HTML', icon: techIcons.HTML },
      { name: 'CSS', icon: techIcons.CSS },
      { name: 'Javascript', icon: techIcons.Javascript },
      { name: 'PHP', icon: techIcons.PHP },
    ],
    image: NailsByKheleyImg,
    demo: 'https://nailsbykheley.com',
    github: 'https://github.com/yourusername/nailsbykheley',
    bgColor: '#f774df', 
  },
  {
    title: 'PAMO',
    description: 'A music event platform for planning and connecting with artists and fans.',
    tech: [
      { name: 'HTML', icon: techIcons.HTML },
      { name: 'CSS', icon: techIcons.CSS },
      { name: 'Javascript', icon: techIcons.Javascript },
      { name: 'PHP', icon: techIcons.PHP },
    ],
    image: PAMOImg,
    demo: 'https://pamo.com',
    github: 'https://github.com/yourusername/pamo',
    bgColor: '#e6f261',
  },
  {
    title: 'STI GWA Calculator',
    description: 'Lorem ipsum dolor sit amet. Aut unde perferendis ea unde rerum et molestiae voluptas ad veritatis laudantium',
    tech: [
      { name: 'React', icon: techIcons.React },
      { name: 'CSS', icon: techIcons.CSS },
    ],
    image: GWAImg,
    demo: 'https://gwa.com',
    github: 'https://github.com/yourusername/pamo',
    bgColor: '#5b8ef5',
  },
];

const Projects = () => {
  const [hoveredBg, setHoveredBg] = useState(null);

  return (
    <section
      className="projects-section"
      style={{
        background: hoveredBg || undefined,
        transition: 'background 0.5s cubic-bezier(.4,2,.6,1)'
      }}
    >
      <h2 className="projects-header">Featured Projects</h2>
      <div className="projects-underline"></div>
      <div className="projects-container">
        {projectData.map((project, idx) => (
          <div
            className="project-card underlay-card"
            key={idx}
            onMouseEnter={() => setHoveredBg(project.bgColor)}
            onMouseLeave={() => setHoveredBg(null)}
            tabIndex={0}
            onFocus={() => setHoveredBg(project.bgColor)}
            onBlur={() => setHoveredBg(null)}
          >
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            </div>
            <div className="project-underlay">
              <h3 className="project-title underlay-title">{project.title}</h3>
              <p className="project-desc underlay-desc">{project.description}</p>
              <ul className="project-tech underlay-tech">
                {project.tech.map((tech, i) => (
                  <li key={i} className="tech-item">
                    <img src={tech.icon} alt={tech.name + ' logo'} className="tech-icon" />
                    <span className="tech-name">{tech.name}</span>
                  </li>
                ))}
              </ul>
              <div className="project-buttons underlay-buttons">
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-btn underlay-btn">
                  <EyeIcon /> Demo
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn underlay-btn">
                  <GithubIcon /> GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

