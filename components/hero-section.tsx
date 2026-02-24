'use client';

import { motion } from 'framer-motion';

type HeroSectionProps = {
  onShowProjects: () => void;
};

export function HeroSection({ onShowProjects }: HeroSectionProps) {
  return (
    <section id="top" className="mx-auto flex min-h-[72vh] w-full max-w-6xl items-center px-6 py-16 md:py-20">
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          Full Stack-Udvikler Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-4xl font-bold leading-tight md:text-6xl"
        >
          Hej, mit navn er Sebastian.
          <span className="text-muted">Jeg brænder for at udvikle moderne software med teknisk kvalitet og forretningsværdi i centrum.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-muted md:text-lg"
        >
          Jeg specialiserer mig i fullstack-udvikling med særligt fokus på backend i C#/.NET og frontend i React/TypeScript.
          Jeg arbejder med at designe og implementere løsninger, hvor struktur, klar arkitektur og vedligeholdbarhed er i centrum.
          For mig handler god software ikke kun om at få noget til at virke,men om at bygge løsninger,
          der er robuste, testbare og nemme at videreudvikle.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            type="button"
            onClick={onShowProjects}
            aria-controls="projekter"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            Se projekter
          </button>
          <a
            href="#kontakt"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent"
          >
            Kontakt mig
          </a>
        </motion.div>
      </div>
    </section>
  );
}
