const fs = require('fs');
const path = require('path');

function findResults(root) {
  const scenes = fs.readdirSync(root).filter(f => fs.statSync(path.join(root,f)).isDirectory());
  const rows = [];
  for (const scene of scenes) {
    const sceneDir = path.join(root, scene);
    const iterations = fs.readdirSync(sceneDir).filter(f => fs.statSync(path.join(sceneDir,f)).isDirectory());
    for (const iter of iterations) {
      const rpath = path.join(sceneDir, iter, 'result.json');
      if (!fs.existsSync(rpath)) continue;
      const data = JSON.parse(fs.readFileSync(rpath,'utf8'));
      rows.push({scene, iteration: iter, data});
    }
  }
  return rows;
}

function summarize(rows) {
  const byScene = {};
  for (const r of rows) {
    const s = r.scene;
    byScene[s] = byScene[s] || {total:0, missing:0, actions:{}, failures:{}, bboxes:[]};
    byScene[s].total++;
    const d = r.data;
    if (d.error === 'missing_svg' || !d.svgPath) byScene[s].missing++;
    if (d.action && d.action.action) {
      byScene[s].actions[d.action.action] = (byScene[s].actions[d.action.action] || 0) + 1;
    }
    if (d.failure_reason) {
      byScene[s].failures[d.failure_reason] = (byScene[s].failures[d.failure_reason] || 0) + 1;
    }
    if (d.bbox) byScene[s].bboxes.push(d.bbox);
    if (d.console && d.console.length>0) {
      byScene[s].console = (byScene[s].console || 0) + d.console.length;
    }
  }
  return byScene;
}

function writeReport(summary, out) {
  fs.writeFileSync(out, JSON.stringify(summary, null, 2));
  console.log('Wrote', out);
}

function makeEvals(summary, outPath) {
  const evals = [];
  for (const scene of Object.keys(summary)) {
    evals.push({
      id: evals.length+1,
      scene,
      prompt: `Validate generated SVG for scene ${scene}. Expected: ${scene} visual with clear subject, high contrast, central composition.`,
      expected: 'pass',
      files: []
    });
  }
  const obj = { skill_name: 'visual-qa', evals };
  fs.writeFileSync(outPath, JSON.stringify(obj, null, 2));
  console.log('Wrote', outPath);
}

(function main(){
  const root = path.join(process.cwd(),'visual-qa','screenshots');
  const rows = findResults(root);
  const summary = summarize(rows);
  const out = path.join(process.cwd(),'visual-qa','aggregate.json');
  writeReport(summary, out);
  makeEvals(summary, path.join(process.cwd(),'.agents','skills','visual-qa','evals','evals.json'));
})();
