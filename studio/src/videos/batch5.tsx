import React from 'react';
import sAm from '../../videos/amba/script.json';
import tAm from '../../videos/amba/timings.json';
import sGa from '../../videos/gandhari/script.json';
import tGa from '../../videos/gandhari/timings.json';
import sSa from '../../videos/sahadev/script.json';
import tSa from '../../videos/sahadev/timings.json';
import sJa from '../../videos/jarasandh/script.json';
import tJa from '../../videos/jarasandh/timings.json';
import sUr from '../../videos/urmila/script.json';
import tUr from '../../videos/urmila/timings.json';
import {A, Arrow, BattleBG, blink, CosmicBG, EndCard, FireAltar, Flash, ForestBG, Glow, Hills, lerp, p, PalaceBG, Place, Rays, Sky, Stars, Svg} from '../kit';
import {Wheel} from '../people';
import {Diya} from '../chars';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

// ---------- shared props ----------
export const Moon: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 60}) => (
  <g><Glow cx={x} cy={y} r={r * 3} c="#F3EAD0" o={0.3} /><circle cx={x} cy={y} r={r} fill="#F3EAD0" /></g>
);
export const Q: React.FC<{y?: number}> = ({y = 1160}) => (
  <text x={540} y={y} textAnchor="middle" fontFamily="Playfair Display" fontWeight={800} fontSize={220} fill="#F0C25A" opacity={0.9}>?</text>
);
export const DEVF = '"Tiro Devanagari Hindi", serif';
export const Versus: React.FC<{a: string; b: string; f: number}> = ({a, b, f}) => (
  <g>
    <text x={270} y={1000} textAnchor="middle" fontFamily={/[\u0900-\u097F]/.test(a) ? DEVF : 'Montserrat'} fontWeight={800} fontSize={/[\u0900-\u097F]/.test(a) ? 96 : 72} fill="#F0C25A" opacity={0.6 + Math.sin(f / 8) * 0.4}>{a}</text>
    <text x={810} y={1000} textAnchor="middle" fontFamily={/[\u0900-\u097F]/.test(b) ? DEVF : 'Montserrat'} fontWeight={800} fontSize={/[\u0900-\u097F]/.test(b) ? 96 : 72} fill="#E0453A" opacity={0.6 - Math.sin(f / 8) * 0.4}>{b}</text>
    <text x={540} y={1000} textAnchor="middle" fontFamily={/[\u0900-\u097F]/.test(a) ? DEVF : 'Playfair Display'} fontWeight={800} fontSize={60} fill="#F4EFE4">{/[\u0900-\u097F]/.test(a) ? 'या' : 'ya'}</text>
  </g>
);
// Blindfold, drawn in an actor's space (eyes at y -147).
const Patti: React.FC<{x: number; y: number; s: number; lift?: number; o?: number}> = ({x, y, s, lift = 0, o = 1}) => (
  <Place x={x} y={y} s={s}><g opacity={o} transform={`translate(0 ${-lift * 90})`}><rect x={-50} y={-160} width={100} height={24} rx={8} fill="#3A2A20" /><path d="M48 -152 l26 18 M48 -146 l22 26" stroke="#3A2A20" strokeWidth={7} strokeLinecap="round" /></g></Place>
);
const Leaves: React.FC<{x: number; y: number; s: number; flip?: boolean}> = ({x, y, s, flip}) => (
  <Place x={x} y={y} s={s} flip={flip}>
    {[-34, -12, 12, 34].map((dx, i) => <path key={i} d={`M${dx} -40 Q${dx + (i % 2 ? 22 : -22)} 10 ${dx} 60 Q${dx + (i % 2 ? -10 : 10)} 10 ${dx} -40Z`} fill={i % 2 ? '#3E9A3A' : '#5AB84A'} stroke="#2A6A26" strokeWidth={2} />)}
  </Place>
);
const Chariot: React.FC<{x: number; y?: number; s?: number; f: number}> = ({x, y = 1700, s = 1, f}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-170 -40 h300 l40 -120 h-40 l-20 80 h-280Z" fill="#8A5A1C" /><rect x={-170} y={-40} width={340} height={26} fill="#B8862E" />
    <g transform="translate(-60 10)"><Wheel r={70} rot={f * 3} /></g><g transform="translate(110 10)"><Wheel r={70} rot={f * 3} /></g>
    <path d="M130 -160 v-160" stroke="#5A3A1A" strokeWidth={6} /><path d="M130 -320 l90 30 -90 30Z" fill="#E0453A" />
  </g>
);
const Bed: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-10} width={400} height={60} rx={16} fill="#7A4A9A" /><ellipse cx={-150} cy={-22} rx={50} ry={24} fill="#F4EFE4" />
    <rect x={-200} y={50} width={18} height={50} fill="#7A4A2A" /><rect x={182} y={50} width={18} height={50} fill="#7A4A2A" />
  </g>
);
export const Zzz: React.FC<{f: number; x: number; y: number; s?: number}> = ({f, x, y, s = 1}) => (
  <g>{[0, 1, 2].map((i) => { const t = ((f + i * 25) % 75) / 75; return <text key={i} x={x + t * 120 * s} y={y - t * 260 * s} fontFamily="Montserrat" fontWeight={800} fontSize={(50 + i * 14) * s} fill="#E9F0FF" opacity={Math.sin(t * Math.PI)}>Z</text>; })}</g>
);
// Left or right half of anything drawn inside (split at x).
const Half: React.FC<{id: string; side: 'l' | 'r'; x: number; dx?: number; dy?: number; rot?: number; children: React.ReactNode}> = ({id, side, x, dx = 0, dy = 0, rot = 0, children}) => (
  <g>
    <defs><clipPath id={id}><rect x={side === 'l' ? -2000 : x} y={-2000} width={side === 'l' ? x + 2000 : 4000} height={6000} /></clipPath></defs>
    <g transform={`translate(${dx} ${dy}) rotate(${rot} ${x} 1400)`}><g clipPath={`url(#${id})`}>{children}</g></g>
  </g>
);
const Baby: React.FC<{x: number; y: number; s?: number; cry?: boolean}> = ({x, y, s = 1, cry}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={30} rx={70} ry={50} fill="#F4EFE4" /><circle cx={0} cy={-40} r={48} fill="#EDBE92" />
    <circle cx={-16} cy={-44} r={5} fill="#2a1a10" /><circle cx={16} cy={-44} r={5} fill="#2a1a10" />
    {cry ? <ellipse cx={0} cy={-18} rx={10} ry={12} fill="#5a2410" /> : <path d="M-10 -22 q10 8 20 0" stroke="#5a2410" strokeWidth={4} fill="none" />}
  </g>
);
const Dice: React.FC<{x: number; y: number; s?: number; r?: number}> = ({x, y, s = 1, r = 0}) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${r})`}><rect x={-40} y={-40} width={80} height={80} rx={14} fill="#F4EFE4" /><circle r={8} fill="#B21E2A" /><circle cx={-20} cy={-20} r={8} fill="#B21E2A" /><circle cx={20} cy={20} r={8} fill="#B21E2A" /></g>
);
const Spiral: React.FC<{x: number; y: number; f: number}> = ({x, y, f}) => (
  <g transform={`translate(${x} ${y}) rotate(${f * 2})`}>{[100, 76, 52, 28].map((r, i) => <circle key={r} r={r} fill="none" stroke={i % 2 ? '#E0453A' : '#F0C25A'} strokeWidth={8} strokeDasharray="40 14" />)}</g>
);
const Vision: React.FC<{x: number; y: number; o?: number; children: React.ReactNode}> = ({x, y, o = 1, children}) => (
  <g opacity={o}><circle cx={x} cy={y} r={150} fill="#1A1438" stroke="#F0C25A" strokeWidth={6} /><Glow cx={x} cy={y} r={200} c="#7A6AFF" o={0.25} /><g transform={`translate(${x} ${y})`}>{children}</g></g>
);


// Face close-up inside a gold ring (emotional beat).
export const CloseUp: React.FC<{who: string; f: number; pose?: object; c?: [string, string, string]; id: string; children?: React.ReactNode}> = ({who, f, pose, c = ['#0a0608', '#3A1418', '#0a0608'], id, children}) => (
  <Svg>
    <Sky id={id} c={c} />
    <Rays f={f} cx={540} cy={1050} op={0.18} />
    {children}
    <defs><clipPath id={id + 'c'}><circle cx={540} cy={1050} r={330} /></clipPath></defs>
    <circle cx={540} cy={1050} r={330} fill="#1A0E0A" />
    <g clipPath={`url(#${id}c)`}><A who={who} x={540} y={1050 + 150 * (5.2 + f * 0.002)} s={5.2 + f * 0.002} pose={pose} /></g>
    <circle cx={540} cy={1050} r={330} fill="none" stroke="#F0C25A" strokeWidth={14} />
    <circle cx={540} cy={1050} r={352} fill="none" stroke="#F0C25A" strokeWidth={3} opacity={0.6} />
  </Svg>
);
// Scripture / source scroll.
export const Scroll: React.FC<{f: number; id: string}> = ({f, id}) => {
  const k = p(f, 0, 24);
  return (
    <Svg zoom={1 + f * 0.0015} oy={1150}>
      <Sky id={id} c={['#1A0E06', '#5A3A14', '#C2903A']} />
      <Rays f={f} cx={540} cy={1150} op={0.25} />
      <g transform="translate(540 1150)">
        <rect x={-300} y={-260 * k} width={600} height={520 * k} fill="#F2DDA8" stroke="#B8862E" strokeWidth={6} />
        {Array.from({length: 7}).map((_, i) => <rect key={i} x={-230} y={-200 + i * 62} width={460 - (i % 3) * 60} height={14} rx={7} fill="#8A5A1C" opacity={0.55 * k} />)}
        <rect x={-330} y={-290 * k - 24} width={660} height={48} rx={24} fill="#8A5A1C" /><rect x={-330} y={290 * k - 24} width={660} height={48} rx={24} fill="#8A5A1C" />
      </g>
      {[200, 880].map((x, i) => <g key={x} transform={`translate(${x} 1640) scale(1.2)`}><Diya flame={1} t={f + i * 9} /></g>)}
    </Svg>
  );
};

