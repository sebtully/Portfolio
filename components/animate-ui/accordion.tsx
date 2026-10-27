'use client';

// Adapted from Animate UI v1 (see NOTICE.md); no React 19 ref-as-prop APIs.
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type AccordionItem = { value: string; title: ReactNode; children: ReactNode };

export function Accordion({ items, defaultOpen = true }: { items: AccordionItem[]; defaultOpen?: boolean }) {
  const [value, setValue] = useState(() => defaultOpen ? items.map((item) => item.value) : []);
  const reducedMotion = useReducedMotion();

  return (
    <AccordionPrimitive.Root type="multiple" value={value} onValueChange={setValue}>
      {items.map((item) => {
        const isOpen = value.includes(item.value);
        return (
          <AccordionPrimitive.Item key={item.value} value={item.value} data-slot="accordion-item">
            <AccordionPrimitive.Header asChild>
              <h4>
                <AccordionPrimitive.Trigger data-slot="accordion-trigger">
                  {item.title}
                  <ChevronDown size={18} aria-hidden="true" />
                </AccordionPrimitive.Trigger>
              </h4>
            </AccordionPrimitive.Header>
            <AnimatePresence initial={false}>
              {isOpen && (
                <AccordionPrimitive.Content asChild forceMount>
                  <motion.div
                    data-slot="accordion-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reducedMotion === false ? 0.24 : 0, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    {item.children}
                  </motion.div>
                </AccordionPrimitive.Content>
              )}
            </AnimatePresence>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
}
