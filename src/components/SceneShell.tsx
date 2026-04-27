import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';

const inter = loadInter();
const playfair = loadPlayfair();

type SceneShellProps = {
  heading: string;
  subtitle: string;
};

export const SceneShell: React.FC<SceneShellProps> = ({ heading, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entranceDuration = Math.min(fps, 24);

  const translateY = interpolate(
    frame,
    [0, entranceDuration],
    [48, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    }
  );

  const scale = interpolate(
    frame,
    [0, entranceDuration],
    [0.98, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    }
  );

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  };

  const contentStyle: CSSProperties = {
    width: '88%',
    maxWidth: '1200px',
    textAlign: 'center',
    color: '#0D1117',
    transform: `translateY(${translateY}px) scale(${scale})`,
  };

  const panelStyle: CSSProperties = {
    width: '100%',
    padding: '48px 42px',
    borderRadius: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    boxShadow: '0 24px 60px rgba(13, 17, 23, 0.08)',
    border: '1px solid rgba(13, 17, 23, 0.07)',
    backdropFilter: 'blur(18px)',
  };

  const headingStyle: CSSProperties = {
    fontFamily: playfair.fontFamily,
    fontSize: '72px',
    lineHeight: 1.03,
    margin: 0,
    letterSpacing: '-0.03em',
    color: '#0D1117',
  };

  const subtitleStyle: CSSProperties = {
    marginTop: '24px',
    fontFamily: inter.fontFamily,
    fontSize: '26px',
    lineHeight: 1.5,
    color: '#30363d',
    maxWidth: '920px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const accentStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(circle at top left, rgba(255, 222, 173, 0.18), transparent 26%), radial-gradient(circle at bottom right, rgba(134, 239, 172, 0.14), transparent 28%)',
  };

  return (
    <div style={containerStyle}>
      <div style={accentStyle} />
      <div style={contentStyle}>
        <div style={panelStyle}>
          <h1 style={headingStyle}>{heading}</h1>
          <p style={subtitleStyle}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
