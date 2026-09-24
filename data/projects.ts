export type Project = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  livePreview?: { imageUrl: string; videoUrl: string; alt?: string };
};

export const projects: Project[] = [
  {
    title: 'Barber Booking System',
    description: 'En funktionel bookingplatform for barbersaloner med online tidsbestilling, kalenderstyring og kundeadministration. Løsningen indeholder en intuitiv brugergrænseflade, e-mail-påmindelser og et administrativt dashboard til håndtering af bookinger og ressourcer.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/sebtully/Barber-Booking-System.git'
  },
  {
    title: 'Caretoons',
    description: 'Overtog en eksisterende WordPress-løsning og migrerede den til en stabil og brugbar hjemmeside. Arbejdet omfattede backup, databaseimport, fejlsøgning af redirects, URL-struktur, REST API, adgangsrettigheder og mixed-content-fejl samt tilpasninger, der gør det lettere for kunden at vedligeholde indhold og produkter.',
    techStack: ['WordPress', 'Elementor Pro', 'WooCommerce', 'MySQL'],
    liveUrl: 'https://www.caretoons.dk/'
  },
  {
    title: 'CRM Dashboard',
    description: 'CRM-dashboard til håndtering af kundebookinger og services — inkl. kalenderintegration (Google/Outlook), automatiserede e-mail- og SMS-påmindelser, administrativt panel til bookinger, ressourcestyring og rapportering. Fokus på sikkerhed, skalerbarhed og effektiv drift.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    livePreview: { imageUrl: '/media/CRM.jpg', videoUrl: '/media/CRM.mp4', alt: 'Preview af CRM-dashboard' }
  },
  {
    title: 'Padel Opponent Finder',
    description: 'En React- og Vite-baseret webapp til at opdage padelbaner og finde spillere, der søger modstandere i nærheden. Forenkler matchmaking for padel-entusiaster med søgning og lokaliseringsbaserede anbefalinger.',
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/sebtully/Padel-Opponent-Finder-App.git'
  }
];
