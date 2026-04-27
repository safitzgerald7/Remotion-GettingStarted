import React from 'react';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { Easing } from 'remotion';
import { scenes } from './data/scenes';

const durations = require('./data/durations.json') as Record<string, number>;

const sceneColors: Record<string, [string, string]> = {
  seed: ['#f8f1e5', '#f4d3b5'],
  sprout: ['#e8f7e2', '#cde9c5'],
  young: ['#d9eefb', '#b8d8f5'],
  mature: ['#fff2e3', '#ffd5a9'],
  fullmature: ['#f0f4ff', '#c7d4ff'],
  'mature-extended': ['#f7efff', '#d9c7ff'],
  harvest: ['#fff0f2', '#ffccd6'],
};

export const Video: React.FC = () => {
  const captionStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '70%',
    color: '#0D1117',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    padding: '24px 32px',
    textAlign: 'center',
    fontSize: '28px',
    lineHeight: 1.4,
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
    zIndex: 2,
  };

  return (
    <TransitionSeries>
      {scenes.flatMap((scene, index) => {
        const duration = durations[scene.id];
        const [startColor, endColor] = sceneColors[scene.id] ?? ['#ffffff', '#f1f1f1'];

        const sequence = (
          <TransitionSeries.Sequence key={scene.id} durationInFrames={duration}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${startColor}, ${endColor})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  maxWidth: '1400px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '72px',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    marginBottom: '24px',
                    color: '#0D1117',
                  }}
                >
                  {scene.id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </div>
                <div style={captionStyle}>{scene.text}</div>
              </div>
            </div>
          </TransitionSeries.Sequence>
        );

        if (index < scenes.length - 1) {
          return [
            sequence,
            <TransitionSeries.Transition
              key={`${scene.id}-transition`}
              timing={linearTiming({
                durationInFrames: 30,
                easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
              })}
              presentation={slide({ direction: 'from-bottom' })}
            />,
          ];
        }

        return [sequence];
      })}
    </TransitionSeries>
  );
};