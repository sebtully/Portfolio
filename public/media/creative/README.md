# Kreative projektvideoer

Caretoons – Freelance bruger den eksterne originalvideo `https://faks.dk/wp-content/uploads/2025/04/FAKS_mand_full.mp4` (1920 × 1080, 16:9) og den lokale poster `Caretoons projekt 1.jpg`. Billedet er flyttet hertil fra `public/media/Profile Picture/`; videoen er ikke kopieret eller downloadet. `filename` i projektdata kan være et lokalt filnavn eller en HTTPS-URL. Afspilleren bruger `preload="none"` og viser et link til originalvideoen ved afspilningsfejl.

Alle syv originale projektvideoer ligger i denne mappe og er forbundet til projektdata:

- `CAT-Teen_2_v1.mp4`
- `CAT-Teen_2_noText_v1.mp4`
- `CAT-Teen_1_v1.mp4`
- `CAT-Teen_1_noText_V1.mp4`
- `CAT-Teen_3_noText_v1.mp4`
- `CAT-Teen_3_v1.mp4`
- `JsDanmark - Project 1.mp4`

De seks CAT-videoer er målt til 1080 × 1920 (9:16); JS Danmark-videoen er 1920 × 1080 (16:9). Dimensionerne angives som `width` og `height` i projektdata, så layoutet har de korrekte proportioner allerede før indlæsning. Afspilleren kontrollerer også proportionerne via videoens metadata.

Fire videoer har en lokal JPEG-poster med samme grundnavn. CAT-posters er originale frames fra ca. 2 sekunder; JS Danmark-posteren er opdateret fra 12 sekunder i erstatningsvideoen. Posters er højst 960 pixels på den længste led. De øvrige videoer bruger `preload="metadata"`, så browseren kan vise en frame fra selve videoen. Ingen eksterne medier bruges.

Stier fra projektets rod: `public/media/creative/<filnavn>`.
Navne og store/små bogstaver skal matche præcist på Vercel.

Videoer afspilles kun efter brugerens eget valg. Videoer med poster bruger `preload="none"`. Alle filer er Git-sporet under `public/`, så Next.js/Vercel kan servere dem direkte. Kør `node --experimental-strip-types scripts/check-creative.mjs` for at kontrollere filnavne og dækning; sæt `CREATIVE_TEST_URL` til produktionsserverens URL for også at kontrollere sider, posters og videoernes byte ranges.

`outputFileTracingExcludes` i `next.config.mjs` forhindrer, at de statiske medier også kopieres ind i serverpakken. Projektsiderne genereres ved build, hvor filernes tilstedeværelse kontrolleres; videofilerne leveres separat fra `public/`.

Brug browserkompatibel MP4 (H.264-video/AAC-lyd), og eksportér helst med weboptimering/fast start. Undertekster kan tilføjes som WebVTT, hvis videoerne indeholder tale; der er ikke leveret undertekstfiler.

## Fremtidige projekter

Tilføj et projekt i `data/creative-projects.ts` med en unik `slug`, faktuelt indhold, videofilnavne, originale dimensioner og posterfilnavne. Læg videoer og posters i denne mappe. `sourceMaterial` udfyldes kun, hvis materialets oprindelse er dokumenteret. Både forsiden og `/creative/<slug>` genereres automatisk ved næste build.

`Video Project 3.mp4` erstatter den tidligere JS Danmark-video og leveres under det eksisterende filnavn `JsDanmark - Project 1.mp4`, så projektets navn, URL og komponenter bevares. Erstatningen er webkomprimeret fra ca. 198 MB til 26,3 MB med H.264/AAC og fast start. Opløsning (1920 × 1080), 30 fps, længde (88,17 sekunder) og lyd er bevaret; komprimeringen er med tab. Videoen downloades først ved afspilning. Originalen ligger lokalt i `.media-originals/Video Project 3.mp4`, som ignoreres af Git og ikke ligger under `public/`. Den tidligere JS Danmark-video er også gemt i `.media-originals/`.
