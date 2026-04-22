import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const inter = loadInter();

export const TomatoGrowthScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth fade-in transition with consistent timing
  const opacity = interpolate(frame, [0, 2.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Gentle growth animation
  const scale = interpolate(frame, [0, 1.5 * fps], [0.5, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  });

  // Subtle floating motion
  const translateY = interpolate(frame, [0, fps], [30, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    background: 'linear-gradient(135deg, #FFF8F0 0%, #F5F0E8 50%, #F0E8E0 100%)',
    fontFamily: inter.fontFamily,
    opacity,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: 600,
    color: '#2C3E50',
    marginBottom: '16px',
    textAlign: 'center',
    transform: `scale(${scale}) translateY(${translateY}px)`,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 400,
    color: '#2C3E50',
    textAlign: 'center',
    maxWidth: '600px',
    lineHeight: '1.5',
    opacity,
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Tomato Growth Stage</h1>
      <p style={descriptionStyle}>
        Watch as the tomato plant develops from seed to harvest,
        showcasing the beautiful journey of growth and ripening.
      </p>
    </div>
  );
};