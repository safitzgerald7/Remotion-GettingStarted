#!/usr/bin/env bash
set -euo pipefail

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

if ! command_exists agentevals; then
  echo "agentevals not found. Installing agentevals..."
  npm install --no-save agentevals
fi

if ! command_exists agent && ! command_exists agent-v; then
  echo "agent-v not found. Installing agent-v..."
  npm install --no-save agent-v
fi

if ! command_exists npx; then
  echo "npx is required but missing. Please install npm or use a Node.js environment."
  exit 1
fi

if ! npx playwright --version >/dev/null 2>&1; then
  echo "Playwright not found. Installing @playwright/test and browsers..."
  npm install --no-save @playwright/test
  npx playwright install --with-deps
fi

echo "All SDLC tooling is available."
