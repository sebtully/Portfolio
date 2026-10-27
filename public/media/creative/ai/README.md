# AI-cases og gemte billeder

**En stille kreativ stund** er et selvinitieret koncept inspireret af Søstrene Grenes univers. Alle produkter er fiktive. Kilden er `public/Text/creative-ai-case.md`. Brugeren bad om casen og flere versioner; ChatGPT foreslog scenariet, formulerede prompts, genererede og redigerede billederne og gennemførte visuel kontrol i dialogen. Send-knappen viser det oprindelige miljøbillede. v05 er udeladt efter brugerens udtrykkelige ønske.

Alle fire billeder her er uændrede kopier fra `public/media/aiPhotos/`:

| Produktionsfil | Originalfil | Dimensioner |
| --- | --- | --- |
| `papirblomster-dagslys.png` | `Papirblomster i blødt dagslys.png` | 1536 × 1024 |
| `stille-stund-bred.png` | `Keramikvase og papirblomster i naturligt lys-1.png` | 1672 × 941 |
| `stille-stund-detalje.png` | `Vase med tre papirblomster-2.png` | 1536 × 1024 |
| `stille-stund-lodret.png` | `Tre papirblomster i en vase-3.png` | 1122 × 1402 |

De fulde anvendte prompts til v01–v04 er hentet ordret fra `public/Text/creative-ai-case.md`. v01 svarer også til `public/Text/Skab ét fotorealistisk, vandret liv.txt`. Originalfilerne bevares. Produktions-URL'er bruger ASCII uden mellemrum, så Next.js' billedoptimering kan hente dem korrekt.

v02, v03 og v04 er tre selvstændige redigeringer af v01, ikke successive forbedringer. `parentId` viser udgangspunktet. `change`, `rationale` og `observation` beskriver den dokumenterede ændring, begrundelse og visuelle kontrol. v03 vises som et detaljeudkast: vasens bund er allerede beskåret i kildefilen. Visningen tilføjer ingen beskæring.

Når en case er dokumenteret:

1. Læg de faktiske gemte billeder her, f.eks. i en undermappe for casen. Bevar alle iterationer, som vises i processen.
2. Tilføj casen i `data/creative-ai-projects.ts`. Brug `origin: 'self-initiated'` til selvinitierede koncepter og `origin: 'client'` kun til dokumenteret kundearbejde.
3. Angiv brief, faktisk værktøj og korrekt arbejdsfordeling. Gem en kort `displayPrompt` til promptvinduet, og fulde anvendte prompttekster i `prompts`. En visningsprompt er en kort bearbejdet version af kilden og vises som sådan.
4. Forbind hver iteration til sin `promptId` og eventuelle `parentId`. Angiv billedets URL under `/media/creative/ai/`, beskrivende alt-tekst og de rigtige `width`/`height`. Gem den dokumenterede ændring, begrundelse og observation sammen med versionen. Den store billedramme og miniaturefelterne holder deres dimensioner på tværs af versioner; billederne vises med `object-fit: contain`.
5. Lad `result.iterationId` pege på det valgte billede. Beskriv kort valget i `result.explanation`, dit eget bidrag i `contribution`, læringen i `learning` og fremgangsmåden i `method`.

Udelad oplysninger, som ikke er dokumenteret. Den korte visningsprompt skrives én gang ved indscrollning. Send færdiggør teksten og starter en markeret afspilning med loadingikon og shimmer, mens originalbilledet indlæses. Efter mindst cirka to sekunder og færdig indlæsning/dekodning afsløres billedet over 800 ms. Derefter kommer miniaturerne frem én ad gangen, efterfulgt af procesoplysningerne. Billedrammen holder samme størrelse under hele forløbet. Indlæsningsfejl og en timeout på 15 sekunder giver mulighed for at prøve igen. Miniaturerne skifter billede og alle versionsoplysninger. Ved reduceret bevægelse springes kunstig ventetid og animationer over; send og færdig billedindlæsning er stadig nødvendige. Der er ingen lyd eller livegenerering.

Kør TypeScript og produktionsbuild efter tilføjelse. Kontrollér især filnavne, dimensioner, alt-tekster, promptændringer og at valgt resultat peger på den rigtige iteration.
