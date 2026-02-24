'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section id="top" className="mx-auto flex min-h-[78vh] w-full max-w-6xl items-center px-6 py-24">
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          Frontend udvikler
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-4xl font-bold leading-tight md:text-6xl"
        >
          Hej, jeg er Din Navn.
          <span className="block text-muted">Jeg bygger hurtige og brugervenlige weboplevelser.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-muted md:text-lg"
        >
          Jeg er specialiseret i Next.js, React og TypeScript med fokus på performance,
          tilgængelighed og clean architecture. Denne portfolio er designet til jobsøgning og
          samarbejde.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projekter"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            Se projekter
          </a>
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
