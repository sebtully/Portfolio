export type CreativeProject = {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  description: string;
  roles: string[];
  videos: { filename: string; title: string; note: string }[];
};

export const creativeProjects: CreativeProject[] = [
  {
    slug: 'cat-teen',
    title: 'CAT Teen Campaign',
    client: 'Grown Up Group',
    category: 'Reklamefilm',
    summary: 'Én kampagne. Flere udtryk. Reklamevideoer med fokus på klipning, grafik og visuel efterbehandling.',
    description:
      'Reklamevideoer produceret for Grown Up Group. Video- og tekstmaterialet blev leveret, og jeg stod selv for klipning, grafiske elementer og visuel efterbehandling. Her er kampagnen samlet i tre videoversioner.',
    roles: ['Videoredigering', 'Grafiske elementer', 'Visuel efterbehandling'],
    videos: [
      { filename: 'CAT-Teen_2_v1.mp4', title: 'Version 02', note: 'Kampagnefilm' },
      { filename: 'CAT-Teen_3_noText_v1.mp4', title: 'Version 03 / uden tekst', note: 'Kampagnefilm · uden tekst' },
      { filename: 'CAT-Teen_3_v1.mp4', title: 'Version 03 / med tekst', note: 'Kampagnefilm · med tekst' }
    ]
  }
];

export const creativeContact = {
  email: 'sebastiantully@gmail.com',
  phone: '+45 28 55 32 89',
  phoneHref: 'tel:+4528553289',
  linkedin: 'https://www.linkedin.com/in/sebastian-tully-schmidt-2221961b9/'
};
