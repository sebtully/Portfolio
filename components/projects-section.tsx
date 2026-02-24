'use client';

import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.section
      id="projekter"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16"
    >
      <h2 className="section-title">Udvalgte projekter</h2>
      <p className="section-subtitle">
        Her er nogle af de løsninger jeg har bygget - med fokus på brugeroplevelse, kodekvalitet og
        skalerbarhed.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech} className="rounded-full bg-background px-3 py-1 text-xs text-muted">
                  {tech}
                </li>
              ))}
            </ul>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-accent transition hover:underline"
            >
              Se på GitHub →
            </a>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
