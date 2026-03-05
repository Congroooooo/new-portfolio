import { Navbar } from '@/components/layout';
import { Hero } from '@/features/hero';
import { About } from '@/features/about';
import { Skills } from '@/features/skills';
import { Projects } from '@/features/projects';
import { Events } from '@/features/events';
import { Certificates } from '@/features/certificates';
import { Conclusion } from '@/features/conclusion';
import { Footer } from '@/components/layout';
import { Chatbot } from '@/components/ui';
import { competitionsData } from '@/data/competitionsData';
import { certificatesData } from '@/data/certificatesData';

/**
 * Main Application Component
 *
 * Root component that assembles all feature sections in order:
 * Navbar → Hero → About → Skills → Projects → Events → Certificates → Conclusion → Footer
 */
function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Events eventsData={competitionsData} />
      <Certificates certificatesData={certificatesData} />
      <Conclusion />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
