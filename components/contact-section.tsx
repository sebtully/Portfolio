import { Reveal } from '@/components/creative/reveal';

import { Linkedin, Mail, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="kontakt" className="section-shell developer-contact" aria-labelledby="contact-heading">
      <Reveal><h2 id="contact-heading">Lad os tales ved.</h2></Reveal>
      <div className="contact-content">
        <Reveal><p>Jeg er åben for nye muligheder og samarbejder. Skriv gerne, hvis du vil høre mere.</p></Reveal>
        <Reveal><div className="contact-links">
          <a href="mailto:sebastiantully@gmail.com"><Mail size={20} aria-hidden="true" /><span>sebastiantully@gmail.com</span></a>
          <a href="tel:+4528553289"><Phone size={20} aria-hidden="true" /><span>+45 28 55 32 89</span></a>
          <a href="https://www.linkedin.com/in/sebastian-tully-schmidt-2221961b9/" target="_blank" rel="noreferrer"><Linkedin size={20} aria-hidden="true" /><span>LinkedIn<span className="sr-only"> (åbner i en ny fane)</span></span></a>
        </div></Reveal>
      </div>
      <div className="developer-colophon"><span>Sebastian Tully Schmidt</span><a href="#top">Til toppen ↑</a></div>
    </section>
  );
}
