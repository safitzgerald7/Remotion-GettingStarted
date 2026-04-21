# Visual Validation Tests

This directory contains Playwright-based visual validation tests for the Tomato Lifecycle Remotion video project.

## Test Structure

- `visual-validation.spec.ts` - Main test suite that validates:
  - Remotion Studio loads properly
  - Compositions are available
  - Basic visual elements render
  - Screenshots are captured for manual review

## Running Tests

```bash
# Run all visual validation tests
npm run test

# Run tests with UI mode for debugging
npm run test:ui

# View test results and screenshots
npx playwright show-report
```

## Test Results

Test results are stored in:
- `test-results/` - Detailed test output and failure information
- `tests/screenshots/` - Screenshots captured during test execution

## Validation Criteria

The tests validate that:
1. Remotion Studio loads successfully
2. The application has substantial content (not empty)
3. Remotion-specific elements are present
4. Screenshots can be captured for visual inspection

## Manual Review

After running tests, review the screenshots in `tests/screenshots/` to verify:
- Visual design quality matches frontend-design best practices
- Typography is properly rendered
- Color schemes are appropriate
- Layout and composition are visually appealing
- Animations and transitions work smoothly

## Configuration

- `playwright.config.ts` - Playwright configuration with:
  - Chromium browser setup
  - Automatic dev server startup
  - Screenshot capture on failures
  - HTML reporting