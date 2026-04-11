import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const SproutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 270], [0.5, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#ffffff',
    fontFamily: 'sans-serif',
    opacity,
  };

  const visualStyle: React.CSSProperties = {
    marginBottom: '20px',
    transform: `scale(${scale})`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '48px',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: '10px',
  };

  const subStyle: React.CSSProperties = {
    fontSize: '24px',
    color: '#666666',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={visualStyle}>
        <svg width="200" height="200">
          <rect x="95" y="100" width="10" height="50" fill="#8B5A2B" />
          <circle cx="85" cy="90" r="15" fill="#4CAF50" />
          <circle cx="105" cy="85" r="15" fill="#4CAF50" />
        </svg>
      </div>
      <h1 style={titleStyle}>Support early growth</h1>
      <p style={subStyle}>Consistent moisture + sunlight</p>
    </div>
  );
};