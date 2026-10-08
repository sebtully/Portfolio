# Kreative projektvideoer

Placér de originale videofiler direkte i denne mappe:

- `CAT-Teen_2_v1.mp4`
- `CAT-Teen_3_noText_v1.mp4`
- `CAT-Teen_3_v1.mp4`
- `JsDanmark - Project 1.mp4`

De tre CAT-videoer er målt til 1080 × 1920 (9:16); JS Danmark-videoen er 1920 × 1080 (16:9). Dimensionerne angives som `width` og `height` i projektdata, så layoutet har de korrekte proportioner allerede før indlæsning. Afspilleren kontrollerer også proportionerne via videoens metadata.

Hver video har en lokal JPEG-poster med samme grundnavn. CAT-posters er originale frames fra ca. 2 sekunder; JS Danmark-posteren er fra ca. 12 sekunder efter den sorte indledning. Posters er højst 960 pixels på den længste led. Ingen eksterne medier bruges.

Stier fra projektets rod: `public/media/creative/<filnavn>`.
Navne og store/små bogstaver skal matche præcist på Vercel.

Manglende filer får en tydelig placeholder. Tilføj filerne og lav et nyt build/deployment for at aktivere dem på de statisk genererede sider. Videoer afspilles kun efter brugerens eget valg og bruger `preload="none"`.

Brug browserkompatibel MP4 (H.264-video/AAC-lyd), og eksportér helst med weboptimering/fast start. Undertekster kan tilføjes som WebVTT, hvis videoerne indeholder tale; der er ikke leveret undertekstfiler.

## Fremtidige projekter

Tilføj et projekt i `data/creative-projects.ts` med en unik `slug`, faktuelt indhold, videofilnavne, originale dimensioner og posterfilnavne. Læg videoer og posters i denne mappe. `sourceMaterial` udfyldes kun, hvis materialets oprindelse er dokumenteret. Både forsiden og `/creative/<slug>` genereres automatisk ved næste build.

JS Danmark-videoen er webkomprimeret fra ca. 209 MB til 27,5 MB med H.264/AAC og fast start. Opløsning (1920 × 1080), 30 fps, længde og stereolyd er bevaret; komprimeringen er med tab. Videoen downloades først ved afspilning. Originalen ligger lokalt i `.media-originals/`, som ignoreres af Git og ikke ligger under `public/`.
