---
name: sarafy
description: Use this skill whenever creating, modifying, or extending a Remotion project, implementation, or any video composition work. This skill enforces design consistency standards for transitions, typography, layout, and backgrounds, and it prioritizes solid white video canvases, centered scene composition, consistent visual systems, realistic image assets generated via OpenAI Image Gen 2, zero fade in/out transitions, on-screen captions for every scene, ElevenLabs narration for each caption, and OpenAI-powered image generation. Make sure to apply this skill for any Remotion scene creation, animation updates, video editing, UI component development, adding new scenes to videos, updating video sequences, ensuring visual coherence in Remotion compositions, or maintaining design systems in video projects to achieve professional, consistent video output.
---

# Sarafy: Remotion Design Consistency Skill

This skill ensures that all Remotion projects adhere to strict design standards for visual consistency, transitions, and typography, inspired by Google Stitch's DESIGN.md framework. DESIGN.md is a design system document that AI agents read to generate consistent UI across projects, defining colors, fonts, spacing, and component styles in a machine-readable format.

## When to Use This Skill

Apply this skill for:
- Creating new Remotion compositions or scenes
- Modifying existing video sequences
- Adding animations or transitions
- Developing React components for video rendering
- Ensuring visual coherence across frames
- Setting up or updating project design systems

## Core Principles

### 1. Design System Foundation (DESIGN.md Integration)

Every Remotion project should have a `design.md` file in the root directory that defines:
- **Color Palette**: Primary, secondary, accent colors with hex codes
- **Typography**: Font families, sizes, weights, line heights
- **Spacing Scale**: Consistent spacing units (4px, 8px, 16px, etc.)
- **Component Styles**: Button styles, text treatments, layout patterns
- **Animation Guidelines**: Transition durations, easing functions
- **Background Rules**: Solid full-frame backgrounds only, no transparency
- **Layout Rules**: Center all scene layouts horizontally and vertically

If no `design.md` exists, create one based on the project's visual identity.

### 2. Background, Layout, and Transition Standards

- **Video Background**: Use `#FFFFFF` for the full video canvas background.
- **No Transparent Backgrounds**: Scene backgrounds must be solid fills or textures on a white canvas; never rely on transparency.
- **Centered Content**: Align key visual elements and text both vertically and horizontally in every scene.
- **Frame Continuity**: Keep the background and layout stable across scene changes to support seamless transitions.
- **Zero Fade**: Do not use fade in or fade out on any scene elements or between scene transitions. Use direct scene cuts or motion-based transitions without opacity animation.
- **Captions**: Every scene must render an on-screen caption generated from the scene metadata.
- **Narration**: Every caption must be paired with spoken narration generated via ElevenLabs.
- **Image Generation**: Use OpenAI Image Gen 2 for the primary realistic scene assets instead of SVG vector graphics.

### 3. Transition Standards

- **Duration**: Use consistent timing (300ms for quick transitions, 500ms for scene changes)
- **Easing**: Prefer ease-in-out for smooth, natural motion
- **Types**: Fade, slide, scale - choose based on content relationship
- **Frame Continuity**: Ensure no jarring cuts; maintain visual flow

### 3. Typography Consistency

- **Font Hierarchy**: H1, H2, H3 with defined sizes and weights
- **Color Usage**: Text colors from the approved palette
- **Alignment**: Consistent text alignment within scenes
- **Readability**: Ensure sufficient contrast and appropriate font sizes for video

### 4. Visual Consistency

- **Color Application**: Stick to defined palette; no arbitrary colors
- **Spacing**: Use the spacing scale for all margins, padding
- **Component Reuse**: Build reusable components with consistent styling
- **Frame-to-Frame Continuity**: Maintain consistent backgrounds, layouts
- **Realistic Imagery**: Avoid SVG graphics for primary scene assets; prefer realistic image assets generated or sourced through Copilot SDK ambient auth with consistent lighting and texture.

## Workflow

1. **Assess Project**: Check for existing `design.md` file. If it exists, review and update if needed for the new work.
2. **Create/Update Design System**: Ensure `design.md` is comprehensive and current. If missing, create based on project requirements or existing components.
3. **Apply Standards**: Ensure all new/modified code follows the design guidelines. For video extensions, update all related files (Video.tsx, scenes.ts, durations.json, etc.).
4. **Integrate Scenes**: When adding new scenes, ensure they are properly registered in the video composition and maintain transition consistency.
5. **Validate**: Run visual tests to confirm consistency and proper integration.

## Implementation Guidelines

### Creating design.md

```markdown
# Design System

## Colors
- Primary: #FF6B6B
- Secondary: #4ECDC4
- Background: #FFFFFF
- Text: #2C3E50

## Typography
- Font Family: 'Inter', sans-serif
- H1: 48px, 600 weight
- Body: 16px, 400 weight

## Spacing
- Base: 4px
- Small: 8px
- Medium: 16px
- Large: 32px

## Transitions
- Duration: 300ms
- Easing: ease-in-out
```

### Remotion Component Example

```tsx
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { interpolate } from 'remotion';

const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  // Consistent transition timing
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  return (
    <div style={{
      opacity,
      fontFamily: 'Inter, sans-serif', // From design.md
      color: '#2C3E50', // From design.md
      padding: '16px', // From spacing scale
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: 600 }}>Title</h1>
    </div>
  );
};
```

## Scene Integration Guidelines

When extending Remotion videos with new scenes:

- **Register Components**: Add new scene components to the `sceneComponents` mapping in `Video.tsx`
- **Update Sequence**: Modify `scenes.ts` to include the new scene in the correct order
- **Set Durations**: Update `durations.json` with appropriate frame counts for the new scene
- **Maintain Transitions**: Avoid fade in/out transitions; use direct cuts or motion-based builds instead
- **Composition Updates**: Update the main composition in `Root.tsx` if needed

## Quality Checks

- All colors used are from the design.md palette
- Typography matches defined specifications
- No fade in or fade out is used in scenes or transitions
- Captions exist for every scene and are readable on-screen
- Every caption has a corresponding ElevenLabs narration audio asset
- Primary scene imagery is sourced or generated with OpenAI rather than SVG-only graphics
- Spacing follows the established scale
- New scenes are properly integrated into the video sequence
- Components are reusable and consistently styled

## Tools and Validation

Use Playwright for visual regression testing to ensure design consistency across renders. Run `npm run test` to validate visual output.