import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/skills";
import Projects from "./components/project";
import Events from "./components/Events";
import CertificatesSection from "./components/CertificatesSection";
import Conclusion from "./components/Conclusion";
import Footer from "./components/Footer";
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
