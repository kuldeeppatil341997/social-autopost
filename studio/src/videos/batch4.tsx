import React from 'react';
import sA from '../../videos/ashwatthama/script.json';
import tA from '../../videos/ashwatthama/timings.json';
import sI from '../../videos/iravan/script.json';
import tI from '../../videos/iravan/timings.json';
import sK from '../../videos/kumbhakarna/script.json';
import tK from '../../videos/kumbhakarna/timings.json';
import {A, Arrow, BattleBG, blink, CosmicBG, EndCard, FireAltar, Flash, ForestBG, Glow, Hills, lerp, p, PalaceBG, Place, Rays, Sky, Stars, Svg} from '../kit';
import {Diya} from '../chars';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

// Small shared props
const Moon: React.FC<{x: number; y: number; r?: number; c?: string}> = ({x, y, r = 70, c = '#F3EAD0'}) => (
  <g><Glow cx={x} cy={y} r={r * 3} c={c} o={0.35} /><circle cx={x} cy={y} r={r} fill={c} /></g>
);
const Fog: React.FC<{f: number; y?: number; o?: number}> = ({f, y = 1500, o = 0.25}) => (
  <g>{[0, 1, 2, 3].map((i) => <ellipse key={i} cx={((i * 380 + f * (1 + i * 0.3)) % 1500) - 200} cy={y + i * 70} rx={420} ry={60} fill="#C8D0D8" opacity={o} />)}</g>
);
// Forehead jewel / wound, drawn in the same space as an actor (head centre ~ -150 local).
const Mark: React.FC<{x: number; y: number; s: number; flip?: boolean; c: string; o?: number; r?: number}> = ({x, y, s, flip, c, o = 1, r = 8}) => (
  <Place x={x} y={y} s={s} flip={flip}><g opacity={o}><circle cx={0} cy={-176} r={r * 3} fill={c} opacity={0.35} /><circle cx={0} cy={-176} r={r} fill={c} /></g></Place>
);
const Tent: React.FC<{x: number; s?: number; fire?: number; f: number}> = ({x, s = 1, fire = 0, f}) => (
  <g transform={`translate(${x} 1640) scale(${s})`}>
    <path d="M-160 0 L0 -220 L160 0Z" fill="#6A4A2A" /><path d="M-40 0 L0 -220 L40 0Z" fill="#3A2614" />
    {fire > 0 && <g opacity={fire}><Glow cx={0} cy={-120} r={260} c="#FF5A1A" o={0.6} />{[-60, 0, 60].map((dx, i) => <path key={i} d={`M${dx} ${-160 - Math.sin(f / 4 + i) * 30} Q${dx + 40} -60 ${dx + 26} 0 L${dx - 26} 0 Q${dx - 40} -60 ${dx} ${-160 - Math.sin(f / 4 + i) * 30}Z`} fill={i % 2 ? '#FFB02E' : '#FF6A1A'} />)}</g>}
  </g>
);
const Garland: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({length: 13}).map((_, i) => { const a = Math.PI * (i / 12); return <circle key={i} cx={Math.cos(a) * 46} cy={Math.sin(a) * 60} r={9} fill={i % 2 ? '#FF8A2A' : '#FFD24A'} />; })}</g>
);
const Petals: React.FC<{f: number; from: number}> = ({f, from}) => (
  <g>{Array.from({length: 26}).map((_, i) => { const t = ((f - from) * (1 + (i % 4) * 0.2) + i * 30) % 400; return <circle key={i} cx={100 + ((i * 97) % 880) + Math.sin(t / 30 + i) * 30} cy={t * 4 - 100} r={10} fill={i % 2 ? '#FF8A2A' : '#FFD24A'} />; })}</g>
);
const Bubble: React.FC<{x: number; y: number; r?: number; children: React.ReactNode; o?: number}> = ({x, y, r = 190, children, o = 1}) => (
  <g opacity={o}>
    <circle cx={x - r * 0.9} cy={y + r * 1.15} r={18} fill="#F4EFE4" /><circle cx={x - r * 0.6} cy={y + r * 0.95} r={28} fill="#F4EFE4" />
    <ellipse cx={x} cy={y} rx={r * 1.2} ry={r} fill="#F4EFE4" />
    <g transform={`translate(${x} ${y})`}>{children}</g>
  </g>
);
const Throne: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <path d="M-70 -120 Q0 -190 70 -120 L70 20 L-70 20Z" fill="#D9A23A" /><path d="M-50 -100 Q0 -150 50 -100 L50 10 L-50 10Z" fill="#B21E2A" />
    <rect x={-95} y={10} width={190} height={30} rx={8} fill="#EBB43C" /><rect x={-80} y={40} width={16} height={60} fill="#B8862E" /><rect x={64} y={40} width={16} height={60} fill="#B8862E" />
    <circle cx={0} cy={-150} r={14} fill="#FFE27A" />
  </g>
);
const Bed: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <rect x={-120} y={-10} width={240} height={50} rx={14} fill="#5A6AA0" /><ellipse cx={-80} cy={-20} rx={40} ry={22} fill="#F4EFE4" />
    <rect x={-120} y={40} width={14} height={40} fill="#7A4A2A" /><rect x={106} y={40} width={14} height={40} fill="#7A4A2A" />
    <text x={60} y={-50} fontFamily="Montserrat" fontWeight={800} fontSize={46} fill="#3A4A7A">Z z</text>
  </g>
);
const Zzz: React.FC<{f: number; x: number; y: number; s?: number}> = ({f, x, y, s = 1}) => (
  <g>{[0, 1, 2].map((i) => { const t = ((f + i * 25) % 75) / 75; return <text key={i} x={x + t * 120 * s} y={y - t * 260 * s} fontFamily="Montserrat" fontWeight={800} fontSize={(50 + i * 14) * s} fill="#E9F0FF" opacity={Math.sin(t * Math.PI)}>Z</text>; })}</g>
);
const Drum: React.FC<{x: number; f: number; s?: number}> = ({x, f, s = 1}) => (
  <g transform={`translate(${x} 1700) scale(${s})`}>
    <ellipse cx={0} cy={-60} rx={70} ry={20} fill="#E9D8B8" /><rect x={-70} y={-60} width={140} height={90} fill="#8A2A1A" /><ellipse cx={0} cy={30} rx={70} ry={20} fill="#6A1E12" />
    <rect x={-10} y={-150 + (f % 10 < 5 ? 30 : 0)} width={10} height={90} fill="#5A3A1A" transform="rotate(-20)" />
  </g>
);

