import React from "react";
import "./skills.css";

const skillsData = [
  {
    name: "HTML",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "FRONTEND",
  },
  {
    name: "CSS",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "FRONTEND",
  },
  {
    name: "JavaScript",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "FRONTEND",
  },
  {
    name: "TailwindCSS",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "FRONTEND",
  },
  {
    name: "ReactJS",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "FRONTEND",
  },
  {
    name: "Typescript",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "FRONTEND",
  },
  {
    name: "NextJS",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "LANGUAGE",
  },
  {
    name: "Git",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "VERSION CONTROL",
  },
  {
    name: "Github",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    category: "VERSION CONTROL",
  },
  {
    name: "PHP",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    category: "BACKEND",
  },
  {
    name: "MongoDB",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "DATABASE",
  },
  {
    name: "MySQL",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "DATABASE",
  },
  {
    name: "Python",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "LANGUAGE",
  },
  {
    name: "Java",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "LANGUAGE",
  },
  {
    name: "Notion",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
    category: "PROJECT MANAGEMENT",
  },
  {
    name: "Jira",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    category: "PROJECT MANAGEMENT",
  },
  {
    name: "Docker",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "DEVOPS",
  },
  {
    name: "Figma",
    iconUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "STYLING",
  },
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <h2 className="skills-header">Skills</h2>
      <div className="skills-underline"></div>
      <div className="skills-grid">
        {skillsData.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-icon-wrapper">
              <img
                src={skill.iconUrl}
                alt={`${skill.name} icon`}
                className="skill-icon"
              />
            </div>
            <div className="skill-name">{skill.name}</div>
            <div className="skill-category">{skill.category}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
