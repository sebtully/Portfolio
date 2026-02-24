export type Project = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    title: 'Madplan Generator',
    description:
      'Dashboard med authentication, analytics widgets og rollebaseret adgangskontrol til B2B-kunder.',
    techStack: ['React','TypeScript', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/din-bruger/saas-dashboard'
  },
  {
    title: 'Barber Booking System',
    description:
      'Streamlines operations by automating tasks like appointment confirmation,sending reminders to reduce no-shows, and providing a 24/7 booking option for clients. The system benefits both clients, by offering convenient scheduling, and salon owners, by saving time and administrative work.',
    techStack: ['React','TypeScript', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/sebtully/frisor-booking-system.git'
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
