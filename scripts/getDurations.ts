import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegPath as string);

const audioDir = path.join(process.cwd(), "public/audio");
const fps = 30;

function getDuration(file: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(file, (err, metadata) => {
      if (err) return reject(err);
      resolve(metadata.format.duration || 0);
    });
  });
}

export async function generateDurations() {
  if (!fs.existsSync(audioDir)) {
    throw new Error('Audio directory does not exist; cannot generate durations.');
  }

  const files = fs.readdirSync(audioDir).filter((file) => file.endsWith('.mp3'));
  if (files.length === 0) {
    throw new Error('No audio files found; cannot generate durations.');
  }

  const durations: Record<string, number> = {};

  for (const file of files) {
    const fullPath = path.join(audioDir, file);
    const seconds = await getDuration(fullPath);
    durations[file.replace('.mp3', '')] = Math.ceil(seconds * fps);
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'src/data/durations.json'),
    JSON.stringify(durations, null, 2)
  );
}

if (process.argv.some((arg) => arg.endsWith('getDurations.ts'))) {
  generateDurations().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}