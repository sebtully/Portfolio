import type { Metadata } from 'next';
import { CreativeFooter, CreativeHeader } from '@/components/creative/shell';
import './creative.css';

const title = 'Sebastian Tully Schmidt | Video Editor & Graphic Designer';
const description = 'Kreativ portfolio med videoredigering, grafisk design og kampagnemateriale. Se CAT Teen Campaign og kontakt Sebastian Tully Schmidt.';

export const metadata: Metadata = {
  title: { default: title, template: '%s | Sebastian Tully Schmidt' },
  description,
  keywords: ['Sebastian Tully Schmidt', 'video editor', 'graphic designer', 'videoredigering', 'grafisk design'],
  openGraph: { title, description, siteName: 'Sebastian Tully Schmidt — Creative', locale: 'da_DK', type: 'website' },
  twitter: { card: 'summary', title, description }
};

export default function CreativeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="creative-shell" id="creative-top">
      <a className="creative-skip-link" href="#creative-main">Spring til indhold</a>
      <CreativeHeader />
      {children}
      <CreativeFooter />
    </div>
  );
}
