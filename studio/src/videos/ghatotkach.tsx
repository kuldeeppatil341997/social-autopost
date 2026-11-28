import React from 'react';
import script from '../../videos/ghatotkach/script.json';
import timings from '../../videos/ghatotkach/timings.json';
import {A, BattleBG, blink, bob, CosmicBG, EndCard, Flash, ForestBG, Glow, lerp, p, Place, Rays, Sky, Stars, Svg} from '../kit';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

const G = 'ghatotkach';
const Moon: React.FC = () => <g><circle cx={840} cy={720} r={80} fill="#F3EAD0" /><Glow cx={840} cy={720} r={220} c="#F3EAD0" o={0.3} /></g>;
const Spear: React.FC<{x: number; y: number; rot: number; o?: number}> = ({x, y, rot, o = 1}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}><ellipse cx={-60} cy={0} rx={160} ry={22} fill="#9FD8FF" opacity={0.35} /><rect x={-140} y={-5} width={180} height={10} fill="#F0C25A" /><path d="M40 -18 L90 0 L40 18Z" fill="#E9F6FF" /><circle cx={40} cy={0} r={10} fill="#5AD1FF" /></g>
);

const S1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <BattleBG f={f} night />
    <Moon />
    <A who={G} x={540} y={1500} s={4.2} o={0.9} pose={{armL: 30, armR: -30, mouth: 'grit', head: bob(f, 2, 20)}} />
    <A who="krishna" x={540} y={1720} s={1.6} prop="flute" pose={{mouth: 'smile', blink: blink(f)}} />
  </Svg>
);
const S2: React.FC<SP> = ({f}) => (
  <Svg>
    <ForestBG f={f} night />
    <A who="bheem" x={250} y={1640} s={2.2} prop="mace" pose={{mouth: 'smile', blink: blink(f, 10)}} />
    <A who="hidimba" x={830} y={1640} s={2.1} flip pose={{mouth: 'smile', blink: blink(f, 50)}} />
    <A who={G} x={540} y={1660} s={1.7} pose={{armL: 60, armR: -60, mouth: 'laugh', blink: blink(f)}} />
  </Svg>
);
const S3: React.FC<SP> = ({f}) => {
  const grow = p(f, 0, 40);
  return (
    <Svg>
      <Sky id="g3" c={['#0b0a1e', '#2A2A5A', '#5A3A6A']} />
      <Stars n={60} f={f} seed="g3" />
      {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={((i * 330 - f * 6) % 1400 + 1400) % 1400 - 160} cy={900 + i * 220} rx={220} ry={50} fill="#C9C3E0" opacity={0.25} />)}
      <A who={G} x={540} y={lerp(grow, 1700, 1300) + bob(f, 20, 12)} s={lerp(grow, 1.6, 3.3)} pose={{armL: 120, armR: -120, legL: 20, legR: -20, mouth: 'laugh'}} />
    </Svg>
  );
};
const S4: React.FC<SP> = ({f, L}) => (
  <Svg zoom={1 + f * 0.0006}>
    <BattleBG f={f} night />
    <Moon />
    {f >= L[1] && <A who={G} x={540} y={1560} s={3} pose={{mouth: 'grit', eyes: 'open', armL: 40, armR: -40}} o={p(f, L[1], L[1] + 20)} />}
  </Svg>
);
const S5: React.FC<SP> = ({f}) => (
  <Svg shake={f % 10 < 2 ? f : 0}>
    <BattleBG f={f} night />
    <A who={G} x={540} y={1580} s={3.4} pose={{armL: 60 + Math.sin(f / 4) * 60, armR: -60 - Math.cos(f / 4) * 60, mouth: 'grit', legL: Math.sin(f / 5) * 10}} />
    {Array.from({length: 6}).map((_, i) => { const t = ((f + i * 12) % 50) / 50; return <A key={i} who="soldier" x={540 + (i % 2 ? 1 : -1) * (150 + t * 500)} y={1500 - Math.sin(t * Math.PI) * 600} s={1} rot={t * 360 * (i % 2 ? 1 : -1)} o={1 - t * 0.5} />; })}
  </Svg>
);
const S6: React.FC<SP> = ({f, L}) => (
  <Svg>
    <BattleBG f={f} night />
    <Glow cx={540} cy={1100} r={500} c="#7A1626" o={0.4} />
    <A who="duryodhan" x={330} y={1640} s={2.3} prop="mace" pose={{eyes: 'shock', mouth: 'o', armL: 40 + bob(f, 8, 3)}} />
    <A who="karna" x={780} y={1640} s={2.3} flip prop="bow" pose={{mouth: 'flat', blink: blink(f), eyes: f > (L[0] ?? 0) + 30 ? 'angry' : 'open'}} />
  </Svg>
);
const S7: React.FC<SP> = ({f, L}) => {
  const ghost = f >= L[1];
  return (
    <Svg zoom={1 + f * 0.0006}>
      <CosmicBG f={f} c="#1A2A5A" />
      <Rays f={f} color="#9FD8FF" cx={540} cy={800} op={0.2} />
      {ghost && <A who="arjun" x={800} y={1500} s={1.8} prop="bow" o={0.3 * p(f, L[1], L[1] + 20)} flip />}
      <A who="karna" x={420} y={1640} s={2.4} pose={{armR: -170, mouth: 'flat', blink: blink(f)}} />
      <Spear x={520} y={760 + bob(f, 10)} rot={-90} />
    </Svg>
  );
};
const S8: React.FC<SP> = ({f}) => {
  const t = p(f, 10, 40);
  return (
    <Svg>
      <BattleBG f={f} night />
      <A who={G} x={800} y={1520} s={3} flip pose={{mouth: t >= 1 ? 'o' : 'grit', eyes: t >= 1 ? 'shock' : 'open'}} />
      <A who="karna" x={220} y={1660} s={2} pose={{armR: lerp(t, -170, -60), mouth: 'grit', eyes: 'angry'}} />
      {t < 1 && <Spear x={lerp(t, 260, 760)} y={lerp(t, 1100, 1050)} rot={-8} />}
      <Flash t={p(f, 38, 52)} c="#CFEFFF" />
    </Svg>
  );
};
const S9: React.FC<SP> = ({f, L}) => {
  const grow = p(f, 0, L[1] || 50);
  const fall = p(f, L[1], L[1] + 30);
  return (
    <Svg shake={fall > 0.8 && fall < 1 ? f : 0}>
      <BattleBG f={f} night />
      <Place x={540} y={1600} s={1} rot={fall * 80}><A who={G} x={0} y={0} s={lerp(grow, 3, 6)} pose={{armL: 100, armR: -100, eyes: 'closed', mouth: 'smile'}} o={1 - Math.max(0, fall - 0.9) * 5} /></Place>
      {fall >= 1 && <Glow cx={700} cy={1600} r={600} c="#FFB347" o={0.5} />}
    </Svg>
  );
};
const S10: React.FC<SP> = ({f, L}) => {
  const smile = f >= L[1];
  return (
    <Svg zoom={smile ? 1 + p(f, L[1], L[1] + 16) * 0.5 : 1} ox={800} oy={1100}>
      <Sky id="g10" c={['#0b0716', '#2A1638', '#3A1414']} />
      <A who="arjun" x={180} y={1640} s={1.9} pose={{eyes: 'sad', mouth: 'sad', head: 10}} prop="bow" />
      <A who="bheem" x={430} y={1640} s={2} pose={{eyes: 'closed', mouth: 'sad', head: 16}} />
      <A who="krishna" x={800} y={1640} s={2.2} flip pose={{mouth: 'smile', blink: blink(f)}} prop="flute" />
      {Array.from({length: 4}).map((_, i) => <circle key={i} cx={430 + (i % 2) * 30 - 15} cy={1200 + ((f * 4 + i * 40) % 120)} r={5} fill="#9FD8FF" />)}
    </Svg>
  );
};
const S11: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <CosmicBG f={f} c="#2A1A4A" />
    <Rays f={f} cx={540} cy={900} op={0.2} />
    <Glow cx={540} cy={1000} r={520} c="#FFD27A" o={0.4} />
    <A who={G} x={540} y={1500 - p(f, 0, 60) * 100} s={2.8} pose={{eyes: 'closed', mouth: 'smile', armL: 40, armR: -40}} o={0.85} />
  </Svg>
);

