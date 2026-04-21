import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';

export const SproutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth fade-in with Bézier easing
  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Growth animation for the sprout
  const scale = interpolate(frame, [0, fps], [0.5, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Subtle upward motion
  const translateY = interpolate(frame, [0, fps], [30, 0], {
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
    marginBottom: '30px',
    transform: `scale(${scale})`,
    filter: 'drop-shadow(0 4px 12px rgba(76, 175, 80, 0.2))',
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
      <div style={visualStyle}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          <rect x="95" y="120" width="10" height="50" fill="#8B5A2B" rx="2" />
          <circle cx="85" cy="100" r="18" fill="#4CAF50" />
          <circle cx="105" cy="95" r="18" fill="#4CAF50" />
          <circle cx="100" cy="110" r="12" fill="#4CAF50" />
        </svg>
      </div>
      <h1 style={titleStyle}>Support early growth</h1>
      <p style={subStyle}>Consistent moisture + sunlight</p>
    </div>
  );
};
