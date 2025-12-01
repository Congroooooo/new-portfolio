import NailsByKheleyImg from "../assets/NailsByKheley.png";
import PAMOImg from "../assets/PAMO.png";
import STIGWACalculatorImg from "../assets/STI-GWA-CALCULATOR.png";
import AlertifyImg from "../assets/Alertify.png";
import WorkHiveImg from "../assets/Workhive.png";
import PrepTalkImg from "../assets/PrepTalk.png";
import BayanimoImg from "../assets/bayanimo.png";

const techIcons = {
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  Javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Vite: "https://vitejs.dev/logo.svg",
};

export const projectsData = [
  {
    title: "PAMO",
    description:
      "PAMO is a responsive web-based inventory system developed for our school's Purchasing Asset and Management Officer. It tracks stock movement from delivery to sales and allows students to browse and place orders or pre-orders with ease.",
    tech: [
      { name: "HTML", icon: techIcons.HTML },
      { name: "CSS", icon: techIcons.CSS },
      { name: "Javascript", icon: techIcons.Javascript },
      { name: "PHP", icon: techIcons.PHP },
    ],
    image: PAMOImg,
    demo: "https://www.onlineedu.shop/Pages/home.php",
    github: "https://github.com/yourusername/pamo",
    year: 2025,
  },
  {
    title: "Alertify",
    description:
      "Alertify is an intelligent earthquake alert system designed to notify users the moment an earthquake occurs. It integrates directly with the USGS API to gather real-time seismic data and instantly sends SMS alerts to keep users informed and safe. The system also includes an AI-powered suggestion engine that provides immediate recommended actions based on the earthquake’s location and severity—helping users respond quickly and appropriately during emergencies.",
    tech: [
      { name: "HTML", icon: techIcons.HTML },
      { name: "CSS", icon: techIcons.CSS },
      { name: "Javascript", icon: techIcons.Javascript },
      { name: "PHP", icon: techIcons.PHP },
    ],
    image: AlertifyImg,
    github: "https://github.com/yourusername/pamo",
    year: 2025,
  },
  {
    title: "Work Hive",
    description:
      "Work Hive is a job-tracking web app that helps users stay organized by listing all the jobs they've applied for in one place. It simplifies the application process, making it easier for users to manage, review, and track their job opportunities without confusion.",
    tech: [
      { name: "HTML", icon: techIcons.HTML },
      { name: "CSS", icon: techIcons.CSS },
      { name: "Javascript", icon: techIcons.Javascript },
      { name: "PHP", icon: techIcons.PHP },
    ],
    image: WorkHiveImg,
    github: "https://github.com/yourusername/pamo",
    year: 2025,
  },
  {
    title: "Bayanimo",
    description:
      "Bayanimo is a gamified project management web app designed to boost community participation by centralizing local initiatives from the barangay level up to the municipal level. It encourages citizens to stay involved, track progress, and collaborate through an engaging, game-inspired system.",
    tech: [
      { name: "HTML", icon: techIcons.HTML },
      { name: "CSS", icon: techIcons.CSS },
      { name: "Javascript", icon: techIcons.Javascript },
      { name: "PHP", icon: techIcons.PHP },
    ],
    image: BayanimoImg,
    github: "https://github.com/yourusername/pamo",
    year: 2025,
  },
  {
    title: "PrepTalk AI",
    description:
      "PreptalkAI is a full-stack web platform that helps freelancers and microentrepreneurs prepare for job interviews or business pitches. It features resume parsing, customizable mock interviews, and is built with scalability in mind. AI-driven feedback and persona simulation are currently under development.",
    tech: [
      { name: "HTML", icon: techIcons.HTML },
      { name: "CSS", icon: techIcons.CSS },
      { name: "Javascript", icon: techIcons.Javascript },
      { name: "PHP", icon: techIcons.PHP },
    ],
    image: PrepTalkImg,
    demo: "https://preptalkai-ruddy.vercel.app/",
    github: "https://github.com/yourusername/pamo",
    year: 2025,
  },
  {
    title: "Nails By Kheley",
    description:
      "NailsByKheley is a website created to help our client strengthen her online presence. The platform showcases her nail products and services while offering an integrated appointment booking feature, making it easier for customers to connect and book services online.",
    tech: [
      { name: "HTML", icon: techIcons.HTML },
      { name: "CSS", icon: techIcons.CSS },
      { name: "Javascript", icon: techIcons.Javascript },
      { name: "PHP", icon: techIcons.PHP },
    ],
    image: NailsByKheleyImg,
    demo: "https://nailsbykheleydev.byethost11.com/public/pages/index.php?i=1",
    github: "https://github.com/yourusername/nailsbykheley",
    year: 2024,
  },
  {
    title: "STI GWA Calculator",
    description:
      "The STI GWA Calculator is a web application that allows users to calculate their General Weighted Average (GWA) based on their grades and units. It provides a user-friendly interface for students to track their academic performance and plan their academic journey.",
    tech: [
      { name: "React", icon: techIcons.React },
      { name: "Vite", icon: techIcons.Vite },
      { name: "CSS", icon: techIcons.CSS },
    ],
    image: STIGWACalculatorImg,
    demo: "https://sti-gwa-calculator-rho.vercel.app/",
    github: "https://github.com/Congroooooo/gwa-calculator",
    year: 2024,
  },
];
