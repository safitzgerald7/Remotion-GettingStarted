import React, { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';

const inter = loadInter();
const playfair = loadPlayfair();

type SceneShellProps = {
  heading: string;
  subtitle: string;
  caption?: string;
  imageSrc?: string;
  accentColors?: [string, string];
};

export const SceneShell: React.FC<SceneShellProps> = ({
  heading,
  subtitle,
  caption = '',
  imageSrc,
  accentColors = ['#FFFFFF', '#F8F8F8'],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entranceDuration = Math.min(fps, 24);

  const translateY = interpolate(
    frame,
    [0, entranceDuration],
    [36, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    }
  );

  const scale = interpolate(
    frame,
    [0, entranceDuration],
    [0.99, 1],
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
    background: `linear-gradient(135deg, ${accentColors[0]}, ${accentColors[1]})`,
    overflow: 'hidden',
    padding: '48px',
  };

  const contentStyle: CSSProperties = {
    width: '100%',
    maxWidth: '1480px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '42px',
    transform: `translateY(${translateY}px) scale(${scale})`,
  };

  const panelStyle: CSSProperties = {
    flex: '1 1 500px',
    minWidth: '340px',
    maxWidth: '700px',
    padding: '52px',
    borderRadius: '36px',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    boxShadow: '0 28px 80px rgba(13, 17, 23, 0.12)',
    border: '1px solid rgba(13, 17, 23, 0.08)',
    backdropFilter: 'blur(22px)',
  };

  const headingStyle: CSSProperties = {
    fontFamily: playfair.fontFamily,
    fontSize: '64px',
    lineHeight: 1.05,
    margin: 0,
    letterSpacing: '-0.04em',
    color: '#0D1117',
  };

  const subtitleStyle: CSSProperties = {
    marginTop: '24px',
    fontFamily: inter.fontFamily,
    fontSize: '28px',
    lineHeight: 1.6,
    color: '#2D3840',
    marginBottom: '32px',
  };

  const captionStyle: CSSProperties = {
    fontFamily: inter.fontFamily,
    fontSize: '24px',
    lineHeight: 1.75,
    color: '#161B22',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    border: '1px solid rgba(13, 17, 23, 0.06)',
    borderRadius: '28px',
    padding: '24px 28px',
    boxShadow: '0 20px 40px rgba(13, 17, 23, 0.08)',
    textAlign: 'left',
  };

  const imageWrapperStyle: CSSProperties = {
    flex: '1 1 480px',
    minWidth: '340px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '540px',
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    maxWidth: '560px',
    height: 'auto',
    borderRadius: '36px',
    boxShadow: '0 32px 120px rgba(13, 17, 23, 0.12)',
    border: '1px solid rgba(13, 17, 23, 0.08)',
    backgroundColor: '#ffffff',
  };

  const accentStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(circle at top left, rgba(255, 235, 165, 0.24), transparent 24%), radial-gradient(circle at bottom right, rgba(134, 239, 172, 0.18), transparent 28%)',
  };

  const fallbackStyle: CSSProperties = {
    ...imageStyle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    minHeight: '500px',
    color: '#4B5563',
    fontFamily: inter.fontFamily,
    fontSize: '20px',
    textAlign: 'center',
    backgroundColor: '#F7F7F9',
  };

  return (
    <div style={containerStyle}>
      <div style={accentStyle} />
      <div style={contentStyle}>
        <div style={panelStyle}>
          <h1 style={headingStyle}>{heading}</h1>
          <p style={subtitleStyle}>{subtitle}</p>
          {caption ? <div style={captionStyle}>{caption}</div> : null}
        </div>
        <div style={imageWrapperStyle}>
          {imageSrc ? (
            <img src={imageSrc} alt={heading} style={imageStyle} />
          ) : (
            <div style={fallbackStyle}>Image not available</div>
          )}
        </div>
      </div>
    </div>
  );
};
