import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const pagePath = path.join(process.cwd(), 'public', 'validate.html');

test.describe('visual-qa svgs', () => {
  test('renders all svgs without console errors', async ({ page }) => {
    const logs: string[] = [];
    page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));

    await page.goto('file://' + pagePath);
    await page.waitForSelector('.grid');
    const imgs = await page.$$eval('img', els => els.map(e => (e as HTMLImageElement).src));
    expect(imgs.length).toBeGreaterThanOrEqual(7);

    // capture screenshots per image card
    const cards = await page.$$('.card');
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      await card.screenshot({ path: `test-results/visual-qa-${i + 1}.png` });
    }

    // fail if any console error logged
    const errors = logs.filter(l => l.startsWith('error') || l.startsWith('pageerror'));
    expect(errors.length).toBe(0);
  });
});
