import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { scenes } from '../src/data/scenes.ts';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

const outputDir = path.join(process.cwd(), 'public/images');

export async function generateImages() {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not set. Skipping image generation and using local slide placeholders.');
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const scene of scenes) {
    const filePath = path.join(outputDir, `${scene.id}.png`);

    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${scene.id} (already exists)`);
      continue;
    }

    console.log(`Generating image for ${scene.id}...`);

    try {
      const prompt = `A photorealistic, centered scene of a tomato plant lifecycle moment that matches this caption: ${scene.text}. White background, warm natural lighting, realistic plant detail, a photographic style with consistent composition across all scenes.`;

      const result = await client.images.generate({
        model: 'gpt-image-2',
        prompt,
        size: '1024x1024',
      });

      const imageBase64 = result.data[0]?.b64_json;
      if (!imageBase64) {
        throw new Error(`OpenAI did not return image data for scene ${scene.id}`);
      }

      fs.writeFileSync(filePath, Buffer.from(imageBase64, 'base64'));
      console.log(`Saved scene image to ${filePath}`);
    } catch (error: any) {
      if (error?.code === 'billing_hard_limit_reached' || error?.message?.includes('Billing hard limit')) {
        console.warn('Image generation blocked by billing limit; skipping images and using local slide placeholders.');
        return;
      }
      throw error;
    }
  }
}

if (process.argv.some((arg) => arg.endsWith('generate-images.ts'))) {
  generateImages().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