// ================= ASHWATTHAMA =================
const AS1: React.FC<SP> = ({f, dur}) => {
  const x = lerp(f / dur, 380, 640);
  return (
    <Svg zoom={1 + f * 0.0012} oy={1250}>
      <ForestBG f={f} night />
      <Moon x={820} y={520} r={80} />
      <A who="ashwold" x={x} y={1640} s={2.3} pose={{legL: Math.sin(f / 8) * 14, legR: -Math.sin(f / 8) * 14, armL: 10, armR: -10, eyes: 'down', mouth: 'flat'}} />
      <Mark x={x} y={1640} s={2.3} c="#E0242A" o={0.7 + Math.sin(f / 6) * 0.3} />
      <Fog f={f} y={1560} o={0.3} />
    </Svg>
  );
};
const AS2: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="as2" c={['#3A2A1A', '#C2803A', '#F2D08A']} />
    <Rays f={f} cx={600} cy={1000} op={0.25} />
    <Hills c="#5A6A3A" y={1560} />
    <A who="drona" x={300} y={1660} s={2.1} pose={{armR: -70, mouth: 'smile', blink: blink(f)}} />
    <A who="ashwatthama" x={700} y={1680} s={1.8} flip pose={{mouth: 'smile', blink: blink(f, 30)}} />
    <Mark x={700} y={1680} s={1.8} flip c="#7AE8FF" o={0.75 + Math.sin(f / 5) * 0.25} r={9} />
  </Svg>
);
const AS3: React.FC<SP> = ({f, L}) => {
  const drop = f >= L[1];
  const k = p(f, L[1], L[1] + 20);
  return (
    <Svg shake={!drop && f > 20 && f < 30 ? f : 0}>
      <BattleBG f={f} />
      {!drop ? <>
        <A who="soldier" x={200} y={1660} s={1.8} pose={{armR: -160, mouth: 'o', eyes: 'shock'}} />
        <A who="drona" x={720} y={1650} s={2.3} flip prop="bow" pose={{eyes: f > 25 ? 'shock' : 'angry', mouth: f > 25 ? 'o' : 'grit'}} />
      </> : <>
        <Glow cx={540} cy={1300} r={500} c="#B01E1E" o={0.35 * k} />
        <A who="drona" x={540} y={lerp(k, 1650, 1720)} s={2.3} pose={{eyes: 'closed', mouth: 'sad', armL: 20, armR: -20, legL: lerp(k, 0, -70), legR: lerp(k, 0, 70)}} />
        <g transform={`translate(${lerp(k, 640, 760)} ${lerp(k, 1450, 1750)}) rotate(${lerp(k, 0, 80)})`}><path d="M-4 -95 Q-60 0 -4 95" stroke="#8A5A1C" strokeWidth={7} fill="none" /></g>
        <Flash t={p(f, L[1] + 60, L[1] + 72)} c="#FF3A2A" />
      </>}
    </Svg>
  );
};
const AS4: React.FC<SP> = ({f, L}) => {
  const strike = f >= L[1];
  const x = lerp(p(f, 0, L[1] || 90), 120, 520);
  return (
    <Svg>
      <Sky id="as4" c={['#05060f', '#141838', '#2A1A2A']} />
      <Stars n={60} f={f} seed="as4" h={1000} />
      <Moon x={860} y={420} r={55} />
      <Tent x={300} f={f} fire={strike ? p(f, L[1], L[1] + 20) : 0} /><Tent x={620} s={1.2} f={f} fire={strike ? p(f, L[1] + 8, L[1] + 28) : 0} /><Tent x={930} f={f} fire={strike ? p(f, L[1] + 16, L[1] + 36) : 0} />
      <rect y={1640} width={1080} height={280} fill="#0b0a12" />
      {!strike && <><A who="ashwatthama" x={x} y={1700} s={2} prop="sword" pose={{eyes: 'angry', mouth: 'grit', legL: Math.sin(f / 6) * 12, legR: -Math.sin(f / 6) * 12, armR: -40}} /><Mark x={x} y={1700} s={2} c="#7AE8FF" /></>}
      {strike && <Glow cx={540} cy={1500} r={800} c="#C2261E" o={0.3} />}
    </Svg>
  );
};
const AS5: React.FC<SP> = ({f, L}) => {
  const stop = f >= L[1];
  const t = p(f, 10, stop ? L[1] : 200);
  return (
    <Svg>
      <CosmicBG f={f} c="#3A1A2A" />
      <Hills c="#1a0f0c" y={1650} />
      <A who="ashwatthama" x={200} y={1660} s={2} prop="bow" pose={{armR: -90, armL: -80, eyes: 'angry', mouth: 'grit'}} />
      <Mark x={200} y={1660} s={2} c="#7AE8FF" />
      <Arrow x={stop ? 700 : lerp(t, 320, 760)} y={1300} rot={0} glow="#FF4A2A" />
      <Glow cx={stop ? 700 : lerp(t, 320, 760)} cy={1300} r={160} c="#FF4A2A" o={0.6} />
      <A who="uttara" x={900} y={1660} s={1.8} flip pose={{eyes: stop ? 'closed' : 'shock', mouth: stop ? 'smile' : 'o', armL: -90}} />
      {stop && <><Glow cx={800} cy={1250} r={320} c="#FFE27A" o={0.6} /><A who="krishna" x={780} y={1650} s={2.1} flip pose={{armL: -110, eyes: 'angry', mouth: 'flat'}} /><g transform={`translate(780 1150) rotate(${f * 12})`}>{Array.from({length: 12}).map((_, i) => <path key={i} d="M0 -70 L10 -40 L-10 -40Z" fill="#FFD24A" transform={`rotate(${i * 30})`} />)}<circle r={40} fill="none" stroke="#FFD24A" strokeWidth={8} /></g></>}
    </Svg>
  );
};
const AS6: React.FC<SP> = ({f, L}) => {
  const wander = f >= L[1];
  const pull = p(f, 15, 55);
  if (!wander)
    return (
      <Svg zoom={1.7} oy={1250}>
        <Sky id="as6" c={['#1A0A0A', '#4A1414', '#1A0A0A']} />
        <A who="ashwatthama" x={540} y={1640} s={2.3} pose={{eyes: pull > 0.5 ? 'closed' : 'shock', mouth: pull > 0.5 ? 'grit' : 'o'}} />
        <g transform={`translate(${540} ${1640 - 176 * 2.3 - pull * 220})`} opacity={1 - p(f, 60, 80)}><Glow cx={0} cy={0} r={60} c="#7AE8FF" o={0.8} /><circle r={18} fill="#7AE8FF" /></g>
        {pull > 0.6 && <Mark x={540} y={1640} s={2.3} c="#E0242A" o={p(f, 40, 60)} />}
      </Svg>
    );
  const cyc = (f - L[1]) / 26;
  return (
    <Svg>
      <Sky id={Math.sin(cyc) > 0 ? 'as6d' : 'as6n'} c={Math.sin(cyc) > 0 ? ['#3A3A4A', '#7A7A8A', '#A8A098'] : ['#05070f', '#141E40', '#0a0a14']} />
      <g transform={`translate(${540 + Math.cos(cyc) * 420} ${700 - Math.abs(Math.sin(cyc)) * 260})`}><circle r={55} fill={Math.sin(cyc) > 0 ? '#E8E0C8' : '#F3EAD0'} /></g>
      <Hills c="#2A2A30" y={1600} />
      <A who="ashwold" x={lerp(p(f, L[1], L[1] + 120), 200, 880)} y={1680} s={1.9} pose={{legL: Math.sin(f / 8) * 14, legR: -Math.sin(f / 8) * 14, eyes: 'down', mouth: 'flat'}} />
      <Mark x={lerp(p(f, L[1], L[1] + 120), 200, 880)} y={1680} s={1.9} c="#E0242A" />
      <Fog f={f} y={1620} o={0.3} />
    </Svg>
  );
};
const AS7: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0015} oy={1300}>
    <ForestBG f={f} night />
    <Fog f={f} y={1450} o={0.35} />
    <A who="ashwold" x={720} y={1600} s={1.6} o={0.8} pose={{eyes: 'down', mouth: 'flat', head: -8}} />
    <Mark x={720} y={1600} s={1.6} c="#E0242A" o={0.8 + Math.sin(f / 5) * 0.2} />
    <Fog f={f + 200} y={1600} o={0.3} />
  </Svg>
);
const AS8: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="as8" c={['#0a0608', '#3A1418', '#0a0608']} />
    <Rays f={f} cx={540} cy={1000} op={0.12} />
    <A who="krishna" x={260} y={1660} s={2} pose={{mouth: 'flat', blink: blink(f)}} />
    <A who="ashwold" x={800} y={1660} s={2} flip pose={{eyes: 'sad', mouth: 'flat'}} />
    <Mark x={800} y={1660} s={2} flip c="#E0242A" />
    <text x={540} y={1180} textAnchor="middle" fontFamily="Playfair Display" fontWeight={800} fontSize={220} fill="#F0C25A" opacity={0.85}>?</text>
  </Svg>
);
export const ashwatthama: Cfg = {
  id: 'Ashwatthama', voice: 'ashwatthama.wav', script: sA, timings: tA,
  scenes: [[AS1, [0]], [AS2, [1]], [AS3, [2, 3]], [AS4, [4, 5]], [AS5, [6, 7]], [AS6, [8, 9]], [AS7, [10]], [AS8, [11, 12]]],
  titles: [
    {pill: '5000 SAAL SE', title: 'AAJ BHI\nZINDA?', red: 'ZINDA?'},
    {pill: 'DRONA PUTRA', title: 'ASHWATTHAMA.'},
    {pill: 'EK JHOOTHI', title: 'KHABAR.', red: 'KHABAR'}, {pill: 'GURU', title: 'DRONA.'},
    {pill: 'RAAT KA', title: 'BADLA.', red: 'BADLA'}, null,
    {title: 'BRAHMASTRA.'}, {pill: 'KRISHNA KA', title: 'SHRAAP.', red: 'SHRAAP'},
    {pill: 'CHHINI GAYI', title: 'MANI.'}, {pill: 'KALYUG TAK', title: 'AMAR.'},
    {pill: 'AAJ BHI', title: 'BHATAK\nRAHA HAI.'},
    {pill: 'AAPKI RAAY', title: 'SAHI YA\nGALAT?'}, null,
  ],
  end: {pill: 'ANSUNI KATHA', title: 'ASHWATTHAMA.', sub: 'Jise maut bhi nahi aayegi'}, endScene: EndCard,
};

