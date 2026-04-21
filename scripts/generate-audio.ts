import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

dotenv.config();

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!
});

import { scenes } from "../src/data/scenes";

const outputDir = path.join(process.cwd(), "public/audio");

async function generate() {
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

    const audioStream = await client.textToSpeech.generate({
      voice: "21m00Tcm4TlvDq8ikWAM",
      text: scene.text,
      model_id: "eleven_multilingual_v2"
    });

    const writeStream = fs.createWriteStream(filePath);

    await new Promise((resolve) => {
      audioStream.pipe(writeStream);
      audioStream.on("end", resolve);
    });
  }
}

generate();