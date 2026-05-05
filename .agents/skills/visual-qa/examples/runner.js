const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function modifySvgForIteration(origSvgPath, outSvgPath, iteration) {
  const svg = fs.readFileSync(origSvgPath, 'utf8');
  // Simple deterministic modifications per iteration:
  // 1) shift a hue via a fill color replacement for common greens
  // 2) add a subtle stroke to primary shapes
  // 3) scale the main group slightly
  let modified = svg;
  const hueShift = (iteration * 20) % 360;
  // Replace common green hexes with rotated hue approximations (simple mapping)
  modified = modified.replace(/#6FB73E/gi, `hsl(${hueShift} 60% 45%)`);
  modified = modified.replace(/#5A8A2F/gi, `hsl(${(hueShift+20)%360} 60% 40%)`);
  // Add stroke to paths and ellipses by injecting a style attribute if missing
  modified = modified.replace(/(ellipse|path|circle)([^>]*)(>)/gi, (m, tag, attrs, close) => {
    if (/stroke=/i.test(attrs)) return m;
    return `${tag}${attrs} stroke="#2b2b2b" stroke-opacity="0.08" stroke-width="4"${close}`;
  });
  // Wrap contents in a group scaled slightly
  if (!/data-iteration-wrap/.test(modified)) {
    modified = modified.replace(/<svg([^>]*)>/i, `<svg$1>\n  <g data-iteration-wrap transform=\"scale(1)\">`);
    modified = modified.replace(/<\/svg>/i, `  </g>\n</svg>`);
  }
  // Adjust the scale value per iteration
  modified = modified.replace(/data-iteration-wrap transform=\"scale\(([^)]+)\)\"/, `data-iteration-wrap transform=\"scale(${1})\"`);
  // now actually change scale value deterministically
  modified = modified.replace(/data-iteration-wrap transform=\"scale\(([^)]+)\)\"/, () => {
    const scale = 1 + (iteration - 1) * 0.01; // +1% per iter
    return `data-iteration-wrap transform=\"scale(${scale.toFixed(3)})\"`;
  });

  fs.writeFileSync(outSvgPath, modified, 'utf8');
  return {
    action: `hue_shift=${hueShift}, add_stroke, scale=${(1 + (iteration - 1) * 0.01).toFixed(3)}`,
    outSvgPath,
  };
}

async function run(sceneId, svgPath, outDir, iteration=1) {
  await fs.promises.mkdir(outDir, { recursive: true });
  // prepare iteration-specific SVG
  const iterSvgPath = path.join(outDir, `${sceneId}.svg`);
  let actionRecord = null;
  if (iteration > 1) {
    // create modified SVG for this iteration
    actionRecord = modifySvgForIteration(svgPath, iterSvgPath, iteration);
  } else {
    // copy original for iteration-1
    fs.copyFileSync(svgPath, iterSvgPath);
  }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 2 });
  const logs = [];
  page.on('console', msg => logs.push({type: msg.type(), text: msg.text()}));

  const url = 'file://' + path.resolve(iterSvgPath).replace(/\\/g, '/');
  await page.goto(url);
  const svg = await page.$('svg');
  if (!svg) {
    const report = { sceneId, error: 'missing_svg', logs };
    fs.writeFileSync(path.join(outDir, 'result.json'), JSON.stringify(report, null, 2));
    await browser.close();
    process.exit(2);
  }

  // Save page HTML for debugging instead of doing a full-page screenshot (avoids heavy font waits)
  const fullPath = path.join(outDir, 'page.html');
  await page.waitForLoadState('load');
  const html = await page.content();
  fs.writeFileSync(fullPath, html);
  const bbox = await svg.boundingBox();
  const tightPath = path.join(outDir, 'tight.png');
  await svg.screenshot({path: tightPath});

  const result = {
    sceneId,
    svgPath: path.resolve(iterSvgPath),
    original_svg: path.resolve(svgPath),
    iteration,
    action: actionRecord,
    bbox,
    screenshots: { full: fullPath, tight: tightPath },
    console: logs
  };
  fs.writeFileSync(path.join(outDir, 'result.json'), JSON.stringify(result, null, 2));
  await browser.close();
  console.log('Wrote', outDir);
}

if (require.main === module) {
  const sceneId = process.argv[2] || 'seed';
  const svgPath = process.argv[3] || `src/assets/images/${sceneId}.svg`;
  const outDir = process.argv[4] || `visual-qa/screenshots/${sceneId}/iteration-1`;
  const iteration = parseInt(process.argv[5] || '1', 10) || 1;
  run(sceneId, svgPath, outDir, iteration).catch(err => { console.error(err); process.exit(1); });
}

module.exports = { run };
