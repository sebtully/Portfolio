import { statSync } from 'node:fs';
import path from 'node:path';

export function getCreativeVideo(filename: string) {
  const file = path.join(process.cwd(), 'public', 'media', 'creative', filename);
  return {
    src: `/media/creative/${encodeURIComponent(filename)}`,
    available: statSync(file, { throwIfNoEntry: false })?.isFile() ?? false
  };
}
