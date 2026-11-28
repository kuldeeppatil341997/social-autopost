import React from 'react';
import script from '../../videos/shani/script.json';
import timings from '../../videos/shani/timings.json';
import {A, blink, bob, CosmicBG, EndCard, Flash, Glow, lerp, p, Peaks, Place, Rays, Sky, Stars, Svg} from '../kit';
import {BabyHuman} from '../people';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

const SH = 'shani';
const Crow: React.FC<{f: number}> = ({f}) => (
  <g><ellipse cx={0} cy={0} rx={34} ry={22} fill="#141420" /><circle cx={-30} cy={-14} r={15} fill="#141420" /><path d="M-44 -14 l-16 4 l16 4z" fill="#3a3a48" /><circle cx={-32} cy={-17} r={3} fill="#E9E3F7" /><path d={`M10 -6 q30 ${-20 + Math.sin(f / 3) * 14} 50 0`} stroke="#141420" strokeWidth={12} fill="none" /></g>
);
const Kailash: React.FC<{f: number; dark?: number}> = ({f, dark = 0}) => (
  <g>
    <Sky id="sk" c={['#2A3A6A', '#7A9AC8', '#DCE6F0']} />
    <Peaks y={1250} />
    <Stars n={20} f={f} seed="kl" h={700} />
    {dark > 0 && <rect width={1080} height={1920} fill="#05060f" opacity={dark * 0.75} />}
  </g>
);

const S1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <CosmicBG f={f} c="#1A1E3A" />
    <Glow cx={540} cy={1100} r={460} c="#6B7BB8" o={0.4} />
    <A who={SH} x={540} y={1620} s={2.6} prop="sword" pose={{eyes: f % 50 < 25 ? 'down' : 'open', mouth: 'flat'}} />
    <Glow cx={540} cy={1000} r={140} c="#C9A3FF" o={0.4 + Math.sin(f / 5) * 0.2} />
  </Svg>
);
const S2: React.FC<SP> = ({f}) => (
  <Svg>
    <CosmicBG f={f} c="#141A33" />
    <A who={SH} x={540} y={1620} s={2.5} prop="sword" pose={{eyes: 'down', mouth: 'flat', head: 12}} />
    <Place x={820} y={1000 + bob(f, 10)} s={1.6}><Crow f={f} /></Place>
  </Svg>
);
const S3: React.FC<SP> = ({f, L}) => {
  const curse = f >= L[1];
  return (
    <Svg shake={curse && f < L[1] + 6 ? f : 0}>
      <Sky id="s3" c={['#0e0618', '#3A1E5A', '#0e0618']} />
      <A who="shaniwife" x={330} y={1640} s={2.3} pose={{armR: curse ? -120 : -20, eyes: 'angry', mouth: curse ? 'grit' : 'flat'}} />
      <A who={SH} x={800} y={1640} s={2.3} flip pose={{eyes: curse ? 'down' : 'closed', mouth: 'flat', head: curse ? 14 : 0}} />
      {curse && Array.from({length: 8}).map((_, i) => <circle key={i} cx={lerp(((f - L[1]) % 30) / 30, 420, 760) + i * 8} cy={1100 + Math.sin(i + f / 4) * 60} r={10} fill="#C9A3FF" opacity={0.7} />)}
      {curse && <Glow cx={800} cy={1080} r={260} c="#9B5CFF" o={0.4} />}
    </Svg>
  );
};
const S4: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <Kailash f={f} />
    <Rays f={f} cx={540} cy={1150} op={0.15} />
    <A who="parvati" x={540} y={1640} s={2.4} pose={{armL: -60, armR: 60, mouth: 'smile', blink: blink(f)}} />
    <Place x={540} y={1560} s={1.1}><BabyHuman eyes={(f % 80) < 40 ? 'closed' : 'open'} /></Place>
  </Svg>
);
const S5: React.FC<SP> = ({f, L}) => {
  const bowed = f >= L[1];
  return (
    <Svg>
      <Kailash f={f} />
      <A who="vishnu" x={160} y={1640} s={1.7} pose={{mouth: 'smile', blink: blink(f, 8)}} />
      <A who="shiv" x={360} y={1640} s={1.8} prop="trishul" pose={{mouth: 'smile', blink: blink(f, 30)}} />
      <A who="parvati" x={600} y={1640} s={1.9} pose={{armL: -60, armR: 60, mouth: 'smile'}} />
      <Place x={600} y={1540} s={0.8}><BabyHuman /></Place>
      <A who={SH} x={900} y={1640} s={1.9} flip pose={{eyes: 'down', mouth: 'flat', head: bowed ? 18 : 6}} prop="sword" />
    </Svg>
  );
};
const S6: React.FC<SP> = ({f, L}) => {
  const refuse = f >= L[1];
  return (
    <Svg>
      <Kailash f={f} />
      <A who="parvati" x={330} y={1640} s={2.2} pose={{armL: -60, armR: refuse ? -110 : 60, mouth: refuse ? 'flat' : 'smile', eyes: refuse ? 'angry' : 'open'}} />
      {!refuse && <Place x={330} y={1560} s={0.95}><BabyHuman /></Place>}
      <A who={SH} x={800} y={1640} s={2.2} flip prop="sword" pose={{eyes: 'down', mouth: 'flat', head: refuse ? Math.sin(f / 4) * 14 : 10}} />
    </Svg>
  );
};
const S7: React.FC<SP> = ({f, L}) => {
  const look = p(f, 10, 30);
  const gone = f >= L[1];
  const fl = p(f, L[1], L[1] + 14);
  return (
    <Svg zoom={gone ? 1 : 1 + look * 0.5} ox={760} oy={1100} shake={gone && f < L[1] + 10 ? f : 0}>
      <Kailash f={f} dark={gone ? 0.6 : 0} />
      <A who="parvati" x={300} y={1640} s={2.2} pose={{armL: -60, armR: 60, eyes: gone ? 'shock' : 'open', mouth: gone ? 'o' : 'flat'}} />
      <Place x={300} y={1510} s={1.2}><g opacity={gone ? 0 : 1}><BabyHuman /></g>{gone && <ellipse cx={0} cy={-40} rx={70} ry={46} fill="#F4EFE4" />}</Place>
      <A who={SH} x={800} y={1640} s={2.2} flip prop="sword" pose={{eyes: look > 0.5 ? 'open' : 'down', mouth: gone ? 'o' : 'flat', head: lerp(look, 10, 0)}} />
      {look > 0.5 && !gone && <Glow cx={780} cy={1090} r={160} c="#C9A3FF" o={0.6} />}
      <Flash t={fl} c="#E9E3F7" />
    </Svg>
  );
};
const S8: React.FC<SP> = ({f}) => (
  <Svg shake={f % 24 < 3 ? f : 0}>
    <Kailash f={f} dark={0.8} />
    {f % 24 < 4 && <path d="M600 300 L520 700 L600 700 L480 1100" stroke="#E9F6FF" strokeWidth={10} fill="none" />}
    <A who="shiv" x={330} y={1640} s={2.1} prop="trishul" pose={{eyes: 'angry', mouth: 'grit'}} />
    <A who="parvati" x={760} y={1640} s={2.1} flip pose={{eyes: 'sad', mouth: 'sad', head: 14}} />
  </Svg>
);
const S9: React.FC<SP> = ({f, L}) => {
  const come = p(f, 0, 30);
  const alive = f >= L[1];
  return (
    <Svg>
      <Kailash f={f} dark={alive ? 0 : 0.4} />
      <Rays f={f} cx={540} cy={1000} op={alive ? 0.3 : 0.12} />
      <A who="vishnu" x={lerp(come, 1200, 780)} y={1600} s={2.1} flip pose={{armR: -60, mouth: 'smile', blink: blink(f)}} />
      <A who="parvati" x={300} y={1640} s={2.1} pose={{armL: -60, armR: 60, eyes: alive ? 'open' : 'sad', mouth: alive ? 'smile' : 'sad'}} />
      <Place x={300} y={1510} s={1.2}><BabyHuman elephant eyes={alive ? 'open' : 'closed'} /></Place>
      {alive && <Glow cx={300} cy={1440} r={260} c="#FFE27A" o={0.6} />}
      <Flash t={p(f, L[1] - 4, L[1] + 10)} c="#FFF2C0" />
    </Svg>
  );
};
const S10: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <Sky id="s10" c={['#2A0E06', '#B8602A', '#F2C27A']} />
    <Rays f={f} cx={540} cy={1100} op={0.28} />
    <Glow cx={540} cy={1150} r={520} c="#FFE3A0" o={0.5} />
    <A who="parvati" x={540} y={1640} s={2.4} pose={{armL: -60, armR: 60, mouth: 'smile', blink: blink(f)}} />
    <Place x={540} y={1500} s={1.45}><BabyHuman elephant eyes={(f % 90) < 4 ? 'closed' : 'open'} /></Place>
    <A who={SH} x={900} y={1660} s={1.5} flip pose={{eyes: 'down', mouth: 'smile', head: 10}} o={0.7} />
  </Svg>
);

