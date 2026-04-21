import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
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
  let currentFrame = 0;

  return (
    <>
      {scenes.map((scene) => {
        const duration = durations[scene.id];
        const Component = sceneComponents[scene.id as keyof typeof sceneComponents];

        const sequence = (
          <Sequence
            key={scene.id}
            from={currentFrame}
            durationInFrames={duration}
          >
            <Audio src={staticFile(`audio/${scene.id}.mp3`)} />
            <Component />
          </Sequence>
        );

        currentFrame += duration;
        return sequence;
      })}
    </>
  );
};