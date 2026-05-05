import { execSync } from 'child_process';
import path from 'path';

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: ts-node scripts/run-agent-eval.ts <skill> <evalId>');
  process.exit(2);
}

const [skill, evalId] = args;
const evalsPath = path.join(process.cwd(), '.agents', 'skills', skill, 'evals', 'evals.json');

try {
  const cmd = `node -e "console.log('Simulating agent-v run for ${skill} eval ${evalId}'); process.exit(1)"`;
  // Replace the above with actual agent-v invocation when available.
  console.log('Running eval:', evalsPath, 'evalId:', evalId);
  execSync(cmd, { stdio: 'inherit' });
  console.log('Eval passed');
  process.exit(0);
} catch (err: any) {
  console.error('\nEval failed (non-zero exit). Fix code or update eval, then re-run as the next Red/Green step.');
  process.exit(err.status || 1);
}
