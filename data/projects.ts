export type Project = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    title: 'SaaS Dashboard',
    description:
      'Dashboard med authentication, analytics widgets og rollebaseret adgangskontrol til B2B-kunder.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    githubUrl: 'https://github.com/din-bruger/saas-dashboard'
  },
  {
    title: 'E-commerce Frontend',
    description:
      'Responsivt webshop-interface med filtrering, produktsider og checkout flow med fokus på konvertering.',
    techStack: ['React', 'Next.js', 'Stripe', 'Zustand'],
    githubUrl: 'https://github.com/din-bruger/ecommerce-frontend'
  },
  {
    title: 'Booking Platform',
    description:
      'Webapp til booking af services med kalenderintegration, notifikationer og admin-panel.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/din-bruger/booking-platform'
  },
  {
    title: 'Content Platform',
    description:
      'Headless CMS-drevet platform med SSR/ISR, SEO-optimering og performance tuning.',
    techStack: ['Next.js App Router', 'Sanity', 'Framer Motion'],
    githubUrl: 'https://github.com/din-bruger/content-platform'
  }
];
