import { Code2, Database, Network, ShieldCheck, type LucideIcon } from 'lucide-react';

const logos: Record<string, string> = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  PHP: 'php',
  'C#': 'csharp',
  HTML: 'html5',
  CSS: 'css3',
  React: 'react',
  'Next.js': 'nextjs',
  'Tailwind CSS': 'tailwindcss',
  Vite: 'vitejs',
  '.NET': 'dotnetcore',
  MySQL: 'mysql',
  PostgreSQL: 'postgresql',
  Azure: 'azure',
  DevOps: 'azuredevops',
  WordPress: 'wordpress',
  WooCommerce: 'woocommerce',
  Git: 'git',
  Vercel: 'vercel'
};

const symbols: Record<string, LucideIcon> = {
  SQL: Database,
  'REST API’er': Network,
  'Entra ID': ShieldCheck
};

export function Technology({ name }: { name: string }) {
  const logo = logos[name];
  const Icon = symbols[name] ?? Code2;

  return (
    <span className="technology">
      {logo ? (
        <img src={`/icons/technologies/${logo}.svg`} alt="" aria-hidden="true" width={20} height={20} loading="lazy" className={`technology-icon${logo === 'nextjs' || logo === 'vercel' ? ' technology-icon--monochrome' : ''}${['dotnetcore', 'mysql', 'wordpress'].includes(logo) ? ' technology-icon--dim' : ''}`} />
      ) : (
        <Icon size={20} aria-hidden="true" className="technology-icon technology-icon--symbol" />
      )}
      <span>{name}</span>
    </span>
  );
}
