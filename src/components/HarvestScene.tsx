import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';

export const HarvestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth fade-in with Bézier easing
  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Growth animation
  const scale = interpolate(frame, [0, fps], [0.9, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Subtle upward motion
  const translateY = interpolate(frame, [0, fps], [15, 0], {
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
        <svg width="280" height="280" viewBox="0 0 280 280">
          <rect x="85" y="200" width="30" height="20" fill="#8B5A2B" rx="3" />
          <rect x="100" y="60" width="2" height="140" fill="#8B5A2B" />
          <rect x="95" y="140" width="10" height="60" fill="#8B5A2B" rx="2" />
          <circle cx="80" cy="120" r="22" fill="#4CAF50" />
          <circle cx="110" cy="115" r="22" fill="#4CAF50" />
          <circle cx="75" cy="135" r="16" fill="#4CAF50" />
          <circle cx="115" cy="130" r="16" fill="#4CAF50" />
          <circle cx="90" cy="90" r="12" fill="#FF0000" />
          <circle cx="105" cy="85" r="12" fill="#FF0000" />
          <circle cx="85" cy="100" r="12" fill="#FF0000" />
          <circle cx="110" cy="95" r="12" fill="#FF0000" />
          <circle cx="95" cy="110" r="10" fill="#FF0000" />
        </svg>
      </div>
      <h1 style={titleStyle}>When to harvest</h1>
      <p style={subStyle}>Pick when red and firm</p>
    </div>
  );
};
