import React from 'react';
import script from '../../videos/ravan/script.json';
import timings from '../../videos/ravan/timings.json';
import {A, Arrow, blink, bob, CosmicBG, EndCard, FireAltar, Flash, Glow, lerp, p, PalaceBG, Peaks, Rays, Sky, Stars, Svg} from '../kit';
import {LOOKS} from '../people';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

const R = (n: number) => ({...LOOKS.ravan, extraHeads: n});
const Linga: React.FC<{x: number; y: number; s?: number; glow?: number}> = ({x, y, s = 1, glow = 0.4}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Glow cx={0} cy={-80} r={220} c="#9FC8FF" o={glow} />
    <path d="M-110 0 Q-110 -30 -60 -36 L60 -36 Q110 -30 110 0Z M100 -18 L150 -18 L150 -6 L100 -6Z" fill="#3A3F4A" />
    <path d="M-44 -36 L-44 -130 Q0 -190 44 -130 L44 -36Z" fill="#2A2E38" />
    <path d="M-26 -120 h52 M-26 -110 h52 M-26 -100 h52" stroke="#F4EFE4" strokeWidth={4} />
    <circle cx={0} cy={-110} r={6} fill="#D2322F" />
  </g>
);

const S1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <Sky id="r1" c={['#120404', '#5A1408', '#120404']} />
    <FireAltar f={f} y={1780} s={1.6} />
    <A who={R(9)} x={540} y={1500} s={2.4} pose={{armL: 30, armR: -40, mouth: 'grit', blink: blink(f)}} prop="sword" />
  </Svg>
);
const S2: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="r2" c={['#0b1424', '#3A4A6A', '#8AA0C0']} />
    <Stars n={40} f={f} seed="r2" h={800} />
    <Peaks y={1250} />
    <Linga x={720} y={1640} s={1.3} />
    <A who={R(0)} x={330} y={1640} s={2.3} pose={{armL: -150, armR: 150, eyes: 'closed', mouth: 'smile'}} />
  </Svg>
);
const S3: React.FC<SP> = ({f}) => {
  const day = Math.sin(f / 12);
  return (
    <Svg>
      <Sky id={day > 0 ? 'r3d' : 'r3n'} c={day > 0 ? ['#5A7AA0', '#A8C0D8', '#E0E8F0'] : ['#05070f', '#1A2440', '#2A3450']} />
      <g transform={`translate(${540 + Math.cos(f / 12) * 420} ${760 - Math.abs(day) * 260})`}><circle r={60} fill={day > 0 ? '#FFE27A' : '#F3EAD0'} /></g>
      <Peaks y={1300} />
      <A who={R(0)} x={540} y={1660} s={2.3} pose={{armL: 40, armR: -40, eyes: 'closed', mouth: 'flat', legL: -70, legR: 70}} />
    </Svg>
  );
};
const S4: React.FC<SP> = ({f, L}) => {
  // count heads: 0 until L[1], then grows each cut
  const cuts = [L[1], L[2], L[3], L[3] + 14, L[3] + 26, L[3] + 38, L[3] + 50, L[3] + 62, L[3] + 74];
  const n = cuts.filter((c) => f >= c + 6).length;
  const lastCut = [...cuts].reverse().find((c) => f >= c) ?? -99;
  const fl = p(f, lastCut, lastCut + 10);
  return (
    <Svg shake={f >= L[0] + 30 && f < L[0] + 36 ? f : 0}>
      <Sky id="r4" c={['#120404', '#4A1006', '#120404']} />
      <FireAltar f={f} y={1780} s={1.5} />
      <A who={R(n)} x={540} y={1500} s={2.3} prop="sword" pose={{armR: f % 30 < 15 && f > L[2] ? -170 : -60, mouth: 'grit', eyes: 'closed'}} />
      {fl > 0 && fl < 1 && <Flash t={fl} c="#FFB347" />}
    </Svg>
  );
};
const S5: React.FC<SP> = ({f, L}) => {
  const appear = p(f, 6, 30);
  const boon = f >= L[1];
  return (
    <Svg>
      <CosmicBG f={f} c="#1E2A5A" />
      <Rays f={f} color="#BFE0FF" cx={540} cy={760} op={0.3 * appear} />
      <Glow cx={540} cy={800} r={500} c="#9FC8FF" o={0.5 * appear} />
      <A who="shiv" x={540} y={1150} s={1.9} prop="trishul" o={appear} pose={{armL: boon ? 80 : 30, blink: blink(f)}} />
      <A who={R(boon ? 9 : 8)} x={540} y={1720} s={1.7} pose={{armL: -150, armR: 150, eyes: boon ? 'open' : 'closed', mouth: 'smile'}} />
      {boon && <Glow cx={540} cy={1450} r={400} c="#FFD27A" o={0.5} />}
    </Svg>
  );
};
const S6: React.FC<SP> = ({f}) => (
  <Svg zoom={1.1 + f * 0.0006} oy={1100}>
    <Sky id="r6" c={['#0a0404', '#3A0E0A', '#0a0404']} />
    <Rays f={f} color="#FF8A5A" cx={540} cy={1100} op={0.18} />
    <A who={R(9)} x={540} y={1620} s={2.4} pose={{mouth: (Math.floor(f / 20) % 3 === 0) ? 'grit' : 'laugh', eyes: Math.floor(f / 25) % 2 ? 'angry' : 'open', armL: 30, armR: -30}} />
  </Svg>
);
const S7: React.FC<SP> = ({f, L}) => {
  const haran = f >= L[1];
  return (
    <Svg>
      {haran ? <Sky id="r7b" c={['#1a0a14', '#5A1A2A', '#2A0A10']} /> : <PalaceBG tint="#2A0C06" />}
      {haran && <A who="sita" x={830} y={1640} s={2} flip pose={{eyes: 'sad', mouth: 'sad', blink: blink(f)}} o={0.95} />}
      <A who={R(9)} x={haran ? 380 : 540} y={1620} s={2.3} prop="sword" pose={{mouth: haran ? 'laugh' : 'smile', armL: 30, armR: -40, blink: blink(f, 20)}} />
      {!haran && <Glow cx={540} cy={1100} r={420} c="#FFD27A" o={0.35} />}
    </Svg>
  );
};
const S8: React.FC<SP> = ({f}) => {
  const t = p(f, 14, 40);
  return (
    <Svg>
      <Sky id="r8" c={['#1a0a06', '#8A3A14', '#F2A04A']} />
      <A who="ram" x={220} y={1660} s={2.1} prop="bow" pose={{armR: -90, armL: -80, mouth: 'flat', eyes: 'open'}} />
      <A who={R(9)} x={820} y={1620} s={2.1} flip pose={{eyes: t >= 1 ? 'shock' : 'angry', mouth: t >= 1 ? 'o' : 'grit'}} o={1 - p(f, 50, 70) * 0.6} />
      {t < 1 && <Arrow x={lerp(t, 320, 760)} y={1240} rot={0} glow="#FFE27A" />}
      <Flash t={p(f, 38, 54)} c="#FFF2C0" />
    </Svg>
  );
};
const S9: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <Sky id="r9" c={['#0b1424', '#3A4A6A', '#8AA0C0']} />
    <Peaks y={1250} />
    <Rays f={f} color="#BFE0FF" cx={540} cy={1400} op={0.2} />
    <Linga x={540} y={1650} s={1.7} glow={0.6} />
    <g transform="translate(260 1660) rotate(-20)"><path d="M-32 0 L-26 -50 Q0 -70 26 -50 L32 0Z" fill="#B8862E" /></g>
  </Svg>
);

