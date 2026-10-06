import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ImpactSection from "@/components/ImpactSection";
import Navbar from "@/components/Navbar";
import PartnersSection from "@/components/PartnersSection";
import VisionSection from "@/components/VisionSection";
import WorkSection from "@/components/WorkSection";

export default function EnglishHome() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#080711]">
            <Navbar />
            <Hero />
            <ImpactSection />
            <PartnersSection />
            <WorkSection />
            <AboutSection />
            <VisionSection />
            <ContactSection />
            <Footer />
        </main>
    );
}