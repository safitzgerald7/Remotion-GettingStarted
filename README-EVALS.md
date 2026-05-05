# Running agent-v evals (single-run, Red/Green step)

This project enforces test-first development for Remotion agent or visual-qa changes using `agent-v`-style evals stored under `/.agents/skills/<skill>/evals/evals.json`.

Guidelines:
- Always create an agent-v eval before modifying Remotion agent instructions or behavior.
- Run exactly one eval per Red/Green step; do not loop automatically.
- Fix code or instructions when the eval fails, then run the eval again as the next iteration.

Quick commands:

```bash
# Run the remotion-agent eval id 1 (example)
npm run eval:run -- remotion-agent 1

# Exit codes:
# 0 => eval passed (Green)
# non-zero => eval failed (still Red) — address the failure then re-run
```

Notes:
- `scripts/run-agent-eval.ts` is a small shim that currently simulates an agent-v run. Replace the simulation with your `agent-v` CLI invocation when available.
- Keep each eval focused and measurable so Red/Green iterations are fast and deterministic.
