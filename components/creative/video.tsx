'use client';

import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, Film } from 'lucide-react';
import Link from 'next/link';

type CreativeVideoProps = {
  src: string;
  available: boolean;
  title: string;
  projectTitle: string;
  projectHref?: string;
  width: number;
  height: number;
  poster?: string;
};

export function CreativeVideo({ src, available, title, projectTitle, projectHref, width, height, poster }: CreativeVideoProps) {
  const [failed, setFailed] = useState(false);
  const [ratio, setRatio] = useState(width / height);

  return (
    <div className="creative-media" style={{ '--creative-ratio': ratio } as CSSProperties}>
      {available && !failed ? (
        <video
          key={src}
          controls
          playsInline
          preload="none"
          width={width}
          height={height}
          poster={poster}
          aria-label={title}
          onLoadedMetadata={(event) => {
            const video = event.currentTarget;
            if (video.videoWidth && video.videoHeight) setRatio(video.videoWidth / video.videoHeight);
          }}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" onError={() => setFailed(true)} />
          Din browser understøtter ikke video. <a href={src}>Hent videoen</a>.
        </video>
      ) : (
        <div className="creative-placeholder">
          <div className="creative-media-topline" aria-hidden="true">
            <span>{projectTitle.toUpperCase()}</span><span>VIDEO / DESIGN</span>
          </div>
          <span className="creative-placeholder-word" aria-hidden="true">{projectTitle}</span>
          <div className="creative-placeholder-message" role="status">
            <Film size={17} aria-hidden="true" />
            <span>{failed ? 'Videoen kunne ikke indlæses' : 'Video afventer'}</span>
          </div>
          {projectHref ? (
            <Link href={projectHref} className="creative-media-link">
              Se projektet <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ) : (
            <p className="creative-media-footnote">
              {failed ? 'Prøv at genindlæse siden.' : 'Denne version vises her, når videoen er tilføjet.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
