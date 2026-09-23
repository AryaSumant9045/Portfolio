import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Resolves the portrait that ships in `public/`.
 *
 * The check runs on the server at build time, so dropping the file in is the
 * only step needed — and nothing probes for a missing image in the browser,
 * which would otherwise leave a 404 in the console.
 *
 * Server-only: never import this from a client component.
 */
const CANDIDATES = [
  "portrait.jpg",
  "portrait.jpeg",
  "portrait.png",
  "portrait.webp",
  "portrait.avif",
];

export function findPortrait(): string | null {
  for (const name of CANDIDATES) {
    if (existsSync(path.join(process.cwd(), "public", name))) return `/${name}`;
  }
  return null;
}
