'use client';

// Adapted from Animate UI v1 (see NOTICE.md); keep SSR sharp and respect reduced motion.
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function Blur({ children, enabled = true, className, duration = 0.5 }: { children: ReactNode; enabled?: boolean; className?: string; duration?: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      data-slot="blur"
      className={className}
      initial={false}
      animate={enabled && reducedMotion === false ? { filter: ['blur(4px)', 'blur(0px)'] } : { filter: 'blur(0px)' }}
      transition={{ duration: enabled && reducedMotion === false ? duration : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
