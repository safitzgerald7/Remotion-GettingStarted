import { spawnSync } from 'child_process';
import dotenv from 'dotenv';
import { generateImages } from './generate-images.ts';
import { generateAudio } from './generate-audio.ts';
import { generateDurations } from './getDurations.ts';

dotenv.config();

const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');
const promptToVideo = args.includes('--prompt-to-video');
const renderFlag = args.includes('--render') || promptToVideo;
const skipRender = args.includes('--skip-render');

if (showHelp) {
  console.log(`Usage: npm run create-video [options]

Options:
  --prompt-to-video   Generate assets and render the video using the existing tomato scenes
  --render            Generate assets and render the final video
  --skip-render       Generate assets only and do not render
  --help, -h          Show this help message
`);
  process.exit(0);
}

async function run() {
  console.log('Starting video generation using existing scenes...');

  try {
    await generateImages();
  } catch (error: any) {
    console.warn('Image generation failed; continuing with local slide placeholders.', error?.message ?? error);
  }

  try {
    await generateAudio();
  } catch (error: any) {
    console.warn('Audio generation failed; continuing without audio.', error?.message ?? error);
  }

  try {
    await generateDurations();
  } catch (error: any) {
    console.warn('Duration generation failed; using existing durations.', error?.message ?? error);
  }

  if (renderFlag && !skipRender) {
    console.log('Rendering final video...');
    const result = spawnSync('npm', ['run', 'render'], {
      stdio: 'inherit',
      shell: true,
    });

    if (result.error) {
      throw result.error;
    }

    if (result.status !== 0) {
      throw new Error(`Rendering failed with exit code ${result.status}`);
    }
  } else {
    console.log('Generation complete. Run `npm run render` to render the final video.');
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
