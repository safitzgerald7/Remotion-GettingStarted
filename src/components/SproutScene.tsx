import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const playfair = loadFont();
const inter = loadInter();

export const SproutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Organic fade-in
  const opacity = interpolate(frame, [0, 2.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Dynamic growth animation
  const scale = interpolate(frame, [0, 1.5 * fps], [0.4, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  });

  // Gentle floating motion
  const translateY = interpolate(frame, [0, fps], [35, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Subtle sway motion
  const rotate = interpolate(frame, [0, 2 * fps], [3, -2], {
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
    opacity: 0.08,
    backgroundImage: `
      radial-gradient(circle at 25% 75%, #4CAF50 1px, transparent 1px),
      radial-gradient(circle at 75% 25%, #8B5A2B 1px, transparent 1px),
      radial-gradient(circle at 50% 50%, #66BB6A 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px, 70px 70px, 90px 90px',
  };

  const plantContainer: React.CSSProperties = {
    position: 'relative',
    marginBottom: '60px',
    transform: `scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`,
    filter: 'drop-shadow(0 12px 40px rgba(76, 175, 80, 0.3))',
  };

  const soilStyle: React.CSSProperties = {
    width: '200px',
    height: '80px',
    background: 'linear-gradient(145deg, #8B5A2B 0%, #654321 50%, #5D4E37 100%)',
    borderRadius: '100px 100px 120px 120px',
    position: 'relative',
    boxShadow: 'inset 0 6px 25px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(139, 90, 43, 0.3)',
  };

  const soilTexture: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 50% 50%, rgba(139, 90, 43, 0.2) 1px, transparent 1px)
    `,
    backgroundSize: '15px 15px',
    borderRadius: '100px 100px 120px 120px',
  };

  const stemStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '6px',
    height: '120px',
    background: 'linear-gradient(to top, #4CAF50, #66BB6A, #81C784)',
    borderRadius: '3px',
    boxShadow: '0 0 15px rgba(76, 175, 80, 0.6)',
  };

  const leaves: React.CSSProperties[] = [
    {
      position: 'absolute',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%) rotate(-15deg)',
      width: '60px',
      height: '40px',
      background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
      borderRadius: '30px 30px 30px 5px',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
    },
    {
      position: 'absolute',
      bottom: '110px',
      left: '50%',
      transform: 'translateX(-50%) rotate(20deg)',
      width: '50px',
      height: '35px',
      background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
      borderRadius: '25px 25px 5px 30px',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
    },
    {
      position: 'absolute',
      bottom: '140px',
      left: '50%',
      transform: 'translateX(-50%) rotate(-25deg)',
      width: '45px',
      height: '30px',
      background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
      borderRadius: '22px 22px 22px 3px',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
    },
  ];

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

  const decorativeVine: React.CSSProperties = {
    position: 'absolute',
    top: '20%',
    left: '8%',
    width: '80px',
    height: '200px',
    background: 'linear-gradient(180deg, rgba(76, 175, 80, 0.3) 0%, rgba(102, 187, 106, 0.2) 50%, transparent 100%)',
    borderRadius: '40px',
    transform: 'rotate(-15deg)',
    opacity: 0.7,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPattern} />
      <div style={decorativeVine} />
      
      <div style={plantContainer}>
        <div style={soilStyle}>
          <div style={soilTexture} />
        </div>
        <div style={stemStyle} />
        {leaves.map((leafStyle, index) => (
          <div key={index} style={leafStyle} />
        ))}
      </div>

      <h1 style={titleStyle}>First Leaves Emerge</h1>
      <p style={subtitleStyle}>
        Nurture with consistent moisture<br />
        and abundant sunlight
      </p>
    </div>
  );
};
