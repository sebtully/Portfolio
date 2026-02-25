export type Project = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    title: 'CRM Dashboard',
    description:
      'Webapp til booking af services med kalenderintegration, notifikationer og admin-panel.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/sebtully/CRM2026.git'
  },
  {
    title: 'Madplan Generator',
    description:
      'Dashboard med authentication, analytics widgets og rollebaseret adgangskontrol til B2B-kunder.',
    techStack: ['Next.js','TypeScript', 'CSS', 'JavaScript', 'Prisma'],
    githubUrl: 'https://github.com/sebtully/madplan.git'
  },
  {
    title: 'Barber Booking System',
    description:
      'Streamlines operations by automating tasks like appointment confirmation,sending reminders to reduce no-shows, and providing a 24/7 booking option for clients. The system benefits both clients, by offering convenient scheduling, and salon owners, by saving time and administrative work.',
    techStack: ['React','TypeScript', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/sebtully/frisor-booking-system.git'
  },
  {
    title: 'Padel Opponent Finder',
    description:
      'Webapp til booking af services med kalenderintegration, notifikationer og admin-panel.',
    techStack: ['TypeScript', 'CSS', 'HTML'],
    githubUrl: 'https://github.com/sebtully/Padel-Opponent-Finder-App.git'
  },
];
