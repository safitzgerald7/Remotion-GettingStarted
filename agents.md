# Agent Configuration for Visual Validation

This document defines agent behaviors and configurations for the Remotion-GettingStarted project, with a focus on automated visual validation using headless Playwright MCP.

## Visual Validation Requirements

**ALL visual changes MUST be validated using headless Playwright MCP** to ensure:

1. **Visual Rendering**: Components render correctly without console errors
2. **Layout Integrity**: No broken layouts or positioning issues  
3. **Typography**: Fonts load and display properly
4. **Animations**: Smooth transitions and motion effects
5. **Cross-browser Compatibility**: Consistent rendering across environments
6. **Performance**: No rendering bottlenecks or memory issues

## MCP Configuration

The project uses headless Playwright MCP for automated visual validation:

```json
{
  "servers": {
    "microsoft/playwright-mcp": {
      "type": "stdio", 
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"],
      "gallery": "https://api.mcp.github.com",
      "version": "0.0.1-seed"
    }
  },
  "inputs": []
}
```

## Agent Behaviors

### Frontend Design Agent
- **Trigger**: Any visual component creation, styling, or UI changes
- **Validation**: Automatically run headless Playwright tests
- **Requirements**:
  - Screenshot capture for visual regression
  - Console error detection
  - Layout validation
  - Typography verification

### Remotion Video Agent  
- **Trigger**: Video composition changes, scene modifications, animation updates
- **Validation**: Headless browser testing of Remotion studio
- **Requirements**:
  - Composition loading verification
  - Preview rendering validation
  - Transition smoothness testing
  - Font loading confirmation

### Playwright Testing Agent
- **Trigger**: Test file modifications, validation logic changes
- **Validation**: Self-validation of test infrastructure
- **Requirements**:
  - Test execution verification
  - Screenshot capture functionality
  - Error handling validation

## Validation Workflow

### Pre-commit Validation
1. **Automatic**: Run headless Playwright tests on all visual changes
2. **Screenshot Capture**: Generate before/after comparison images
3. **Error Detection**: Fail builds on critical rendering errors
4. **Performance Check**: Validate rendering performance metrics

### Continuous Integration
1. **Headless Testing**: All CI runs use headless Playwright MCP
2. **Visual Regression**: Compare screenshots against baselines
3. **Cross-platform**: Test on multiple browser environments
4. **Performance Monitoring**: Track rendering times and memory usage

## Error Handling

### Critical Errors (Block Deployment)
- Console errors during rendering
- Missing fonts or assets
- Broken layouts or positioning
- Animation failures
- Memory leaks or performance issues

### Warning Errors (Log but Allow)
- Version mismatch warnings
- Deprecation notices
- Network timeouts (non-critical)
- Minor layout shifts

## Skills Integration

The following skills are configured for automated validation:

- **frontend-design**: Ensures distinctive, production-grade UI aesthetics
- **playwright-cli**: Provides browser automation for testing
- **remotion-best-practices**: Validates video composition quality
- **skill-creator**: Enables dynamic skill creation for specialized validation

## Configuration Files

- `.vscode/mcp.json`: MCP server configuration (headless Playwright)
- `playwright.config.ts`: Playwright test configuration
- `tests/visual-validation.spec.ts`: Visual validation test suite
- `package.json`: Test scripts and dependencies

## Usage

### Manual Validation
```bash
# Run visual validation tests
npm run test

# Run with UI for debugging
npm run test:ui

# View test reports
npx playwright show-report
```

### Automated Validation
Visual validation runs automatically on:
- Pull requests with visual changes
- Frontend component modifications
- Remotion scene updates
- Typography or styling changes

## Quality Gates

All visual changes must pass:
- ✅ Zero critical console errors
- ✅ Successful screenshot capture
- ✅ Layout integrity verification
- ✅ Font loading confirmation
- ✅ Animation smoothness validation
- ✅ Performance benchmarks met
