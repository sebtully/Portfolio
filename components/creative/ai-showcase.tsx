'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUp, Check, LoaderCircle } from 'lucide-react';
import { TypingText } from '@/components/animate-ui/typing-text';
import { Blur } from '@/components/animate-ui/blur';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/animate-ui/tabs';
import { Accordion } from '@/components/animate-ui/accordion';
import { hasCreativeAIImage, type CreativeAIImage, type CreativeAIProject } from '@/data/creative-ai-projects';
import { creativeSections } from '@/data/creative-sections';

function SavedImage({ image, thumbnail = false }: { image: CreativeAIImage; thumbnail?: boolean }) {
  const [failedSource, setFailedSource] = useState<string>();
  if (failedSource === image.src) return <span className="creative-ai-image-empty">Billedet er ikke tilgængeligt.</span>;
  return <Image src={image.src} alt={thumbnail ? '' : image.alt} width={image.width} height={image.height} sizes={thumbnail ? '(max-width: 640px) 40vw, 240px' : '(max-width: 640px) 90vw, 1376px'} onLoad={() => setFailedSource(undefined)} onError={() => setFailedSource(image.src)} />;
}

function ResultImage({ image, delay, onReady, onError, onRetry }: { image: CreativeAIImage; delay: number; onReady: () => void; onError: () => void; onRetry: () => void }) {
  const reducedMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [elapsed, setElapsed] = useState(delay === 0);
  const [failed, setFailed] = useState(false);
  const active = useRef(true);
  const callbacks = useRef({ onReady, onError });
  const revealed = loaded && elapsed && !failed;

  useEffect(() => { callbacks.current = { onReady, onError }; }, [onReady, onError]);
  useEffect(() => {
    active.current = true;
    return () => { active.current = false; };
  }, []);
  useEffect(() => {
    if (failed) return;
    const timer = window.setTimeout(() => setElapsed(true), reducedMotion ? 0 : delay);
    return () => window.clearTimeout(timer);
  }, [delay, reducedMotion, failed]);
  useEffect(() => {
    if (loaded || failed) return;
    const timeout = window.setTimeout(() => setFailed(true), 15000);
    return () => window.clearTimeout(timeout);
  }, [loaded, failed]);
  useEffect(() => {
    if (failed) callbacks.current.onError();
  }, [failed]);
  useEffect(() => {
    if (!revealed) return;
    const timer = window.setTimeout(() => callbacks.current.onReady(), reducedMotion ? 0 : 800);
    return () => window.clearTimeout(timer);
  }, [revealed, reducedMotion]);

  return <>
    <div className="creative-ai-main-image" data-revealed={revealed} aria-hidden={!revealed} aria-busy={!revealed && !failed}>
      <Blur enabled={revealed} duration={0.8} className="creative-ai-image">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 640px) 90vw, 1376px" loading="eager" onLoad={async ({ currentTarget }) => {
          try {
            await currentTarget.decode();
            if (active.current) setLoaded(true);
          } catch {
            if (active.current) setFailed(true);
          }
        }} onError={() => setFailed(true)} />
      </Blur>
    </div>
    {failed ? <div className="creative-ai-load-error"><p role="status">Billedet kunne ikke indlæses.</p><button type="button" className="creative-text-link" onClick={onRetry}>Prøv igen</button></div> : !revealed && <div className="creative-ai-loading"><p role="status">Billedet tager form…</p></div>}
  </>;
}

type PromptPhase = 'waiting' | 'typing' | 'ready' | 'loading' | 'error' | 'sent';
type CaseState = { phase: PromptPhase; iterationId?: string };

