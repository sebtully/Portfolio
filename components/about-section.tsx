'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <motion.section
      id="om-mig"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16"
    >
      <h2 className="section-title">Om mig</h2>
      <p className="section-subtitle">
        Fullstack-udvikler med baggrund som datamatiker, med stærk interesse for moderne webteknologier.
      </p>
      <div className="mt-8 max-w-3xl space-y-4 text-muted">
        <p>
          Jeg brænder for at udvikle løsninger, der holder i længden,
          og som er designet med fokus på struktur, kvalitet og skalerbarhed.
          Jeg motiveres af at forstå forretningen bag funktionaliteten og omsætte komplekse behov til enkle og robuste tekniske løsninger.
        </p>
        <p>
          Jeg trives i miljøer med høj faglighed, tæt sparring og fælles ansvar for arkitektur og kodekvalitet.
          Med en struktureret og nysgerrig tilgang arbejder jeg kontinuerligt på at forbedre både løsninger og processer.
        </p>
      </div>
    </motion.section>
  );
}
