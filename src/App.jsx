import Navbar from "./pages/navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/skills";
import Projects from "./pages/project";
import Events from "./pages/Events";
import CertificatesSection from "./pages/CertificatesSection";
import Conclusion from "./pages/Conclusion";
import Footer from "./pages/Footer";
import { competitionsData } from "./data/competitionsData";
import { certificatesData } from "./data/certificatesData";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Events eventsData={competitionsData} />
      <CertificatesSection certificatesData={certificatesData} />
      <Conclusion />
      <Footer />
    </div>
  );
}

export default App;