export const ravan: Cfg = {
  id: 'Ravan', voice: 'ravan.wav', script, timings,
  scenes: [[S1, [0]], [S2, [1]], [S3, [2]], [S4, [3, 4, 5, 6]], [S5, [7, 8]], [S6, [9]], [S7, [10, 11]], [S8, [12]], [S9, [13]]],
  titles: [
    {pill: 'JANAM SE NAHI', title: 'DAS SIR.', red: 'SIR'},
    {pill: 'SABSE BADA', title: 'SHIV BHAKT.'},
    {pill: 'HAZAARON SAAL', title: 'TAPASYA.'},
    {pill: 'AGNI MEIN', title: 'SHEESH DAAN.'}, {title: 'PHIR SE.'}, {title: 'PHIR SE.'}, {title: '1, 2, 3...\n9.'},
    {pill: 'DASVIN BAAR', title: 'SHIV PRAKAT.'}, {pill: 'VARDAAN', title: 'DAS SIR.'},
    {pill: 'DAS SIR', title: 'DAS BHAAVNAAYEIN.'},
    {pill: 'BHAKTI SE', title: 'SHAKTI.'}, {pill: 'SHAKTI SE', title: 'AHANKAAR.', red: 'AHANKAAR'},
    {pill: 'SHRI RAM KA', title: 'EK BAAN.'},
    {title: 'AHANKAAR.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'RAAVAN.', sub: 'Das sir ka rahasya'}, endScene: EndCard,
};
void bob;
