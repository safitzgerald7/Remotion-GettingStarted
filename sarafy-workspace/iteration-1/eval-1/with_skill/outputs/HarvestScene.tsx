import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const playfair = loadFont();
const inter = loadInter();

export const HarvestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Organic fade-in
  const opacity = interpolate(frame, [0, 2.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Slide transition from left
  const slideX = interpolate(frame, [0, 1 * fps], [-100, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Final growth animation
  const scale = interpolate(frame, [0, 1.5 * fps], [0.7, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  });

  // Gentle floating motion
  const translateY = interpolate(frame, [0, fps], [20, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Wind sway motion
  const rotate = interpolate(frame, [0, 2 * fps], [1, -1.5], {
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
    background: 'linear-gradient(135deg, #b8ddb8 0%, #a8d5a8 50%, #98cd98 100%)',
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
    opacity: 0.04,
    backgroundImage: `
      radial-gradient(circle at 40% 60%, #FF6B35 1px, transparent 1px),
      radial-gradient(circle at 60% 40%, #4CAF50 1px, transparent 1px),
      radial-gradient(circle at 50% 50%, #FF5722 1px, transparent 1px),
      radial-gradient(circle at 20% 80%, #8B5A2B 1px, transparent 1px),
      radial-gradient(circle at 80% 20%, #DC143C 1px, transparent 1px)
    `,
    backgroundSize: '35px 35px, 55px 55px, 75px 75px, 45px 45px, 65px 65px',
  };

  const plantContainer: React.CSSProperties = {
    position: 'relative',
    marginBottom: '60px',
    transform: `translateX(${slideX}%) scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`,
    filter: 'drop-shadow(0 25px 55px rgba(76, 175, 80, 0.15))',
  };

  const stakeStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '8px',
    height: '220px',
    background: 'linear-gradient(to top, #8B5A2B, #654321, #5D4E37)',
    borderRadius: '4px',
    boxShadow: '0 0 12px rgba(139, 90, 43, 0.6)',
  };

  const mainStem: React.CSSProperties = {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '14px',
    height: '200px',
    background: 'linear-gradient(to top, #4CAF50, #388E3C, #2E7D32, #1B5E20)',
    borderRadius: '7px',
    boxShadow: '0 0 30px rgba(76, 175, 80, 0.9)',
  };

  const branches: React.CSSProperties[] = [
    { bottom: '150px', left: '50%', transform: 'translateX(-50%) rotate(-40deg)', width: '90px', height: '7px' },
    { bottom: '130px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '85px', height: '7px' },
    { bottom: '110px', left: '50%', transform: 'translateX(-50%) rotate(-55deg)', width: '80px', height: '7px' },
    { bottom: '170px', left: '50%', transform: 'translateX(-50%) rotate(30deg)', width: '88px', height: '7px' },
    { bottom: '90px', left: '50%', transform: 'translateX(-50%) rotate(-20deg)', width: '75px', height: '7px' },
  ];

  const ripeTomatoes: React.CSSProperties[] = [
    { bottom: '155px', left: '20%', transform: 'translateX(-50%)', size: 24, color: '#DC143C', highlight: '#FF6B9D' },
    { bottom: '135px', left: '80%', transform: 'translateX(-50%)', size: 26, color: '#B22222', highlight: '#FF5F5F' },
    { bottom: '115px', left: '15%', transform: 'translateX(-50%)', size: 22, color: '#CD5C5C', highlight: '#FF8080' },
    { bottom: '175px', left: '85%', transform: 'translateX(-50%)', size: 25, color: '#DC143C', highlight: '#FF6B9D' },
    { bottom: '145px', left: '40%', transform: 'translateX(-50%)', size: 23, color: '#B22222', highlight: '#FF5F5F' },
    { bottom: '125px', left: '60%', transform: 'translateX(-50%)', size: 21, color: '#CD5C5C', highlight: '#FF8080' },
    { bottom: '105px', left: '25%', transform: 'translateX(-50%)', size: 20, color: '#DC143C', highlight: '#FF6B9D' },
    { bottom: '165px', left: '75%', transform: 'translateX(-50%)', size: 24, color: '#B22222', highlight: '#FF5F5F' },
  ];

  const leaves: React.CSSProperties[] = [
    // Large mature leaves
    { bottom: '85px', left: '50%', transform: 'translateX(-50%) rotate(-12deg)', width: '90px', height: '58px', borderRadius: '45px 45px 45px 12px' },
    { bottom: '120px', left: '50%', transform: 'translateX(-50%) rotate(18deg)', width: '85px', height: '55px', borderRadius: '42px 42px 12px 45px' },
    { bottom: '180px', left: '50%', transform: 'translateX(-50%) rotate(-28deg)', width: '80px', height: '52px', borderRadius: '40px 40px 40px 10px' },
    // Branch leaves
    { bottom: '160px', left: '25%', transform: 'translateX(-50%) rotate(-50deg)', width: '70px', height: '45px', borderRadius: '35px 35px 35px 8px' },
    { bottom: '140px', left: '75%', transform: 'translateX(-50%) rotate(55deg)', width: '68px', height: '43px', borderRadius: '34px 34px 7px 35px' },
    { bottom: '100px', left: '30%', transform: 'translateX(-50%) rotate(-60deg)', width: '65px', height: '41px', borderRadius: '32px 32px 32px 6px' },
    { bottom: '125px', left: '70%', transform: 'translateX(-50%) rotate(65deg)', width: '62px', height: '39px', borderRadius: '31px 31px 5px 32px' },
  ];

  const titleStyle: React.CSSProperties = {
    fontSize: '56px',
    fontFamily: playfair.fontFamily,
    color: '#0A0F0A',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '700',
    letterSpacing: '-0.8px',
    textShadow: '0 4px 20px rgba(10, 15, 10, 0.4)',
    position: 'relative',
    zIndex: 2,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '24px',
    color: '#0F1410',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: '0.5px',
    maxWidth: '700px',
    lineHeight: '1.4',
    position: 'relative',
    zIndex: 2,
  };

  const harvestGlow: React.CSSProperties = {
    position: 'absolute',
    top: '5%',
    right: '8%',
    width: '180px',
    height: '180px',
    background: 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, rgba(220, 20, 60, 0.2) 40%, transparent 100%)',
    borderRadius: '50%',
    opacity: 0.8,
  };

  const harvestIcon: React.CSSProperties = {
    position: 'absolute',
    top: '18%',
    right: '18%',
    width: '40px',
    height: '40px',
    background: 'linear-gradient(45deg, #FF6B35, #FF5722)',
    borderRadius: '50%',
    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.6)',
    opacity: 0.9,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPattern} />
      <div style={harvestGlow} />
      <div style={harvestIcon} />
      
      <div style={plantContainer}>
        <div style={stakeStyle} />
        <div style={mainStem} />
        {branches.map((branchStyle, index) => (
          <div
            key={`branch-${index}`}
            style={{
              ...branchStyle,
              position: 'absolute',
              background: 'linear-gradient(to right, #4CAF50, #66BB6A)',
              borderRadius: '3.5px',
              boxShadow: '0 0 15px rgba(76, 175, 80, 0.7)',
            }}
          />
        ))}
        {leaves.map((leafStyle, index) => (
          <div
            key={`leaf-${index}`}
            style={{
              ...leafStyle,
              position: 'absolute',
              background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
              boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
            }}
          />
        ))}
        {ripeTomatoes.map((tomato, index) => (
          <div
            key={`tomato-${index}`}
            style={{
              position: 'absolute',
              bottom: tomato.bottom,
              left: tomato.left,
              transform: tomato.transform,
              width: `${tomato.size}px`,
              height: `${tomato.size}px`,
              background: `radial-gradient(circle at 30% 30%, ${tomato.highlight}, ${tomato.color})`,
              borderRadius: '50%',
              boxShadow: `0 4px 16px rgba(220, 20, 60, 0.6), inset 0 3px 8px rgba(255, 255, 255, 0.4)`,
            }}
          />
        ))}
      </div>

      <h1 style={titleStyle}>Harvest Time</h1>
      <p style={subtitleStyle}>
        Pick when tomatoes are deep red<br />
        and yield gently to your touch
      </p>
    </div>
  );
};