'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

export function ContactSection() {
  const email = 'sebastiantully@gmail.com';
  const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <motion.section
      id="kontakt"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="section-shell py-14 md:py-16"
    >
      <h2 className="section-title">Kontakt</h2>
      <p className="section-subtitle">
        Jeg er åben for nye muligheder og samarbejder. Skriv gerne, hvis du vil høre mere.
      </p>

      <div className="mt-8 flex flex-col gap-4 text-sm md:flex-row md:items-center md:gap-8">
        <a
          href={emailHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-muted transition hover:text-foreground"
        >
          <Mail size={16} />
          {email}
        </a>
        <a
          href="https://www.linkedin.com/in/sebastian-tully-schmidt-2221961b9/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-muted transition hover:text-foreground"
        >
          <Linkedin size={16} />
          linkedin.com/in/sebastian-tully-schmidt
        </a>
      </div>
    </motion.section>
  );
}
