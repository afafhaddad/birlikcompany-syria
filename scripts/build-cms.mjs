// Builds the TinaCMS editor into public/admin/ (copied to dist/admin/ by vite build).
// Skipped when the Tina Cloud keys are not set, so the site still builds without them.
import { execSync } from 'node:child_process';

if (process.env.TINA_CLIENT_ID && process.env.TINA_TOKEN) {
  execSync('npx tinacms build', { stdio: 'inherit' });
} else {
  console.log('[cms] TINA_CLIENT_ID / TINA_TOKEN not set: skipping the /admin/ editor build.');
}
