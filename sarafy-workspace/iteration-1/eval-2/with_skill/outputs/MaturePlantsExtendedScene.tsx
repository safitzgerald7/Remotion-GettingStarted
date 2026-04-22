import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const playfair = loadFont();
const inter = loadInter();

export const MaturePlantsExtendedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Organic fade-in
  const opacity = interpolate(frame, [0, 2.5 * fps], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Mature growth animation
  const scale = interpolate(frame, [0, 1.5 * fps], [0.6, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  });

  // Gentle floating motion
  const translateY = interpolate(frame, [0, fps], [25, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });

  // Wind sway motion
  const rotate = interpolate(frame, [0, 2 * fps], [1.5, -2.5], {
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
    filter: 'drop-shadow(0 20px 50px rgba(76, 175, 80, 0.2))',
  };

  const stakeStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '6px',
    height: '200px',
    background: 'linear-gradient(to top, #8B5A2B, #654321)',
    borderRadius: '3px',
    boxShadow: '0 0 10px rgba(139, 90, 43, 0.5)',
  };

  const mainStem: React.CSSProperties = {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '12px',
    height: '180px',
    background: 'linear-gradient(to top, #4CAF50, #388E3C, #2E7D32)',
    borderRadius: '6px',
    boxShadow: '0 0 25px rgba(76, 175, 80, 0.8)',
  };

  const branches: React.CSSProperties[] = [
    { bottom: '140px', left: '50%', transform: 'translateX(-50%) rotate(-35deg)', width: '80px', height: '6px' },
    { bottom: '120px', left: '50%', transform: 'translateX(-50%) rotate(40deg)', width: '70px', height: '6px' },
    { bottom: '100px', left: '50%', transform: 'translateX(-50%) rotate(-50deg)', width: '65px', height: '6px' },
    { bottom: '160px', left: '50%', transform: 'translateX(-50%) rotate(25deg)', width: '75px', height: '6px' },
    { bottom: '180px', left: '50%', transform: 'translateX(-50%) rotate(-20deg)', width: '85px', height: '6px' },
  ];

  const tomatoes: React.CSSProperties[] = [
    { bottom: '145px', left: '25%', transform: 'translateX(-50%)', size: 18, color: '#FF6B35' },
    { bottom: '125px', left: '75%', transform: 'translateX(-50%)', size: 20, color: '#FF5722' },
    { bottom: '105px', left: '20%', transform: 'translateX(-50%)', size: 16, color: '#FF7043' },
    { bottom: '165px', left: '80%', transform: 'translateX(-50%)', size: 19, color: '#FF5722' },
    { bottom: '135px', left: '45%', transform: 'translateX(-50%)', size: 17, color: '#FF6B35' },
    { bottom: '155px', left: '15%', transform: 'translateX(-50%)', size: 21, color: '#FF5722' },
    { bottom: '175px', left: '70%', transform: 'translateX(-50%)', size: 18, color: '#FF6B35' },
    { bottom: '185px', left: '40%', transform: 'translateX(-50%)', size: 19, color: '#FF7043' },
  ];

  const leaves: React.CSSProperties[] = [
    // Large leaves
    { bottom: '80px', left: '50%', transform: 'translateX(-50%) rotate(-15deg)', width: '85px', height: '55px', borderRadius: '42px 42px 42px 10px' },
    { bottom: '110px', left: '50%', transform: 'translateX(-50%) rotate(20deg)', width: '80px', height: '52px', borderRadius: '40px 40px 10px 42px' },
    { bottom: '170px', left: '50%', transform: 'translateX(-50%) rotate(-25deg)', width: '75px', height: '48px', borderRadius: '37px 37px 37px 8px' },
    // Branch leaves
    { bottom: '150px', left: '30%', transform: 'translateX(-50%) rotate(-45deg)', width: '65px', height: '42px', borderRadius: '32px 32px 32px 6px' },
    { bottom: '130px', left: '70%', transform: 'translateX(-50%) rotate(50deg)', width: '60px', height: '38px', borderRadius: '30px 30px 5px 32px' },
    { bottom: '95px', left: '35%', transform: 'translateX(-50%) rotate(-55deg)', width: '58px', height: '36px', borderRadius: '29px 29px 29px 5px' },
    { bottom: '115px', left: '65%', transform: 'translateX(-50%) rotate(60deg)', width: '55px', height: '34px', borderRadius: '27px 27px 4px 29px' },
    { bottom: '190px', left: '55%', transform: 'translateX(-50%) rotate(15deg)', width: '70px', height: '45px', borderRadius: '35px 35px 7px 37px' },
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
              borderRadius: '3px',
              boxShadow: '0 0 12px rgba(76, 175, 80, 0.6)',
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
              boxShadow: '0 4px 18px rgba(76, 175, 80, 0.4)',
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

      <h1 style={titleStyle}>Abundant Harvest</h1>
      <p style={subtitleStyle}>
        The plants are laden with ripe tomatoes,<br />
        ready for picking and enjoying
      </p>
    </div>
  );
};