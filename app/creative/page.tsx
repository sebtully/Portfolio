import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import profilePicture from '@/public/media/Profile Picture/Profilbillede.jpg';
import { CreativeProjectCard } from '@/components/creative/project-card';
import { Reveal } from '@/components/creative/reveal';
import { creativeProjects } from '@/data/creative-projects';

export default function CreativeHome() {
  return (
    <main id="creative-main" tabIndex={-1} className="creative-container">
      <section className="creative-hero" aria-labelledby="creative-heading">
        <div className="creative-hero-kicker"><span className="creative-eyebrow">SEBASTIAN TULLY SCHMIDT / CREATIVE PORTFOLIO</span><span className="creative-hero-index" aria-hidden="true">© STS</span></div>
        <div className="creative-hero-main">
          <Reveal>
            <h1 id="creative-heading">Visuelle idéer.<br /><span className="creative-serif">I bevægelse.</span><span className="creative-heading-dot" aria-hidden="true">↗</span></h1>
          </Reveal>
          <figure className="creative-portrait">
            <Image src={profilePicture} alt="Portræt af Sebastian Tully Schmidt" sizes="(max-width: 640px) 100px, (max-width: 1000px) 180px, 260px" priority placeholder="blur" />
            <figcaption>Sebastian Tully Schmidt</figcaption>
          </figure>
        </div>
        <div className="creative-hero-bottom">
          <a href="#work" className="creative-work-link"><span className="creative-round-arrow"><ArrowDown size={19} aria-hidden="true" /></span>Udforsk mit arbejde</a>
          <p>Video Editor & Graphic Creative med et øje for det visuelle og en baggrund i softwareudvikling.</p>
        </div>
      </section>

      <section id="work" className="creative-work" aria-labelledby="work-heading">
        <div className="creative-section-label"><span>01 / SELECTED WORK</span><span>VIDEO & GRAFISK DESIGN</span></div>
        <div className="creative-section-heading"><h2 id="work-heading">Udvalgt arbejde<span className="creative-count">({String(creativeProjects.length).padStart(2, '0')})</span></h2><p>Fra leveret materiale<br />til et færdigt visuelt udtryk.</p></div>
        <div className="creative-project-grid">
          {creativeProjects.map((project, index) => <Reveal key={project.slug}><CreativeProjectCard project={project} index={index} /></Reveal>)}
        </div>
      </section>

      <section id="about" className="creative-about" aria-labelledby="about-heading">
        <div className="creative-section-label"><span>02 / ABOUT</span><span>KREATIVITET MØDER STRUKTUR</span></div>
        <div className="creative-about-grid">
          <div><span className="creative-eyebrow">LIDT OM MIG</span><h2 id="about-heading">Et visuelt blik.<br /><span className="creative-serif">Et teknisk mindset.</span></h2></div>
          <div className="creative-about-copy">
            <p>Jeg hedder Sebastian Tully Schmidt. Jeg arbejder med videoredigering og grafisk design — fra klipning og grafiske elementer til den sidste visuelle efterbehandling.</p>
            <p>Min baggrund i softwareudvikling giver mig en struktureret tilgang til det kreative arbejde. Jeg er optaget af, hvordan billeder, typografi og bevægelse kan spille sammen i et klart udtryk.</p>
            <div className="mt-7 border-t border-[var(--creative-line)] pt-5">
              <h3 className="creative-eyebrow">ADOBE CREATIVE CLOUD</h3>
              <p className="mt-2">Jeg arbejder i Adobe-pakken, især med:</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-medium">
                <li>Premiere Pro</li>
                <li>After Effects</li>
                <li>Media Encoder</li>
                <li>Photoshop</li>
              </ul>
            </div>
            <Link href="/" className="creative-text-link">Mød min tekniske side <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="creative-experience">
          <div className="creative-experience-label">ERFARING</div>
          <div>
            <div className="creative-experience-row"><div><h3>JS Danmark</h3><p>Videoredigering, grafisk design og visuelt indhold til virksomheder.</p></div><span>2023 — 2025</span></div>
            <div className="creative-experience-row"><div><h3>Grown Up Group</h3><p>Reklamevideoer og kampagnemateriale.</p></div><span>Freelance</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
