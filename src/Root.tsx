import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';

const durations = require('./data/durations.json') as Record<string, number>;
const totalDuration = Object.values(durations).reduce((sum, d) => sum + d, 0);

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TomatoLifecycle"
        component={Video}
        durationInFrames={totalDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

export { RemotionRoot };