// ================= AMBA / SHIKHANDI =================
const AM1: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.45, dur * 0.6);
  return (
    <Svg zoom={1.35 - p(f, 0, 30) * 0.3} oy={1250}>
      <Sky id="am1" c={['#1A0606', '#7A1E10', '#F2703A']} />
      <Glow cx={540} cy={1300} r={650} c="#FF5A1A" o={0.45 + Math.sin(f / 3) * 0.1} />
      {k < 1 && <A who="amba" x={540} y={1660} s={2.4} o={1 - k} pose={{eyes: 'angry', mouth: 'grit', armR: -150}} />}
      {k > 0 && <A who="shikhandi" x={540} y={1660} s={2.4} o={k} prop="bow" pose={{eyes: 'angry', mouth: 'grit', armR: -90, armL: -80}} />}
      <Flash t={p(f, dur * 0.42, dur * 0.58)} c="#FFE9C8" />
    </Svg>
  );
};
const AM2: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#3A1030" />
    <Rays f={f} cx={540} cy={1000} op={0.15} />
    <A who="amba" x={540} y={1680} s={2.3} pose={{mouth: 'smile', blink: blink(f), armR: -40}} />
  </Svg>
);
const AM3: React.FC<SP> = ({f, dur}) => {
  const t = p(f, dur * 0.3, dur);
  return (
    <Svg>
      <PalaceBG tint="#2A1410" />
      <A who="bhishma" x={lerp(t, 380, 160)} y={1660} s={2.1} prop="bow" pose={{eyes: 'angry', mouth: 'flat', legL: Math.sin(f / 6) * 12 * (t > 0 ? 1 : 0), legR: -Math.sin(f / 6) * 12 * (t > 0 ? 1 : 0)}} />
      {[0, 1, 2].map((i) => <A key={i} who="amba" x={lerp(t, 640 + i * 150, 420 + i * 150)} y={1690} s={1.6} o={i ? 0.8 : 1} pose={{eyes: 'shock', mouth: 'o', armL: -60}} />)}
    </Svg>
  );
};
const AM4: React.FC<SP> = ({f, dur}) => {
  const L = [0, Math.round(dur * 0.45)];
  const no = f >= L[1];
  return (
    <Svg>
      <PalaceBG tint="#1A2030" />
      <A who="amba" x={330} y={1680} s={2.1} pose={{eyes: no ? 'sad' : 'open', mouth: no ? 'sad' : 'smile', armR: -70}} />
      <A who="shalva" x={760} y={1660} s={2.1} flip={!no} pose={{armL: no ? 0 : -40, armR: no ? -90 : 0, mouth: no ? 'flat' : 'smile', eyes: no ? 'angry' : 'open'}} />
      {!no && <text x={545} y={1240} textAnchor="middle" fontSize={90} fill="#FF6A8A">♥</text>}
    </Svg>
  );
};
const AM5: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#2A1410" />
    <A who="amba" x={330} y={1680} s={2.1} pose={{eyes: 'sad', mouth: 'o', armR: -90}} />
    <A who="bhishma" x={760} y={1660} s={2.2} flip pose={{armL: -110, mouth: 'flat', eyes: 'closed', head: Math.sin(f / 5) * 6}} />
  </Svg>
);
const AM6: React.FC<SP> = ({f}) => (
  <Svg shake={f > 20 && f < 28 ? f : 0}>
    <Sky id="am6" c={['#1A0606', '#5A1010', '#C2401A']} />
    <Glow cx={540} cy={1300} r={700} c="#FF3A1A" o={0.4} />
    <Hills c="#1A0606" y={1620} />
    <A who="amba" x={540} y={1680} s={2.5} pose={{eyes: 'angry', mouth: 'grit', armR: -170, armL: 20}} />
  </Svg>
);
const AM7: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.4, dur * 0.55);
  return (
    <Svg>
      <Sky id="am7" c={['#0a0614', '#2A1A4A', '#7A4A9A']} />
      <Stars n={50} f={f} seed="am7" h={1100} />
      <A who="amba" x={540} y={1680} s={2.3} o={1 - k} pose={{eyes: 'closed', mouth: 'flat', armL: -150, armR: 150}} />
      <Glow cx={540} cy={1300} r={500 * (k * (1 - k) * 4)} c="#FFF3C0" o={0.9} />
      {k > 0 && <><Rays f={f} cx={540} cy={1200} op={0.25 * k} /><A who="shikhandi" x={540} y={1680} s={2.3} o={k} pose={{eyes: 'open', mouth: 'flat', armR: -60}} /></>}
    </Svg>
  );
};
const AM8: React.FC<SP> = ({f}) => (
  <Svg>
    <BattleBG f={f} />
    <Chariot x={560} f={f} s={1.1} />
    <A who="arjun" x={600} y={1490} s={1.7} prop="bow" pose={{armR: -90, armL: -80, eyes: 'angry', mouth: 'grit'}} />
    <A who="shikhandi" x={330} y={1720} s={2} pose={{armR: -60, eyes: 'angry', mouth: 'flat'}} />
  </Svg>
);
const AM9: React.FC<SP> = ({f, dur}) => {
  const L = [0, Math.round(dur * 0.45)];
  const drop = f >= L[1];
  const k = p(f, L[1], L[1] + 20);
  return (
    <Svg>
      <BattleBG f={f} />
      <A who="shikhandi" x={220} y={1700} s={1.8} pose={{eyes: 'angry', mouth: 'flat', armR: -60}} />
      <A who="bhishma" x={760} y={1660} s={2.3} flip prop={drop ? 'none' : 'bow'} pose={{eyes: drop ? 'closed' : 'shock', mouth: drop ? 'smile' : 'o', armL: drop ? 20 : -60}} />
      {drop && <g transform={`translate(${lerp(k, 700, 620)} ${lerp(k, 1450, 1760)}) rotate(${lerp(k, 0, 80)})`}><path d="M-4 -95 Q-60 0 -4 95" stroke="#8A5A1C" strokeWidth={7} fill="none" /></g>}
    </Svg>
  );
};
const AM10: React.FC<SP> = ({f, dur}) => {
  const t = p(f, 5, dur * 0.4);
  const fall = p(f, dur * 0.45, dur * 0.8);
  return (
    <Svg>
      <BattleBG f={f} />
      {Array.from({length: 7}).map((_, i) => <Arrow key={i} x={lerp(t, 100 + i * 20, 650 + i * 20)} y={1180 + i * 40} rot={0} glow="#FFB02E" />)}
      <A who="bhishma" x={lerp(fall, 760, 820)} y={lerp(fall, 1660, 1620)} s={2.3} flip rot={lerp(fall, 0, 70)} pose={{eyes: 'closed', mouth: 'smile', armL: 30, armR: -30}} />
      <Flash t={p(f, dur * 0.4, dur * 0.5)} c="#FFE9C8" />
    </Svg>
  );
};
const AM11: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="am11" c={['#120808', '#4A1418', '#B2401A']} />
    <line x1={540} y1={700} x2={540} y2={1920} stroke="#F0C25A" strokeWidth={4} opacity={0.6} />
    <A who="amba" x={270} y={1700} s={2} pose={{eyes: 'sad', mouth: 'sad', blink: blink(f)}} />
    <A who="shikhandi" x={810} y={1700} s={2} flip prop="bow" pose={{eyes: 'angry', mouth: 'grit', armL: -90}} />
  </Svg>
);
const AM12: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="am12" c={['#0a0608', '#3A1418', '#0a0608']} />
    <Rays f={f} cx={540} cy={1000} op={0.12} />
    <Versus a="DHARM" b="CHHAL" f={f} />
    <A who="bhishma" x={260} y={1700} s={2} pose={{eyes: 'closed', mouth: 'flat'}} />
    <A who="shikhandi" x={820} y={1700} s={2} flip pose={{eyes: 'angry', mouth: 'flat'}} />
  </Svg>
);
export const amba: Cfg = {
  id: 'Amba', voice: 'amba.wav', script: sAm, timings: tAm,
  scenes: [[AM1, [0]], [AM2, [1]], [AM3, [2]], [AM4, [3]], [AM5, [4]], [AM6, [5]], [AM7, [6]], [AM8, [7]], [AM9, [8]], [AM10, [9]], [AM11, [10]], [AM12, [11, 12]]],
  titles: [
    {pill: 'BADLE KE LIYE', title: 'DOOSRA\nJANM.', red: 'JANM.'},
    {pill: 'KASHI KI RAJKUMARI', title: 'AMBA.'},
    {pill: 'SWAYAMVAR SE', title: 'UTHA LAAYE.'},
    {pill: 'PREM NE BHI', title: 'THUKRAYA.'},
    {pill: 'BHISHMA KI', title: 'PRATIGYA.'},
    {pill: 'AMBA KI', title: 'KASAM.', red: 'KASAM.'},
    {pill: 'AGLA JANM', title: 'SHIKHANDI.'},
    {pill: 'RATH KE AAGE', title: 'SHIKHANDI.'},
    {pill: 'DHANUSH', title: 'NEECHE.'},
    {pill: 'GIRE', title: 'BHISHMA.', red: 'BHISHMA.'},
    {pill: 'APMAAN SE', title: 'BADLA.'},
    {pill: 'AAPKI RAAY', title: 'DHARM YA\nCHHAL?'}, null,
  ],
  end: {pill: 'ANSUNI KATHA', title: 'AMBA.', sub: 'Jisne badle ke liye janm liya'}, endScene: EndCard,
};

