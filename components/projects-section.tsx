'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FolderCode, Maximize2 } from 'lucide-react';
import projectBackdrop from '@/public/media/Backdrop/Vertikal grå halftonebølge i transparent layout.png';
import { Project } from '@/data/projects';
import { Reveal } from '@/components/creative/reveal';
import { Technology } from '@/components/technology';

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
  const projectListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = projectListRef.current;
    if (!list) return;
    const items = list.querySelectorAll<HTMLElement>(':scope > .project-item');
    // Every card reveals the same canvas, including the distance across the gaps.
    const alignBackdrop = () => {
      list.style.setProperty('--project-backdrop-height', `${list.offsetHeight}px`);
      items.forEach((item) => item.style.setProperty('--project-backdrop-y', `${-item.offsetTop}px`));
    };
    const observer = new ResizeObserver(alignBackdrop);
    observer.observe(list);
    items.forEach((item) => observer.observe(item));
    alignBackdrop();
    return () => observer.disconnect();
  }, [projects]);

  return (
    <section id="projekter" className="section-shell developer-projects" aria-labelledby="projects-heading">
      <Reveal><div className="section-heading"><h2 id="projects-heading" className="section-title projects-title"><FolderCode aria-hidden="true" /><span>Udvalgte projekter</span></h2><p>Interne systemer, kundesites og egne idéer omsat til software.</p></div></Reveal>
      <div className="project-code-block">
        <code className="project-code-line" aria-hidden="true">{'const projekter = ['}</code>
        <div ref={projectListRef} className="project-list">
          {projects.map((project) => (
            <Reveal key={project.title} className="project-item">
              <article className={`developer-project${project.livePreview ? ' featured-project' : ''}`}>
                <div className="project-backdrop" aria-hidden="true">
                  <Image src={projectBackdrop} alt="" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1344px) calc(100vw - 64px), 1280px" />
                </div>
                <div className="project-description">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="project-technologies" aria-label="Teknologier">{project.techStack.map((tech) => <li key={tech}><Technology name={tech} /></li>)}</ul>
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-link">Se på GitHub<span className="sr-only"> (åbner i en ny fane)</span></a>}
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link">Besøg hjemmesiden<span className="sr-only"> (åbner i en ny fane)</span></a>}
                </div>
                {project.livePreview && <ProjectPreview project={project} />}
              </article>
            </Reveal>
          ))}
        </div>
        <code className="project-code-line" aria-hidden="true">{'];'}</code>
      </div>
      <div className="creative-bridge">
        <Reveal><div className="section-heading"><h3>Min kreative side</h3><Link href="/creative" className="text-link">Se video & design</Link></div></Reveal>
        <div className="creative-teasers">{creativeWork.map((work) => <Reveal key={work.href}><Link href={work.href}><img src={work.image} alt={`Stillbillede fra ${work.title}`} width={640} height={400} loading="lazy" /><span>{work.title}</span></Link></Reveal>)}</div>
      </div>
    </section>
  );
}
