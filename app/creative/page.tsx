import Link from 'next/link';
import Image from 'next/image';
import profilePicture from '@/public/media/Profile Picture/Profilbillede.jpg';
import { CreativeProjectCard } from '@/components/creative/project-card';
import { Reveal } from '@/components/creative/reveal';
import { creativeProjects } from '@/data/creative-projects';
import { creativeSections } from '@/data/creative-sections';

export default function CreativeHome() {
  return (
    <main id="creative-main" tabIndex={-1} className="creative-container">
      <section className="creative-hero" aria-labelledby="creative-heading">
        <div className="creative-hero-main">
          <div>
            <Reveal><h1 id="creative-heading">Visuelle idéer.<br />I bevægelse.</h1></Reveal>
            <Reveal><p className="creative-hero-description">Video Editor & Graphic Creative med et øje for det visuelle og en baggrund i softwareudvikling.</p></Reveal>
            <Reveal><a href={`#${creativeSections.work.id}`} className="creative-work-link">Udforsk mit arbejde</a></Reveal>
          </div>
          <Reveal><figure className="creative-portrait"><Image src={profilePicture} alt="Portræt af Sebastian Tully Schmidt" sizes="(max-width: 640px) 90vw, 35vw" priority placeholder="blur" /></figure></Reveal>
        </div>
      </section>
      <section id={creativeSections.work.id} className="creative-work" aria-labelledby="work-heading">
        <Reveal><div className="creative-section-heading"><h2 id="work-heading">Udvalgt arbejde</h2><p>Fra leveret materiale til et færdigt visuelt udtryk.</p></div></Reveal>
        <div className="creative-project-grid">
          {creativeProjects.map((project) => <Reveal key={project.slug}><CreativeProjectCard project={project} /></Reveal>)}
        </div>
      </section>
      <section id={creativeSections.about.id} className="creative-about" aria-labelledby="about-heading">
        <Reveal><h2 id="about-heading">Kreativt blik.<br />Teknisk baggrund.</h2></Reveal>
        <div className="creative-about-grid">
          <div className="creative-about-copy">
            <Reveal><p>Jeg hedder Sebastian Tully Schmidt. Jeg arbejder med videoredigering og grafisk design, fra klipning og grafiske elementer til den sidste visuelle efterbehandling.</p></Reveal>
            <Reveal><p>Min baggrund i softwareudvikling giver mig en struktureret tilgang til det kreative arbejde. Jeg er optaget af, hvordan billeder, typografi og bevægelse kan spille sammen i et klart udtryk.</p></Reveal>
            <Reveal><div className="creative-tools"><h3>Mine værktøjer</h3><p>Jeg arbejder i Adobe-pakken, især med:</p><ul><li>Premiere Pro</li><li>After Effects</li><li>Media Encoder</li><li>Photoshop</li></ul></div></Reveal>
            <Reveal><Link href="/" className="creative-text-link">Mød min tekniske side</Link></Reveal>
          </div>
          <div className="creative-experience">
            <Reveal><h3>Erfaring</h3></Reveal>
            <Reveal><div className="creative-experience-row"><div><h4>JS Danmark</h4><p>Videoredigering, grafisk design og visuelt indhold til virksomheder.</p></div><span>2023–2025</span></div></Reveal>
            <Reveal><div className="creative-experience-row"><div><h4>Grown Up Group</h4><p>Reklamevideoer og kampagnemateriale.</p></div><span>Freelance</span></div></Reveal>
            <Reveal><div className="creative-experience-row"><div><h4>Caretoons</h4><p>Freelance · Animation / Visuelt indhold</p></div><span>Freelance</span></div></Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