// ================= GANDHARI / DURYODHAN =================
const GoldBody: React.FC<{x: number; y: number; s: number; k: number; flip?: boolean; pose?: object}> = ({x, y, s, k, flip, pose}) => (
  <g>
    <defs><filter id="vajra"><feColorMatrix type="matrix" values="0.62 0.62 0.15 0 0.12  0.45 0.45 0.1 0 0.06  0.1 0.1 0.05 0 0  0 0 0 1 0" /></filter></defs>
    <Glow cx={x} cy={y - 150 * s} r={260 * s} c="#FFD24A" o={0.35 * k} />
    <A who="duryodhan" x={x} y={y} s={s} flip={flip} pose={pose} />
    <g filter="url(#vajra)" opacity={k}><A who="duryodhan" x={x} y={y} s={s} flip={flip} pose={pose} /></g>
    <Leaves x={x} y={y} s={s} flip={flip} />
  </g>
);
const GA1: React.FC<SP> = ({f, dur}) => {
  const lift = p(f, 5, 25);
  const k = p(f, 25, dur * 0.7);
  return (
    <Svg zoom={1.25 - p(f, 0, 40) * 0.2} oy={1250}>
      <PalaceBG tint="#1A0A0A" />
      <A who="gandhari" x={260} y={1680} s={2.1} pose={{eyes: lift > 0.5 ? 'glow' : 'closed', mouth: 'flat', armR: -150}} />
      <Patti x={260} y={1680} s={2.1} lift={lift} o={1 - p(f, 15, 30)} />
      {lift > 0.6 && [0, 1].map((i) => <path key={i} d={`M${260 + (i ? 20 : -20) * 2.1} ${1680 - 147 * 2.1} L780 ${1300 + i * 80}`} stroke="#FFE27A" strokeWidth={10} opacity={0.6} />)}
      <GoldBody x={780} y={1700} s={2.2} k={k} flip pose={{eyes: 'closed', mouth: 'flat', armL: 20, armR: -20}} />
    </Svg>
  );
};
const GA2: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#3A1020" />
    <FireAltar f={f} x={540} y={1780} s={0.7} />
    <A who="gandhari" x={540} y={1680} s={2.3} pose={{eyes: 'closed', mouth: 'flat', armR: -150, blink: false}} />
    <Patti x={540} y={1680} s={2.3} />
  </Svg>
);
const GA3: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.001} oy={1200}>
    <Sky id="ga3" c={['#0a0614', '#2A1A4A', '#5A3A7A']} />
    <Stars n={50} f={f} seed="ga3" h={1200} />
    {Array.from({length: 6}).map((_, i) => <circle key={i} cx={540} cy={1680 - 147 * 2.3} r={((f * 3 + i * 60) % 360)} fill="none" stroke="#FFE27A" strokeWidth={4} opacity={1 - ((f * 3 + i * 60) % 360) / 360} />)}
    <A who="gandhari" x={540} y={1680} s={2.3} pose={{eyes: 'closed', mouth: 'flat', legL: -70, legR: 70, armL: -150, armR: 150}} />
    <Patti x={540} y={1680} s={2.3} />
  </Svg>
);
const GA4: React.FC<SP> = ({f, dur}) => {
  const L = [0, Math.round(dur * 0.45)];
  const call = f >= L[1];
  return (
    <Svg>
      {!call ? <><BattleBG f={f} /><A who="duryodhan" x={540} y={1680} s={2.2} prop="mace" pose={{eyes: 'sad', mouth: 'o', armR: -60}} /></> : <>
        <PalaceBG tint="#3A1020" />
        <A who="gandhari" x={300} y={1680} s={2.1} pose={{eyes: 'closed', mouth: 'flat', armR: -90}} /><Patti x={300} y={1680} s={2.1} />
        <A who="duryodhan" x={780} y={1680} s={2.1} flip pose={{eyes: 'open', mouth: 'flat', blink: blink(f)}} />
      </>}
    </Svg>
  );
};
const GA5: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#3A1020" />
    <A who="gandhari" x={330} y={1680} s={2.2} pose={{eyes: 'closed', mouth: 'o', armR: -110}} /><Patti x={330} y={1680} s={2.2} />
    <A who="duryodhan" x={790} y={1680} s={2.1} flip pose={{eyes: 'shock', mouth: 'o'}} />
  </Svg>
);
const GA6: React.FC<SP> = ({f}) => (
  <Svg>
    <ForestBG f={f} />
    <A who="krishna" x={300} y={1680} s={2.1} pose={{mouth: 'laugh', eyes: 'open', armR: -100}} />
    <A who="duryodhan" x={780} y={1680} s={2.1} flip pose={{eyes: 'shock', mouth: 'o', armL: 40, armR: -40}} />
  </Svg>
);
const GA7: React.FC<SP> = ({f, dur}) => {
  const k = p(f, 10, dur * 0.6);
  return (
    <Svg zoom={1.4} oy={1500}>
      <ForestBG f={f} />
      <A who="duryodhan" x={540} y={1680} s={2.4} pose={{eyes: 'down', mouth: 'smile', armL: 30, armR: -30}} />
      <g opacity={k} transform={`translate(0 ${(1 - k) * -120})`}><Leaves x={540} y={1680} s={2.4} /></g>
    </Svg>
  );
};
const GA8: React.FC<SP> = ({f, dur}) => {
  const L = [0, Math.round(dur * 0.45)];
  const open = f >= L[1];
  const k = open ? p(f, L[1], L[1] + 40) : 0;
  return (
    <Svg>
      <PalaceBG tint="#2A0E06" />
      <A who="gandhari" x={260} y={1680} s={2.1} pose={{eyes: open ? 'glow' : 'closed', mouth: 'flat', armR: open ? -150 : 0}} />
      <Patti x={260} y={1680} s={2.1} lift={open ? 1 : 0} o={open ? 1 - p(f, L[1], L[1] + 12) : 1} />
      {open && <Rays f={f * 2} cx={780} cy={1300} op={0.3 * k} />}
      <GoldBody x={780} y={1700} s={2.2} k={k} flip pose={{eyes: 'closed', mouth: 'flat', armL: 20, armR: -20}} />
    </Svg>
  );
};
const GA9: React.FC<SP> = ({f}) => (
  <Svg zoom={1.6} oy={1640}>
    <PalaceBG tint="#2A0E06" />
    <GoldBody x={540} y={1700} s={2.2} k={1} pose={{eyes: 'open', mouth: 'smile'}} />
    <circle cx={540} cy={1730} r={130 + Math.sin(f / 4) * 10} fill="none" stroke="#E0453A" strokeWidth={8} strokeDasharray="20 12" />
  </Svg>
);
const GA10: React.FC<SP> = ({f}) => (
  <Svg>
    <BattleBG f={f} />
    <A who="krishna" x={170} y={1720} s={1.6} pose={{armR: -100, mouth: 'smile', eyes: 'open'}} />
    <A who="bheem" x={420} y={1700} s={2} prop="mace" pose={{eyes: 'angry', mouth: 'grit'}} />
    <GoldBody x={820} y={1700} s={2} k={1} flip pose={{eyes: 'angry', mouth: 'grit'}} />
  </Svg>
);
const GA11: React.FC<SP> = ({f, dur}) => {
  const hit = f >= dur * 0.35;
  const fall = p(f, dur * 0.4, dur * 0.75);
  return (
    <Svg shake={hit && f < dur * 0.45 ? f : 0}>
      <BattleBG f={f} />
      <A who="bheem" x={380} y={1700} s={2.2} prop="mace" pose={{armR: hit ? 60 : -170, eyes: 'angry', mouth: 'grit'}} />
      <g transform={`rotate(${lerp(fall, 0, 35)} 760 1700)`}><GoldBody x={760} y={1700} s={2.1} k={1} flip pose={{eyes: hit ? 'closed' : 'shock', mouth: hit ? 'grit' : 'o'}} /></g>
      <Flash t={p(f, dur * 0.33, dur * 0.42)} c="#FFE9C8" />
    </Svg>
  );
};
const GA12: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ga12" c={['#0a0608', '#3A1418', '#0a0608']} />
    <Rays f={f} cx={540} cy={1000} op={0.12} />
    <Versus a="SAHI" b="GALAT" f={f} />
    <A who="krishna" x={270} y={1700} s={2} pose={{mouth: 'smile', blink: blink(f)}} />
    <A who="gandhari" x={810} y={1700} s={2} flip pose={{eyes: 'glow', mouth: 'sad'}} />
  </Svg>
);
export const gandhari: Cfg = {
  id: 'Gandhari', voice: 'gandhari.wav', script: sGa, timings: tGa,
  scenes: [[GA1, [0]], [GA2, [1]], [GA3, [2]], [GA4, [3]], [GA5, [4]], [GA6, [5]], [GA7, [6]], [GA8, [7]], [GA9, [8]], [GA10, [9]], [GA11, [10]], [GA12, [11, 12]]],
  titles: [
    {pill: 'MAA KI EK NAZAR', title: 'LOHE KA\nSHARIR.', red: 'SHARIR.'},
    {pill: 'AANKHON PAR', title: 'PATTI.'},
    {pill: 'SAALON KI', title: 'TAPASYA.'},
    {pill: 'MAA NE', title: 'BULAYA.'},
    {pill: 'KUCH BHI', title: 'NAHI PEHNA.'},
    {pill: 'RAASTE MEIN', title: 'KRISHNA.'},
    {pill: 'KELE KE', title: 'PATTE.', red: 'PATTE.'},
    {pill: 'NAZAR PADI', title: 'VAJRA.'},
    {pill: 'BACH GAYI', title: 'JAANGH.', red: 'JAANGH.'},
    {pill: 'KRISHNA KA', title: 'ISHAARA.'},
    {pill: 'BHEEM KI', title: 'GADA.'},
    {pill: 'AAPKI RAAY', title: 'SAHI YA\nGALAT?'}, null,
  ],
  end: {pill: 'ANSUNI KATHA', title: 'GANDHARI.', sub: 'Ek nazar, ek chaal'}, endScene: EndCard,
};

