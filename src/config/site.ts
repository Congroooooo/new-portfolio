// Site Configuration
// Metadata and general site information

export const siteConfig = {
  name: 'Nicko Balmes',
  title: 'Frontend Developer & UI/UX Designer',
  description:
    'Portfolio of Nicko Balmes - 4th Year Computer Science student and aspiring Frontend Developer',
  author: {
    name: 'Nicko Balmes',
    email: 'your-email@example.com', // TODO: Add your email
    github: 'https://github.com/yourusername', // TODO: Add your GitHub
    linkedin: 'https://linkedin.com/in/yourusername', // TODO: Add your LinkedIn
  },
} as const;

export type SiteConfig = typeof siteConfig;
