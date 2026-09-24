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
    title: 'CRM Dashboard',
    description: 'Et moderne multi-tenant CRM-system med separat Owner-platform, udviklet fra bunden med React, TypeScript, PHP og MySQL. Løsningen samler kundestyring, salgsprocesser, aktiviteter, e-mails og virksomhedsadministration i én sikker og skalerbar platform.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    livePreview: { imageUrl: '/media/CRMBook.jpg', videoUrl: '/media/CRMBook.mp4', alt: 'Preview af CRM-dashboard' }
  },
  {
    title: 'Caretoons',
    description: 'Kundesite for Caretoons, som formidler kreative kommunikationsløsninger inden for sundheds- og socialområdet. Jeg har opdateret og færdiggjort den live hjemmeside med fokus på et tydeligt indholdshierarki, nem navigation og en professionel præsentation af deres ydelser.',
    techStack: ['WordPress', 'WooCommerce', 'CSS', 'JavaScript'],
    liveUrl: 'https://www.caretoons.dk/'
  },
  {
    title: 'Barber Booking System',
    description: 'En funktionel bookingplatform for barbersaloner med online tidsbestilling, kalenderstyring og kundeadministration. Løsningen indeholder en intuitiv brugergrænseflade, e-mail-påmindelser og et administrativt dashboard til håndtering af bookinger og ressourcer.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/sebtully/Barber-Booking-System.git'
  },
  
  {
    title: 'Padel Opponent Finder',
    description: 'En React- og Vite-baseret webapp til at opdage padelbaner og finde spillere, der søger modstandere i nærheden. Forenkler matchmaking for padel-entusiaster med søgning og lokaliseringsbaserede anbefalinger.',
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/sebtully/Padel-Opponent-Finder-App.git'
  }
];
