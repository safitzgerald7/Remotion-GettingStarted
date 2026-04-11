import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TomatoLifecycle"
        component={Video}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

export { RemotionRoot };