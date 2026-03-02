export type Project = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  livePreview?: {
    imageUrl: string;
    videoUrl: string;
    alt?: string;
  };
};

export const projects: Project[] = [
  {
    title: 'Barber Booking System',
    description:
      'Barber Booking System: En fuldt funktionel bookingplatform for barber saloner, der muliggør online tidsbestilling, kalenderstyring og kundeadministration. Inkluderer en intuitiv brugergrænseflade, e-mail-påmindelser og en administrativ dashboard for effektiv håndtering af bookinger og ressourcer.',
    techStack: ['React','TypeScript', 'TailwindCSS', 'JavaScript'],
    githubUrl: 'https://github.com/sebtully/Barber-Booking-System.git'
  },
  {
    title: 'Madplan Generator',
    description:
      'Madplan-generator til B2B: personaliserede ugeplaner med opskriftshåndtering, indkøbslister og kostpræferencer. Inkluderer brugerautentifikation, analytics-widgets og rollebaseret adgangskontrol for admin/brugere — designet til at øge engagement og reducere madspild.',
    techStack: ['Next.js','TypeScript', 'CSS', 'JavaScript', 'Prisma'],
    githubUrl: 'https://github.com/sebtully/madplan.git'
  },
  
  {
    title: 'CRM Dashboard',
    description:
      'CRM-dashboard til håndtering af kundebookinger og services — inkl. kalenderintegration (Google/Outlook), automatiserede e-mail/SMS-påmindelser, administrativt panel til bookings, ressourcestyring og rapportering. Fokus på sikkerhed, skalerbarhed og effektiv drift.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: '',
    livePreview: {
      imageUrl: '/media/CRM.jpg',
      videoUrl: '/media/CRM.mp4',
      alt: 'Preview af CRM dashboard'
    }
  },
  {
    title: 'Padel Opponent Finder',
    description:
      'A React + Vite web app for discovering padel courts and finding players looking for matches nearby.',
    techStack: ['React', 'Vite', 'TypeScript', 'TailwindCSS'],
    githubUrl: 'https://github.com/sebtully/Padel-Opponent-Finder-App.git'
  },
];
