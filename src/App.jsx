import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/skills";
import Projects from "./components/project";
import CertificatesSection from "./components/CertificatesSection";
import Conclusion from "./components/Conclusion";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CertificatesSection />
      <Conclusion />
      <Footer />
    </div>
  );
}

export default App;
