import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const playfair = loadFont();
const inter = loadInter();

export const YoungPlantScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Organic fade-in
  const opacity = interpolate(frame, [0, 2.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Growth animation
  const scale = interpolate(frame, [0, 1.5 * fps], [0.5, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  });

  // Gentle floating motion
  const translateY = interpolate(frame, [0, fps], [30, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Wind sway motion
  const rotate = interpolate(frame, [0, 2 * fps], [2, -3], {
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
    opacity: 0.06,
    backgroundImage: `
      radial-gradient(circle at 30% 70%, #4CAF50 1px, transparent 1px),
      radial-gradient(circle at 70% 30%, #8B5A2B 1px, transparent 1px),
      radial-gradient(circle at 60% 60%, #66BB6A 1px, transparent 1px),
      radial-gradient(circle at 10% 90%, #81C784 1px, transparent 1px)
    `,
    backgroundSize: '45px 45px, 65px 65px, 85px 85px, 55px 55px',
  };

  const plantContainer: React.CSSProperties = {
    position: 'relative',
    marginBottom: '60px',
    transform: `scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`,
    filter: 'drop-shadow(0 15px 45px rgba(76, 175, 80, 0.25))',
  };

  const potStyle: React.CSSProperties = {
    width: '180px',
    height: '120px',
    background: 'linear-gradient(145deg, #8B5A2B 0%, #654321 30%, #5D4E37 70%, #4A3C2B 100%)',
    borderRadius: '90px 90px 100px 100px',
    position: 'relative',
    boxShadow: 'inset 0 8px 30px rgba(0, 0, 0, 0.5), 0 10px 40px rgba(139, 90, 43, 0.3)',
  };

  const potTexture: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
      radial-gradient(circle at 75% 25%, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(45deg, transparent 40%, rgba(139, 90, 43, 0.1) 50%, transparent 60%)
    `,
    backgroundSize: '12px 12px, 18px 18px, 20px 20px',
    borderRadius: '90px 90px 100px 100px',
  };

  const soilStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    left: '15px',
    right: '15px',
    bottom: '25px',
    background: 'linear-gradient(145deg, #654321 0%, #5D4E37 50%, #4A3C2B 100%)',
    borderRadius: '75px 75px 80px 80px',
    boxShadow: 'inset 0 4px 15px rgba(0, 0, 0, 0.4)',
  };

  const mainStem: React.CSSProperties = {
    position: 'absolute',
    bottom: '45px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '8px',
    height: '160px',
    background: 'linear-gradient(to top, #4CAF50, #66BB6A, #81C784, #A5D6A7)',
    borderRadius: '4px',
    boxShadow: '0 0 20px rgba(76, 175, 80, 0.7)',
  };

  const branches: React.CSSProperties[] = [
    {
      position: 'absolute',
      bottom: '120px',
      left: '50%',
      transform: 'translateX(-50%) rotate(-25deg)',
      width: '60px',
      height: '4px',
      background: 'linear-gradient(to right, #4CAF50, #66BB6A)',
      borderRadius: '2px',
      boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)',
    },
    {
      position: 'absolute',
      bottom: '100px',
      left: '50%',
      transform: 'translateX(-50%) rotate(30deg)',
      width: '50px',
      height: '4px',
      background: 'linear-gradient(to right, #4CAF50, #66BB6A)',
      borderRadius: '2px',
      boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)',
    },
  ];

  const leaves: React.CSSProperties[] = [
    // Main stem leaves
    { bottom: '90px', left: '50%', transform: 'translateX(-50%) rotate(-10deg)', width: '70px', height: '45px', borderRadius: '35px 35px 35px 8px' },
    { bottom: '130px', left: '50%', transform: 'translateX(-50%) rotate(15deg)', width: '65px', height: '42px', borderRadius: '32px 32px 8px 35px' },
    { bottom: '160px', left: '50%', transform: 'translateX(-50%) rotate(-20deg)', width: '60px', height: '38px', borderRadius: '30px 30px 30px 6px' },
    // Branch leaves
    { bottom: '115px', left: '35%', transform: 'translateX(-50%) rotate(-35deg)', width: '55px', height: '35px', borderRadius: '27px 27px 27px 5px' },
    { bottom: '95px', left: '65%', transform: 'translateX(-50%) rotate(40deg)', width: '50px', height: '32px', borderRadius: '25px 25px 4px 27px' },
    { bottom: '135px', left: '30%', transform: 'translateX(-50%) rotate(-45deg)', width: '48px', height: '30px', borderRadius: '24px 24px 24px 4px' },
    { bottom: '85px', left: '70%', transform: 'translateX(-50%) rotate(50deg)', width: '45px', height: '28px', borderRadius: '22px 22px 3px 24px' },
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

  const decorativeFlowers: React.CSSProperties = {
    position: 'absolute',
    top: '12%',
    right: '12%',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(255, 192, 203, 0.3) 0%, rgba(255, 182, 193, 0.2) 50%, transparent 100%)',
    borderRadius: '50%',
    opacity: 0.8,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPattern} />
      <div style={decorativeFlowers} />
      
      <div style={plantContainer}>
        <div style={potStyle}>
          <div style={potTexture} />
          <div style={soilStyle} />
        </div>
        <div style={mainStem} />
        {branches.map((branchStyle, index) => (
          <div key={`branch-${index}`} style={branchStyle} />
        ))}
        {leaves.map((leafStyle, index) => (
          <div
            key={`leaf-${index}`}
            style={{
              ...leafStyle,
              position: 'absolute',
              background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
              boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
            }}
          />
        ))}
      </div>

      <h1 style={titleStyle}>Growing Strong</h1>
      <p style={subtitleStyle}>
        Transplant outdoors when<br />
        danger of frost has passed
      </p>
    </div>
  );
};