function AICase({ project, state, onChange }: { project: CreativeAIProject; state: CaseState; onChange: (state: CaseState) => void }) {
  const id = useId();
  const windowRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const scrollRequested = useRef(false);
  const inView = useInView(windowRef, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const sendStarted = useRef(false);
  const original = project.iterations[0];
  const iteration = project.iterations.find(({ id }) => id === state.iterationId) ?? original;
  const prompt = project.prompts.find(({ id }) => id === iteration?.promptId);
  const originalPrompt = project.prompts.find(({ id }) => id === original?.promptId);
  const displayPrompt = project.displayPrompt || originalPrompt?.text || 'Der er endnu ikke tilføjet en prompt til denne case.';
  const sent = state.phase === 'sent';
  const submitted = sent || state.phase === 'loading' || state.phase === 'error';
  const parent = project.iterations.find(({ id }) => id === iteration?.parentId);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (!submitted) sendStarted.current = false; }, [submitted]);
  useEffect(() => {
    if (!submitted || !scrollRequested.current) return;
    scrollRequested.current = false;
    resultRef.current?.scrollIntoView({ behavior: reducedMotion === false ? 'smooth' : 'instant', block: 'start' });
  }, [submitted, reducedMotion]);
  useEffect(() => {
    if (mounted && inView && state.phase === 'waiting' && reducedMotion !== null) {
      onChange({ ...state, phase: reducedMotion ? 'ready' : 'typing' });
    }
    if (mounted && reducedMotion && state.phase === 'typing') onChange({ ...state, phase: 'ready' });
  }, [mounted, inView, reducedMotion, state, onChange]);

  const finishTyping = () => {
    if (state.phase === 'typing') onChange({ ...state, phase: 'ready' });
  };
  const send = () => {
    if (sendStarted.current || submitted || !hasCreativeAIImage(original?.image)) return;
    sendStarted.current = true;
    scrollRequested.current = true;
    onChange({ phase: 'loading', iterationId: original.id });
  };

  return (
    <article className="creative-ai-case" aria-label={project.title}>
      <div ref={windowRef} className="creative-ai-composer" role="group" aria-labelledby={`${id}-prompt-label`}>
        <div className="creative-ai-composer-heading"><span id={`${id}-prompt-label`}>Afspil eksempel</span><span>Gemt AI-proces</span></div>
        <div className="creative-ai-composer-text">
          {state.phase === 'typing' ? <TypingText text={displayPrompt} duration={26} natural cursor onComplete={finishTyping} /> : (
            <span className={mounted && state.phase === 'waiting' ? 'creative-ai-prompt-waiting' : undefined}>{displayPrompt}{!submitted && <span className="creative-ai-static-cursor" aria-hidden="true" />}</span>
          )}
        </div>
        <div className="creative-ai-composer-footer"><span>Kort visningsprompt</span><button type="button" className="creative-ai-send" aria-label={state.phase === 'loading' ? 'Indlæser det gemte billede' : 'Send prompt og vis det gemte originalbillede'} aria-controls={`${id}-result`} onClick={send} disabled={submitted || !hasCreativeAIImage(original?.image)}>
          {state.phase === 'loading' ? <LoaderCircle className="creative-ai-spinner" size={24} aria-hidden="true" /> : <ArrowUp size={24} aria-hidden="true" />}
        </button></div>
      </div>
      <div ref={resultRef} id={`${id}-result`} className="creative-ai-result" hidden={!submitted}>{submitted && <>
        <figure className="creative-ai-figure">
          <div className="creative-ai-image-frame">
            {hasCreativeAIImage(iteration?.image) ? sent ? <div className="creative-ai-main-image" data-revealed="true" style={{ transition: 'none' }}><div className="creative-ai-image"><SavedImage image={iteration.image} /></div></div> : <ResultImage key={`${iteration.id}-${attempt}`} image={iteration.image} delay={2000} onReady={() => {
              onChange({ ...state, phase: 'sent' });
            }} onError={() => onChange({ ...state, phase: 'error' })} onRetry={() => {
              setAttempt((previous) => previous + 1);
              onChange({ ...state, phase: 'loading' });
            }} /> : <p className="creative-ai-image-empty">Billedet til denne version er endnu ikke tilføjet.</p>}
          </div>
          <figcaption className="sr-only" role="status" aria-live="polite">{sent ? iteration?.label || 'Billede mangler' : ''}</figcaption>
        </figure>
        {sent && <><div className="creative-ai-versions" role="group" aria-label="Vælg en gemt billedversion">
          {project.iterations.map((item, index) => <button key={item.id} type="button" className="creative-ai-thumbnail" style={{ animationDelay: `${index * 160}ms` }} aria-pressed={iteration?.id === item.id} onClick={() => onChange({ phase: 'sent', iterationId: item.id })}>
            <span className="creative-ai-thumbnail-image">{hasCreativeAIImage(item.image) ? <SavedImage key={item.image.src} image={item.image} thumbnail /> : <span>Billede mangler</span>}</span>
            <span className="creative-ai-thumbnail-label">{item.label}{iteration?.id === item.id && <Check size={16} aria-hidden="true" />}</span>
          </button>)}
        </div>
        <div className="creative-ai-process" style={{ animationDelay: `${project.iterations.length * 160}ms` }}>
          <div className="creative-ai-project-intro"><p className="creative-muted">{project.origin === 'self-initiated' ? 'Selvinitieret koncept' : 'Kundecase'}</p><h3>{project.title}</h3><p>{project.brief || 'Projektbeskrivelsen er ikke dokumenteret endnu.'}</p></div>
          <dl className="creative-ai-facts">
            <div><dt>Værktøj</dt><dd>{project.tool || 'Ikke dokumenteret.'}</dd></div>
            <div><dt>Min rolle</dt><dd>{project.contribution || 'Mit bidrag er ikke dokumenteret endnu.'}</dd></div>
            <div><dt>Vigtigste læring</dt><dd>{project.learning || 'Læringen er ikke dokumenteret endnu.'}</dd></div>
          </dl>
          <section className="creative-ai-version-info" aria-labelledby={`${id}-version-heading`}>
            <h4 id={`${id}-version-heading`}>{iteration?.label || 'Version'}</h4>
            <p className="creative-muted">Udgangspunkt: {parent?.label || 'Tekstprompt uden inputbillede'}</p>
            <dl><div><dt>Ændring</dt><dd>{iteration?.change || 'Første generering af den beskrevne scene.'}</dd></div><div><dt>Begrundelse</dt><dd>{iteration?.rationale || project.result?.explanation || 'Begrundelsen er ikke dokumenteret endnu.'}</dd></div></dl>
            {iteration?.observation && <p className="creative-ai-observation"><dt>Visuel kontrol</dt><dd>{iteration.observation}</dd></p>}
          </section>
          <div className="creative-ai-details">
            <Accordion defaultOpen={false} items={[
              { value: 'prompt', title: 'Fuld anvendt prompt', children: <p className="creative-ai-full-prompt">{prompt?.text || 'Den fulde prompt til denne version er endnu ikke dokumenteret.'}</p> },
              { value: 'method', title: 'Metode og arbejdsfordeling', children: <p className="creative-ai-full-prompt">{project.method || 'Metoden er ikke dokumenteret endnu.'}</p> }
            ]} />
          </div>
        </div></>}
      </>}</div>
    </article>
  );
}

