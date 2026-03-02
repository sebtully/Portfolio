'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

type SiteHeaderProps = {
  onShowProjects: () => void;
};

const links = [
  { href: '#om-mig', label: 'Om mig' },
  { href: '#kontakt', label: 'Kontakt' }
];

export function SiteHeader({ onShowProjects }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        isScrolled
          ? 'border-border bg-background/95 backdrop-blur'
          : 'border-transparent bg-background/80'
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#top" className="text-sm font-semibold tracking-[0.08em] text-foreground">
        </a>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              onClick={onShowProjects}
              className="text-sm text-muted transition hover:text-foreground"
            >
              Projekter
            </button>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            aria-label="Aabn menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex rounded-full border border-border bg-card p-2 text-muted transition hover:border-accent hover:text-foreground md:hidden"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <nav
        className={`overflow-hidden border-t border-border/60 bg-card transition-all duration-200 md:hidden ${
          isMenuOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="section-shell flex flex-col gap-1 py-3">
          <button
            type="button"
            onClick={() => {
              onShowProjects();
              setIsMenuOpen(false);
            }}
            className="rounded-lg px-2 py-2 text-left text-sm text-muted transition hover:bg-background hover:text-foreground"
          >
            Projekter
          </button>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-muted transition hover:bg-background hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
