import React, { useState, useEffect, useRef } from 'react';
import './project.css';
import NailsByKheleyImg from '../assets/NailsByKheley.png';
import PAMOImg from '../assets/PAMO.png';
import STIGWACalculatorImg from '../assets/STI-GWA-CALCULATOR.png';

const techIcons = {
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  CSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  HTML: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  Javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  Vite: 'https://vitejs.dev/logo.svg',
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
    description: 'NailsByKheley is a website created to help our client strengthen her online presence. The platform showcases her nail products and services while offering an integrated appointment booking feature, making it easier for customers to connect and book services online.',
    tech: [
      { name: 'HTML', icon: techIcons.HTML },
      { name: 'CSS', icon: techIcons.CSS },
      { name: 'Javascript', icon: techIcons.Javascript },
      { name: 'PHP', icon: techIcons.PHP },
    ],
    image: NailsByKheleyImg,
    demo: 'https://nailsbykheleydev.byethost11.com/public/pages/index.php?i=1',
    github: 'https://github.com/yourusername/nailsbykheley',
    year: 2024,
  },
  {
    title: 'STI GWA Calculator',
    description: 'The STI GWA Calculator is a web application that allows users to calculate their General Weighted Average (GWA) based on their grades and units. It provides a user-friendly interface for students to track their academic performance and plan their academic journey.',
    tech: [
      { name: 'React', icon: techIcons.React },
      { name: 'Vite', icon: techIcons.Vite },
      { name: 'CSS', icon: techIcons.CSS },
    ],
    image: STIGWACalculatorImg,
    demo: 'https://sti-gwa-calculator-rho.vercel.app/',
    github: 'https://github.com/Congroooooo/gwa-calculator',
    year: 2024,
  },
  {
    title: 'PAMO',
    description: 'PAMO is a web-based inventory system developed as part of our thesis project for the school\'s Purchasing Asset and Management Officer. It streamlines stock management by tracking inventory movement—from delivery to selling items to students. The website also allows students to browse available products and place orders or pre-orders. Designed to be user-friendly and responsive, it works seamlessly across all devices.',
    tech: [
      { name: 'HTML', icon: techIcons.HTML },
      { name: 'CSS', icon: techIcons.CSS },
      { name: 'Javascript', icon: techIcons.Javascript },
      { name: 'PHP', icon: techIcons.PHP },
    ],
    image: PAMOImg,
    demo: 'https://pamo.com',
    github: 'https://github.com/yourusername/pamo',
    year: 2025,
  },
];

const ProjectCard = ({ project, index }) => {
  return (
    <div className={`project-card project-card-${index}`} style={{ zIndex: index + 1 }}>
      <div 
        className="project-card-inner" 
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-tech-wrapper">
            {project.tech.map((tech, i) => (
              <img key={i} src={tech.icon} alt={tech.name} className="tech-icon" title={tech.name} />
            ))}
          </div>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-buttons">
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-btn"
            onMouseDown={(e) => e.target.blur()}
          >
            <EyeIcon /> Live Demo
          </a>
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-btn"
            onMouseDown={(e) => e.target.blur()}
          >
            <GithubIcon /> View Code
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header-container">
        <h2 className="projects-header">Projects</h2>
        <div className="projects-underline"></div>
      </div>
      <div className="projects-container">
        {projectData.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;