// ================= IRAVAN =================
const KaliTemple: React.FC<{f: number}> = ({f}) => (
  <g>
    <Sky id="kt" c={['#1A0606', '#5A1410', '#C2401A']} />
    <Glow cx={540} cy={1000} r={700} c="#FF4A1A" o={0.3} />
    <path d="M300 1500 L300 900 L540 640 L780 900 L780 1500Z" fill="#3A1A10" /><path d="M360 1500 L360 950 L540 760 L720 950 L720 1500Z" fill="#2A0E08" />
    <rect y={1500} width={1080} height={420} fill="#1A0806" />
    {[180, 900].map((x, i) => <g key={x} transform={`translate(${x} 1560) scale(1.3)`}><Diya flame={1} t={f + i * 9} /></g>)}
  </g>
);
const IR1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.001} oy={1300}>
    <KaliTemple f={f} />
    <A who="kali" x={540} y={1380} s={2.1} o={0.95} pose={{armL: -60, armR: 60, eyes: 'glow', mouth: 'grit'}} />
    <A who="iravan" x={540} y={1760} s={2} pose={{legL: -70, legR: 70, armL: -150, armR: 150, eyes: 'closed', mouth: 'smile'}} />
  </Svg>
);
const IR2: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ir2" c={['#0A2A3A', '#2A6A7A', '#7AC0B8']} />
    {Array.from({length: 10}).map((_, i) => <circle key={i} cx={(i * 113) % 1080} cy={1700 - ((f * 3 + i * 170) % 1500)} r={8 + (i % 3) * 4} fill="#CFF6FF" opacity={0.35} />)}
    <path d="M0 1550 Q540 1500 1080 1550 L1080 1920 L0 1920Z" fill="#14404A" />
    <A who="arjun" x={230} y={1660} s={2} prop="bow" pose={{mouth: 'smile', blink: blink(f)}} />
    <A who="uloopi" x={850} y={1660} s={2} flip pose={{mouth: 'smile', blink: blink(f, 40), armL: -50}} />
    <A who="iravan" x={540} y={1690} s={1.7} pose={{mouth: 'smile', blink: blink(f, 20)}} />
  </Svg>
);
const IR3: React.FC<SP> = ({f, L}) => {
  const veer = f >= L[1];
  return (
    <Svg>
      <KaliTemple f={f} />
      <A who="kali" x={540} y={1380} s={2.1} pose={{armL: -60, armR: 60, eyes: 'glow', mouth: 'grit'}} />
      {veer && <Rays f={f} cx={540} cy={1000} op={0.25} />}
      <A who="krishna" x={180} y={1720} s={1.6} pose={{mouth: 'flat', blink: blink(f)}} />
      <A who="arjun" x={360} y={1740} s={1.6} pose={{mouth: veer ? 'sad' : 'flat', eyes: veer ? 'sad' : 'open'}} />
      <A who="bheem" x={880} y={1740} s={1.6} flip pose={{mouth: 'flat', eyes: veer ? 'sad' : 'open'}} />
    </Svg>
  );
};
const IR4: React.FC<SP> = ({f}) => {
  const k = p(f, 0, 25);
  return (
    <Svg zoom={1 + k * 0.15} oy={1300}>
      <KaliTemple f={f} />
      <Rays f={f * 2} cx={540} cy={1200} op={0.3} />
      <A who="arjun" x={200} y={1720} s={1.6} pose={{eyes: 'shock', mouth: 'o'}} />
      <A who="krishna" x={880} y={1720} s={1.6} flip pose={{mouth: 'smile', blink: blink(f)}} />
      <A who="iravan" x={540} y={lerp(k, 1800, 1680)} s={2.2} pose={{armR: -140, mouth: 'smile', eyes: 'open'}} />
    </Svg>
  );
};
const IR5: React.FC<SP> = ({f, L}) => {
  const nobody = f >= L[1];
  return (
    <Svg>
      <PalaceBG tint="#2A0E14" />
      {!nobody ? <>
        <A who="iravan" x={360} y={1660} s={2.2} pose={{mouth: 'sad', eyes: 'sad', armR: -60}} />
        <A who="krishna" x={760} y={1660} s={2.1} flip pose={{mouth: 'flat', blink: blink(f)}} />
        <Garland x={360} y={1250} s={0.9} />
      </> : <>
        <A who="iravan" x={540} y={1660} s={2.2} pose={{mouth: 'sad', eyes: 'down', armL: 20, armR: -20}} />
        {[150, 330, 760, 930].map((x, i) => <A key={x} who={i % 2 ? 'mother' : 'subhadra'} x={x + (i < 2 ? -1 : 1) * p(f, L[1], L[1] + 30) * 80} y={1680} s={1.5} flip={i < 2} pose={{mouth: 'flat', eyes: 'down'}} o={0.85} />)}
        <text x={540} y={1060} textAnchor="middle" fontFamily="Playfair Display" fontWeight={800} fontSize={200} fill="#F0C25A">?</text>
      </>}
    </Svg>
  );
};
const IR6: React.FC<SP> = ({f}) => {
  const tr = p(f, 15, 40);
  const done = f > 40;
  return (
    <Svg>
      <PalaceBG tint="#2A0E14" />
      <FireAltar f={f} x={540} y={1780} s={0.8} />
      {!done ? <A who="krishna" x={720} y={1660} s={2.1} flip pose={{armL: -150, mouth: 'smile', eyes: 'closed'}} /> : <A who="mohini" x={720} y={1660} s={2.1} flip pose={{mouth: 'smile', blink: blink(f), armL: -60}} />}
      <A who="iravan" x={330} y={1660} s={2.2} pose={{mouth: done ? 'laugh' : 'smile', eyes: done ? 'open' : 'shock', armR: done ? -60 : -10}} />
      {done && <><Garland x={330} y={1250} s={0.9} /><Garland x={720} y={1260} s={0.85} /><Petals f={f} from={40} /></>}
      <Glow cx={720} cy={1300} r={300 * tr * (1 - tr) * 4} c="#FFE27A" o={0.8} />
      <Flash t={p(f, 30, 50)} c="#FFE9F2" />
    </Svg>
  );
};
const IR7: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.55, dur * 0.85);
  return (
    <Svg>
      <Sky id="ir7" c={['#2A1A3A', '#E0703A', '#FFD27A']} />
      <Rays f={f} cx={540} cy={1100} op={0.3} />
      <path d="M380 1560 h320 v60 h-320Z" fill="#7A3A16" />
      <A who="iravan" x={540} y={1560} s={2.2} o={1 - k} pose={{mouth: 'smile', eyes: 'closed', armL: -150, armR: 150}} />
      <Glow cx={540} cy={1250} r={500 * k} c="#FFF3C0" o={0.8 * k} />
      {k > 0 && <Petals f={f} from={dur * 0.55} />}
    </Svg>
  );
};
const IR8: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ir8" c={['#05060f', '#1A1238', '#0a0614']} />
    <Stars n={50} f={f} seed="ir8" h={1000} />
    <FireAltar f={f} x={740} y={1720} s={0.7} />
    <A who="mohini" x={380} y={1700} s={2.1} pose={{eyes: 'sad', mouth: 'sad', armR: -140, head: 10}} />
    {[0, 1].map((i) => <circle key={i} cx={360 + i * 40} cy={1360 + ((f * 3 + i * 40) % 80)} r={6} fill="#BFE6FF" opacity={0.8} />)}
  </Svg>
);
const IR9: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ir9" c={['#2A0E06', '#8A3A14', '#F2A04A']} />
    <path d="M260 1560 L260 900 L540 620 L820 900 L820 1560Z" fill="#B8862E" /><path d="M330 1560 L330 960 L540 760 L750 960 L750 1560Z" fill="#7A1E12" />
    <Glow cx={540} cy={1200} r={360} c="#FFD27A" o={0.5} />
    <A who="iravan" x={540} y={1520} s={1.9} pose={{eyes: 'open', mouth: 'smile', armR: -80}} />
    <Garland x={540} y={1180} s={0.85} />
    {[120, 320, 760, 960].map((x, i) => <g key={x} transform={`translate(${x} 1740) scale(1.1)`}><Diya flame={1} t={f + i * 7} /></g>)}
    <rect y={1780} width={1080} height={140} fill="#2A0E06" />
  </Svg>
);
const IR10: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.001} oy={1300}>
    <KaliTemple f={f} />
    <Rays f={f} cx={540} cy={1100} op={0.2} />
    <A who="iravan" x={540} y={1700} s={2.4} pose={{mouth: 'smile', blink: blink(f), armR: -100}} />
  </Svg>
);
export const iravan: Cfg = {
  id: 'Iravan', voice: 'iravan.wav', script: sI, timings: tI,
  scenes: [[IR1, [0]], [IR2, [1]], [IR3, [2, 3]], [IR4, [4]], [IR5, [5, 6]], [IR6, [7]], [IR7, [8]], [IR8, [9]], [IR9, [10]], [IR10, [11, 12]]],
  titles: [
    {pill: 'YUDDH SE PEHLE', title: 'APNI\nBALI.', red: 'BALI.'},
    {pill: 'ARJUN PUTRA', title: 'IRAVAN.'},
    {pill: 'JEET KE LIYE', title: 'EK BALI.', red: 'BALI.'}, null,
    {pill: 'MAIN DOONGA', title: 'BALIDAAN.'},
    {pill: 'AAKHRI', title: 'ICHCHHA.'}, {pill: 'PAR KAUN', title: 'KAREGA?'},
    {pill: 'KRISHNA BANE', title: 'MOHINI.', red: 'MOHINI.'},
    {pill: 'MUSKURATE HUE', title: 'BALIDAAN.'},
    {pill: 'KRISHNA KA', title: 'SHOK.'},
    {pill: 'TAMIL NADU', title: 'AAJ BHI\nPOOJA.'},
    {pill: 'KYA AAPKO', title: 'PATA THA?'}, null,
  ],
  end: {pill: 'ANSUNI KATHA', title: 'IRAVAN.', sub: 'Jiski shaadi Krishna se hui'}, endScene: EndCard,
};

