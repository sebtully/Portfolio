'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Maximize2 } from 'lucide-react';
import { Project } from '@/data/projects';
import { Reveal } from '@/components/creative/reveal';

function ProjectPreview({ project }: { project: Project }) {
  const preview = project.livePreview!;
  const videoRef = useRef<HTMLVideoElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startPreview = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
    videoRef.current?.play().catch(() => {});
  };
  const stopPreview = () => { videoRef.current?.pause(); };

  return (
    <div className="project-preview">
      <video ref={videoRef} src={preview.videoUrl} poster={preview.imageUrl} aria-label={preview.alt ?? `Demo af ${project.title}`} muted loop playsInline preload="none" onMouseEnter={startPreview} onMouseLeave={stopPreview} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      <div className="preview-controls">
        <button type="button" aria-pressed={isPlaying} onClick={() => {
          if (isPlaying) stopPreview();
          else videoRef.current?.play().catch(() => {});
        }}>{isPlaying ? 'Pause demo' : 'Afspil demo'}</button>
        <button type="button" onClick={() => {
          stopPreview();
          dialogRef.current?.showModal();
          expandedVideoRef.current?.play().catch(() => {});
        }}><Maximize2 size={16} aria-hidden="true" /> Større visning</button>
      </div>
      <dialog ref={dialogRef} className="project-dialog" aria-label={`Demo af ${project.title}`} onClose={() => expandedVideoRef.current?.pause()} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
        <button type="button" className="dialog-close" onClick={() => dialogRef.current?.close()}>Luk</button>
        <video ref={expandedVideoRef} src={preview.videoUrl} controls playsInline preload="none" aria-label={`Demo af ${project.title} i stor visning`} />
      </dialog>
    </div>
  );
}

const creativeWork = [
  { href: '/creative/cat-teen', title: 'CAT Teen Campaign', image: '/media/creative/CAT-Teen_2_v1.jpg' },
  { href: '/creative/js-danmark-project-1', title: 'JS Danmark', image: '/media/creative/JsDanmark%20-%20Project%201.jpg' },
  { href: '/creative/caretoons', title: 'Caretoons', image: '/media/creative/Caretoons%20projekt%201.jpg' }
];

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projekter" className="section-shell developer-projects" aria-labelledby="projects-heading">
      <Reveal><div className="section-heading"><h2 id="projects-heading" className="section-title">Udvalgte projekter</h2><p>Interne systemer, kundesites og egne idéer omsat til software.</p></div></Reveal>
      <div className="project-list">
        {projects.map((project) => (
          <Reveal key={project.title}>
            <article className={`developer-project${project.livePreview ? ' featured-project' : ''}`}>
              <div className="project-description">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-technologies" aria-label="Teknologier">{project.techStack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-link">Se på GitHub<span className="sr-only"> (åbner i en ny fane)</span></a>}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link">Besøg hjemmesiden<span className="sr-only"> (åbner i en ny fane)</span></a>}
              </div>
              {project.livePreview && <ProjectPreview project={project} />}
            </article>
          </Reveal>
        ))}
      </div>
      <div className="creative-bridge">
        <Reveal><div className="section-heading"><h3>Min kreative side</h3><Link href="/creative" className="text-link">Se video & design</Link></div></Reveal>
        <div className="creative-teasers">{creativeWork.map((work) => <Reveal key={work.href}><Link href={work.href}><img src={work.image} alt={`Stillbillede fra ${work.title}`} width={640} height={400} loading="lazy" /><span>{work.title}</span></Link></Reveal>)}</div>
      </div>
    </section>
  );
}
