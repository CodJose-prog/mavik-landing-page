import Contact from "../components/Contact";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Saas from "../components/Saas";
import Plans from "../components/Plans";
import Projects from "../components/Projects";
import Systems from "../components/Systems";
import CheckoutWhatsApp from "../src/components/checkout/CheckoutWhatsApp";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <Saas />
      <Projects />
      <Plans />
      <Systems />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <CheckoutWhatsApp />
    </main>
  );
}
