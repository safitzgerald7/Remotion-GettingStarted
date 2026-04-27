import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

dotenv.config();

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!
});

import { scenes } from "../src/data/scenes.ts";

const outputDir = path.join(process.cwd(), "public/audio");

async function streamToBuffer(stream: any): Promise<Buffer> {
  if (stream == null) {
    return Buffer.alloc(0);
  }

  if (typeof stream[Symbol.asyncIterator] === 'function') {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }

  if (typeof stream.getReader === 'function') {
    const reader = stream.getReader();
    const chunks: Buffer[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks);
  }

  if (typeof stream.pipe === 'function') {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }

  throw new Error('Unsupported audio stream format from ElevenLabs');
}

export async function generateAudio() {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY is required in .env');
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const scene of scenes) {
    const filePath = path.join(outputDir, `${scene.id}.mp3`);

    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${scene.id} (already exists)`);
      continue;
    }

    console.log(`Generating ${scene.id}...`);

    const audioStream = await client.textToSpeech.convert("21m00Tcm4TlvDq8ikWAM", {
      text: scene.text,
      modelId: "eleven_multilingual_v2",
    });

    const audioBuffer = await streamToBuffer(audioStream);
    fs.writeFileSync(filePath, audioBuffer);
  }
}

if (process.argv.some((arg) => arg.endsWith('generate-audio.ts'))) {
  generateAudio().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}