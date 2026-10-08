import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { creativeContact, creativeProjects } from '@/data/creative-projects';

export function CreativeHeader() {
  return (
    <header className="creative-header creative-container">
      <Link href="/creative" className="creative-brand" aria-label="Sebastian Tully Schmidt – kreativ forside">
        <span className="creative-monogram" aria-hidden="true">sts<span>✳</span></span>
        <span>Sebastian Tully Schmidt<br /><span className="creative-muted">Video Editor & Graphic Designer</span></span>
      </Link>
      <nav aria-label="Kreativ portfolio" className="creative-nav">
        <Link href="/creative#work">Work<span aria-hidden="true"> ({String(creativeProjects.length).padStart(2, '0')})</span></Link>
        <Link href="/creative#about">About</Link>
        <Link href="/creative#contact">Contact <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}

export function CreativeFooter() {
  return (
    <footer id="contact" className="creative-contact creative-container">
      <div className="creative-section-label"><span>03 / CONTACT</span><span>EN GOD IDÉ STARTER MED EN SAMTALE</span></div>
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
        <Link href="/">Min udviklerportfolio <ArrowUpRight size={14} aria-hidden="true" /></Link>
        <a href="#creative-top">Til toppen ↑</a>
      </div>
    </footer>
  );
}