export const shani: Cfg = {
  id: 'Shani', voice: 'shani.wav', script, timings,
  scenes: [[S1, [0]], [S2, [1]], [S3, [2, 3]], [S4, [4]], [S5, [5, 6]], [S6, [7, 8]], [S7, [9, 10]], [S8, [11]], [S9, [12, 13]], [S10, [14]]],
  titles: [
    {pill: 'EK NAZAR', title: 'GANESH KA\nSIR.', red: 'SIR.'},
    {pill: 'NAZREIN NEECHE', title: 'SHANI DEV.'},
    {pill: 'PATNI KA', title: 'SHRAAP.', red: 'SHRAAP'}, null,
    {pill: 'KAILASH PAR', title: 'NANHA BAALAK.'},
    {pill: 'DARSHAN KO AAYE', title: 'DEVTA.'}, {pill: 'SIR JHUKAAYE', title: 'SHANI.'},
    {pill: 'MAA KI ZID', title: 'DEKHO!'}, {title: 'INKAAR.'},
    {pill: 'SIRF', title: 'EK PAL.'}, {title: 'ANARTH.', red: 'ANARTH'},
    {pill: 'KAILASH MEIN', title: 'HAAHAAKAAR.'},
    {pill: 'VISHNU LAAYE', title: 'GAJ MUKH.'}, {pill: 'JEEVIT HUE', title: 'GANESH.'},
    {title: 'NIYATI.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'SHANI KI\nNAZAR.', sub: 'Gajaanan ki kahani'}, endScene: EndCard,
};
