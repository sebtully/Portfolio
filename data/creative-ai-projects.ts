export type CreativeAIImage = {
  src: `/media/creative/ai/${string}`;
  alt: string;
  width: number;
  height: number;
};

export type CreativeAIProject = {
  id: string;
  title: string;
  origin: 'self-initiated' | 'client';
  brief?: string;
  tool?: string;
  displayPrompt?: string;
  prompts: { id: string; text: string; change?: string }[];
  iterations: { id: string; label: string; promptId?: string; parentId?: string; change?: string; rationale?: string; observation?: string; image?: CreativeAIImage; note?: string }[];
  result?: { iterationId: string; explanation?: string };
  contribution?: string;
  learning?: string;
  method?: string;
};

export function hasCreativeAIImage(image: CreativeAIImage | undefined): image is CreativeAIImage {
  return Boolean(image && image.src.startsWith('/media/creative/ai/') && image.alt.trim()
    && Number.isFinite(image.width) && image.width > 0 && Number.isFinite(image.height) && image.height > 0);
}

// Source: public/Text/creative-ai-case.md. v05 is excluded at the owner's explicit request.
export const creativeAIProjects: CreativeAIProject[] = [
  {
    "id": "papirblomster-dagslys",
    "title": "En stille kreativ stund",
    "origin": "self-initiated",
    "brief": "Et selvinitieret portfolio-koncept inspireret af Søstrene Grenes kreative boligunivers. En rolig stund ved et egetræsbord med keramikvase, papirblomster og kreative materialer. Alle produkter er fiktive.",
    "tool": "ChatGPTs indbyggede billedgenerering og billedredigering (imagegen).",
    "prompts": [
      {
        "id": "stille-stund-v01",
        "text": "Skab ét fotorealistisk, vandret livsstilsbillede til et selvinitieret portfolio-koncept inspireret af Søstrene Grenes hyggelige, kreative boligunivers. Scenariet er en stille stund ved et lyst egetræsbord tæt på et vindue. En lille, mat, cremefarvet keramikvase med tre håndlavede papirblomster i støvet rosa og smørgul er hovedmotivet. Ved siden af ligger enkelte stykker crepepapir, en enkel saks med messingfarvede greb og en lille trådspole. En keramikkop står på en naturligt krøllet hørserviet. Kompositionen skal føles beboet og kurateret, med få genstande, troværdig skala og tydeligt fokus på vasen. Blødt dagslys fra siden, fine skygger og synlige teksturer i papir, keramik, hør og træ. Varm råhvid, sand og afdæmpede pasteller. Fotografér i bordhøjde med en let nedadrettet vinkel og diskret dybdeskarphed. Giv luft omkring motivet til senere beskæring. Ingen mennesker, tekst, logoer eller vandmærker. Produkterne er fiktive, ikke gengivelser af konkrete butiksvarer."
      },
      {
        "id": "stille-stund-v02",
        "text": "Redigér det vedhæftede billede til en bred websitekomposition i 16:9. Billedet er redigeringsmål, ikke blot stilreference. Ændr primært kompositionen: Flyt den eksisterende opstilling med vase, kop og kreative materialer til højre del af billedet, så vasen står omtrent ved højre tredjedel. Lad de venstre cirka 45 procent være rolig negativ plads med tomt egetræsbord og en blødt uskarp, varm råhvid baggrund, egnet til mørk tekst tilføjet senere. Bevar den samme lille, matte, cremefarvede keramikvases præcise form og proportioner og de samme tre papirblomster: to rosa og én lysegul. Bevar farver, materialer, naturligt sidelys og fotografisk realisme. Ingen nye produkter, mennesker, tekst, logoer eller vandmærker. Dette er fortsat et selvinitieret koncept med fiktive produkter."
      },
      {
        "id": "stille-stund-v03",
        "text": "Redigér det vedhæftede billede til et tættere fotografisk udsnit i vandret 3:2-format. Billedet er redigeringsmål, ikke blot stilreference. Ændr primært kameraets afstand og fokus: Kom tættere på den eksisterende vase og papirblomster, så vasen og de tre blomster fylder hovedparten af billedhøjden uden at blive beskåret. Vis keramikoverfladen og crepepapirets ribber tydeligt med naturlige, realistiske teksturer. Bevar den præcise vaseform, størrelsesforhold, to rosa blomster og én lysegul blomst samt deres indbyrdes arrangement. Bevar det varme egetræsbord, samme dagslys fra venstre, farvepalet og rum. Lad koppen og de øvrige eksisterende kreative materialer optræde diskret og blødt uskarpt i billedets kanter. Ingen nye objekter, mennesker, tekst, logoer eller vandmærker. Ingen overdreven skarphed, ændret produktdesign eller illustrationseffekt."
      },
      {
        "id": "stille-stund-v04",
        "text": "Redigér det vedhæftede billede til et lodret livsstilsbillede i 4:5-format. Billedet er redigeringsmål, ikke blot stilreference. Ændr primært billedformat og komposition: Indram den samme vase med de samme tre papirblomster centralt i billedets midterste og nederste del. Hold hele vasen og alle tre blomster inden for billedet, og skab rolig, lys negativ plads i de øverste cirka 20 procent til en senere overskrift. Fordel den eksisterende kop, hørserviet, crepepapir, saks og trådspole naturligt ved billedets nederste kanter. Bevar den præcise vaseform og proportioner, to rosa blomster og én lysegul blomst, varme råhvide toner, naturlige materialer, egetræsbordet og det oprindelige bløde sidelys. Udvid scenen efter behov frem for at beskære hovedmotivet. Ingen nye produkter, mennesker, tekst, logoer eller vandmærker."
      }
    ],
    "iterations": [
      {
        "id": "papirblomster-billede",
        "label": "v01 · Miljøbillede",
        "change": "Første generering fra tekstprompt, uden inputbillede.",
        "rationale": "Skabe det første miljøbillede og udgangspunktet for variationerne.",
        "observation": "Den centrale vase, tre papirblomster, materialer og varme lysretning er til stede. Billedet blev udgangspunkt for de næste variationer.",
        "note": "Det oprindelige miljøbillede.",
        "promptId": "stille-stund-v01",
        "image": {
          "src": "/media/creative/ai/papirblomster-dagslys.png",
          "alt": "Tre rosa og gule papirblomster i en cremefarvet keramikvase på et lyst træbord ved et vindue, med crepepapir, saks, trådspole og en kop i varmt dagslys.",
          "width": 1536,
          "height": 1024
        }
      },
      {
        "id": "papirblomster-bred",
        "label": "v02 · Bred komposition",
        "parentId": "papirblomster-billede",
        "change": "Opstillingen er flyttet mod højre, så venstre side får rolig plads til tekst.",
        "rationale": "Skabe rolig plads til overskrift uden at dække hovedmotivet.",
        "observation": "Vasen er flyttet mod højre, og venstre side har nu betydeligt mere rolig plads til tekst. Kop og materialer er samlet omkring hovedmotivet.",
        "note": "Selvstændig redigering af v01 til en bred komposition.",
        "promptId": "stille-stund-v02",
        "image": {
          "src": "/media/creative/ai/stille-stund-bred.png",
          "alt": "Bred komposition med en vase med papirblomster og kreative materialer til højre på et egetræsbord og et roligt, lyst felt til venstre.",
          "width": 1672,
          "height": 941
        }
      },
      {
        "id": "papirblomster-detalje",
        "label": "v03 · Detaljeudkast",
        "parentId": "papirblomster-billede",
        "change": "Tættere udsnit med fokus på produkt og materialer.",
        "rationale": "Undersøge om et tættere udsnit gør materialer og hovedprodukt tydeligere.",
        "observation": "Det tættere udsnit viser papir og keramik tydeligere, men vasens bund bliver beskåret. Versionen vises som et udkast.",
        "note": "Mellemversion: vasens bund er beskåret i den gemte fil.",
        "promptId": "stille-stund-v03",
        "image": {
          "src": "/media/creative/ai/stille-stund-detalje.png",
          "alt": "Nærbillede af tre rosa og gule papirblomster og en cremefarvet vase med synlige teksturer i papir og keramik.",
          "width": 1536,
          "height": 1024
        }
      },
      {
        "id": "papirblomster-lodret",
        "label": "v04 · Lodret format",
        "parentId": "papirblomster-billede",
        "change": "Scenen er omlagt til en lodret komposition med rolig plads over blomsterne.",
        "rationale": "Tilpasse scenen til et lodret format med plads til en kort overskrift.",
        "observation": "Hele vasen og alle tre blomster er synlige. Det rolige område over blomsterne giver plads til en senere overskrift.",
        "note": "Selvstændig redigering af v01 til et lodret opslag.",
        "promptId": "stille-stund-v04",
        "image": {
          "src": "/media/creative/ai/stille-stund-lodret.png",
          "alt": "Lodret miljøbillede af papirblomster i en keramikvase med en kop, papir, trådspole og saks på et egetræsbord ved et vindue.",
          "width": 1122,
          "height": 1402
        }
      }
    ],
    "result": {
      "iterationId": "papirblomster-billede",
      "explanation": "Afdæmpede pasteller og naturligt dagslys skaber en rolig stemning. Teksturer i keramik, papir, træ og hør understøtter et varmt, håndlavet udtryk. Vasen fungerer som hovedmotiv."
    },
    "contribution": "Jeg bad om en relevant AI-case og efterfølgende flere versioner og billedrevisioner. ChatGPT foreslog scenariet, formulerede prompts, genererede og redigerede billederne og gennemførte visuel kvalitetskontrol i dialogen.",
    "method": "Koncept og prompt blev udviklet i dialog med ChatGPT. ChatGPT foreslog scenariet, formulerede prompts, genererede og redigerede billederne og gennemførte visuel kvalitetskontrol i dialogen. v02, v03 og v04 er tre selvstændige redigeringer af v01. De brede og lodrette filer ligger tæt på de ønskede 16:9 og 4:5 og vises i deres faktiske proportioner. Serien demonstrerer konceptudvikling og formattilpasning.",
    "displayPrompt": "Skab et fotorealistisk livsstilsbillede med papirblomster i en keramikvase på et lyst egetræsbord. Blødt dagslys, afdæmpede pasteller og varme materialeteksturer.",
    "learning": "Promptkrav om at bevare produkter garanterer ikke identisk geometri. Små forskelle i vaseform, blomster og genstandenes placering opstår mellem billederne. Visuel kontrol af v03 viste en beskåret vasebund."
  }
];
