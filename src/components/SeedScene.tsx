import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const playfair = loadFont();
const inter = loadInter();

export const SeedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Organic fade-in with custom easing
  const opacity = interpolate(frame, [0, 2.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Natural growth with bounce
  const scale = interpolate(frame, [0, 1.5 * fps], [0.3, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  });

  // Gentle floating motion
  const translateY = interpolate(frame, [0, fps], [40, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Subtle rotation for organic feel
  const rotate = interpolate(frame, [0, fps], [5, 0], {
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
    background: 'linear-gradient(135deg, #dceddc 0%, #c8e6c8 50%, #b8ddb8 100%)',
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
      radial-gradient(circle at 20% 80%, #8B5A2B 1px, transparent 1px),
      radial-gradient(circle at 80% 20%, #4CAF50 1px, transparent 1px),
      radial-gradient(circle at 40% 40%, #FF6B35 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px, 80px 80px, 100px 100px',
  };

  const seedContainer: React.CSSProperties = {
    position: 'relative',
    marginBottom: '60px',
    transform: `scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`,
    filter: 'drop-shadow(0 8px 32px rgba(139, 90, 43, 0.4))',
  };

  const seedStyle: React.CSSProperties = {
    width: '140px',
    height: '180px',
    background: 'linear-gradient(145deg, #8B5A2B 0%, #654321 50%, #5D4E37 100%)',
    borderRadius: '70px 70px 80px 80px',
    position: 'relative',
    boxShadow: 'inset 0 4px 20px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(139, 90, 43, 0.3)',
  };

  const seedTexture: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
    borderRadius: '70px 70px 80px 80px',
  };

  const sproutStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '40px',
    background: 'linear-gradient(to top, #4CAF50, #66BB6A)',
    borderRadius: '2px',
    boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '60px',
    fontFamily: playfair.fontFamily,
    color: '#0D1117',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '700',
    letterSpacing: '-1px',
    textShadow: '0 4px 20px rgba(13, 17, 23, 0.3)',
    position: 'relative',
    zIndex: 2,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '26px',
    color: '#161B22',
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
    top: '15%',
    right: '10%',
    width: '120px',
    height: '120px',
    border: '3px solid rgba(76, 175, 80, 0.2)',
    borderRadius: '50%',
    opacity: 0.6,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPattern} />
      <div style={decorativeElement} />
      
      <div style={seedContainer}>
        <div style={seedStyle}>
          <div style={seedTexture} />
        </div>
        <div style={sproutStyle} />
      </div>

      <h1 style={titleStyle}>Begin with Seeds</h1>
      <p style={subtitleStyle}>
        Plant warmth, light, and moisture<br />
        for life to awaken
      </p>
    </div>
  );
};
