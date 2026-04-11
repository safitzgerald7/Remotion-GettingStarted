import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const YoungPlantScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 270], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
          <rect x="85" y="180" width="30" height="20" fill="#8B5A2B" />
          <rect x="95" y="120" width="10" height="60" fill="#8B5A2B" />
          <circle cx="80" cy="100" r="20" fill="#4CAF50" />
          <circle cx="110" cy="95" r="20" fill="#4CAF50" />
          <circle cx="75" cy="115" r="15" fill="#4CAF50" />
          <circle cx="115" cy="110" r="15" fill="#4CAF50" />
        </svg>
      </div>
      <h1 style={titleStyle}>Move outdoors</h1>
      <p style={subStyle}>Transplant after last frost</p>
    </div>
  );
};