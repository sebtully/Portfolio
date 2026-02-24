import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeScript } from '@/components/theme-script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Din Navn | Frontend Developer Portfolio',
  description:
    'Professionel portfolio med moderne webprojekter i Next.js, React, TypeScript og Tailwind CSS.',
  keywords: ['frontend developer', 'portfolio', 'next.js', 'react', 'typescript', 'tailwind'],
  authors: [{ name: 'Din Navn' }],
  creator: 'Din Navn',
  metadataBase: new URL('https://example.vercel.app'),
  openGraph: {
    title: 'Din Navn | Frontend Developer',
    description:
      'Se udvalgte projekter, teknologier og kontaktinformation til jobsamarbejde.',
    url: 'https://example.vercel.app',
    siteName: 'Din Navn Portfolio',
    locale: 'da_DK',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Din Navn | Frontend Developer',
    description:
      'Portfolio bygget med Next.js, React, TypeScript og Tailwind - klar til deployment på Vercel.'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
