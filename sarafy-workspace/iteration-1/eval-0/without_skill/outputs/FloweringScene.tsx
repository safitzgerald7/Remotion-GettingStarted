import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const inter = loadFont();

export const FloweringScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth fade-in transition
  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Gentle scale animation
  const scale = interpolate(frame, [0, 1.5 * fps], [0.8, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Subtle upward motion
  const translateY = interpolate(frame, [0, fps], [20, 0], {
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
    background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 50%, #e8f5e8 100%)',
    fontFamily: inter.fontFamily,
    opacity,
    overflow: 'hidden',
  };

  const backgroundPattern: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    backgroundImage: `
      radial-gradient(circle at 25% 75%, #4CAF50 1px, transparent 1px),
      radial-gradient(circle at 75% 25%, #FF6B35 1px, transparent 1px),
      radial-gradient(circle at 50% 50%, #FFC107 1px, transparent 1px)
    `,
    backgroundSize: '70px 70px, 90px 90px, 110px 110px',
  };

  const plantContainer: React.CSSProperties = {
    position: 'relative',
    marginBottom: '60px',
    transform: `scale(${scale}) translateY(${translateY}px)`,
    filter: 'drop-shadow(0 8px 32px rgba(76, 175, 80, 0.3))',
  };

  const stemStyle: React.CSSProperties = {
    width: '8px',
    height: '200px',
    background: 'linear-gradient(to top, #4CAF50, #66BB6A)',
    borderRadius: '4px',
    position: 'relative',
    margin: '0 auto',
    boxShadow: '0 0 10px rgba(76, 175, 80, 0.3)',
  };

  const leafStyle: React.CSSProperties = {
    position: 'absolute',
    width: '60px',
    height: '40px',
    background: 'linear-gradient(145deg, #4CAF50 0%, #66BB6A 100%)',
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
  };

  const flowerStyle: React.CSSProperties = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    background: 'radial-gradient(circle, #FFC107 0%, #FF8F00 70%, #FF6F00 100%)',
    borderRadius: '50%',
    boxShadow: '0 0 15px rgba(255, 193, 7, 0.6)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '68px',
    fontFamily: inter.fontFamily,
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '700',
    letterSpacing: '-1px',
    textShadow: '0 4px 20px rgba(45, 55, 72, 0.2)',
    position: 'relative',
    zIndex: 2,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontFamily: inter.fontFamily,
    color: '#4A5568',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: '0.5px',
    maxWidth: '700px',
    lineHeight: '1.4',
    position: 'relative',
    zIndex: 2,
  };

  const decorativeElement: React.CSSProperties = {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '100px',
    height: '100px',
    border: '2px solid rgba(255, 193, 7, 0.3)',
    borderRadius: '50%',
    opacity: 0.5,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPattern} />
      <div style={decorativeElement} />

      <div style={plantContainer}>
        <div style={stemStyle}>
          {/* Leaves */}
          <div style={{ ...leafStyle, top: '30px', left: '-35px', transform: 'rotate(-20deg)' }} />
          <div style={{ ...leafStyle, top: '80px', right: '-35px', transform: 'rotate(20deg)' }} />
          <div style={{ ...leafStyle, top: '130px', left: '-30px', transform: 'rotate(-15deg)' }} />

          {/* Flowers */}
          <div style={{ ...flowerStyle, top: '20px', left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ ...flowerStyle, top: '70px', left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ ...flowerStyle, top: '120px', left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ ...flowerStyle, top: '170px', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      </div>

      <h1 style={titleStyle}>Blossoming Flowers</h1>
      <p style={subtitleStyle}>
        Vibrant yellow blooms appear,<br />
        promising future fruits to come
      </p>
    </div>
  );
};