# Developer Portfolio (Next.js)

- Next.js (App Router)
- React.js
- TypeScript
- Tailwind CSS
- Motion for React (`motion/react`)

## Kom i gang

```bash
npm install
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - udviklingsserver
- `npm run build` - production build
- `npm run start` - kør production server
- `npm run lint` - linting

## Deployment på Vercel

1. Push projektet til GitHub.
2. Importér repo i Vercel.
3. Build command: `npm run build`
4. Output: automatisk fra Next.js

## Kreativ portfolio

`/creative` er en selvstændig kreativ portfolio; `/creative/cat-teen` viser CAT Teen Campaign. Udviklerportfolioen på `/` har sit eget design med lyst/mørkt tema, synlige projekter og en CRM-demo. Begge portfolioer bruger projektets egne billeder og videoer.

Kreativ styling er afgrænset af `.creative-shell`. Projekter tilføjes i `data/creative-projects.ts`, og projektsider genereres automatisk ved build.

### Animate UI på `/creative`

Sektionen **AI & proces** ligger mellem hero og Udvalgt arbejde. Den viser en gemt AI-proces med teksten **Afspil eksempel** ved et lyst promptvindue. En kort, hardcoded visningsprompt baseret på den dokumenterede case skrives én gang ved indscrollning, med roligt varieret skrivehastighed og blinkende markør. Et klik på send under skrivning færdiggør teksten og starter afspilningen: send deaktiveres, et roterende ikon og en langsom shimmer ledsager teksten **Billedet tager form…**, mens originalbilledet indlæses. Efter mindst cirka to sekunder og afsluttet billedindlæsning/dekodning afsløres det over 800 ms med Blur og indtoning. Der foretages ingen generering eller netværkskald til et AI-værktøj.

Når hovedbilledets overgang er færdig, kommer miniaturerne frem én ad gangen med 160 ms mellemrum, efterfulgt af procesoplysningerne. Alle fire versioner kan vælges med mus eller tastatur og vises uden yderligere beskæring i en stabil billedramme. Projektbeskrivelse, værktøj, arbejdsfordeling, versionsændring, begrundelse, visuel kontrol og fuld anvendt prompt ligger under billedet og miniaturevælgeren. Versionsoplysningerne opdateres sammen med billedet. Billedfejl eller mere end 15 sekunders indlæsning giver en **Prøv igen**-knap; gentagne send-klik starter ikke flere forløb.

Kilden er `public/Text/creative-ai-case.md`. **En stille kreativ stund** er et selvinitieret koncept med fiktive produkter, skabt i dialog med ChatGPT. ChatGPT foreslog scenariet, formulerede prompts og genererede/redigerede billederne. De fulde prompts til v01–v04 er gengivet ordret; v02, v03 og v04 har hver v01 som udgangspunkt. v03 vises som et detaljeudkast med den dokumenterede beskæring af vasens bund. v05 er udeladt efter brugerens ønske. Kildens anbefaling af v02 ændrer ikke, at send-knappen viser originalbilledet som ønsket.

Ved reduceret bevægelse vises hele visningsprompten straks uden blink, shimmer, rotation eller billedanimation. Den kunstige ventetid og forskudte miniatureafsløring springes over, men billedet skal stadig indlæses efter send. Timere og asynkrone billedopdateringer ryddes op ved skip, case-skift og unmount. Der er ingen lyd. Tilføj billeder og metadata efter [AI-medievejledningen](public/media/creative/ai/README.md).

Datakontrol: `node --experimental-strip-types --test scripts/check-creative-ai.mjs`.

Typing Text skriver anden linje i heroen én gang, Blur afslører de gemte AI-billeder, Tabs opdeler de eksisterende Adobe-værktøjer, og Accordion gør erfaringerne foldbare. Heroens portræt har separate CSS-lag: en varm gråbeige flade og det originale transparente portræt med synligt overlap. Fladen toner ind først, og personen følger med en lille opadgående bevægelse. Bevægelse slås fra ved `prefers-reduced-motion`; overskrift, værktøjer og erfaringer kan stadig læses uden JavaScript.

Integrationen bygger på [Animate UI v1-kildekomponenterne](https://github.com/imskyleen/animate-ui/tree/7fffde3e56e804bcf5e580e1c13ca5bd565ef588/apps/v1/apps/www/registry), tilpasset lokalt i `components/animate-ui`. Den aktuelle [installation](https://animate-ui.com/docs/installation) med `@animate-ui/react` 2.3.0 kræver React 19 og kan derfor ikke bruges direkte med projektets React 18.3.1. De lokale komponenter undgår en React-opgradering og bruger kun `motion` 14.6.0 samt Radix Tabs 1.2.1 og Accordion 1.3.1, som alle understøtter React 18. Se [kildehenvisning, tilpasninger og licens](components/animate-ui/NOTICE.md).

Alle animationer importeres fra `motion/react`, også på udviklerforsiden. Den direkte `framer-motion` 11-afhængighed er fjernet; `framer-motion` 14.6.0 følger med Motion som én fælles transitiv runtime. Tailwind 3/PostCSS bevares; ingen shadcn-konfiguration eller Tailwind 4-utilities er nødvendige.

De tre CAT-videoer skal placeres i `public/media/creative/`. Se [medievejledningen](public/media/creative/README.md) for præcise filnavne, eksportformat og tilføjelse af fremtidige projekter. Manglende videoer får placeholders; tilføjede medier kræver et nyt build/deployment.

Checks (Node.js 22.6+):

```powershell
npx.cmd tsc --noEmit --incremental false
npm.cmd run build
node --experimental-strip-types --test scripts/check-creative.mjs scripts/check-creative-ai.mjs
```

For også at kontrollere de færdige routes, start `npm.cmd run start -- --port 3100` i en anden terminal og kør:

```powershell
$env:CREATIVE_TEST_URL = 'http://localhost:3100'
node --experimental-strip-types --test scripts/check-creative.mjs scripts/check-creative-ai.mjs
node --experimental-strip-types scripts/check-creative-ai-playback.mjs
```

Browserkontrollen kræver en installeret Edge/Chrome og tester langsom indlæsning, indlæsningsfejl, timeout, gentagne klik, timeroprydning, reduceret bevægelse og tastaturbetjening ved desktop- og mobilbredder.

