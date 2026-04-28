import React from 'react';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { Easing } from 'remotion';
import { scenes } from './data/scenes';
import { SceneShell } from './components/SceneShell';
import { sceneImages } from './assets/images';

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

  return (
    <TransitionSeries>
      {scenes.flatMap((scene, index) => {
        const duration = durations[scene.id];
        const accentColors = sceneColors[scene.id] ?? ['#ffffff', '#f1f1f1'];
        const imageSrc = sceneImages[scene.id];

        const sequence = (
          <TransitionSeries.Sequence key={scene.id} durationInFrames={duration}>
            <SceneShell
              heading={scene.heading}
              subtitle={scene.subtitle}
              caption={scene.text}
              imageSrc={imageSrc}
              accentColors={accentColors}
            />
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