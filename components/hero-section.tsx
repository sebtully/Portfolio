import Image from 'next/image';
import { ArrowDown, Linkedin } from 'lucide-react';
import profilePicture from '@/public/media/Profile Picture/PortfolioProfilBillede.png';
import numberBackdrop from '@/public/media/Backdrop/Number Backdrop.png';
import { Reveal } from '@/components/creative/reveal';

export function HeroSection() {
  return (
    <section className="developer-hero" aria-labelledby="hero-heading">
      <Image src={numberBackdrop} alt="" aria-hidden="true" fill sizes="(max-width: 760px) 2000px, 1280px" className="hero-number-backdrop" />
      <span className="hero-code-mark hero-code-open" aria-hidden="true">{'{'}</span>
      <div className="section-shell hero-stage">
        <div className="developer-hero-copy">
          <Reveal><h1 id="hero-heading">Hej, jeg er<br />Sebastian.</h1></Reveal>
          <Reveal><p className="hero-intro">Datamatiker og Full Stack Developer. Jeg bygger interne systemer fra frontend til database.</p></Reveal>
          <Reveal><a href="#projekter" className="hero-project-link"><span className="hero-scroll-button"><ArrowDown size={24} aria-hidden="true" /></span><span>Se projekter</span></a></Reveal>
        </div>
        <Reveal className="hero-portrait">
          <Image src={profilePicture} alt="Portræt af Sebastian Tully Schmidt" priority sizes="(max-width: 760px) 140vw, (max-width: 1100px) 75vw, 900px" />
        </Reveal>
        <aside className="hero-rail" aria-label="Lær mig at kende">
          <Reveal><div className="hero-note">
            <h2>Om mig</h2>
            <p>Jeg arbejder hos Rosholm Connect med CRM, integrationer og nye interne løsninger.</p>
            <a href="#om-mig" className="hero-note-link">Lær mig at kende</a>
          </div></Reveal>
          <Reveal><div className="hero-note">
            <h2>Mit arbejde</h2>
            <p>Fra kundesites til systemer, der samler data og gør hverdagens opgaver enklere.</p>
            <a href="#projekter" className="hero-note-link">Udforsk projekterne</a>
          </div></Reveal>
          <Reveal><div className="hero-note">
            <h2>Find mig</h2>
            <a href="https://www.linkedin.com/in/sebastian-tully-schmidt-2221961b9/" className="hero-social-link" target="_blank" rel="noreferrer"><Linkedin size={20} aria-hidden="true" /> LinkedIn<span className="sr-only"> (åbner i en ny fane)</span></a>
          </div></Reveal>
        </aside>
      </div>
      <span className="hero-code-mark hero-code-close" aria-hidden="true">{'};'}</span>
    </section>
  );
}