// ================= SAHADEV =================
const SA1: React.FC<SP> = ({f}) => (
  <Svg zoom={1.3 - p(f, 0, 40) * 0.25} oy={1250}>
    <CosmicBG f={f} c="#2A1A5A" />
    <Vision x={230} y={760} o={p(f, 4, 14)}><Dice x={-30} y={0} r={f * 3} /><Dice x={40} y={20} r={-f * 2} s={0.8} /></Vision>
    <Vision x={850} y={820} o={p(f, 10, 20)}><Spiral x={0} y={0} f={f} /></Vision>
    <A who="sahadev" x={540} y={1700} s={2.4} pose={{eyes: 'glow', mouth: 'flat'}} />
    <Place x={540} y={1700} s={2.4}><rect x={-44} y={-128} width={88} height={18} rx={6} fill="#C9A24A" opacity={0.95} /></Place>
  </Svg>
);
const SA2: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#102030" />
    {[150, 330, 750, 930].map((x, i) => <A key={x} who={['bheem', 'arjun', 'arjun', 'iravan'][i]} x={x} y={1720} s={1.4} flip={i > 1} o={0.6} pose={{mouth: 'flat'}} />)}
    <Glow cx={540} cy={1300} r={360} c="#7AE8FF" o={0.25} />
    <A who="sahadev" x={540} y={1700} s={2.3} pose={{mouth: 'smile', blink: blink(f)}} />
  </Svg>
);
const SA3: React.FC<SP> = ({f}) => (
  <Svg>
    <CosmicBG f={f} c="#2A1A5A" />
    <A who="pandu" x={300} y={1680} s={2.1} o={0.85} pose={{armR: -120, mouth: 'smile', eyes: 'closed'}} />
    <Glow cx={760} cy={1340} r={260} c="#FFE27A" o={0.5} />
    <A who="sahadev" x={760} y={1690} s={2.1} flip pose={{eyes: f > 40 ? 'glow' : 'open', mouth: 'o'}} />
  </Svg>
);
const SA4: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.4, dur * 0.6);
  return (
    <Svg>
      <Sky id="sa4" c={['#05060f', '#141838', '#2A2450']} />
      <A who="sahadev" x={540} y={1700} s={2.3} pose={{eyes: 'sad', mouth: 'flat', armL: 20, armR: -20}} />
      {[0, 1, 2].map((i) => <ellipse key={i} cx={540} cy={1700 - 100 * 2.3 + i * 60} rx={lerp(k, 380, 150)} ry={lerp(k, 120, 45)} fill="none" stroke="#C9A24A" strokeWidth={10} strokeDasharray="30 10" opacity={k} />)}
      <Place x={540} y={1700} s={2.3}><rect x={-44} y={-128} width={88} height={18} rx={6} fill="#C9A24A" opacity={k} /></Place>
    </Svg>
  );
};
const VisionScene: React.FC<SP & {kind: 'dice' | 'spiral' | 'karna'}> = ({f, kind}) => (
  <Svg>
    <CosmicBG f={f} c="#1A1438" />
    <A who="sahadev" x={260} y={1720} s={1.9} pose={{eyes: 'glow', mouth: 'sad'}} />
    <Vision x={700} y={1100} o={p(f, 0, 12)}>
      {kind === 'dice' && <><Dice x={-40} y={0} r={f * 4} s={1.2} /><Dice x={50} y={30} r={-f * 3} /></>}
      {kind === 'spiral' && <Spiral x={0} y={0} f={f} />}
      {kind === 'karna' && <Place x={0} y={120} s={0.85}><A who="karna" x={0} y={0} s={1} pose={{mouth: 'flat'}} /></Place>}
    </Vision>
  </Svg>
);
const SA5: React.FC<SP> = (pp) => <VisionScene {...pp} kind="dice" />;
const SA6: React.FC<SP> = (pp) => <VisionScene {...pp} kind="spiral" />;
const SA7: React.FC<SP> = (pp) => <VisionScene {...pp} kind="karna" />;
const SA8: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#102030" />
    {[180, 360, 720, 900].map((x, i) => <A key={x} who={['bheem', 'arjun', 'karna', 'iravan'][i]} x={x} y={1720} s={1.6} flip={i > 1} pose={{mouth: 'flat', eyes: 'open'}} />)}
    <A who="sahadev" x={540} y={1700} s={2} pose={{eyes: 'sad', mouth: 'flat', blink: blink(f)}} />
  </Svg>
);
const SA9: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="sa9" c={['#0a0614', '#3A1A2A', '#7A3A2A']} />
    <A who="duryodhan" x={300} y={1680} s={2.2} pose={{armR: -90, mouth: 'o', eyes: 'open'}} />
    <A who="sahadev" x={780} y={1680} s={2.1} flip pose={{eyes: 'shock', mouth: 'o'}} />
  </Svg>
);
const SA10: React.FC<SP> = ({f, dur}) => (
  <Svg>
    <Sky id="sa10" c={['#2A0E06', '#C2603A', '#F2B05A']} />
    <g transform={`translate(540 760) rotate(${f * 1.5})`}><circle r={110} fill="#FFD24A" />{Array.from({length: 12}).map((_, i) => <rect key={i} x={-6} y={-170} width={12} height={40} fill="#FFD24A" transform={`rotate(${i * 30})`} />)}</g>
    <A who="duryodhan" x={260} y={1700} s={2} pose={{mouth: f > dur * 0.5 ? 'laugh' : 'o', eyes: 'open'}} />
    <A who="sahadev" x={820} y={1700} s={2} flip pose={{eyes: 'closed', mouth: 'flat', armL: -100}} />
  </Svg>
);
const SA11: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0012} oy={1300}>
    <Sky id="sa11" c={['#05060f', '#141838', '#0a0a14']} />
    <Stars n={70} f={f} seed="sa11" h={1300} />
    <Moon x={800} y={520} />
    <A who="sahadev" x={540} y={1700} s={2.3} pose={{eyes: 'down', mouth: 'flat', legL: -70, legR: 70}} />
  </Svg>
);
const SA12: React.FC<SP> = ({f}) => (
  <Svg>
    <CosmicBG f={f} c="#1A1438" />
    <Versus a="बताता" b="छुपाता" f={f} />
    <A who="sahadev" x={540} y={1720} s={2.2} pose={{eyes: 'glow', mouth: 'flat'}} />
  </Svg>
);
const SAclose: React.FC<SP> = ({f}) => <CloseUp who="sahadev" f={f} id="saclose" c={['#5A1408', '#D0552A', '#F7B24A']} pose={{eyes: 'sad', mouth: 'flat'}} />;
const SAsouth: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0012} oy={1300}>
    <Sky id="sasouth" c={['#1A0A14', '#6A2A3A', '#E0803A']} />
    <path d="M300 1560 L300 980 L380 980 L380 900 L460 900 L460 820 L540 760 L620 820 L620 900 L700 900 L700 980 L780 980 L780 1560Z" fill="#B8862E" />
    <rect y={1560} width={1080} height={360} fill="#2A140A" />
    {[140, 300, 780, 940].map((x, i) => <g key={x} transform={`translate(${x} 1700) scale(1.2)`}><Diya flame={1} t={f + i * 7} /></g>)}
    <A who="sahadev" x={540} y={1690} s={1.9} pose={{eyes: 'closed', mouth: 'smile', armR: -100}} />
  </Svg>
);
export const sahadev: Cfg = {
  id: 'Sahadev', voice: 'sahadev.wav', script: sSa, timings: tSa, pushIn: true,
  hook: 'एक बार बोल देता… तो महाभारत नहीं होता',
  scenes: [[SA1, [0]], [SA2, [1]], [SA3, [2]], [SA4, [3]], [SA5, [4]], [SA6, [5]], [SA7, [6]], [SA8, [7]], [SA9, [8]], [SA10, [9]], [SAclose, [10]], [SAsouth, [11]], [SA12, [12]], [SA1, [13]]],
  titles: [
    null,
    {pill: 'सबसे छोटा पांडव', title: 'सहदेव'},
    {pill: 'लोककथा', title: 'भविष्य दर्शन'},
    {pill: 'एक शर्त', title: 'बिना पूछे नहीं', red: 'नहीं'},
    {pill: 'उसे पता था', title: 'जुआ'}, {pill: 'उसे पता था', title: 'चक्रव्यूह'}, {pill: 'उसे पता था', title: 'कर्ण'},
    {title: 'किसी ने\nनहीं पूछा'},
    {pill: 'सिर्फ़ एक ने', title: 'दुर्योधन'},
    null,
    {pill: 'दुश्मन को भी', title: 'सच', red: 'सच'},
    {pill: 'आज भी', title: 'सहदेव ज्योतिष'},
    {pill: 'आपकी राय', title: 'बताओगे या\nछुपाओगे?'}, {pill: 'कालचित्र', title: 'फॉलो करें'},
  ],
  fx: {1: {label: 'पांडव • सहदेव'}, 2: {label: 'लोककथा'}, 4: {label: 'द्यूत क्रीड़ा'}, 5: {label: 'चक्रव्यूह'}, 6: {label: 'कर्ण • सबसे बड़ा पांडव'}, 9: {quote: 'युद्ध का सबसे शुभ मुहूर्त कौन सा है?'}, 11: {label: 'सहदेव ज्योतिषम् • दक्षिण भारत'}},
  end: {pill: 'कालचित्र', title: 'ऐसी ही\nअनसुनी कथाएँ', sub: 'फॉलो करें @kaalchitra.verse'}, endScene: EndCard,
};

