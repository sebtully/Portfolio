import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CreativeProject } from '@/data/creative-projects';
import { getCreativeVideo } from '@/lib/creative-media';
import { CreativeVideo } from './video';

export function CreativeProjectCard({ project, index }: { project: CreativeProject; index: number }) {
  const video = project.videos[0];
  const href = `/creative/${project.slug}`;

  return (
    <article className="creative-project-card">
      {video && <CreativeVideo {...getCreativeVideo(video.filename)} title={`${project.title} – ${video.title}`} projectTitle={project.title} projectHref={href} />}
      <Link href={href} className="creative-project-caption">
        <span className="creative-project-number">{String(index + 1).padStart(2, '0')}</span>
        <div><h3>{project.title}</h3><p>{project.client} <span aria-hidden="true">/</span> {project.category}</p></div>
        <span className="creative-round-arrow"><ArrowUpRight size={23} aria-hidden="true" /><span className="sr-only">Se projekt</span></span>
      </Link>
    </article>
  );
}
