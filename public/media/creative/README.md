# Kreative projektvideoer

Placér de originale videofiler direkte i denne mappe:

- `CAT-Teen_2_v1.mp4`
- `CAT-Teen_3_noText_v1.mp4`
- `CAT-Teen_3_v1.mp4`

Stier fra projektets rod: `public/media/creative/<filnavn>`.
Navne og store/små bogstaver skal matche præcist på Vercel.

Manglende filer får en tydelig placeholder. Tilføj filerne og lav et nyt build/deployment for at aktivere dem på de statisk genererede sider. Videoer afspilles kun efter brugerens eget valg og bruger `preload="none"`.

Brug browserkompatibel MP4 (H.264-video/AAC-lyd), og eksportér helst med weboptimering/fast start. Undertekster kan tilføjes som WebVTT, hvis videoerne indeholder tale; der er ikke leveret undertekstfiler.

## Fremtidige projekter

Tilføj et projekt i `data/creative-projects.ts` med en unik `slug`, faktuelt indhold og videofilnavne. Læg videoerne i denne mappe. Både forsiden og `/creative/<slug>` genereres automatisk ved næste build. Tilføj kun projekter fra eksempelvis JS Danmark eller Grown Up Group, når indhold og medier er klar.
