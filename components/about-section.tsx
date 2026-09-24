'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <motion.section
      id="om-mig"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="section-shell scroll-mt-24 py-14 md:py-16"
    >
      <h2 className="section-title">Om mig</h2>
      <p className="section-subtitle">
        Datamatiker og Full Stack Developer med erfaring fra interne systemer, CRM og kundeprojekter.
      </p>
      <div className="copy-width mt-8 space-y-4 text-muted">
        <p>
          Jeg arbejder deltid som Full Stack Developer hos Rosholm Connect, hvor jeg videreudvikler virksomhedens CRM-løsning og er med til at udvikle nye interne systemer, herunder en kommende ERP-løsning. Mine opgaver spænder over frontend, backend, database og integrationer.
        </p>
        <p>
          Tidligere har jeg været i praktik som Full Stack Developer hos Norlys, hvor jeg arbejdede med C#/.NET, React, TypeScript, Azure, DevOps og Entra ID. Jeg lærer hurtigt, går op i kvalitet og motiveres af at omsætte komplekse behov til løsninger, der fungerer i praksis.
        </p>
      </div>
    </motion.section>
  );
}
