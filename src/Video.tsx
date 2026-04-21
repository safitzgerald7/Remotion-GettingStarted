import React from 'react';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
// import { Audio, staticFile } from 'remotion'; // Temporarily disabled for testing
import { SeedScene } from './components/SeedScene';
import { SproutScene } from './components/SproutScene';
import { YoungPlantScene } from './components/YoungPlantScene';
import { MaturePlantScene } from './components/MaturePlantScene';
import { HarvestScene } from './components/HarvestScene';
import { scenes } from './data/scenes';

const durations = require('./data/durations.json') as Record<string, number>;

const sceneComponents = {
  seed: SeedScene,
  sprout: SproutScene,
  young: YoungPlantScene,
  mature: MaturePlantScene,
  harvest: HarvestScene,
};

export const Video: React.FC = () => {
  return (
    <TransitionSeries>
      {scenes.map((scene, index) => {
        const duration = durations[scene.id];
        const Component = sceneComponents[scene.id as keyof typeof sceneComponents];

        return (
          <React.Fragment key={scene.id}>
            <TransitionSeries.Sequence durationInFrames={duration}>
              {/* <Audio src={staticFile(`audio/${scene.id}.mp3`)} /> */} {/* Temporarily disabled for testing */}
              <Component />
            </TransitionSeries.Sequence>
            {index < scenes.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: 15 })}
              />
            )}
          </React.Fragment>
        );
      })}
    </TransitionSeries>
  );
};