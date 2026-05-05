---
name: visual-qa
description: Visual quality assurance workflow for generated SVGs using a two-agent loop: an Image Generation Agent and a Playwright MCP Agent. The Playwright agent validates the SVG visually and attempts to classify/guess the intended subject. If it fails, it provides actionable feedback to the image agent to iterate until classification succeeds.
compatibility:
  - node
  - npm
  - npx
  - playwright
  - agent-v
---

## Purpose

This skill enforces an automated visual QA loop for generated SVG assets used in Remotion scenes. The loop requires two cooperating agents:

- Image Generation Agent: produces or updates an SVG asset according to a textual prompt.
- Playwright MCP Agent: renders the SVG in a headless browser, visually inspects it, and attempts to classify the scene according to the generation intent.

The two agents exchange structured feedback until the Playwright agent can correctly classify the SVG as the Image Generation Agent intended.

## Workflow

1. The Image Generation Agent produces an SVG and saves it to `public/images/<sceneId>.svg` (or `src/assets/images/<sceneId>.svg`).
2. The Playwright MCP Agent loads a validation page that embeds the SVG at 1024×1024 (or scaled to a square of at least 512×512) and captures:
  - a full-page screenshot (PNG) at devicePixelRatio=2,
  - a tight screenshot of the SVG element,
  - DOM metrics (image naturalWidth/naturalHeight, rendered bbox, and any console errors/warnings).
3. The Playwright Agent must run a deterministic classification step and return a structured result object:
  {
    "sceneId": "seed",
    "guess": "sprout with two leaves",
    "confidence": 0.87,
    "features": ["green-dominant", "two-leaves", "central-subject"],
    "issues": ["low-contrast-fruit", "ambiguous-stem"],
    "screenshots": {
     "full": "path/to/full.png",
     "tight": "path/to/tight.png"
    }
  }
  - The `confidence` must be a numeric 0..1. Confidence calculation may use heuristics (color dominance, object-size ratio, edge-count) or ML-based rules, but must be deterministic and reproducible for the same input.
4. Pass/fail rule: the guess is considered correct when the sampled `confidence` >= configurable `CONFIDENCE_THRESHOLD` (default 0.80) AND the `guess` text semantically matches the Image Generation Agent's `intended_description` (use a strict token-overlap or normalized-string compare; document which method is used in `visual-qa/logs/<sceneId>.json`).
5. If the result fails, the Playwright Agent MUST produce:
  - a short human-readable `reason` (one sentence) explaining why the asset failed, mapped to specific visual cues (contrast, occlusion, missing object, wrong aspect ratio), and
  - a short prioritized action list (2–4 items) the Image Generation Agent can deterministically act on (e.g., "increase fruit contrast by +30%", "make stem 20% longer and left-aligned", "remove background texture").
6. The Image Generation Agent MUST apply the prioritized actions to create a revised SVG saved with a version suffix (e.g., `seed.v2.svg`) and record the mapping from action -> change in the run transcript.
7. Repeat until pass or until `MAX_ITERATIONS` (configurable, default 6) is reached. Each iteration appends an entry to `visual-qa/logs/<sceneId>.json` with the structured result and timestamps.

## Agent responsibilities and evals

- The Image Generation Agent must accept textual guidance and produce deterministic SVG updates that address the Playwright feedback.
- The Playwright Agent must produce concise, testable feedback and a structured classification result as described above.
- The Playwright Agent must also produce a `failure_reason` tag when the asset fails (one of: `low_contrast`, `missing_subject`, `occluded`, `wrong_scale`, `too_noisy`, `invalid_svg`, `font_missing`, `render_error`).
- All interactions MUST be recorded in `visual-qa/logs/<sceneId>.json` with the following fields per iteration: `iteration`, `timestamp`, `svg_path`, `tight_screenshot`, `full_screenshot`, `guess`, `confidence`, `features`, `failure_reason`, `actions_proposed`, `agent_prompts`.
- Logs must be JSONL (newline-delimited) so runs are appendable and streamable.

## Storage and reproducibility

 - Save final approved SVGs to `public/images/` and intermediate versions with a version suffix (e.g., `seed.v2.svg`).
 - Store screenshots in `visual-qa/screenshots/<sceneId>/iteration-<n>/` and transcripts in `visual-qa/logs/<sceneId>.jsonl`.
 - Record evaluation transcripts and agent-v eval prompts in `/.agents/skills/visual-qa/evals/evals.json` so runs can be replayed.
 - Provide a simple local `runner` example (see below) that performs one full iteration: generate -> validate -> log -> save screenshots.

### Playwright validation checklist (required for each run)
 - Page loads without console `error` or `pageerror` entries.
 - SVG element is present in the DOM and has non-zero bounding box.
 - Tight screenshot contains the subject centered within 10% of the frame on both axes.
 - Image sharpness: compute a simple Laplacian variance (or approximate by checking PNG file size); low variance should be flagged as `too_noisy` or `low_contrast`.
 - Color-dominance: compute top-3 dominant colors and return `green-dominant`, `red-dominant`, etc., to help classification.

### Failure reporting and steering
 - For each failed iteration the Playwright agent must produce a human-friendly `report.md` in the iteration folder summarizing:
   - intended subject,
   - agent's guess + confidence,
   - `failure_reason` tags with short explanations,
   - the prioritized action list (ready for the image agent), and
   - links to `tight.png` and `full.png`.
 - Use these concrete failure reasons to guide deterministic SVG edits in the Image Generation Agent.

### Example runner (pseudocode)
The skill should ship a minimal runner example under `/.agents/skills/visual-qa/examples/runner.js` that:
 - loads `public/validate.html` or a specific SVG file,
 - captures the required screenshots and metrics,
 - writes the structured JSON result and `report.md`, and
 - exits with non-zero code when the run fails (so CI can detect failures).

This runner is used both locally and by the Playwright MCP Agent orchestration.

## Use cases

- Validate newly generated SVG scene assets for Remotion compositions
- Automate iterative improvement of synthetic visual assets
- Provide objective pass/fail criteria for visual fidelity before rendering video
