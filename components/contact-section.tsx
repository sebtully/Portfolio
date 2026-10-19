import { Reveal } from '@/components/creative/reveal';

export function ContactSection() {
  return (
    <section id="kontakt" className="section-shell developer-contact" aria-labelledby="contact-heading">
      <Reveal><h2 id="contact-heading">Lad os tales ved.</h2></Reveal>
      <div className="contact-content">
        <Reveal><p>Jeg er åben for nye muligheder og samarbejder. Skriv gerne, hvis du vil høre mere.</p></Reveal>
        <Reveal><div className="contact-links">
          <a href="mailto:sebastiantully@gmail.com">sebastiantully@gmail.com</a>
          <a href="tel:+4528553289">+45 28 55 32 89</a>
          <a href="https://www.linkedin.com/in/sebastian-tully-schmidt-2221961b9/" target="_blank" rel="noreferrer">LinkedIn<span className="sr-only"> (åbner i en ny fane)</span></a>
        </div></Reveal>
      </div>
      <div className="developer-colophon"><span>Sebastian Tully Schmidt</span><a href="#top">Til toppen ↑</a></div>
    </section>
  );
}
