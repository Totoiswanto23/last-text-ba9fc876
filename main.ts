// last-text-ba9fc876: the last text a phone sends at one percent battery.
// This program writes that single message to /output/entry.txt, where the
// gate reads it.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The message is built from three final confessions, one per person (or
// charger) the phone owes a goodbye to. Three small surprises in one text,
// all in the phone's own voice: love for Mum, the real Wi-Fi password for
// Dad, and a breakup with the charger. It dodges the obvious low-battery
// puns: no "charge me", no "goodbye cruel world".
const CONFESSIONS = [
  "tell Mum I love her",
  "tell Dad the Wi-Fi password was 'password123' all along",
  "tell my charger we were never exclusive",
];

// "A, B, and C" — the last confession gets the "and", the earlier ones
// just commas, so the line reads like a real text, not a list.
const LINE =
  `1% left. Before I go: ${CONFESSIONS.slice(0, -1).join(', ')}, and ${CONFESSIONS.at(-1)}.`;

const MAX_CHARS = 200;

if (LINE.length < 1 || LINE.length > MAX_CHARS || LINE.includes('\n')) {
  console.error('entry line is not a single line of 1-200 characters');
  process.exit(1);
}

// No trailing newline: the file is exactly the one message, so no reader can
// count a second (empty) line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