// ================= KUMBHAKARNA =================
const Sleeper: React.FC<{f: number; x?: number; y?: number; s?: number}> = ({f, x = 560, y = 1560, s = 2.2}) => (
  <g>
    <g transform={`translate(${x} ${y}) scale(1 ${1 + Math.sin(f / 14) * 0.02})`}><A who="kumbhakarna" x={0} y={0} s={s} rot={-90} pose={{eyes: 'closed', mouth: 'o', armL: 20, armR: -20}} /></g>
    <Zzz f={f} x={x - 340 * (s / 2.2)} y={y - 120} s={s / 2.2} />
  </g>
);
const KU1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.001} oy={1350}>
    <Sky id="ku1" c={['#05060f', '#141838', '#2A2450']} />
    <Stars n={60} f={f} seed="ku1" h={1100} />
    <Moon x={820} y={480} r={60} />
    <rect y={1600} width={1080} height={320} fill="#1A1410" />
    <Sleeper f={f} x={780} y={1560} s={2.3} />
    <A who="soldier" x={150} y={1700} s={1.0} pose={{armR: -150, mouth: 'o', eyes: 'shock'}} />
    <A who="soldier" x={260} y={1710} s={1.0} pose={{armR: -120, mouth: 'o', eyes: 'shock'}} />
  </Svg>
);
const KU2: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ku2" c={['#2A0E06', '#8A3A14', '#F2A04A']} />
    <Hills c="#3A1A10" y={1640} />
    <A who="kumbhakarna" x={600} y={1720} s={3.2} pose={{armL: -40, armR: 40, mouth: 'grit', eyes: 'angry', blink: blink(f)}} />
    <A who="ravan" x={170} y={1720} s={1.5} pose={{mouth: 'smile', armR: -60}} />
    <A who="indra" x={960} y={1720} s={1.0} flip pose={{eyes: 'shock', mouth: 'o', armL: -140}} />
  </Svg>
);
const KU3: React.FC<SP> = ({f, dur}) => {
  const god = f > dur * 0.6;
  return (
    <Svg>
      <Sky id="ku3" c={['#1A0E2A', '#5A2A4A', '#C2603A']} />
      <Peaks y={1500} />
      <FireAltar f={f} x={820} y={1740} s={0.6} />
      <A who="kumbhakarna" x={420} y={1740} s={2.3} pose={{legL: -70, legR: 70, armL: -150, armR: 150, eyes: 'closed', mouth: 'flat'}} />
      {god && <><Glow cx={760} cy={900} r={400} c="#FFE27A" o={0.5 * p(f, dur * 0.6, dur * 0.8)} /><A who="brahma" x={760} y={1250} s={1.6} o={p(f, dur * 0.6, dur * 0.8)} pose={{mouth: 'smile', armR: -110}} /></>}
    </Svg>
  );
};
const KU4: React.FC<SP> = ({f, L}) => (
  <Svg>
    <Sky id="ku4" c={['#1A0E2A', '#5A2A4A', '#C2603A']} />
    <Rays f={f} cx={760} cy={800} op={0.2} />
    <A who="kumbhakarna" x={320} y={1740} s={2.4} flip pose={{mouth: 'laugh', eyes: 'open', armR: -120, blink: blink(f)}} />
    <Bubble x={720} y={860} o={p(f, 5, 20)}><Throne s={f >= (L[1] ?? 9999) ? 1.25 : 1.1} /></Bubble>
  </Svg>
);
const KU5: React.FC<SP> = ({f, L}) => {
  const fly = f >= L[1];
  const t = p(f, L[1], L[1] + 45);
  return (
    <Svg>
      {!fly ? <>
        <CosmicBG f={f} c="#2A3A6A" />
        <A who="indra" x={260} y={1680} s={1.9} pose={{eyes: 'sad', mouth: 'o', armR: -100}} />
        <Glow cx={760} cy={1250} r={380} c="#FFFFFF" o={0.4} />
        <A who="saraswati" x={760} y={1680} s={2.1} flip pose={{mouth: 'smile', blink: blink(f), armL: -80}} />
      </> : <>
        <Sky id="ku5b" c={['#1A0E2A', '#5A2A4A', '#C2603A']} />
        <A who="kumbhakarna" x={540} y={1900} s={4.2} pose={{mouth: 'o', eyes: 'open'}} />
        <Glow cx={lerp(t, 900, 540)} cy={lerp(t, 500, 1900 - 132 * 4.2)} r={lerp(t, 160, 50)} c="#FFFFFF" o={0.8} />
        <A who="saraswati" x={lerp(t, 900, 540)} y={lerp(t, 640, 1900 - 120 * 4.2)} s={lerp(t, 0.9, 0.2)} pose={{mouth: 'smile'}} />
      </>}
    </Svg>
  );
};
const KU6: React.FC<SP> = ({f, L}) => {
  const swap = p(f, L[0] + 50, L[0] + 70);
  const yawn = f >= L[1];
  return (
    <Svg>
      <Sky id="ku6" c={['#1A0E2A', '#5A2A4A', '#C2603A']} />
      <A who="kumbhakarna" x={320} y={1740} s={2.4} flip pose={{mouth: yawn ? 'o' : f % 10 < 5 ? 'o' : 'flat', eyes: yawn ? 'closed' : 'open', armR: yawn ? -170 : -100, armL: yawn ? 170 : 0}} />
      <Bubble x={720} y={860}>
        <g opacity={1 - swap}><Throne s={1.1} /></g>
        <g opacity={swap} transform={`scale(${0.6 + swap * 0.6})`}><Bed s={1} /></g>
      </Bubble>
      <Flash t={p(f, L[0] + 52, L[0] + 66)} c="#F4EFE4" />
    </Svg>
  );
};
const KU7: React.FC<SP> = ({f}) => {
  const k = p(f, 20, 60);
  return (
    <Svg>
      <Sky id="ku7" c={['#1A0E2A', '#5A2A4A', '#C2603A']} />
      <Rays f={f * 2} cx={760} cy={1000} op={0.3} />
      <A who="brahma" x={770} y={1700} s={2.1} flip pose={{armL: -160, mouth: 'smile', eyes: 'closed'}} />
      <g transform={`translate(${lerp(k, 330, 520)} ${lerp(k, 1740, 1620)})`}><A who="kumbhakarna" x={0} y={0} s={2.3} rot={lerp(k, 0, -90)} pose={{eyes: k > 0.3 ? 'closed' : 'shock', mouth: 'o'}} /></g>
      {k >= 1 && <Zzz f={f} x={200} y={1500} />}
    </Svg>
  );
};
const KU8: React.FC<SP> = ({f, dur}) => {
  const L = [0, Math.round(dur * 0.42)];
  const later = f >= L[1];
  if (!later)
    return (
      <Svg>
        <PalaceBG tint="#2A0E06" />
        <A who="brahma" x={780} y={1660} s={2.1} flip pose={{mouth: 'flat', blink: blink(f)}} />
        <A who="ravan" x={330} y={1720} s={2.1} pose={{legL: -70, legR: 70, armL: -110, armR: -120, eyes: 'sad', mouth: 'o'}} />
      </Svg>
    );
  const cyc = (f - L[1]) / 10;
  const awake = Math.sin(cyc * 0.35) > 0.93;
  return (
    <Svg>
      <Sky id={Math.sin(cyc) > 0 ? 'ku8d' : 'ku8n'} c={Math.sin(cyc) > 0 ? ['#3A2A1A', '#C2702A', '#F2B05A'] : ['#05070f', '#141E40', '#2A2450']} />
      <g transform={`translate(${540 + Math.cos(cyc) * 420} ${600 - Math.abs(Math.sin(cyc)) * 220})`}><circle r={50} fill={Math.sin(cyc) > 0 ? '#FFE27A' : '#F3EAD0'} /></g>
      <rect y={1600} width={1080} height={320} fill="#1A1410" />
      {awake ? <A who="kumbhakarna" x={540} y={1720} s={2.6} pose={{eyes: 'open', mouth: 'laugh', armL: -140, armR: 140}} /> : <Sleeper f={f} x={780} y={1560} s={2.3} />}
    </Svg>
  );
};
const KU9: React.FC<SP> = ({f, dur}) => {
  const L = [0, Math.round(dur * 0.5)];
  const ram = f >= L[1];
  const k = p(f, L[1] + 20, L[1] + 36);
  return (
    <Svg shake={!ram && f % 10 < 2 ? f : 0}>
      <BattleBG f={f} />
      {!ram ? <>
        <A who="kumbhakarna" x={600} y={1700} s={2.9} pose={{eyes: f > 30 ? 'angry' : 'closed', mouth: f > 30 ? 'grit' : 'o', armL: f > 30 ? -60 : 10, armR: f > 30 ? 60 : -10}} />
        <Drum x={150} f={f} /><Drum x={950} f={f + 5} />
        <A who="soldier" x={260} y={1700} s={1.1} prop="spear" pose={{armR: -120, mouth: 'o'}} />
      </> : <>
        <A who="ram" x={200} y={1660} s={2} prop="bow" pose={{armR: -90, armL: -80, eyes: 'open', mouth: 'flat'}} />
        <Arrow x={lerp(k, 320, 760)} y={1250} rot={0} glow="#FFE27A" />
        <A who="kumbhakarna" x={760} y={1720} s={2.6} flip rot={lerp(p(f, L[1] + 36, L[1] + 70), 0, 30)} pose={{eyes: k >= 1 ? 'closed' : 'angry', mouth: 'grit'}} />
        <Flash t={p(f, L[1] + 34, L[1] + 46)} c="#FFE27A" />
      </>}
    </Svg>
  );
};
const KU10: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0012} oy={1300}>
    <Sky id="ku10" c={['#0a0608', '#3A1A14', '#8A3A14']} />
    <Rays f={f} cx={540} cy={1100} op={0.15} />
    <A who="kumbhakarna" x={540} y={1760} s={2.9} pose={{eyes: 'sad', mouth: 'flat', blink: blink(f)}} />
    <Bubble x={820} y={720} r={130}><Throne s={0.6} /></Bubble>
  </Svg>
);
// Peaks are only in kit for some builds; keep a local fallback.
const Peaks: React.FC<{y: number}> = ({y}) => (
  <g><path d={`M0 ${y} L180 ${y - 360} L360 ${y - 80} L560 ${y - 460} L780 ${y - 120} L960 ${y - 380} L1080 ${y - 200} L1080 1920 L0 1920Z`} fill="#2A1A2A" /><rect y={y} width={1080} height={1920 - y} fill="#1A1014" /></g>
);
export const kumbhakarna: Cfg = {
  id: 'Kumbhakarna', voice: 'kumbhakarna.wav', script: sK, timings: tK,
  scenes: [[KU1, [0]], [KU2, [1]], [KU3, [2]], [KU4, [3]], [KU5, [4, 5]], [KU6, [6, 7]], [KU7, [8]], [KU8, [9]], [KU9, [10]], [KU10, [11, 12]]],
  titles: [
    {pill: 'EK GALAT SHABD', title: '6 MAHINE\nNEEND.', red: 'NEEND.'},
    {pill: 'RAAVAN KA BHAI', title: 'KUMBHAKARNA.'},
    {pill: 'BRAHMA KI', title: 'TAPASYA.'},
    {pill: 'MAANGNA THA', title: 'INDRASAN.'},
    {pill: 'DEVTA', title: 'GHABRAAYE.'}, {pill: 'JEEBH PAR', title: 'SARASWATI.'},
    {pill: 'NIKLA', title: 'NIDRASAN.', red: 'NIDRASAN.'}, null,
    {title: 'TATHASTU.'},
    {pill: '6 MAHINE NEEND', title: '1 DIN JAAGNA.'},
    {pill: 'ZABARDASTI', title: 'JAGAAYA.'},
    {pill: 'AAPKI RAAY', title: 'RAMAYAN\nBADALTI?'}, null,
  ],
  end: {pill: 'ANSUNI KATHA', title: 'KUMBHAKARNA.', sub: 'Ek shabd ki keemat'}, endScene: EndCard,
};
