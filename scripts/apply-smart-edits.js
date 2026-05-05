const fs = require('fs');
const path = require('path');

function adjustFillLightness(svgText, delta=10) {
  // replace hsl(...) or hex colors by increasing lightness when possible
  let out = svgText.replace(/hsl\((\d+)\s*(\d+)%\s*(\d+)%\)/gi, (m,h,s,l)=>{
    const nl = Math.min(90, parseInt(l)+delta);
    return `hsl(${h} ${s}% ${nl}%)`;
  });
  out = out.replace(/#([0-9a-f]{6})/gi, (m,hex)=>{
    // convert hex to hsl, increase lightness, back to hex
    const r = parseInt(hex.slice(0,2),16)/255;
    const g = parseInt(hex.slice(2,4),16)/255;
    const b = parseInt(hex.slice(4,6),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h=0,s=0,l=((max+min)/2);
    if (max!==min){
      const d = max-min;
      s = l>0.5? d/(2-max-min): d/(max+min);
      switch(max){
        case r: h = (g-b)/d + (g<b?6:0); break;
        case g: h = (b-r)/d + 2; break;
        case b: h = (r-g)/d + 4; break;
      }
      h/=6;
    }
    let nl = Math.min(0.95, l + delta/100);
    // convert back to rgb
    let r1,g1,b1;
    if (s===0){ r1=g1=b1=nl; } else {
      const hue2rgb = (p,q,t)=>{
        if (t<0) t+=1; if (t>1) t-=1;
        if (t<1/6) return p+(q-p)*6*t;
        if (t<1/2) return q;
        if (t<2/3) return p+(q-p)*(2/3-t)*6;
        return p;
      };
      const q = nl < 0.5 ? nl*(1+s) : nl + s - nl*s;
      const p = 2*nl - q;
      r1 = hue2rgb(p,q,h+1/3);
      g1 = hue2rgb(p,q,h);
      b1 = hue2rgb(p,q,h-1/3);
    }
    const hr = Math.round(r1*255).toString(16).padStart(2,'0');
    const hg = Math.round(g1*255).toString(16).padStart(2,'0');
    const hb = Math.round(b1*255).toString(16).padStart(2,'0');
    return `#${hr}${hg}${hb}`;
  });
  return out;
}

(function main(){
  const aggregatePath = path.join(process.cwd(),'visual-qa','aggregate.json');
  const agg = JSON.parse(fs.readFileSync(aggregatePath,'utf8'));
  const outRoot = path.join(process.cwd(),'visual-qa','smart-updates');
  fs.mkdirSync(outRoot, { recursive:true });
  for (const scene of Object.keys(agg)){
    if (agg[scene].missing && agg[scene].missing>0) {
      console.log('skipping', scene, 'missing original SVGs');
      continue;
    }
    const orig = path.join(process.cwd(),'src','assets','images', `${scene}.svg`);
    if (!fs.existsSync(orig)) { console.log('orig missing', orig); continue; }
    const svg = fs.readFileSync(orig,'utf8');
    const improved = adjustFillLightness(svg, 12);
    const outPath = path.join(outRoot, `${scene}.v1.svg`);
    fs.writeFileSync(outPath, improved,'utf8');
    console.log('wrote', outPath);
  }
})();
