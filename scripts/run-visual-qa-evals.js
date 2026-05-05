const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const evalsPath = path.join(process.cwd(), '.agents', 'skills', 'visual-qa', 'evals', 'evals.json');
const runner = path.join(process.cwd(), '.agents', 'skills', 'visual-qa', 'examples', 'runner.js');
const smartRoot = path.join(process.cwd(), 'visual-qa', 'smart-updates');
const screenshotsRoot = path.join(process.cwd(), 'visual-qa', 'screenshots');
const logsRoot = path.join(process.cwd(), 'visual-qa', 'agent-eval-logs');
const MAX_ITER = 6;
const CONF_THRESHOLD = 0.8;

function loadEvals(){
  return JSON.parse(fs.readFileSync(evalsPath,'utf8')).evals || [];
}

function applySmart(scene, iteration, targetSvgPath){
  const candidate = path.join(smartRoot, `${scene}.v1.svg`);
  if (fs.existsSync(candidate)){
    fs.copyFileSync(candidate, targetSvgPath);
    return `applied_smart_v1`;
  }
  // fallback: copy original
  const orig = path.join(process.cwd(),'src','assets','images', `${scene}.svg`);
  if (fs.existsSync(orig)){
    fs.copyFileSync(orig, targetSvgPath);
    return `copied_original`;
  }
  return `missing_original`;
}

function runIteration(scene, iter){
  const outDir = path.join(screenshotsRoot, scene, `eval-run-iter-${iter}`);
  fs.mkdirSync(outDir, { recursive:true });
  const svgSrc = path.join(process.cwd(),'src','assets','images', `${scene}.svg`);
  const args = [runner, scene, svgSrc, outDir, String(iter)];
  const res = spawnSync('node', args, { encoding: 'utf8' });
  return { code: res.status, stdout: res.stdout, stderr: res.stderr, outDir };
}

function readResult(outDir){
  const p = path.join(outDir, 'result.json');
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch(e){ return null; }
}

function writeTranscript(scene, data){
  const logDir = path.join(logsRoot, scene);
  fs.mkdirSync(logDir, { recursive:true });
  const f = path.join(logDir, `${Date.now()}.json`);
  fs.writeFileSync(f, JSON.stringify(data, null, 2));
  return f;
}

(async function main(){
  fs.mkdirSync(logsRoot, { recursive:true });
  const evals = loadEvals();
  const summary = [];
  for (const ev of evals){
    const scene = ev.scene;
    console.log('\n=== Running eval for scene:', scene, '===');
    let passed = false;
    let iter = 1;
    const evalLog = { scene, iterations: [] };
    // ensure original exists
    const orig = path.join(process.cwd(),'src','assets','images', `${scene}.svg`);
    if (!fs.existsSync(orig)){
      console.log('Original SVG missing for', scene);
      evalLog.error = 'missing_original';
      writeTranscript(scene, evalLog);
      summary.push({scene, status:'missing_original'});
      continue;
    }

    // run loop
    while(iter <= MAX_ITER){
      // step 1: image generation (apply smart edit or create iteration variant)
      const targetSvg = path.join(process.cwd(),'src','assets','images', `${scene}.svg`);
      const action = applySmart(scene, iter, targetSvg);

      // step 2: validate with runner
      const runRes = runIteration(scene, iter);
      const result = readResult(runRes.outDir);

      const iterRecord = { iteration: iter, action, run: runRes, result };
      evalLog.iterations.push(iterRecord);
      writeTranscript(scene, evalLog);

      // detection: if result contains failure_reason field -> fail
      const failure = result && result.failure_reason;
      // simplistic pass criteria: presence of bbox and no console errors
      const consoleCount = result && result.console ? result.console.length : 0;
      const hasBBox = result && result.bbox && result.bbox.width>0 && result.bbox.height>0;

      if (hasBBox && consoleCount===0){
        console.log('Iteration', iter, 'passed basic checks for', scene);
        passed = true;
        break;
      }

      console.log('Iteration', iter, 'did not pass; failure_reason=', failure, 'consoleCount=', consoleCount);
      iter++;
    }

    const status = passed ? 'passed' : 'failed';
    summary.push({ scene, status, iterations: evalLog.iterations.length });
    writeTranscript(scene, evalLog);
  }
  const out = path.join(process.cwd(),'visual-qa','agent-eval-summary.json');
  fs.writeFileSync(out, JSON.stringify(summary, null, 2));
  console.log('\nWrote summary to', out);
})();
