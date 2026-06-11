import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import CinemaBurden from "@/components/sections/CinemaBurden";
import Convergence from "@/components/sections/Convergence";
import Consultation45 from "@/components/sections/Consultation45";
import VoiceFirst from "@/components/sections/VoiceFirst";
import ConsultMode from "@/components/sections/ConsultMode";
import PatientMemory from "@/components/sections/PatientMemory";
import MultiVisit from "@/components/sections/MultiVisit";
import SmartAppointments from "@/components/sections/SmartAppointments";
import ReceptionFlow from "@/components/sections/ReceptionFlow";
import Billing from "@/components/sections/Billing";
import ProductFilm from "@/components/sections/ProductFilm";
import Principles from "@/components/sections/Principles";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CinemaBurden />
        <Convergence />
        <Consultation45 />
        <VoiceFirst />
        <ConsultMode />
        <PatientMemory />
        <MultiVisit />
        <SmartAppointments />
        <ReceptionFlow />
        <Billing />
        <ProductFilm />
        <Principles />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
