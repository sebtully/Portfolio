import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { creativeContact } from '@/data/creative-projects';
import { creativeSections } from '@/data/creative-sections';

export function CreativeHeader() {
  return (
    <header className="creative-header creative-container">
      <Link href="/creative" className="creative-brand" aria-label="Sebastian Tully Schmidt – kreativ forside">
        <span className="creative-monogram" aria-hidden="true">sts<span>✳</span></span>
        <span>Sebastian Tully Schmidt<br /><span className="creative-muted">Video Editor & Graphic Creative</span></span>
      </Link>
      <nav aria-label="Kreativ portfolio" className="creative-nav">
        {Object.values(creativeSections).map((section) => (
          <Link key={section.id} href={`/creative#${section.id}`}>
            {section.navLabel}<span aria-hidden="true"> ({section.number})</span>
            {section.id === creativeSections.contact.id && <ArrowUpRight size={14} aria-hidden="true" />}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function CreativeFooter() {
  return (
    <footer id={creativeSections.contact.id} className="creative-contact creative-container">
      <div className="creative-section-label"><span>{creativeSections.contact.number} / {creativeSections.contact.label}</span><span>EN GOD IDÉ STARTER MED EN SAMTALE</span></div>
      <a href={`mailto:${creativeContact.email}`} className="creative-contact-title">
        Lad os skabe<br /><span className="creative-serif">noget sammen.</span>
        <ArrowUpRight aria-hidden="true" />
      </a>
      <div className="creative-contact-links">
        <a href={`mailto:${creativeContact.email}`}>{creativeContact.email} <ArrowUpRight size={16} aria-hidden="true" /></a>
        <a href={creativeContact.phoneHref}>{creativeContact.phone}</a>
        <a href={creativeContact.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (åbner i en ny fane)</span></a>
      </div>
      <div className="creative-colophon">
        <span>Sebastian Tully Schmidt</span>
        <Link href="/">Mit udviklerportfolio <ArrowUpRight size={14} aria-hidden="true" /></Link>
        <a href="#creative-top">Til toppen ↑</a>
      </div>
    </footer>
  );
}
