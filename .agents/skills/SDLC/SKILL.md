---
name: SDLC
description: Use this skill for software development, code reviews, and feature delivery workflows where the agent should enforce a Red/Green/Refactor TDD loop, iterate with agentevals.io-quality feedback, and validate UI design systems visually with Playwright and design.md. Trigger this skill whenever the user asks for development process guidance, testing plans, evaluation rubrics, UI design validation, or requests a workflow improvement based on feedback.
compatibility:
  - node
  - npm
  - npx
  - playwright
  - agentevals
  - agent-v
---

# SDLC Skill

This skill turns the agent into a development coach for disciplined delivery:

- Always start development with a test-first plan.
- Drive each iteration through Red → Green → Refactor loops.
- Treat agentevals.io-style evaluation as the control plane for continuous improvement.
- Use Playwright UI tests to validate any design or frontend work against `design.md`.
- When the user gives feedback, fold it into evaluation criteria and rubrics for the next loop.
- Prefer explicit eval metadata and keep it updated between iterations.

## Core behavior

1. Capture acceptance criteria and user feedback first.
2. Define explicit evals and rubrics before writing code.
3. Create a failing test or a failing expectation first (RED).
4. Before editing any Remotion agent instructions or Remotion-specific code, write at least one agent-v eval and treat it as the failing Red test. Do not modify production code until the eval exists.
5. Implement the smallest change needed to pass the test (GREEN).
6. Clean up and refactor after the test passes (REFACTOR).
7. Repeat until all eval criteria pass.

## Evaluation and feedback loop

- Always generate or update `evals/evals.json` for the current task.
- Include every user feedback item as one or more evaluation criteria or rubric lines.
- Use the text of feedback directly when possible, then turn it into measurable acceptance criteria.
- Prefer concrete checks such as:
  - "button color matches #4CAF50"
  - "animation duration is 1.5-2.5 seconds"
  - "typography uses Playfair Display for titles"
  - "feedback about sluggish animation is captured as a regression criterion"

## Tool installation

If `agentevals`, `agent-v`, or Playwright are not available, install them before proceeding.

1. Check commands:
   - `command -v agentevals`
   - `command -v agent-v`
   - `npx playwright --version`
2. If any are missing, install locally for the workspace:

```bash
npm install --no-save agentevals agent-v @playwright/test
```

3. If Playwright is newly installed, ensure browser dependencies are installed:

```bash
npx playwright install --with-deps
```

4. Prefer `npx` to run the tools so the workspace can work without global installs.

> If the environment cannot install packages automatically, warn the user and ask for permission to proceed with installation.
>
> Use `scripts/ensure_sdlc_tools.sh` when available to bootstrap missing tooling consistently.

## Playwright design validation

When the task involves UI, visual design, or any frontend component:

- Read `design.md` and extract the design system requirements.
- Build a Playwright UI test plan that checks the rendered page or component for:
  - colors from the design system
  - typography family, size, weight, and spacing
  - spacing tokens and layout centering
  - background requirements (solid white canvas, subtle texture if needed)
  - animation duration, easing, and motion patterns
- Prefer visual validation over purely textual assertions.
- If a real page is not available, create a small verification page or story that can be rendered and validated by Playwright.

## Practical process

For every user request, do the following:

1. Summarize the requirements and ask for anything missing.
2. Convert the requirements into an explicit `evals/evals.json` rubric.
3. Write the first test or evaluation spec.
4. Run through a Red/Green/Refactor cycle.
5. Validate results with `agent-v` and/or `agentevals` if available, especially for Remotion agent instruction or behavior changes.
6. Run Playwright UI tests when design or frontend validation is required.
7. Capture results and feedback in the eval metadata.

## When feedback is provided

- Add the feedback as a named criterion in `evals/evals.json`.
- If the feedback is about quality, ux, or design, also add it as a rubric item for visual/UX validation.
- If the feedback is about process or communication, capture it as a retrospective item for the next loop.

## Example output structure

- `evals/evals.json` — current evaluation prompts and expectations
- `scripts/ensure_sdlc_tools.sh` — helper script to install missing tooling
- `playwright/` or `tests/` — Playwright UI tests for visual validation
- `design.md` — source design system file to validate against

## Example wording

- "Start with a failing test and do not write production code until the test fails."
- "Use agentevals.io-style expectations to turn feedback into objective pass/fail criteria."
- "If the user reports a design issue, explicitly update the next loop's rubric with that issue."
