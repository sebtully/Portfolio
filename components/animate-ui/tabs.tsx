'use client';

// Adapted from Animate UI v1 (see NOTICE.md), using only the required Radix package.
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion, useReducedMotion } from 'motion/react';
import type { ComponentPropsWithoutRef } from 'react';

export const Tabs = TabsPrimitive.Root;
export const TabsList = TabsPrimitive.List;
export const TabsTrigger = TabsPrimitive.Trigger;

export function TabsContent({ children, ...props }: Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Content>, 'asChild' | 'forceMount'>) {
  const reducedMotion = useReducedMotion();

  return (
    <TabsPrimitive.Content {...props} asChild>
      <motion.div
        data-slot="tabs-content"
        initial={false}
        animate={reducedMotion === false ? { opacity: [0.65, 1], filter: ['blur(2px)', 'blur(0px)'] } : { opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  );
}
