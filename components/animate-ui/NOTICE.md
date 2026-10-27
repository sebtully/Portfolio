# Animate UI source attribution

These four local components are reduced, modified versions of Animate UI v1 primitives:

- `typing-text.tsx`: `primitives/texts/typing/index.tsx`
- `blur.tsx`: `primitives/effects/blur/index.tsx`
- `tabs.tsx`: `primitives/radix/tabs/index.tsx`
- `accordion.tsx`: `primitives/radix/accordion/index.tsx`

Source: https://github.com/imskyleen/animate-ui/tree/7fffde3e56e804bcf5e580e1c13ca5bd565ef588/apps/v1/apps/www/registry

The current `@animate-ui/react` 2.3.0 package requires React 19. This project stays on React 18.3.1 and uses the v1 source distribution instead. Unused APIs, hooks, contexts, looping, highlight and auto-height helpers have been omitted. Ref-as-prop APIs were removed; Radix and Motion own their refs. The local components add complete server-rendered text, stable typing geometry, a single typing run, optional natural pacing and cursor, and reduced-motion handling. Typing uses one timeout chain that is cleaned up when stopped or unmounted. Accordion items start open by default. Tabs include a noscript fallback for the second tool group.

Runtime dependencies: `motion` 14.6.0 (React 18/19), `@radix-ui/react-tabs` 1.2.1 and `@radix-ui/react-accordion` 1.3.1 (React 16.8–19). All animation imports use `motion/react`; its transitive `framer-motion` dependency is expected. No shadcn setup, Tailwind upgrade, or additional primitive family is needed. The installed Tailwind build uses v3.4.7 through PostCSS; the pre-existing v4 CLI package is not used by these components.

Original license follows.

MIT + Commons Clause License Condition

Copyright (c) 2025 Elliot Sutton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell or redistribute the components themselves in their original form—whether alone or in a bundle.**

## No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
