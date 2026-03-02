'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Project } from '@/data/projects';

type ProjectsSectionProps = {
  projects: Project[];
};

type ProjectHoverPreviewProps = {
  project: Project;
};

function ProjectHoverPreview({ project }: ProjectHoverPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!project.livePreview) {
    return null;
  }

  const startPreview = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.currentTime = 0;
    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {
        setIsPreviewPlaying(false);
      });
    }

    setIsPreviewPlaying(true);
  };

  const stopPreview = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    setIsPreviewPlaying(false);
  };

  const togglePreview = () => {
    if (isPreviewPlaying) {
      stopPreview();
      return;
    }

    startPreview();
  };

  const togglePreviewVisibility = () => {
    if (isPreviewVisible) {
      stopPreview();
      setIsExpanded(false);
      setIsPreviewVisible(false);
      return;
    }

    setIsPreviewVisible(true);
  };

  const openExpandedPreview = () => {
    stopPreview();
    setIsExpanded(true);
  };

  const closeExpandedPreview = () => {
    setIsExpanded(false);
  };

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeExpandedPreview();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={togglePreviewVisibility}
        aria-expanded={isPreviewVisible}
        className="rounded-full border border-border/80 bg-background/85 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur transition hover:border-accent hover:text-foreground"
      >
        {isPreviewVisible ? 'Skjul Preview' : 'Vis Preview'}
      </button>

      {isPreviewVisible && (
        <div
          className="group mt-3 overflow-hidden rounded-xl border border-border/70 bg-background"
          onMouseEnter={startPreview}
          onMouseLeave={stopPreview}
        >
          <div className="relative aspect-video">
            <img
              src={project.livePreview.imageUrl}
              alt={project.livePreview.alt ?? `Preview af ${project.title}`}
              loading="lazy"
              onClick={openExpandedPreview}
              className="h-full w-full cursor-zoom-in object-cover"
            />
            <video
              ref={videoRef}
              src={project.livePreview.videoUrl}
              muted
              loop
              playsInline
              preload="metadata"
              onClick={openExpandedPreview}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${isPreviewPlaying ? 'opacity-100' : 'opacity-0'}`}
            />

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                togglePreview();
              }}
              aria-pressed={isPreviewPlaying}
              className="absolute bottom-3 right-3 rounded-full border border-border/80 bg-background/85 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur transition hover:border-accent hover:text-foreground"
            >
              {isPreviewPlaying ? 'Stop preview' : 'Afspil preview'}
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px] md:p-8"
            onClick={closeExpandedPreview}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeExpandedPreview}
                className="absolute right-3 top-3 z-10 rounded-full border border-white/40 bg-black/55 px-3 py-1 text-xs font-medium text-white transition hover:bg-black/80"
              >
                Luk
              </button>

              <video
                src={project.livePreview.videoUrl}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.section
      id="projekter"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="section-shell scroll-mt-24 py-14 md:py-16"
    >
      <h2 className="section-title">Udvalgte projekter</h2>
      <p className="section-subtitle">
        Her er nogle af de losninger jeg har bygget - med fokus pa brugeroplevelse, kodekvalitet og
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
            <ProjectHoverPreview project={project} />
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li key={tech} className="rounded-full bg-background px-3 py-1 text-xs text-muted">
                  {tech}
                </li>
              ))}
            </ul>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex text-sm font-medium text-accent transition hover:underline"
              >
                Se pa GitHub -&gt;
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
