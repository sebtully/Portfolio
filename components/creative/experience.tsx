import { Accordion } from '@/components/animate-ui/accordion';

export function CreativeExperience() {
  return (
    <div className="creative-experience">
      <h3>Erfaring</h3>
      <Accordion items={[
        {
          value: 'js-danmark',
          title: <><span>JS Danmark</span><span className="creative-experience-period">2023–2025</span></>,
          children: <p>Videoredigering, grafisk design og visuelt indhold til virksomheder.</p>
        },
        {
          value: 'grown-up-group',
          title: <><span>Grown Up Group</span><span className="creative-experience-period">Freelance</span></>,
          children: <p>Reklamevideoer og kampagnemateriale.</p>
        },
        {
          value: 'caretoons',
          title: <><span>Caretoons</span><span className="creative-experience-period">Freelance</span></>,
          children: <p>Freelance · Animation / Visuelt indhold</p>
        }
      ]} />
    </div>
  );
}
