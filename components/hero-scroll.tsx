'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function HeroScroll({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [covered, setCovered] = useState(false);
  const [layout, setLayout] = useState<{ top: number; start: number; end: number }>();
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [layout?.start ?? 0, layout?.end ?? 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  useEffect(() => {
    const heroElement = heroRef.current;
    const contentElement = contentRef.current;
    if (!heroElement || !contentElement) return;
    heroElement.inert = false;
    setCovered(false);
    if (reducedMotion) return;

    // Let tall mobile heroes scroll fully into view before they stick.
    const measure = () => {
      const contentTop = contentElement.getBoundingClientRect().top + window.scrollY;
      heroElement.inert = window.scrollY >= contentTop;
      setCovered(heroElement.inert);
      setLayout({
        top: Math.min(24, window.innerHeight - heroElement.offsetHeight - 24),
        start: Math.max(0, contentTop - window.innerHeight),
        end: contentTop
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(heroElement);
    observer.observe(contentElement);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reducedMotion]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const hidden = !reducedMotion && progress >= 1;
    if (heroRef.current) heroRef.current.inert = hidden;
    setCovered(hidden);
  });

  return (
    <>
      <motion.div
        ref={heroRef}
        className="hero-backdrop"
        data-sticky={!reducedMotion && layout && !covered ? '' : undefined}
        style={reducedMotion ? undefined : { top: covered ? undefined : layout?.top, opacity }}
        onFocusCapture={() => {
          if (!reducedMotion && scrollYProgress.get() > 0) window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      >
        {hero}
      </motion.div>
      <div ref={contentRef} className="developer-content">{children}</div>
    </>
  );
}
