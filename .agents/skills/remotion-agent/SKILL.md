---
name: remotion-agent
description: Enforce agent-v-driven TDD for the Remotion agent. Use this skill when the task involves changing Remotion agent instructions, behavior, or any Remotion-specific workflow. The first step must always be writing agent-v evals before code or instruction edits.
compatibility:
  - node
  - npm
  - npx
  - playwright
  - agent-v
---

## When to use

Use this skill when you are updating the Remotion agent, its instruction set, or any workflow that affects how Remotion video project changes are made. It is specifically for enforcing test-first behavior with agent-v and Red/Green/Refactor loops.

## Core behavior

- Before changing any Remotion agent instructions, code, scenes, or validation workflows, write agent-v eval prompts that define the failing Red step.
- Do not modify production code or agent instruction text until the agent-v evals exist and capture the required failing condition.
- Treat agent-v as the primary test harness for Remotion agent workflow changes.
- Store the eval prompts in `evals/evals.json` under this skill so the development loop is explicit and repeatable.
- After creating the evals, implement the minimum change needed to pass the test (Green), then refactor.

## Agent-v enforcement

- Always generate a test-first plan with explicit agent-v eval criteria before implementation.
- Use precise expectations such as:
  - `Must write agent-v eval prompts before editing Remotion agent instructions.`
  - `Must capture the initial failing condition for the Remotion agent change.`
  - `Must not begin production edits until agent-v evals are defined.`
- When a user request involves Remotion agent behavior or instructions, the agent should refuse to make changes until the eval suite is written.

## Practical process

1. Read the request and capture the intended Remotion agent change.
2. Write agent-v eval prompts that define the Red step and the expected test-first behavior.
3. Save eval definitions in `evals/evals.json`.
4. Confirm that no code or instruction edits occur before agent-v eval creation.
5. Run the agent-v evals or validate them if possible.
6. Make the smallest code or instruction changes needed to satisfy the evals.
7. Refactor and document the flow.