export function AIShowcase({ projects }: { projects: CreativeAIProject[] }) {
  const [states, setStates] = useState<Record<string, CaseState>>({});
  const renderCase = (project: CreativeAIProject) => <AICase project={project} state={states[project.id] ?? { phase: 'waiting' }} onChange={(state) => setStates((previous) => ({ ...previous, [project.id]: state }))} />;
  return (
    <section id={creativeSections.ai.id} className="creative-ai" aria-labelledby="creative-ai-heading">
      <div className="creative-section-heading creative-ai-heading"><h2 id="creative-ai-heading">Fra prompt til visuelt udtryk.</h2><p>Et indblik i mine eksperimenter med AI, visuelle valg og vejen fra idé til færdigt udtryk.</p></div>
      <a className="creative-text-link creative-ai-skip" href={`#${creativeSections.work.id}`} onClick={() => setStates((previous) => Object.fromEntries(projects.map(({ id }) => [id, previous[id]?.phase === 'sent' ? previous[id] : { phase: 'ready' as const }])))}>Spring til udvalgt arbejde <ArrowDown size={18} aria-hidden="true" /></a>
      {projects.length > 1 ? <Tabs defaultValue={projects[0].id} className="creative-ai-tabs" onValueChange={() => setStates((previous) => Object.fromEntries(Object.entries(previous).map(([id, state]) => [id, state.phase === 'typing' ? { ...state, phase: 'ready' as const } : state])))}>
        <TabsList aria-label="AI-cases" className="creative-tabs-list">{projects.map((project) => <TabsTrigger key={project.id} value={project.id} className="creative-tab">{project.title}</TabsTrigger>)}</TabsList>
        {projects.map((project) => <TabsContent key={project.id} value={project.id}>{renderCase(project)}</TabsContent>)}
      </Tabs> : projects.length === 1 ? renderCase(projects[0]) : <div className="creative-ai-empty"><h3>Ingen cases at vise endnu.</h3><p>Gemte prompts og billeder vises her, når en case er dokumenteret.</p></div>}
    </section>
  );
}
  