// ================= JARASANDH =================
const JA1: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.45, dur * 0.8);
  return (
    <Svg zoom={1.3 - p(f, 0, 40) * 0.25} oy={1250} shake={f > dur * 0.45 && f < dur * 0.55 ? f : 0}>
      <Sky id="ja1" c={['#120808', '#4A1010', '#A2301A']} />
      <Glow cx={540} cy={1300} r={600} c="#FF3A1A" o={0.3} />
      <Half id="ja1l" side="l" x={540} dx={-k * 160} rot={-k * 12}><A who="jarasandh" x={540} y={1700} s={2.4} pose={{eyes: 'angry', mouth: 'grit', armL: -40, armR: 40}} /></Half>
      <Half id="ja1r" side="r" x={540} dx={k * 160} rot={k * 12}><A who="jarasandh" x={540} y={1700} s={2.4} pose={{eyes: 'angry', mouth: 'grit', armL: -40, armR: 40}} /></Half>
      <Glow cx={540} cy={1350} r={200 * k} c="#FFE27A" o={0.6 * k} />
    </Svg>
  );
};
const JA2: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#2A1A08" />
    <A who="shalva" x={360} y={1680} s={2.1} pose={{eyes: 'sad', mouth: 'sad', blink: blink(f)}} />
    {[0, 1].map((i) => <A key={i} who="queen" x={700 + i * 190} y={1700} s={1.8} flip pose={{eyes: 'sad', mouth: 'flat', blink: blink(f, i * 20)}} />)}
  </Svg>
);
const JA3: React.FC<SP> = ({f, dur}) => {
  const L = [0, Math.round(dur * 0.45)];
  const split = f >= L[1];
  const k = p(f, L[1], L[1] + 25);
  return (
    <Svg>
      <ForestBG f={f} />
      {!split ? <>
        <A who="brahmin" x={300} y={1680} s={2.1} pose={{armR: -90, mouth: 'smile'}} />
        <A who="shalva" x={760} y={1680} s={2.1} flip pose={{armL: -90, mouth: 'smile', eyes: 'open'}} />
        <g transform="translate(540 1330)"><Glow cx={0} cy={0} r={120} c="#FFE27A" o={0.6} /><circle r={45} fill="#E8A030" /><path d="M0 -45 q12 -26 30 -20" stroke="#3A8A2A" strokeWidth={8} fill="none" /></g>
      </> : <>
        <PalaceBG tint="#2A1A08" />
        {[0, 1].map((i) => <A key={i} who="queen" x={280 + i * 520} y={1700} s={2} flip={i === 1} pose={{mouth: 'smile', armR: -60, armL: -60}} />)}
        <Half id="ja3l" side="l" x={540} dx={-k * 240}><circle cx={540} cy={1330} r={45} fill="#E8A030" /></Half>
        <Half id="ja3r" side="r" x={540} dx={k * 240}><circle cx={540} cy={1330} r={45} fill="#E8A030" /></Half>
      </>}
    </Svg>
  );
};
const JA4: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#1A0A08" />
    <A who="queen" x={200} y={1700} s={1.9} pose={{eyes: 'shock', mouth: 'o', armR: -150}} />
    <A who="queen" x={880} y={1700} s={1.9} flip pose={{eyes: 'shock', mouth: 'o', armL: -150}} />
    <Half id="ja4l" side="l" x={540} dx={-90}><Baby x={540} y={1450} s={1.5} /></Half>
    <Half id="ja4r" side="r" x={540} dx={90}><Baby x={540} y={1450} s={1.5} /></Half>
  </Svg>
);
const JA5: React.FC<SP> = ({f}) => (
  <Svg>
    <ForestBG f={f} night />
    <Moon x={820} y={520} />
    <Half id="ja5l" side="l" x={540} dx={-110}><Baby x={540} y={1650} s={1.3} /></Half>
    <Half id="ja5r" side="r" x={540} dx={110}><Baby x={540} y={1650} s={1.3} /></Half>
  </Svg>
);
const JA6: React.FC<SP> = ({f, dur}) => {
  const L = [0, Math.round(dur * 0.45)];
  const k = p(f, 15, L[1] || 60);
  const cry = k >= 1;
  return (
    <Svg>
      <ForestBG f={f} night />
      <Moon x={820} y={520} />
      <A who="hidimba" x={300} y={1680} s={2.2} pose={{armR: -60, armL: -40, eyes: cry ? 'shock' : 'open', mouth: cry ? 'o' : 'grit'}} />
      <Half id="ja6l" side="l" x={680} dx={-110 * (1 - k)}><Baby x={680} y={1650} s={1.3} cry={cry} /></Half>
      <Half id="ja6r" side="r" x={680} dx={110 * (1 - k)}><Baby x={680} y={1650} s={1.3} cry={cry} /></Half>
      {cry && <Glow cx={680} cy={1600} r={260} c="#FFE27A" o={0.5} />}
      <Flash t={p(f, (L[1] || 60) - 4, (L[1] || 60) + 8)} c="#FFF3C0" />
    </Svg>
  );
};
const JA7: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#2A1A08" />
    <Rays f={f} cx={540} cy={1000} op={0.2} />
    <A who="jarasandh" x={540} y={1720} s={2.6} pose={{eyes: 'angry', mouth: 'grit', armL: -40, armR: 40, blink: blink(f)}} />
  </Svg>
);
const JA8: React.FC<SP> = ({f, dur}) => {
  const t = p(f, dur * 0.3, dur);
  return (
    <Svg>
      <Sky id="ja8" c={['#2A0E06', '#8A3A14', '#F2A04A']} />
      <Hills c="#3A1A10" y={1640} />
      <A who="jarasandh" x={300} y={1720} s={2.6} prop="mace" pose={{eyes: 'angry', mouth: 'laugh', armR: -120}} />
      <A who="krishna" x={lerp(t, 820, 1150)} y={1700} s={1.8} pose={{legL: Math.sin(f / 6) * 14, legR: -Math.sin(f / 6) * 14, mouth: 'flat'}} />
    </Svg>
  );
};
const JA9: React.FC<SP> = ({f}) => (
  <Svg shake={f % 14 < 2 ? f : 0}>
    <Sky id="ja9" c={['#2A0E06', '#8A3A14', '#F2A04A']} />
    <rect y={1600} width={1080} height={320} fill="#6A4A2A" />
    <A who="bheem" x={400 + Math.sin(f / 5) * 30} y={1720} s={2.2} pose={{armL: -60 + Math.sin(f / 4) * 30, armR: 60, eyes: 'angry', mouth: 'grit'}} />
    <A who="jarasandh" x={700 - Math.sin(f / 5) * 30} y={1720} s={2.2} flip pose={{armL: -60, armR: 60 + Math.sin(f / 4) * 30, eyes: 'angry', mouth: 'grit'}} />
  </Svg>
);
const JA10: React.FC<SP> = ({f}) => {
  const c = (f % 50) / 50;
  const open = Math.sin(c * Math.PI);
  return (
    <Svg>
      <Sky id="ja10" c={['#2A0E06', '#8A3A14', '#F2A04A']} />
      <rect y={1600} width={1080} height={320} fill="#6A4A2A" />
      <A who="bheem" x={220} y={1720} s={2} pose={{armR: -90, eyes: 'shock', mouth: 'o'}} />
      <Half id="ja10l" side="l" x={680} dx={-open * 140} rot={-open * 10}><A who="jarasandh" x={680} y={1720} s={2.2} flip pose={{eyes: 'angry', mouth: 'laugh'}} /></Half>
      <Half id="ja10r" side="r" x={680} dx={open * 140} rot={open * 10}><A who="jarasandh" x={680} y={1720} s={2.2} flip pose={{eyes: 'angry', mouth: 'laugh'}} /></Half>
      <Glow cx={680} cy={1400} r={220 * (1 - open)} c="#FFE27A" o={0.5 * (1 - open)} />
    </Svg>
  );
};
const JA11: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.35, dur * 0.7);
  return (
    <Svg zoom={1.2} oy={1400}>
      <Sky id="ja11" c={['#2A0E06', '#8A3A14', '#F2A04A']} />
      <A who="krishna" x={540} y={1720} s={2.3} pose={{armR: -110, armL: -110, eyes: 'open', mouth: 'smile'}} />
      <g transform={`translate(${540 - k * 220} ${1300 - k * 80}) rotate(${-30 - k * 60})`}><rect x={-4} y={-90} width={8} height={90} fill="#E8C060" /></g>
      <g transform={`translate(${540 + k * 220} ${1300 - k * 80}) rotate(${30 + k * 60})`}><rect x={-4} y={-90} width={8} height={90} fill="#E8C060" /></g>
    </Svg>
  );
};
const JA12: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.3, dur * 0.65);
  return (
    <Svg>
      <Sky id="ja12" c={['#2A0E06', '#8A3A14', '#F2A04A']} />
      <rect y={1600} width={1080} height={320} fill="#6A4A2A" />
      <A who="bheem" x={300} y={1720} s={2.2} pose={{armL: -150, armR: 150, eyes: 'angry', mouth: 'laugh'}} />
      <Half id="ja12l" side="l" x={760} dx={-k * 200} dy={-k * 300} rot={-k * 90}><A who="jarasandh" x={760} y={1720} s={2} flip o={1 - k * 0.6} pose={{eyes: 'closed', mouth: 'o'}} /></Half>
      <Half id="ja12r" side="r" x={760} dx={k * 500} dy={-k * 300} rot={k * 90}><A who="jarasandh" x={760} y={1720} s={2} flip o={1 - k * 0.6} pose={{eyes: 'closed', mouth: 'o'}} /></Half>
    </Svg>
  );
};
const JA13: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ja13" c={['#0a0608', '#3A1418', '#0a0608']} />
    <Versus a="ताकत" b="बुद्धि" f={f} />
    <A who="bheem" x={260} y={1700} s={2.1} prop="mace" pose={{eyes: 'open', mouth: 'grit'}} />
    <A who="krishna" x={820} y={1700} s={2} flip pose={{mouth: 'smile', blink: blink(f)}} />
  </Svg>
);
const JAsrc: React.FC<SP> = ({f}) => <Scroll f={f} id="jasrc" />;
const JAclose: React.FC<SP> = ({f}) => <CloseUp who="jarasandh" f={f} id="jaclose" c={['#5A0A08', '#C2301A', '#F2903A']} pose={{eyes: 'angry', mouth: 'grit'}} />;
const JArajgir: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0012} oy={1300}>
    <Sky id="jaraj" c={['#3A2A1A', '#C2803A', '#F2D08A']} />
    <Hills c="#7A6A4A" y={1450} />
    <ellipse cx={540} cy={1640} rx={420} ry={110} fill="#B8905A" stroke="#6A4A2A" strokeWidth={10} />
    <ellipse cx={540} cy={1640} rx={320} ry={80} fill="#C8A06A" />
    {[-1, 1].map((d) => <path key={d} d={`M${540 + d * 160} 1640 l${d * 30} -90 l${d * 50} 70`} stroke="#5A3A1A" strokeWidth={6} fill="none" />)}
    {[120, 960].map((x, i) => <g key={x} transform={`translate(${x} 1760) scale(1.2)`}><Diya flame={1} t={f + i * 9} /></g>)}
  </Svg>
);
export const jarasandh: Cfg = {
  id: 'Jarasandh', voice: 'jarasandh.wav', script: sJa, timings: tJa, pushIn: true,
  hook: 'दो टुकड़ों में जन्म… दो टुकड़ों में अंत',
  scenes: [[JA1, [0]], [JAsrc, [1]], [JA2, [2]], [JA3, [3]], [JA4, [4]], [JA5, [5]], [JA6, [6]], [JAclose, [7]], [JA8, [8]], [JA9, [9]], [JA10, [10]], [JA11, [11]], [JA12, [12]], [JArajgir, [13]], [JA13, [14]], [JA1, [15]]],
  titles: [
    null,
    {pill: 'महाभारत', title: 'सभा पर्व'},
    {pill: 'मगध के राजा', title: 'निःसंतान'},
    {pill: 'एक फल', title: 'दो रानियाँ'},
    {pill: 'आधा-आधा', title: 'बच्चा', red: 'बच्चा'},
    {title: 'फेंक दिया'},
    {pill: 'राक्षसी', title: 'जरा'},
    {pill: 'जरा का जोड़ा', title: 'जरासंध'},
    {pill: 'कृष्ण भी', title: 'मथुरा छोड़ी'},
    {title: 'कुश्ती'},
    {pill: 'फिर से', title: 'जुड़ गया', red: 'जुड़'},
    {pill: 'कृष्ण का', title: 'तिनका'},
    {pill: 'उलटी दिशा', title: 'अंत'},
    {pill: 'आज भी', title: 'राजगीर'},
    {pill: 'आपकी राय', title: 'ताकत या\nबुद्धि?'}, {pill: 'कालचित्र', title: 'फॉलो करें'},
  ],
  fx: {1: {label: 'महाभारत • सभा पर्व'}, 2: {label: 'राजा बृहद्रथ'}, 6: {label: 'राक्षसी जरा'}, 8: {label: 'मथुरा → द्वारका'}, 9: {num: '13 दिन'}, 11: {label: 'कृष्ण का इशारा'}, 13: {label: 'जरासंध का अखाड़ा • राजगीर, बिहार'}},
  end: {pill: 'कालचित्र', title: 'ऐसी ही\nअनसुनी कथाएँ', sub: 'फॉलो करें @kaalchitra.verse'}, endScene: EndCard,
};

