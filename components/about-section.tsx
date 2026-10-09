'use client';

import { motion } from 'framer-motion';
import { developerSkills } from '@/data/skills';

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
      <div id="kompetencer" className="mt-10 scroll-mt-24">
        <h3 className="text-xl font-semibold">Teknologier & kompetencer</h3>
        <p className="mt-2 text-sm text-muted">Sprog, frameworks og værktøjer fra mine projekter og min erfaring.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {developerSkills.map((category) => (
            <div key={category.title} className="rounded-2xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold">{category.title}</h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <li key={skill} className="rounded-full bg-background px-3 py-1.5 text-xs text-foreground">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
