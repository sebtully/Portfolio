import { Mail, Linkedin } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="kontakt" className="mx-auto w-full max-w-6xl px-6 py-20">
      <h2 className="section-title">Kontakt</h2>
      <p className="section-subtitle">
        Jeg er åben for nye muligheder og samarbejder. Skriv gerne, hvis du vil høre mere.
      </p>

      <div className="mt-8 flex flex-col gap-4 text-sm md:flex-row md:items-center md:gap-8">
        <a
          href="mailto:dinmail@eksempel.dk"
          className="inline-flex items-center gap-2 text-muted transition hover:text-foreground"
        >
          <Mail size={16} />
          dinmail@eksempel.dk
        </a>
        <a
          href="https://www.linkedin.com/in/dinprofil"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-muted transition hover:text-foreground"
        >
          <Linkedin size={16} />
          linkedin.com/in/dinprofil
        </a>
      </div>
    </section>
  );
}
