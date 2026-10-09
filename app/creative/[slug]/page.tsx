import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { creativeProjects } from '@/data/creative-projects';
import { creativeSections } from '@/data/creative-sections';
import { getCreativeVideo } from '@/lib/creative-media';
import { CreativeVideo } from '@/components/creative/video';
import { Reveal } from '@/components/creative/reveal';

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return creativeProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = creativeProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  const title = `${project.title} — Video & design`;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, siteName: 'Sebastian Tully Schmidt — Creative', locale: 'da_DK', type: 'website' },
    twitter: { card: 'summary', title, description: project.summary }
  };
}

export default async function CreativeProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = creativeProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main id="creative-main" tabIndex={-1} className="creative-container">
      <section className="creative-case-hero" aria-labelledby="case-heading">
        <Link href={`/creative#${creativeSections.work.id}`} className="creative-back-link"><ArrowLeft size={16} aria-hidden="true" />Tilbage til udvalgt arbejde</Link>
        <div className="creative-section-label"><span>{project.client.toUpperCase()}</span><span>{project.category.toUpperCase()}</span></div>
        <Reveal><h1 id="case-heading">{project.title}</h1></Reveal>
        <div className="creative-case-intro"><p>{project.summary}</p><a href="#versions" className="creative-text-link">{project.videos.length > 1 ? 'Se versionerne' : 'Se videoen'} <ArrowDown size={17} aria-hidden="true" /></a></div>
      </section>

      <section className="creative-case-details" aria-labelledby="project-about-heading">
        <h2 id="project-about-heading" className="creative-eyebrow">OM PROJEKTET</h2>
        <p>{project.description}</p>
        <dl><div><dt>VIRKSOMHED</dt><dd>{project.client}</dd></div><div><dt>ARBEJDSOMRÅDE</dt><dd>{project.roles.join(' · ')}</dd></div>{project.sourceMaterial && <div><dt>UDGANGSPUNKT</dt><dd>{project.sourceMaterial}</dd></div>}</dl>
      </section>

      <section id="versions" className="creative-versions" aria-labelledby="versions-heading">
        <div className="creative-section-label"><span>VIDEO / {String(project.videos.length).padStart(2, '0')} {project.videos.length > 1 ? 'VERSIONER' : 'VERSION'}</span><span>{project.roles.join(' · ').toUpperCase()}</span></div>
        <div className="creative-section-heading"><h2 id="versions-heading">{project.videos.length > 1 ? <>Ét projekt.<br /><span className="creative-serif">Flere versioner.</span></> : <>Projektet.<br /><span className="creative-serif">I bevægelse.</span></>}</h2><p>Se {project.videos.length > 1 ? 'versionerne' : 'videoen'}<br />i dit eget tempo.</p></div>
        <div className="creative-video-grid">
          {project.videos.map((video, index) => (
            <Reveal key={video.filename} className="creative-video-item">
              <figure>
                <CreativeVideo {...getCreativeVideo(video.filename, video.poster)} width={video.width} height={video.height} trimTop={video.trimTop} title={`${project.title} – ${video.title}`} projectTitle={project.title} />
                <figcaption><span className="creative-project-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{video.title}</h3><p>{video.note}</p></div></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
