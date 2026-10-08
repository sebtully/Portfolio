# Developer Portfolio (Next.js)

- Next.js (App Router)
- React.js
- TypeScript
- Tailwind CSS
- Framer Motion

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

`/creative` er en selvstændig kreativ portfolio; `/creative/cat-teen` viser CAT Teen Campaign. Udviklerportfolioen på `/` bruger fortsat sine oprindelige komponenter og styles.

Kreativ styling er afgrænset af `.creative-shell`. Projekter tilføjes i `data/creative-projects.ts`, og projektsider genereres automatisk ved build.

De tre CAT-videoer skal placeres i `public/media/creative/`. Se [medievejledningen](public/media/creative/README.md) for præcise filnavne, eksportformat og tilføjelse af fremtidige projekter. Manglende videoer får placeholders; tilføjede medier kræver et nyt build/deployment.

Checks (Node.js 22.6+):

```powershell
npx.cmd tsc --noEmit --incremental false
npm.cmd run build
node --experimental-strip-types --test scripts/check-creative.mjs
```

For også at kontrollere de færdige routes, start `npm.cmd run start -- --port 3100` i en anden terminal og kør:

```powershell
$env:CREATIVE_TEST_URL = 'http://localhost:3100'
node --experimental-strip-types --test scripts/check-creative.mjs
```