export const ghatotkach: Cfg = {
  id: 'Ghatotkach', voice: 'ghatotkach.wav', script, timings,
  scenes: [[S1, [0]], [S2, [1]], [S3, [2]], [S4, [3, 4]], [S5, [5]], [S6, [6]], [S7, [7, 8]], [S8, [9]], [S9, [10, 11]], [S10, [12, 13]], [S11, [14]]],
  titles: [
    {pill: 'PANDAVON KA', title: 'RAAKSHAS\nBETA.', red: 'RAAKSHAS'},
    {pill: 'BHEEM KA PUTRA', title: 'GHATOTKACH.'},
    {pill: 'MAAYAVI SHAKTI', title: 'PAHAAD JAISA.'},
    {pill: 'KURUKSHETRA', title: 'DIN 14.'}, {pill: 'RAAKSHASON KA', title: 'SAMAY.'},
    {title: 'KAHAR.', red: 'KAHAR'},
    {pill: 'DURYODHAN KA DAR', title: 'KARN.'},
    {pill: 'INDRA KI', title: 'SHAKTI.', sub: 'sirf ek baar'}, {pill: 'ARJUN KE LIYE', title: 'BACHAAKAR.'},
    {pill: 'MAJBOORI', title: 'VAAR.'},
    {pill: 'AAKHRI SAANS', title: 'VIRAAT ROOP.'}, null,
    {pill: 'AANSU AUR', title: 'MUSKAAN.'}, {pill: 'ARJUN', title: 'SURAKSHIT.'},
    {title: 'BALIDAAN.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'GHATOTKACH.', sub: 'Bheem ka veer putra'}, endScene: EndCard,
};
