import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const playfair = loadFont();
const inter = loadInter();

export const FullMatureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Organic fade-in
  const opacity = interpolate(frame, [0, 2.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Mature growth animation - more pronounced
  const scale = interpolate(frame, [0, 1.5 * fps], [0.7, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  });

  // Gentle floating motion - more subtle for mature plants
  const translateY = interpolate(frame, [0, fps], [15, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Wind sway motion - gentler for heavier plants
  const rotate = interpolate(frame, [0, 2 * fps], [0.8, -1.2], {
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
    background: 'linear-gradient(135deg, #c8e6c8 0%, #b8ddb8 50%, #a8d5a8 100%)',
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
      radial-gradient(circle at 35% 65%, #4CAF50 1px, transparent 1px),
      radial-gradient(circle at 65% 35%, #8B5A2B 1px, transparent 1px),
      radial-gradient(circle at 55% 55%, #FF6B35 1px, transparent 1px),
      radial-gradient(circle at 15% 85%, #66BB6A 1px, transparent 1px),
      radial-gradient(circle at 85% 15%, #81C784 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px, 60px 60px, 80px 80px, 50px 50px, 70px 70px',
  };

  const plantContainer: React.CSSProperties = {
    position: 'relative',
    marginBottom: '60px',
    transform: `scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`,
    filter: 'drop-shadow(0 25px 60px rgba(76, 175, 80, 0.25))',
  };

  const stakeStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '8px',
    height: '220px',
    background: 'linear-gradient(to top, #8B5A2B, #654321)',
    borderRadius: '4px',
    boxShadow: '0 0 12px rgba(139, 90, 43, 0.6)',
  };

  const mainStem: React.CSSProperties = {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '16px',
    height: '200px',
    background: 'linear-gradient(to top, #4CAF50, #388E3C, #2E7D32)',
    borderRadius: '8px',
    boxShadow: '0 0 30px rgba(76, 175, 80, 0.9)',
  };

  const branches: React.CSSProperties[] = [
    { bottom: '150px', left: '50%', transform: 'translateX(-50%) rotate(-40deg)', width: '90px', height: '8px' },
    { bottom: '130px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '85px', height: '8px' },
    { bottom: '110px', left: '50%', transform: 'translateX(-50%) rotate(-55deg)', width: '80px', height: '8px' },
    { bottom: '170px', left: '50%', transform: 'translateX(-50%) rotate(30deg)', width: '88px', height: '8px' },
    { bottom: '90px', left: '50%', transform: 'translateX(-50%) rotate(-20deg)', width: '75px', height: '8px' },
    { bottom: '190px', left: '50%', transform: 'translateX(-50%) rotate(15deg)', width: '82px', height: '8px' },
  ];

  const tomatoes: React.CSSProperties[] = [
    { bottom: '155px', left: '20%', transform: 'translateX(-50%)', size: 22, color: '#FF6B35' },
    { bottom: '135px', left: '80%', transform: 'translateX(-50%)', size: 25, color: '#FF5722' },
    { bottom: '115px', left: '15%', transform: 'translateX(-50%)', size: 20, color: '#FF7043' },
    { bottom: '175px', left: '85%', transform: 'translateX(-50%)', size: 24, color: '#FF5722' },
    { bottom: '145px', left: '40%', transform: 'translateX(-50%)', size: 21, color: '#FF6B35' },
    { bottom: '95px', left: '25%', transform: 'translateX(-50%)', size: 19, color: '#FF7043' },
    { bottom: '125px', left: '60%', transform: 'translateX(-50%)', size: 23, color: '#FF5722' },
    { bottom: '165px', left: '55%', transform: 'translateX(-50%)', size: 20, color: '#FF6B35' },
    { bottom: '185px', left: '70%', transform: 'translateX(-50%)', size: 22, color: '#FF5722' },
    { bottom: '105px', left: '45%', transform: 'translateX(-50%)', size: 18, color: '#FF7043' },
  ];

  const leaves: React.CSSProperties[] = [
    // Large leaves
    { bottom: '75px', left: '50%', transform: 'translateX(-50%) rotate(-10deg)', width: '95px', height: '60px', borderRadius: '47px 47px 47px 12px' },
    { bottom: '105px', left: '50%', transform: 'translateX(-50%) rotate(25deg)', width: '90px', height: '58px', borderRadius: '45px 45px 11px 47px' },
    { bottom: '180px', left: '50%', transform: 'translateX(-50%) rotate(-30deg)', width: '85px', height: '54px', borderRadius: '42px 42px 42px 9px' },
    // Branch leaves
    { bottom: '160px', left: '25%', transform: 'translateX(-50%) rotate(-50deg)', width: '75px', height: '48px', borderRadius: '37px 37px 37px 7px' },
    { bottom: '140px', left: '75%', transform: 'translateX(-50%) rotate(55deg)', width: '70px', height: '44px', borderRadius: '35px 35px 6px 37px' },
    { bottom: '100px', left: '30%', transform: 'translateX(-50%) rotate(-60deg)', width: '68px', height: '42px', borderRadius: '34px 34px 34px 6px' },
    { bottom: '120px', left: '70%', transform: 'translateX(-50%) rotate(65deg)', width: '65px', height: '40px', borderRadius: '32px 32px 5px 34px' },
    { bottom: '85px', left: '40%', transform: 'translateX(-50%) rotate(-35deg)', width: '72px', height: '46px', borderRadius: '36px 36px 36px 8px' },
    { bottom: '195px', left: '60%', transform: 'translateX(-50%) rotate(40deg)', width: '78px', height: '50px', borderRadius: '39px 39px 7px 39px' },
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

  const sunRays: React.CSSProperties = {
    position: 'absolute',
    top: '8%',
    left: '15%',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(255, 235, 59, 0.4) 0%, rgba(255, 193, 7, 0.2) 50%, transparent 100%)',
    borderRadius: '50%',
    opacity: 0.9,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPattern} />
      <div style={sunRays} />

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
              borderRadius: '4px',
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
              boxShadow: '0 4px 20px rgba(76, 175, 80, 0.5)',
            }}
          />
        ))}
        {tomatoes.map((tomato, index) => (
          <div
            key={`tomato-${index}`}
            style={{
              position: 'absolute',
              bottom: tomato.bottom,
              left: tomato.left,
              transform: tomato.transform,
              width: `${tomato.size}px`,
              height: `${tomato.size}px`,
              background: `radial-gradient(circle, ${tomato.color}, ${tomato.color}DD)`,
              borderRadius: '50%',
              boxShadow: `0 3px 12px rgba(255, 107, 53, 0.5), inset 0 2px 6px rgba(255, 255, 255, 0.3)`,
            }}
          />
        ))}
      </div>

      <h1 style={titleStyle}>Fully Mature</h1>
      <p style={subtitleStyle}>
        Laden with ripe tomatoes ready for harvest<br />
        The plant reaches its full productive potential
      </p>
    </div>
  );
};