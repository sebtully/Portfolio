export type CreativeProject = {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  description: string;
  roles: string[];
  sourceMaterial?: string;
  videos: { filename: string; title: string; note: string; width: number; height: number; poster?: string; trimTop?: number }[];
};

export const creativeProjects: CreativeProject[] = [
  {
    slug: 'cat-teen',
    title: 'CAT Teen Campaign',
    client: 'Grown Up Group',
    category: 'Reklamefilm',
    summary: 'Én kampagne. Flere udtryk. Reklamevideoer med fokus på klipning, grafik og visuel efterbehandling.',
    description:
      'Reklamevideoer produceret for Grown Up Group. Video- og tekstmaterialet blev leveret, og jeg stod selv for klipning, grafiske elementer og visuel efterbehandling. Her er kampagnen samlet i tre versioner, hver med og uden tekst.',
    roles: ['Videoredigering', 'Grafiske elementer', 'Visuel efterbehandling'],
    sourceMaterial: 'Leveret video- og tekstmateriale',
    videos: [
      { filename: 'CAT-Teen_2_v1.mp4', title: 'Version 02', note: 'Kampagnefilm', width: 1080, height: 1920, poster: 'CAT-Teen_2_v1.jpg' },
      { filename: 'CAT-Teen_2_noText_v1.mp4', title: 'Version 02 / uden tekst', note: 'Kampagnefilm · uden tekst', width: 1080, height: 1920 },
      { filename: 'CAT-Teen_1_v1.mp4', title: 'Version 01 / med tekst', note: 'Kampagnefilm · med tekst', width: 1080, height: 1920 },
      { filename: 'CAT-Teen_1_noText_V1.mp4', title: 'Version 01 / uden tekst', note: 'Kampagnefilm · uden tekst', width: 1080, height: 1920 },
      { filename: 'CAT-Teen_3_noText_v1.mp4', title: 'Version 03 / uden tekst', note: 'Kampagnefilm · uden tekst', width: 1080, height: 1920, poster: 'CAT-Teen_3_noText_v1.jpg' },
      { filename: 'CAT-Teen_3_v1.mp4', title: 'Version 03 / med tekst', note: 'Kampagnefilm · med tekst', width: 1080, height: 1920, poster: 'CAT-Teen_3_v1.jpg' }
    ]
  },
  {
    slug: 'js-danmark-project-1',
    title: 'JS Danmark – Project 1',
    client: 'JS Danmark',
    category: 'Videoredigering / grafisk design',
    summary: 'Et videoprojekt fra mit arbejde hos JS Danmark.',
    description: 'Project 1 fra JS Danmark. Mit arbejdsområde hos virksomheden var videoredigering og grafisk design. Her vises den leverede projektvideo i sin originale version.',
    roles: ['Videoredigering', 'Grafisk design'],
    videos: [
      // Hide the encoded top strip in the player; keep the original 1920 × 1080 file.
      { filename: 'JsDanmark - Project 1.mp4', title: 'Project 1', note: 'JS Danmark · videopræsentation', width: 1920, height: 1080, poster: 'JsDanmark - Project 1.jpg', trimTop: 10 }
    ]
  },
  {
    slug: 'caretoons',
    title: 'Caretoons – Freelance',
    client: 'Caretoons',
    category: 'Animation / Visuelt indhold',
    summary: 'Et freelanceprojekt for Caretoons inden for animation og visuelt indhold.',
    description: 'Freelancearbejde for Caretoons. Her kan du se projektvideoen inden for animation og visuelt indhold.',
    roles: ['Freelance'],
    videos: [
      { filename: 'https://faks.dk/wp-content/uploads/2025/04/FAKS_mand_full.mp4', title: 'Projektvideo', note: 'Caretoons · freelance', width: 1920, height: 1080, poster: 'Caretoons projekt 1.jpg' }
    ]
  }
];

export const creativeContact = {
  email: 'sebastiantully@gmail.com',
  phone: '+45 28 55 32 89',
  phoneHref: 'tel:+4528553289',
  linkedin: 'https://www.linkedin.com/in/sebastian-tully-schmidt-2221961b9/'
};
