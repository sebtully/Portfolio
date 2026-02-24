'use client';

import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { href: '#projekter', label: 'Projekter' },
  { href: '#om-mig', label: 'Om mig' },
  { href: '#kontakt', label: 'Kontakt' }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-semibold tracking-wide md:text-base">
          DinNavn.dev
        </a>
        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-4 text-sm md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="text-muted transition hover:text-foreground" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <motion.div whileTap={{ scale: 0.95 }}>
            <ThemeToggle />
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
