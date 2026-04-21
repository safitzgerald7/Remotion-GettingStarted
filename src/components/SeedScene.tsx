import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';

export const SeedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth fade-in with Bézier easing
  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Gentle growth animation
  const scale = interpolate(frame, [0, fps], [0.8, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Subtle upward motion
  const translateY = interpolate(frame, [0, fps], [20, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#ffffff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    opacity,
    transform: `translateY(${translateY}px)`,
  };

  const visualStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    backgroundColor: '#8B5A2B',
    borderRadius: '50%',
    marginBottom: '30px',
    transform: `scale(${scale})`,
    boxShadow: '0 4px 20px rgba(139, 90, 43, 0.3)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '52px',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: '600',
    textShadow: '0 2px 4px rgba(76, 175, 80, 0.2)',
  };

  const subStyle: React.CSSProperties = {
    fontSize: '28px',
    color: '#666666',
    textAlign: 'center',
    fontWeight: '400',
    maxWidth: '600px',
  };

  return (
    <div style={containerStyle}>
      <div style={visualStyle} />
      <h1 style={titleStyle}>Start with seeds indoors</h1>
      <p style={subStyle}>Warmth + light + moist soil</p>
    </div>
  );
};
