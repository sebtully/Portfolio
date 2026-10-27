'use client';

// Adapted from Animate UI v1 (see NOTICE.md): single run, stable layout and React 18 support.
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function TypingText({ text, duration = 45, enabled = true, cursor = false, natural = false, onComplete }: { text: string; duration?: number; enabled?: boolean; cursor?: boolean; natural?: boolean; onComplete?: () => void }) {
  const reducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState(text);
  const [typing, setTyping] = useState(false);
  const complete = useRef(onComplete);

  useEffect(() => { complete.current = onComplete; }, [onComplete]);

  useEffect(() => {
    if (!enabled || reducedMotion !== false) {
      setDisplayedText(text);
      setTyping(false);
      return;
    }

    const characters = Array.from(text);
    let index = 0;
    let timer: number;
    setDisplayedText('');
    setTyping(true);
    const typeNext = () => {
      index += 1;
      setDisplayedText(characters.slice(0, index).join(''));
      if (index >= characters.length) {
        setTyping(false);
        complete.current?.();
        return;
      }
      const pace = natural ? (/[,.!?;:]/.test(characters[index - 1]) ? 5 : [0.8, 1.2, 1, 1.4][index % 4]) : 1;
      timer = window.setTimeout(typeNext, duration * pace);
    };
    timer = window.setTimeout(typeNext, duration);
    return () => window.clearTimeout(timer);
  }, [text, duration, reducedMotion, enabled, natural]);

  return (
    <span data-slot="typing-text" style={{ display: 'inline-grid' }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ gridArea: '1 / 1', visibility: 'hidden' }}>{text}</span>
      <span aria-hidden="true" style={{ gridArea: '1 / 1' }}>{displayedText}{cursor && <motion.span
        data-slot="typing-text-cursor"
        animate={{ opacity: typing && reducedMotion === false ? [1, 1, 0, 0, 1] : 1 }}
        transition={{ duration: 1, repeat: typing && reducedMotion === false ? Infinity : 0, ease: 'linear', times: [0, 0.45, 0.45, 0.9, 1] }}
        style={{ display: 'inline-block', width: 2, height: '1em', marginLeft: 3, verticalAlign: '-0.1em', background: 'currentColor' }}
      />}</span>
    </span>
  );
}
