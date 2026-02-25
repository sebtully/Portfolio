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
      'CRM-dashboard til håndtering af kundebookinger og services — inkl. kalenderintegration (Google/Outlook), automatiserede e-mail/SMS-påmindelser, administrativt panel til bookings, ressourcestyring og rapportering. Fokus på sikkerhed, skalerbarhed og effektiv drift.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/sebtully/CRM2026.git'
  },
  {
    title: 'Madplan Generator',
    description:
      'Madplan-generator til B2B: personaliserede ugeplaner med opskriftshåndtering, indkøbslister og kostpræferencer. Inkluderer brugerautentifikation, analytics-widgets og rollebaseret adgangskontrol for admin/brugere — designet til at øge engagement og reducere madspild.',
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
      'A React + Vite web app for discovering padel courts and finding players looking for matches nearby.',
    techStack: ['vite', 'TypeScript', 'TailwindCSS','React'],
    githubUrl: 'https://github.com/sebtully/Padel-Opponent-Finder-App.git'
  },
];
