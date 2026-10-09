import { statSync } from 'node:fs';
import path from 'node:path';

export function getCreativeVideo(filename: string, poster?: string) {
  const directory = path.join(process.cwd(), 'public', 'media', 'creative');
  const remote = filename.startsWith('https://');
  return {
    src: remote ? filename : `/media/creative/${encodeURIComponent(filename)}`,
    available: remote || (statSync(path.join(directory, filename), { throwIfNoEntry: false })?.isFile() ?? false),
    poster: poster && statSync(path.join(directory, poster), { throwIfNoEntry: false })?.isFile()
      ? `/media/creative/${encodeURIComponent(poster)}`
      : undefined
  };
}
