import Link from 'next/link';
import Image from 'next/image';
import profilePicture from '@/public/media/Profile Picture/PortfolioProfilBillede2.png';
import { CreativeProjectCard } from '@/components/creative/project-card';
import { Reveal } from '@/components/creative/reveal';
import { creativeProjects } from '@/data/creative-projects';
import { creativeSections } from '@/data/creative-sections';
import { TypingText } from '@/components/animate-ui/typing-text';
import { CreativeTools } from '@/components/creative/tools';
import { CreativeExperience } from '@/components/creative/experience';
import { AIShowcase } from '@/components/creative/ai-showcase';
import { creativeAIProjects } from '@/data/creative-ai-projects';

export default function CreativeHome() {
  return (
    <main id="creative-main" tabIndex={-1} className="creative-container">
      <section className="creative-hero" aria-labelledby="creative-heading">
        <div className="creative-hero-main">
          <div>
            <h1 id="creative-heading">Visuelle idéer.<br /><TypingText text="I bevægelse." /></h1>
            <Reveal><p className="creative-hero-description">Video Editor & Graphic Creative med et øje for det visuelle og en baggrund i softwareudvikling.</p></Reveal>
            <Reveal><a href={`#${creativeSections.work.id}`} className="creative-work-link">Udforsk mit arbejde</a></Reveal>
          </div>
          <figure className="creative-portrait">
            <div className="creative-portrait-backdrop" aria-hidden="true" />
            <div className="creative-portrait-person"><Image src={profilePicture} alt="Portræt af Sebastian Tully Schmidt" sizes="(max-width: 640px) calc(100vw - 16px), 50vw" priority /></div>
          </figure>
        </div>
      </section>
      <AIShowcase projects={creativeAIProjects} />
      <section id={creativeSections.work.id} className="creative-work" aria-labelledby="work-heading">
        <Reveal><div className="creative-section-heading"><h2 id="work-heading">Udvalgt arbejde.</h2><p>Fra leveret materiale til et færdigt visuelt udtryk.</p></div></Reveal>
        <div className="creative-project-grid">
          {creativeProjects.map((project) => <Reveal key={project.slug}><CreativeProjectCard project={project} /></Reveal>)}
        </div>
      </section>
      <section id={creativeSections.about.id} className="creative-about" aria-labelledby="about-heading">
        <Reveal><h2 id="about-heading">Kreativt blik.<br />Teknisk baggrund.</h2></Reveal>
        <div className="creative-about-grid">
          <div className="creative-about-copy">
            <Reveal><p>Jeg hedder Sebastian Tully Schmidt. Jeg arbejder med videoredigering og grafisk design, fra klipning og grafiske elementer til den sidste visuelle efterbehandling.</p></Reveal>
            <Reveal><p>Jeg eksperimenterer også med AI-billedgenerering i selvinitierede koncepter. I dialog med ChatGPT udforsker jeg idéer, prompts og variationer i komposition, lys og materialer. Det giver mig mulighed for at undersøge, hvordan en beskrevet stemning kan blive til et visuelt udtryk, og hvordan samme motiv fungerer i forskellige formater.</p></Reveal>
            <Reveal><p>I portfolioen viser jeg de gemte prompts og billedversioner, så ændringer i udsnit, tekstplads og detaljefokus kan følges. Processen viser også begrænsningerne: Små detaljer i produkter kan ændre sig, og motivet kan blive beskåret anderledes end ønsket. Derfor er sammenligning og visuel vurdering en vigtig del af arbejdet med AI-billeder.</p></Reveal>
            <Reveal><p>Min baggrund i softwareudvikling giver mig en struktureret tilgang til det kreative arbejde. Jeg er optaget af, hvordan billeder, typografi og bevægelse kan spille sammen i et klart udtryk.</p></Reveal>
            <Reveal><CreativeTools /></Reveal>
            <Reveal><Link href="/" className="creative-text-link">Mød min tekniske side</Link></Reveal>
          </div>
          <Reveal><CreativeExperience /></Reveal>
        </div>
      </section>
    </main>
  );
}
