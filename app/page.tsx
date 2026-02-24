import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { HeroSection } from '@/components/hero-section';
import { Navbar } from '@/components/navbar';
import { ProjectsSection } from '@/components/projects-section';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProjectsSection projects={projects} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