// ================= URMILA =================
const Camp: React.FC<{f: number}> = ({f}) => (
  <g>
    <Sky id="camp" c={['#05060f', '#141838', '#22284A']} />
    <Stars n={70} f={f} seed="camp" h={1200} />
    <Moon x={830} y={480} />
    <rect y={1600} width={1080} height={320} fill="#10140c" />
    <FireAltar f={f} x={300} y={1760} s={0.55} />
  </g>
);
const UR1: React.FC<SP> = ({f, dur}) => {
  const k = p(f, 0, dur);
  return (
    <Svg zoom={1.25 - p(f, 0, 40) * 0.2} oy={1300}>
      <line x1={540} y1={0} x2={540} y2={1920} stroke="#F0C25A" strokeWidth={4} />
      <g><rect width={540} height={1920} fill="#0a0e1a" /><Moon x={300} y={520} r={50} /><A who="lakshman" x={270} y={1700} s={1.9} prop="bow" pose={{eyes: 'open', mouth: 'flat', blink: false}} /></g>
      <g><rect x={540} width={540} height={1920} fill="#2A1430" /><Bed x={810} y={1640} s={0.9} /><g transform="translate(760 1600)"><A who="urmila" x={0} y={0} s={1.5} rot={-90} pose={{eyes: 'closed', mouth: 'smile'}} /></g><Zzz f={f} x={700} y={1450} /></g>
      <text x={540} y={1060} textAnchor="middle" fontFamily={DEVF} fontSize={110} fill="#F4EFE4">{`${Math.round(k * 14)} साल`}</text>
    </Svg>
  );
};
const UR2: React.FC<SP> = ({f}) => (
  <Svg>
    <Camp f={f} />
    <g transform="translate(720 1640)"><A who="ram" x={0} y={0} s={1.3} rot={-90} pose={{eyes: 'closed', mouth: 'smile'}} /></g>
    <g transform="translate(900 1660)"><A who="sita" x={0} y={0} s={1.2} rot={-90} pose={{eyes: 'closed', mouth: 'smile'}} /></g>
    <A who="lakshman" x={480} y={1700} s={2} prop="bow" pose={{eyes: 'open', mouth: 'flat', blink: blink(f)}} />
  </Svg>
);
const UR3: React.FC<SP> = ({f}) => {
  const k = p(f, 5, 30);
  return (
    <Svg>
      <Camp f={f} />
      <Glow cx={760} cy={1250} r={420 * k} c="#9A9AFF" o={0.5} />
      <A who="nidra" x={760} y={1660} s={2.2} flip o={k} pose={{mouth: 'smile', eyes: 'closed', armL: -80}} />
      <A who="lakshman" x={300} y={1700} s={2} prop="bow" pose={{eyes: 'shock', mouth: 'o'}} />
    </Svg>
  );
};
const UR4: React.FC<SP> = ({f}) => (
  <Svg>
    <Camp f={f} />
    <Glow cx={760} cy={1250} r={420} c="#9A9AFF" o={0.4} />
    <A who="nidra" x={760} y={1660} s={2.2} flip pose={{mouth: 'flat', blink: blink(f)}} />
    <A who="lakshman" x={300} y={1700} s={2.1} pose={{armR: -110, eyes: 'open', mouth: 'o'}} />
  </Svg>
);
const UR5: React.FC<SP> = ({f}) => (
  <Svg>
    <Camp f={f} />
    <Glow cx={760} cy={1250} r={420} c="#9A9AFF" o={0.4} />
    <A who="nidra" x={760} y={1660} s={2.2} flip pose={{mouth: 'o', armL: -110, eyes: 'open'}} />
    <A who="lakshman" x={300} y={1700} s={2.1} pose={{eyes: 'sad', mouth: 'flat'}} />
    <Q y={1080} />
  </Svg>
);
const UR6: React.FC<SP> = ({f}) => (
  <Svg>
    <Camp f={f} />
    <A who="lakshman" x={300} y={1700} s={2.1} pose={{armR: -140, eyes: 'open', mouth: 'o'}} />
    <circle cx={780} cy={880} r={220} fill="#2A1430" stroke="#F0C25A" strokeWidth={6} />
    <Place x={780} y={1040} s={0.9}><A who="urmila" x={0} y={0} s={1} pose={{mouth: 'smile', blink: blink(f)}} /></Place>
  </Svg>
);
const UR7: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#2A1430" />
    <Glow cx={540} cy={1250} r={400} c="#9A9AFF" o={0.35} />
    <A who="nidra" x={820} y={1680} s={1.9} flip o={0.85} pose={{mouth: 'smile', armL: -80}} />
    <A who="urmila" x={420} y={1690} s={2.3} pose={{mouth: 'smile', eyes: 'closed', armR: -50}} />
  </Svg>
);
const UR8: React.FC<SP> = ({f, dur}) => {
  const cyc = f / 12;
  const day = Math.sin(cyc) > 0;
  return (
    <Svg>
      <line x1={540} y1={0} x2={540} y2={1920} stroke="#F0C25A" strokeWidth={4} />
      <g><rect width={540} height={1920} fill={day ? '#3A5A3A' : '#0a0e1a'} /><circle cx={270 + Math.cos(cyc) * 200} cy={600 - Math.abs(Math.sin(cyc)) * 200} r={45} fill={day ? '#FFE27A' : '#F3EAD0'} /><A who="lakshman" x={270} y={1700} s={1.9} prop="bow" pose={{eyes: 'open', mouth: 'flat', blink: false}} /></g>
      <g><rect x={540} width={540} height={1920} fill="#2A1430" /><Bed x={810} y={1640} s={0.9} /><g transform="translate(760 1600)"><A who="urmila" x={0} y={0} s={1.5} rot={-90} pose={{eyes: 'closed', mouth: 'smile'}} /></g><Zzz f={f} x={700} y={1450} /></g>
      <text x={540} y={1060} textAnchor="middle" fontFamily={DEVF} fontSize={110} fill="#F4EFE4">{`${Math.min(14, Math.round(p(f, 0, dur) * 14))} साल`}</text>
    </Svg>
  );
};
const UR9: React.FC<SP> = ({f, dur}) => {
  const t = p(f, dur * 0.3, dur * 0.7);
  return (
    <Svg>
      <BattleBG f={f} />
      <A who="lakshman" x={220} y={1680} s={2} prop="bow" pose={{armR: -90, armL: -80, eyes: 'angry', mouth: 'grit'}} />
      <Arrow x={lerp(t, 360, 720)} y={1270} rot={0} glow="#9AE8FF" />
      <A who="meghnad" x={820} y={1690} s={2.2} flip rot={lerp(p(f, dur * 0.7, dur), 0, 40)} pose={{eyes: t >= 1 ? 'closed' : 'angry', mouth: 'grit'}} />
      <Flash t={p(f, dur * 0.68, dur * 0.78)} c="#E9F8FF" />
    </Svg>
  );
};
const UR10: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ur10" c={['#0a0608', '#3A1418', '#7A2A1A']} />
    <A who="meghnad" x={540} y={1720} s={2.5} pose={{eyes: 'angry', mouth: 'laugh', armL: -40, armR: 40}} />
    <Glow cx={540} cy={900} r={200} c="#9A9AFF" o={0.4} />
    <text x={540} y={940} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={110} fill="#E9F0FF">Zz ✕</text>
  </Svg>
);
const UR11: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0012} oy={1300}>
    <PalaceBG tint="#2A1430" />
    <Glow cx={540} cy={1250} r={420} c="#FFD27A" o={0.3} />
    <A who="urmila" x={540} y={1700} s={2.4} pose={{eyes: 'down', mouth: 'flat', blink: blink(f)}} />
  </Svg>
);
const UR12: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ur12" c={['#0a0608', '#2A1438', '#0a0608']} />
    <Versus a="लक्ष्मण" b="उर्मिला" f={f} />
    <A who="lakshman" x={260} y={1700} s={2} prop="bow" pose={{eyes: 'open', mouth: 'flat'}} />
    <A who="urmila" x={820} y={1700} s={2} flip pose={{mouth: 'smile', blink: blink(f)}} />
  </Svg>
);
const URsrc: React.FC<SP> = ({f}) => <Scroll f={f} id="ursrc" />;
const URclose: React.FC<SP> = ({f}) => (
  <CloseUp who="urmila" f={f} id="urclose" c={['#3A1050', '#A23A8A', '#F29AC0']} pose={{eyes: 'closed', mouth: 'smile'}}>
    {[160, 920].map((x, i) => <g key={x} transform={`translate(${x} 1700) scale(1.3)`}><Diya flame={1} t={f + i * 9} /></g>)}
  </CloseUp>
);
export const urmila: Cfg = {
  id: 'Urmila', voice: 'urmila.wav', script: sUr, timings: tUr, pushIn: true,
  hook: '14 साल लक्ष्मण एक पल नहीं सोए',
  scenes: [[UR1, [0]], [UR2, [1]], [UR3, [2]], [UR4, [3]], [UR5, [4]], [UR6, [5]], [UR7, [6]], [UR8, [7]], [UR9, [8]], [UR10, [9]], [URsrc, [10]], [URclose, [11]], [UR12, [12]], [UR1, [13]]],
  titles: [
    null,
    {pill: 'वनवास की', title: 'पहली रात'},
    {pill: 'प्रकट हुईं', title: 'निद्रा देवी'},
    null, null,
    {pill: 'अयोध्या में', title: 'उर्मिला', red: 'उर्मिला'},
    {pill: 'मुस्कुराकर', title: 'हाँ'},
    {pill: 'चौदह साल', title: 'नींद'},
    {pill: 'इसीलिए मरा', title: 'मेघनाद'},
    {pill: 'सिर्फ़ वही', title: 'जो न सोया'},
    {pill: 'स्रोत', title: 'लोक रामायण'},
    {pill: 'याद रखिए', title: 'उर्मिला का त्याग'},
    {pill: 'आपकी राय', title: 'बड़ा त्याग\nकिसका?'}, {pill: 'कालचित्र', title: 'फॉलो करें'},
  ],
  fx: {1: {label: 'वनवास की पहली रात'}, 3: {quote: 'मुझे चौदह साल नींद मत देना'}, 4: {quote: 'ये नींद किसी और को लेनी होगी'}, 5: {label: 'अयोध्या • उर्मिला'}, 7: {num: '14 साल'}, 9: {label: 'मेघनाद का वरदान'}, 10: {label: 'वाल्मीकि नहीं • लोक रामायण'}},
  end: {pill: 'कालचित्र', title: 'ऐसी ही\nअनसुनी कथाएँ', sub: 'फॉलो करें @kaalchitra.verse'}, endScene: EndCard,
};
