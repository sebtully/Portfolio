'use client';

import { useEffect, useState } from 'react';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { projects } from '@/data/projects';

export default function Home() {
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (!showProjects) {
      return;
    }

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('projekter')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [showProjects]);

  return (
    <main className="min-h-screen">
      <HeroSection onShowProjects={() => setShowProjects(true)} />
      {showProjects && <ProjectsSection projects={projects} />}
      <AboutSection />
      <ContactSection />
    </main>
  );
}
