'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Code2, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const links = [
  { href: '#projekter', label: 'Projekter' },
  { href: '#om-mig', label: 'Om mig' },
  { href: '/creative', label: 'Kreativ portfolio' },
  { href: '#kontakt', label: 'Kontakt' }
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="developer-header">
      <div className="section-shell header-row">
        <a href="#top" className="developer-brand"><Code2 size={22} aria-hidden="true" /><span>Sebastian Tully Schmidt</span></a>
        <nav className="desktop-nav" aria-label="Hovednavigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="header-controls">
          <ThemeToggle />
          <button ref={menuButton} type="button" aria-label={isMenuOpen ? 'Luk menu' : 'Åbn menu'} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen(!isMenuOpen)} className="icon-button menu-toggle">
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" hidden={!isMenuOpen} className="mobile-nav section-shell" aria-label="Mobilnavigation">
        {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>)}
      </nav>
    </header>
  );
}
