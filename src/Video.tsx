import React from 'react';
import { Sequence } from 'remotion';
import { SeedScene } from './components/SeedScene';
import { SproutScene } from './components/SproutScene';
import { YoungPlantScene } from './components/YoungPlantScene';
import { MaturePlantScene } from './components/MaturePlantScene';
import { HarvestScene } from './components/HarvestScene';

export const Video: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={270}>
        <SeedScene />
      </Sequence>
      <Sequence from={270} durationInFrames={270}>
        <SproutScene />
      </Sequence>
      <Sequence from={540} durationInFrames={270}>
        <YoungPlantScene />
      </Sequence>
      <Sequence from={810} durationInFrames={270}>
        <MaturePlantScene />
      </Sequence>
      <Sequence from={1080} durationInFrames={270}>
        <HarvestScene />
      </Sequence>
    </>
  );
};