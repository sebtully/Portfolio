import Link from 'next/link';
import { creativeContact } from '@/data/creative-projects';
import { creativeSections } from '@/data/creative-sections';
import { Reveal } from './reveal';

export function CreativeHeader() {
  return (
    <header className="creative-header creative-container">
      <Link href="/creative" className="creative-brand" aria-label="Sebastian Tully Schmidt – kreativ forside">
        <span>Sebastian Tully Schmidt<br /><span className="creative-muted">Video Editor & Graphic Creative</span></span>
      </Link>
      <nav aria-label="Kreativ portfolio" className="creative-nav">
        {Object.values(creativeSections).map((section) => <Link key={section.id} href={`/creative#${section.id}`}>{section.navLabel}</Link>)}
      </nav>
    </header>
  );
}

export function CreativeFooter() {
  return (
    <footer id={creativeSections.contact.id} className="creative-contact creative-container" aria-labelledby="creative-contact-heading">
      <Reveal><h2 id="creative-contact-heading"><a href={`mailto:${creativeContact.email}`} className="creative-contact-title">Lad os skabe<br />noget sammen.</a></h2></Reveal>
      <Reveal><div className="creative-contact-links">
        <a href={`mailto:${creativeContact.email}`}>{creativeContact.email}</a>
        <a href={creativeContact.phoneHref}>{creativeContact.phone}</a>
        <a href={creativeContact.linkedin} target="_blank" rel="noreferrer">LinkedIn<span className="sr-only"> (åbner i en ny fane)</span></a>
      </div></Reveal>
      <div className="creative-colophon"><span>Sebastian Tully Schmidt</span><Link href="/">Mit udviklerportfolio</Link><a href="#creative-top">Til toppen ↑</a></div>
    </footer>
  );
}
