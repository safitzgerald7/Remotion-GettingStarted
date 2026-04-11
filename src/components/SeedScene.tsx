import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const SeedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 270], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
    width: '100px',
    height: '100px',
    backgroundColor: '#8B5A2B',
    borderRadius: '50%',
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
      <div style={visualStyle} />
      <h1 style={titleStyle}>Start with seeds indoors</h1>
      <p style={subStyle}>Warmth + light + moist soil</p>
    </div>
  );
};