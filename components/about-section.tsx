import { developerSkills } from '@/data/skills';
import { Reveal } from '@/components/creative/reveal';

export function AboutSection() {
  return (
    <section id="om-mig" className="section-shell developer-about" aria-labelledby="about-heading">
      <div className="about-introduction">
        <Reveal><h2 id="about-heading" className="section-title">Om mig</h2></Reveal>
        <div className="about-copy">
          <Reveal><p>Jeg arbejder deltid som Full Stack Developer hos Rosholm Connect, hvor jeg videreudvikler virksomhedens CRM-løsning og er med til at udvikle nye interne systemer, herunder en kommende ERP-løsning. Mine opgaver spænder over frontend, backend, database og integrationer med React, TypeScript, PHP, MySQL og REST API’er.</p></Reveal>
          <Reveal><p>Tidligere har jeg været i praktik som Full Stack Developer hos Norlys, hvor jeg arbejdede med C#/.NET, React, TypeScript, Azure, DevOps og Entra ID. Jeg lærer hurtigt, går op i kvalitet og motiveres af at omsætte komplekse behov til løsninger, der fungerer i praksis.</p></Reveal>
        </div>
      </div>
      <div id="kompetencer" className="developer-skills">
        <Reveal><h3>Teknologier & kompetencer</h3></Reveal>
        <div className="skill-list">
          {developerSkills.map((category) => (
            <Reveal key={category.title}>
              <div className="skill-row"><h4>{category.title}</h4><ul>{category.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
