import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { HeroSection } from '@/components/hero-section';
import { HeroScroll } from '@/components/hero-scroll';
import { ProjectsSection } from '@/components/projects-section';
import { SiteHeader } from '@/components/site-header';
import { projects } from '@/data/projects';
import { Analytics } from '@vercel/analytics/next';

export default function Home() {
  return (
    <div id="top" className="developer-shell">
      <a href="#main" className="skip-link">Gå til indhold</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <HeroScroll hero={<HeroSection />}>
          <ProjectsSection projects={projects} />
          <AboutSection />
        </HeroScroll>
      </main>
      <footer className="developer-footer"><ContactSection /></footer>
      <Analytics />
    </div>
  );
}
