'use client';

import { useEffect, useState } from 'react';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SiteHeader } from '@/components/site-header';
import { projects } from '@/data/projects';
import { Analytics } from '@vercel/analytics/next';


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

  const handleShowProjects = () => {
    if (showProjects) {
      document.getElementById('projekter')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      return;
    }

    setShowProjects(true);
  };

  return (
    <main className="min-h-screen">
      <SiteHeader onShowProjects={handleShowProjects} />
      <HeroSection onShowProjects={handleShowProjects} />
      {showProjects && <ProjectsSection projects={projects} />}
      <AboutSection />
      <footer className="mt-8 border-t border-border bg-card/70">
        <ContactSection />
      </footer>
      <Analytics />
    </main>
  );
}
