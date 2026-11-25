// last-text-ba9fc876: the last text a phone sends at one percent battery.
// This program writes that single message to /output/entry.txt, where the
// gate reads it.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The message: the dying phone uses its last percent to send three final
// confessions at once — love for Mum, the real Wi-Fi password for Dad, and
// a breakup with the charger. Three small surprises in one text, all in the
// phone's own voice, and it dodges the obvious low-battery puns: no
// "charge me", no "goodbye cruel world".
const LINE =
  "1% left. Before I go: tell Mum I love her, tell Dad the Wi-Fi password was 'password123' all along, and tell my charger we were never exclusive.";

if (LINE.length < 1 || LINE.length > 200 || LINE.includes('\n')) {
  console.error('entry line is not a single line of 1-200 characters');
  process.exit(1);
}

// No trailing newline: the file is exactly the one message, so no reader can
// count a second (empty) line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
