import React from 'react';
import sKb from '../../videos/kaalbhairav/script.json';
import tKb from '../../videos/kaalbhairav/timings.json';
import sEk from '../../videos/ekadashi/script.json';
import tEk from '../../videos/ekadashi/timings.json';
import sHs from '../../videos/hanumanshani/script.json';
import tHs from '../../videos/hanumanshani/timings.json';
import {A, Arrow, BattleBG, blink, CosmicBG, EndCard, Flash, Glow, Hills, lerp, p, PalaceBG, Peaks, Place, Rays, Sky, Stars, Svg} from '../kit';
import {Person, Dog, Look, LOOKS} from '../people';
import {Diya, Vanar} from '../chars';
import type {Pose} from '../chars';
import {CloseUp, DEVF, Moon, Q, Scroll, Versus, Zzz} from './batch5';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

// ---------- shared props ----------
const T: React.FC<{x: number; y: number; s?: number; c?: string; o?: number; children: React.ReactNode}> = ({x, y, s = 90, c = '#F4EFE4', o = 1, children}) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={DEVF} fontSize={s} fill={c} opacity={o}>{children}</text>
);
// Only the head of a puppet (actor space: everything above the neck).
const HeadOnly: React.FC<{who: string | Look; x: number; y: number; s: number; id: string; pose?: Pose & {eyes?: string; mouth?: string}; rot?: number; o?: number}> = ({who, x, y, s, id, pose, rot = 0, o = 1}) => (
  <Place x={x} y={y} s={s} rot={rot} o={o}>
    <defs><clipPath id={id}><rect x={-200} y={-420} width={400} height={312} /></clipPath></defs>
    <g clipPath={`url(#${id})`}><Person look={who} pose={pose as any} /></g>
  </Place>
);
// Brahma with a fifth head on top (head centre ~(0,-150) in actor space).
const Brahma5: React.FC<{x: number; y: number; s: number; id: string; pose?: Pose & {eyes?: string; mouth?: string}; fifth?: boolean}> = ({x, y, s, id, pose, fifth = true}) => (
  <g>
    {fifth && <HeadOnly who={{...LOOKS.brahma, extraHeads: 0}} x={x} y={y - 92 * s} s={s * 0.82} id={id} pose={pose} />}
    <A who="brahma" x={x} y={y} s={s} pose={pose} />
  </g>
);
const Skull: React.FC<{x: number; y: number; s?: number; glow?: string}> = ({x, y, s = 1, glow}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {glow && <Glow cx={0} cy={0} r={120} c={glow} o={0.5} />}
    <ellipse cx={0} cy={-6} rx={44} ry={40} fill="#EDE6D6" /><rect x={-24} y={22} width={48} height={22} rx={6} fill="#EDE6D6" />
    <ellipse cx={-16} cy={-4} rx={11} ry={12} fill="#2a1a10" /><ellipse cx={16} cy={-4} rx={11} ry={12} fill="#2a1a10" />
    <path d="M0 10 l-6 10 h12Z" fill="#2a1a10" />
    {[-14, -5, 4, 13].map((dx) => <rect key={dx} x={dx - 2} y={30} width={4} height={12} fill="#9A8A7A" />)}
  </g>
);
const Temple: React.FC<{x: number; y: number; s?: number; c?: string; flag?: string}> = ({x, y, s = 1, c = '#E8B45A', flag = '#E57A2B'}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-120} width={220} height={120} fill={c} />
    <path d="M-80 -120 Q-70 -330 0 -380 Q70 -330 80 -120Z" fill={c} />
    <path d="M-60 -160 Q0 -175 60 -160 M-70 -220 Q0 -235 70 -220 M-75 -280 Q0 -295 75 -280" stroke="#9A6A2A" strokeWidth={5} fill="none" opacity={0.5} />
    <circle cx={0} cy={-392} r={14} fill="#F7D27A" /><path d="M0 -406 v-60" stroke="#5A3A1A" strokeWidth={4} /><path d="M0 -466 l50 14 -50 14Z" fill={flag} />
    <path d="M-34 0 v-70 a34 34 0 0 1 68 0 v70Z" fill="#3A1E0E" />
  </g>
);
const Ghats: React.FC<{f: number; dawn?: boolean}> = ({f, dawn = true}) => (
  <g>
    <Sky id={dawn ? 'ghd' : 'ghn'} c={dawn ? ['#2A1A3A', '#C2603A', '#F7B05A'] : ['#05060f', '#1A1A3A', '#2A2050']} />
    {dawn ? <Glow cx={540} cy={1050} r={420} c="#FFD27A" o={0.5} /> : <Stars n={60} f={f} seed="gh" h={1000} />}
    {dawn && <circle cx={540} cy={1060} r={90} fill="#FFE2A0" />}
    <Temple x={200} y={1300} s={0.9} /><Temple x={880} y={1320} s={0.8} c="#D9A24A" /><Temple x={540} y={1260} s={0.6} c="#C98A3A" />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={0} y={1300 + i * 40} width={1080} height={40} fill={i % 2 ? '#8A5A3A' : '#9A6A44'} />)}
    <rect y={1500} width={1080} height={420} fill={dawn ? '#3A5A8A' : '#141A3A'} />
    {Array.from({length: 8}).map((_, i) => <path key={i} d={`M${((i * 160 + f * 1.5) % 1240) - 80} ${1560 + (i % 4) * 90} q40 -14 80 0`} stroke="#9AC0E8" strokeWidth={4} fill="none" opacity={0.5} />)}
  </g>
);
const Lotus: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-120, -70, -25, 25, 70, 120].map((dx, i) => <path key={i} d={`M${dx * 0.6} 0 Q${dx} -70 ${dx * 1.1} -110 Q${dx * 1.4} -60 ${dx * 0.8} 0Z`} fill={i % 2 ? '#F29AC0' : '#E85A8A'} />)}
    <ellipse cx={0} cy={6} rx={170} ry={26} fill="#3E8A5A" />
  </g>
);
const Cave: React.FC<{f: number; children?: React.ReactNode}> = ({f, children}) => (
  <g>
    <Sky id="cave" c={['#0a0c18', '#1A2238', '#2A3450']} />
    <Stars n={40} f={f} seed="cave" h={700} />
    <Peaks y={900} />
    <path d="M0 0 H1080 V1920 H0Z M120 1760 Q100 980 540 900 Q980 980 960 1760Z" fill="#1E1A22" fillRule="evenodd" />
    <path d="M120 1760 Q100 980 540 900 Q980 980 960 1760" stroke="#3A3440" strokeWidth={22} fill="none" />
    <rect y={1740} width={1080} height={180} fill="#16121A" />
    {children}
  </g>
);
const Sea: React.FC<{f: number; c?: string[]}> = ({f, c = ['#F2B05A', '#E2804A', '#5A6AA0']}) => (
  <g>
    <Sky id={'sea' + c[0].slice(1)} c={c} />
    <rect y={1250} width={1080} height={300} fill="#2E5A8A" />
    {Array.from({length: 10}).map((_, i) => <path key={i} d={`M${((i * 130 + f * 2) % 1240) - 80} ${1290 + (i % 5) * 50} q40 -16 80 0`} stroke="#BFE6F2" strokeWidth={5} fill="none" opacity={0.6} />)}
    <path d="M0 1520 Q300 1470 540 1510 T1080 1500 V1920 H0Z" fill="#D9B87A" />
    {[[180, 1640, 70], [900, 1660, 90], [760, 1720, 50]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.55} fill="#7A6A5A" />)}
  </g>
);
const Hanu: React.FC<{x: number; y: number; s?: number; flip?: boolean; rot?: number; pose?: Pose; gada?: boolean; o?: number}> = ({x, y, s = 2.2, flip, rot, pose, gada = true, o}) => (
  <Place x={x} y={y} s={s} flip={flip} rot={rot} o={o}><Vanar kind="hanuman" prop={gada ? 'gada' : 'none'} pose={pose} /></Place>
);
const Coils: React.FC<{cx: number; cy: number; k?: number}> = ({cx, cy, k = 1}) => (
  <g>{k >= 1 && [-60, 0, 60].map((dy, i) => <ellipse key={i} cx={cx} cy={cy + dy} rx={120} ry={34} fill="none" stroke={i % 2 ? '#A84E22' : '#C0602B'} strokeWidth={26} />)}</g>
);
// Long Hanuman tail from (x0,y0) coiling around a point (cx,cy).
const TailWrap: React.FC<{x0: number; y0: number; cx: number; cy: number; k?: number}> = ({x0, y0, cx, cy, k = 1}) => (
  <g>
    <path d={`M${x0} ${y0} C${x0 + 120} ${y0 + 160} ${cx - 260} ${cy + 260} ${cx - 120} ${cy + 80}`} stroke="#C0602B" strokeWidth={30} fill="none" strokeLinecap="round" strokeDasharray={`${1200 * k} 2000`} />
  </g>
);
const OilPot: React.FC<{x: number; y: number; s?: number; tilt?: number; pour?: number; f?: number}> = ({x, y, s = 1, tilt = 0, pour = 0, f = 0}) => (
  <g>
    {pour > 0 && <path d={`M${x + 50 * s} ${y - 20 * s} Q${x + 70 * s} ${y + 60 * s} ${x + 64 * s} ${y + 260 * s * pour}`} stroke="#E2B02A" strokeWidth={10 * s} fill="none" opacity={0.9} />}
    {pour > 0 && [0, 1, 2].map((i) => <circle key={i} cx={x + 64 * s} cy={y + ((f * 6 + i * 60) % (240 * pour)) * s} r={7 * s} fill="#F2C24A" />)}
    <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
      <path d="M-50 -40 Q-70 30 -30 60 H30 Q70 30 50 -40Z" fill="#B8862E" /><rect x={-36} y={-58} width={72} height={20} rx={8} fill="#8A5A1C" />
      <path d="M-46 0 Q0 16 46 0" stroke="#F7D27A" strokeWidth={5} fill="none" />
    </g>
  </g>
);
const ShaniShila: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={10} rx={170} ry={30} fill="#3A2A1A" />
    <path d="M-110 10 Q-120 -240 0 -260 Q120 -240 110 10Z" fill="#14161E" />
    <path d="M-60 -200 Q0 -230 60 -200" stroke="#E2B02A" strokeWidth={8} fill="none" opacity={0.7} />
    <path d="M-30 -150 h60" stroke="#D2322F" strokeWidth={8} strokeLinecap="round" />
  </g>
);

// ================= KAAL BHAIRAV =================
const KB1: React.FC<SP> = ({f, dur}) => {
  const cut = p(f, dur * 0.5, dur * 0.85);
  return (
    <Svg zoom={1.3 - p(f, 0, 40) * 0.25} oy={1250}>
      <CosmicBG f={f} c="#5A1414" />
      <Glow cx={540} cy={1250} r={600} c="#FF5A1A" o={0.35} />
      <Lotus x={360} y={1720} s={1.1} />
      <Brahma5 x={360} y={1700} s={2.2} id="kb1h" fifth={cut === 0} pose={{eyes: cut > 0 ? 'shock' : 'open', mouth: cut > 0 ? 'o' : 'smile'}} />
      {cut > 0 && <HeadOnly who={{...LOOKS.brahma, extraHeads: 0}} x={lerp(cut, 360, 640)} y={lerp(cut, 1700 - 92 * 2.2, 1500)} s={1.8} rot={cut * 160} id="kb1f" pose={{eyes: 'closed', mouth: 'o'}} o={1 - cut * 0.3} />}
      <A who="bhairav" x={820} y={1700} s={2.3} flip prop="trishul" pose={{eyes: 'angry', mouth: 'grit', armL: -150}} />
      <Flash t={p(f, dur * 0.46, dur * 0.6)} c="#FFD8C8" />
    </Svg>
  );
};
const KB2: React.FC<SP> = ({f}) => (
  <Svg>
    <CosmicBG f={f} c="#3A2A6A" />
    <Rays f={f} cx={540} cy={1150} op={0.2} />
    <Glow cx={540} cy={1200} r={450} c="#FFD27A" o={0.35} />
    <Lotus x={540} y={1720} s={1.3} />
    <Brahma5 x={540} y={1700} s={2.4} id="kb2h" pose={{eyes: 'closed', mouth: 'laugh', armR: -140}} />
    <T x={540} y={1000} s={120} c="#F0C25A" o={0.55 + Math.sin(f / 6) * 0.3}>मैं</T>
  </Svg>
);
const KB3: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="kb3" c={['#0a0c1a', '#2A3A5A', '#5B6F8F']} />
    <Stars n={50} f={f} seed="kb3" h={900} />
    <Peaks y={1500} />
    <Brahma5 x={300} y={1700} s={2.1} id="kb3h" pose={{eyes: 'angry', mouth: 'laugh', armR: -90}} />
    <A who="shiv" x={800} y={1700} s={2.2} flip prop="trishul" pose={{eyes: 'closed', mouth: 'flat'}} />
  </Svg>
);
const KBclose: React.FC<SP> = ({f}) => (
  <CloseUp who="bhairav" f={f} id="kbclose" c={['#1A0404', '#8A1A10', '#F2603A']} pose={{eyes: 'angry', mouth: 'grit'}}>
    <Glow cx={540} cy={1050} r={600} c="#FF3A1A" o={0.35 + Math.sin(f / 4) * 0.1} />
  </CloseUp>
);
const KB5: React.FC<SP> = ({f, dur}) => {
  const cut = p(f, dur * 0.4, dur * 0.8);
  return (
    <Svg shake={cut > 0 && cut < 0.2 ? f : 0}>
      <CosmicBG f={f} c="#4A1010" />
      <Brahma5 x={760} y={1700} s={2.2} id="kb5h" fifth={cut === 0} pose={{eyes: cut > 0 ? 'shock' : 'angry', mouth: 'o'}} />
      {cut > 0 && <HeadOnly who={{...LOOKS.brahma, extraHeads: 0}} x={lerp(cut, 760, 500)} y={lerp(cut, 1700 - 92 * 2.2, 1160)} s={1.8} rot={-cut * 120} id="kb5f" pose={{eyes: 'closed', mouth: 'o'}} />}
      <A who="bhairav" x={300} y={1700} s={2.3} pose={{eyes: 'angry', mouth: 'grit', armR: lerp(cut, -170, -60)}} />
      <Flash t={p(f, dur * 0.38, dur * 0.52)} c="#FFE0D0" />
    </Svg>
  );
};
const KB6: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.001} oy={1200}>
    <Sky id="kb6" c={['#0a0608', '#3A1418', '#6A1A1A']} />
    <Glow cx={700} cy={1120} r={260} c="#FF3A1A" o={0.4 + Math.sin(f / 5) * 0.15} />
    <A who="bhairav" x={540} y={1720} s={2.6} pose={{eyes: 'shock', mouth: 'o', armR: -120}} />
    <Skull x={735} y={1180 + Math.sin(f / 6) * 4} s={1.3} glow="#FF5A3A" />
  </Svg>
);
const KB7: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="kb7" c={['#04060c', '#14203A', '#1A2A3A']} />
    <Stars n={40} f={f} seed="kb7" h={900} />
    <Moon x={820} y={450} r={50} />
    <Hills c="#0a1018" y={1650} />
    <A who="bhairav" x={330} y={1720} s={2.1} pose={{eyes: 'sad', mouth: 'flat', legL: Math.sin(f / 6) * 14, legR: -Math.sin(f / 6) * 14}} />
    <Skull x={360} y={1380} s={0.7} />
    <Glow cx={800} cy={1350} r={340} c="#8AD8FF" o={0.25} />
    <A who="brahmahatya" x={800 - p(f, 0, 90) * 60} y={1720} s={2.2} flip o={0.85} pose={{eyes: 'open', mouth: 'grit', armL: -100}} />
  </Svg>
);
const KB8: React.FC<SP> = ({f, dur}) => {
  const t = p(f, 0, dur);
  const band = (y: number, c: string, label: string, i: number) => (
    <g key={i}>
      <rect x={60} y={y} width={960} height={300} rx={30} fill={c} stroke="#F0C25A" strokeWidth={4} opacity={0.9} />
      <T x={540} y={y + 90} s={64} c="#F0C25A">{label}</T>
      <A who="bhairav" x={lerp(Math.min(1, Math.max(0, t * 3 - i)), 200, 880)} y={y + 290} s={1.25} o={Math.floor(t * 3) === i ? 1 : 0.15} pose={{eyes: 'sad', mouth: 'flat', legL: Math.sin(f / 4) * 14, legR: -Math.sin(f / 4) * 14}} />
    </g>
  );
  return (
    <Svg>
      <Sky id="kb8" c={['#0a0608', '#1A1430', '#0a0608']} />
      {band(700, '#3A3A7A', 'स्वर्ग', 0)}{band(1050, '#2A5A3A', 'पृथ्वी', 1)}{band(1400, '#4A1A1A', 'पाताल', 2)}
    </Svg>
  );
};
const KB9: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.4, dur * 0.7);
  return (
    <Svg>
      <Ghats f={f} />
      <Rays f={f} cx={540} cy={1060} op={0.2} />
      <A who="bhairav" x={420} y={1500} s={2} pose={{eyes: k > 0 ? 'closed' : 'sad', mouth: k > 0 ? 'smile' : 'flat', armR: -110}} />
      <Skull x={lerp(k, 580, 640)} y={lerp(k, 1200, 1640)} s={0.9} glow={k < 1 ? '#FF7A3A' : undefined} />
      <Flash t={p(f, dur * 0.66, dur * 0.8)} c="#FFF3C8" />
    </Svg>
  );
};
const KB10: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0012} oy={1500}>
    <Ghats f={f} />
    <ellipse cx={540} cy={1650} rx={300} ry={70} fill="#5A8AC0" stroke="#F0C25A" strokeWidth={6} />
    <Glow cx={540} cy={1640} r={260} c="#FFD27A" o={0.45} />
    <Skull x={540} y={1630} s={0.8} />
    {[260, 820].map((x, i) => <g key={x} transform={`translate(${x} 1580) scale(1.2)`}><Diya flame={1} t={f + i * 9} /></g>)}
  </Svg>
);
const KB11: React.FC<SP> = ({f}) => (
  <Svg>
    <Ghats f={f} dawn={false} />
    <Glow cx={540} cy={1250} r={420} c="#FF7A3A" o={0.3} />
    <A who="bhairav" x={540} y={1500} s={2.4} prop="trishul" pose={{eyes: 'open', mouth: 'flat', blink: blink(f), armR: -20}} />
    <Place x={800} y={1500} s={1.6} flip><Dog /></Place>
  </Svg>
);
const KB12: React.FC<SP> = ({f, dur}) => {
  const t = p(f, dur * 0.2, dur * 0.8);
  return (
    <Svg>
      <Sky id="kb12" c={['#1A0E06', '#5A3A14', '#C2903A']} />
      <Rays f={f} cx={540} cy={1100} op={0.18} />
      <Temple x={250} y={1600} s={1} /><Temple x={830} y={1600} s={1} c="#B8502E" flag="#D2322F" />
      <T x={250} y={1700} s={64} c="#FFE9C0">विश्वनाथ</T><T x={830} y={1700} s={64} c="#FFE9C0">भैरव</T>
      <path d="M330 1460 Q540 1320 750 1460" stroke="#F0C25A" strokeWidth={8} fill="none" strokeDasharray={`${t * 520} 600`} />
      {t > 0.95 && <path d="M730 1430 l26 32 l-40 6Z" fill="#F0C25A" />}
      <T x={250} y={1820} s={70} c="#F0C25A">१</T><T x={830} y={1820} s={70} c="#F0C25A">२</T>
    </Svg>
  );
};
const KB13: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0012} oy={1400}>
    <Sky id="kb13" c={['#0a0604', '#2A1408', '#4A2410']} />
    <Glow cx={540} cy={1100} r={420} c="#FF7A3A" o={0.25} />
    <A who="bhairav" x={540} y={1380} s={1.7} o={0.5} prop="trishul" pose={{eyes: 'closed', mouth: 'smile'}} />
    {Array.from({length: 7}).map((_, i) => <g key={i} transform={`translate(${150 + i * 130} ${1640 + (i % 2) * 40}) scale(1.1)`}><Diya flame={p(f, i * 5, i * 5 + 10)} t={f + i * 7} /></g>)}
  </Svg>
);
const KB14: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="kb14" c={['#0a0608', '#2A1438', '#0a0608']} />
    <Versus a="काल भैरव" b="महादेव" f={f} />
    <A who="bhairav" x={260} y={1700} s={2} prop="trishul" pose={{eyes: 'open', mouth: 'flat', blink: blink(f)}} />
    <A who="shiv" x={820} y={1700} s={2} flip prop="trishul" pose={{eyes: 'closed', mouth: 'smile'}} />
  </Svg>
);
export const kaalbhairav: Cfg = {
  id: 'KaalBhairav', voice: 'kaalbhairav.wav', script: sKb, timings: tKb, pushIn: true,
  hook: 'ब्रह्मा जी के पहले पाँच सिर थे',
  scenes: [[KB1, [0]], [KB2, [1]], [KB3, [2]], [KBclose, [3]], [KB5, [4]], [KB6, [5]], [KB7, [6]], [KB8, [7]], [KB9, [8]], [KB10, [9]], [KB11, [10]], [KB12, [11]], [KB13, [12]], [KB14, [13]], [KB1, [14]]],
  titles: [
    null,
    {pill: 'ब्रह्मा का', title: 'घमंड'},
    {pill: 'पाँचवें सिर ने किया', title: 'अपमान', red: 'अपमान'},
    {pill: 'शिव के क्रोध से', title: 'काल भैरव'},
    {pill: 'एक नाखून से', title: 'पाँचवाँ सिर', red: 'सिर'},
    {pill: 'हाथ से चिपका', title: 'कपाल'},
    {pill: 'पीछे पड़ा', title: 'ब्रह्महत्या का पाप'},
    {pill: 'तीनों लोक', title: 'भटकते रहे'},
    {pill: 'आख़िर', title: 'काशी'},
    {pill: 'आज भी', title: 'कपाल मोचन'},
    {pill: 'काशी के', title: 'कोतवाल'},
    {pill: 'पहले विश्वनाथ', title: 'फिर भैरव'},
    {pill: 'काल भैरव अष्टमी', title: 'एक दीया'},
    {pill: 'आपकी आवाज़', title: 'जय कौन?'},
    {pill: 'कालचित्र', title: 'फॉलो करें'},
  ],
  fx: {2: {label: 'पाँचवाँ सिर'}, 4: {label: 'शिव पुराण'}, 6: {label: 'ब्रह्महत्या'}, 8: {label: 'काशी • वाराणसी'}, 9: {label: 'कपाल मोचन तीर्थ'}, 10: {quote: 'काशी के कोतवाल'}},
  end: {pill: 'कालचित्र', title: 'ऐसी ही\nअनसुनी कथाएँ', sub: 'फॉलो करें @kaalchitra.verse'}, endScene: EndCard,
};

// ================= UTPANNA EKADASHI =================
const Sleeping: React.FC<{x: number; y: number; s?: number; f: number}> = ({x, y, s = 1.6, f}) => (
  <g>
    <g transform={`translate(${x} ${y})`}><A who="vishnu" x={0} y={0} s={s} rot={-90} pose={{eyes: 'closed', mouth: 'smile'}} /></g>
    <Zzz f={f} x={x - 40} y={y - 120} s={0.8} />
  </g>
);
const EK1: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.2, dur * 0.7);
  return (
    <Svg zoom={1.25 - p(f, 0, 40) * 0.2} oy={1350}>
      <Cave f={f}>
        <Glow cx={540} cy={1500} r={520 * (0.3 + k)} c="#FFE27A" o={0.55} />
        <Rays f={f} cx={540} cy={1450} op={0.25 * k} />
        <Sleeping x={600} y={1700} f={f} />
        <A who="ekadashi" x={680} y={lerp(k, 1760, 1700)} s={2.2} o={k} prop="sword" pose={{eyes: 'open', mouth: 'flat', armR: -60}} />
        <A who="mur" x={940} y={1720} s={1.9} flip o={0.7} pose={{eyes: 'angry', mouth: 'grit'}} />
      </Cave>
    </Svg>
  );
};
const EK2: React.FC<SP> = ({f, dur}) => {
  const t = p(f, 0, dur);
  return (
    <Svg>
      <Sky id="ek2" c={['#0a0614', '#3A1430', '#7A2A2A']} />
      <Stars n={40} f={f} seed="ek2" h={800} />
      <path d="M140 990 Q540 900 940 990 L920 1040 H160Z" fill="#E8C88A" opacity={0.5} />
      <T x={760} y={1100} s={64} c="#F0C25A">स्वर्ग</T>
      <A who="mur" x={540} y={1720} s={2.6} pose={{eyes: 'angry', mouth: 'laugh', armL: -150, armR: 150}} />
      {[0, 1, 2].map((i) => <A key={i} who="indra" x={lerp(t, 380 + i * 160, 120 + i * 120)} y={900 + i * 40} s={0.9} o={1 - t * 0.6} pose={{eyes: 'shock', mouth: 'o', legL: Math.sin(f / 3) * 14, legR: -Math.sin(f / 3) * 14}} />)}
    </Svg>
  );
};
const EK3: React.FC<SP> = ({f, dur}) => {
  const t = p(f, 0, dur);
  return (
    <Svg>
      <BattleBG f={f} />
      <A who="vishnu" x={280} y={1700} s={2.2} prop="mace" pose={{eyes: 'angry', mouth: 'grit', armR: -120 + Math.sin(f / 4) * 30}} />
      <A who="mur" x={800} y={1700} s={2.2} flip prop="sword" pose={{eyes: 'angry', mouth: 'grit', armL: -110 + Math.cos(f / 4) * 30}} />
      <Flash t={(f % 30) / 6} c="#FFE0A0" />
      <T x={540} y={1060} s={110} c="#FFE27A" o={0.5 + t * 0.5}>बरसों</T>
    </Svg>
  );
};
const EK4: React.FC<SP> = ({f}) => (
  <Svg>
    <Cave f={f}>
      <Glow cx={560} cy={1620} r={300} c="#9AB0FF" o={0.25} />
      <Sleeping x={620} y={1700} f={f} />
    </Cave>
  </Svg>
);
const EK5: React.FC<SP> = ({f, dur}) => {
  const t = p(f, 0, dur);
  return (
    <Svg>
      <Cave f={f}>
        <Sleeping x={560} y={1700} f={f} />
        <A who="mur" x={lerp(t, 1040, 860)} y={1720} s={2.2} flip prop="sword" pose={{eyes: 'angry', mouth: 'grit', armL: -150, legL: Math.sin(f / 5) * 10, legR: -Math.sin(f / 5) * 10}} />
      </Cave>
    </Svg>
  );
};
const EK6: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.15, dur * 0.65);
  return (
    <Svg>
      <Cave f={f}>
        <Rays f={f} cx={420} cy={1500} op={0.3 * k} />
        <Glow cx={420} cy={1500} r={600 * k} c="#FFE27A" o={0.6} />
        <Sleeping x={600} y={1720} f={f} />
        <A who="ekadashi" x={480} y={lerp(k, 1700, 1560)} s={lerp(k, 0.8, 2.2)} o={k} pose={{eyes: 'open', mouth: 'flat', armR: -150, armL: 150}} />
        <A who="mur" x={900} y={1720} s={2} flip pose={{eyes: 'shock', mouth: 'o'}} />
      </Cave>
    </Svg>
  );
};
const EK7: React.FC<SP> = ({f, dur}) => {
  const hit = p(f, dur * 0.45, dur * 0.7);
  return (
    <Svg shake={hit > 0 && hit < 0.3 ? f : 0}>
      <Cave f={f}>
        <Glow cx={360} cy={1300} r={420} c="#FFE27A" o={0.45} />
        <A who="ekadashi" x={lerp(hit, 300, 460)} y={1700} s={2.3} prop="sword" pose={{eyes: 'angry', mouth: 'grit', armR: lerp(hit, -170, -60)}} />
        <A who="mur" x={800} y={1720} s={2.2} flip rot={lerp(p(f, dur * 0.7, dur), 0, 70)} pose={{eyes: hit >= 1 ? 'closed' : 'shock', mouth: 'o'}} />
        <Flash t={p(f, dur * 0.45, dur * 0.6)} c="#FFF3C0" />
      </Cave>
    </Svg>
  );
};
const EK8: React.FC<SP> = ({f}) => (
  <Svg>
    <Cave f={f}>
      <Glow cx={760} cy={1300} r={380} c="#FFE27A" o={0.35} />
      <A who="vishnu" x={320} y={1720} s={2.2} pose={{eyes: 'shock', mouth: 'o', armR: -100}} />
      <A who="ekadashi" x={760} y={1720} s={2.2} flip prop="sword" pose={{eyes: 'open', mouth: 'smile', blink: blink(f)}} />
    </Cave>
  </Svg>
);
const EKclose: React.FC<SP> = ({f}) => (
  <CloseUp who="ekadashi" f={f} id="ekclose" c={['#5A2A06', '#E2903A', '#FFE2A0']} pose={{eyes: 'open', mouth: 'smile'}}>
    {[160, 920].map((x, i) => <g key={x} transform={`translate(${x} 1700) scale(1.3)`}><Diya flame={1} t={f + i * 9} /></g>)}
  </CloseUp>
);
const EK10: React.FC<SP> = ({f, dur}) => {
  const k = p(f, 0, dur * 0.7);
  return (
    <Svg zoom={1 + f * 0.0012} oy={1250}>
      <CosmicBG f={f} c="#1A2A5A" />
      {Array.from({length: 15}).map((_, i) => {
        const a = (i / 15) * Math.PI * 2 - Math.PI / 2; const hot = i === 10;
        const x = 540 + Math.cos(a) * 340, y = 1250 + Math.sin(a) * 340;
        const lit = i / 14;
        return <g key={i} opacity={i / 15 <= k ? 1 : 0.25}>
          <circle cx={x} cy={y} r={hot ? 52 : 34} fill="#1A1A2A" stroke={hot ? '#F0C25A' : '#8A8AA0'} strokeWidth={hot ? 6 : 2} />
          <circle cx={x} cy={y} r={hot ? 46 : 30} fill="#F3EAD0" opacity={1 - lit * 0.9} />
        </g>;
      })}
      <T x={540} y={1250} s={150} c="#F0C25A">११</T>
      <T x={540} y={1360} s={64} c="#F4EFE4">एकादशी</T>
    </Svg>
  );
};
const EK11: React.FC<SP> = ({f}) => (
  <Svg>
    <CosmicBG f={f} c="#2A3A7A" />
    <Rays f={f} cx={400} cy={1150} op={0.25} />
    <Glow cx={400} cy={1200} r={420} c="#FFD27A" o={0.35} />
    <A who="vishnu" x={400} y={1700} s={2.4} pose={{eyes: 'open', mouth: 'smile', armR: -140, blink: blink(f)}} />
    <A who="ekadashi" x={820} y={1720} s={2} flip pose={{eyes: 'closed', mouth: 'smile'}} />
  </Svg>
);
const EKsrc: React.FC<SP> = ({f}) => <Scroll f={f} id="eksrc" />;
const EK13: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#3A1A08" />
    <Glow cx={540} cy={1300} r={420} c="#FFD27A" o={0.3} />
    <A who="mother" x={540} y={1700} s={2.3} pose={{eyes: 'closed', mouth: 'smile', armL: -40, armR: 40}} />
    {[260, 820].map((x, i) => <g key={x} transform={`translate(${x} 1720) scale(1.4)`}><Diya flame={1} t={f + i * 9} /></g>)}
    <T x={540} y={1000} s={110} c="#F0C25A" o={0.7 + Math.sin(f / 8) * 0.3}>व्रत</T>
  </Svg>
);
const EK14: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="ek14" c={['#0a0608', '#2A1438', '#0a0608']} />
    <Versus a="हाँ" b="ना" f={f} />
    <A who="ekadashi" x={540} y={1720} s={2.2} pose={{eyes: 'open', mouth: 'smile', blink: blink(f)}} />
  </Svg>
);
export const ekadashi: Cfg = {
  id: 'Ekadashi', voice: 'ekadashi.wav', script: sEk, timings: tEk, pushIn: true,
  hook: 'एकादशी सिर्फ़ एक तिथि नहीं',
  scenes: [[EK1, [0]], [EK2, [1]], [EK3, [2]], [EK4, [3]], [EK5, [4]], [EK6, [5]], [EK7, [6]], [EK8, [7]], [EKclose, [8]], [EK10, [9]], [EK11, [10]], [EKsrc, [11]], [EK13, [12]], [EK14, [13]], [EK1, [14]]],
  titles: [
    null,
    {pill: 'सतयुग का दैत्य', title: 'मुर', red: 'मुर'},
    {pill: 'बरसों तक', title: 'युद्ध'},
    {pill: 'बद्रिकाश्रम की', title: 'गुफा'},
    {pill: 'चुपके से', title: 'हमला'},
    {pill: 'विष्णु के शरीर से', title: 'तेजस्वी कन्या'},
    {pill: 'कन्या ने किया', title: 'मुर का अंत'},
    {pill: 'विष्णु ने पूछा', title: 'तुम कौन?'},
    {pill: 'विष्णु के तेज से', title: 'जन्म'},
    {pill: 'मार्गशीर्ष कृष्ण', title: 'एकादशी'},
    {pill: 'विष्णु का', title: 'वरदान'},
    {pill: 'स्रोत', title: 'पद्म पुराण'},
    {pill: 'इस बार', title: 'उत्पन्ना एकादशी'},
    {pill: 'आपकी राय', title: 'व्रत रखते हैं?'},
    {pill: 'कालचित्र', title: 'फॉलो करें'},
  ],
  fx: {3: {label: 'बद्रिकाश्रम'}, 7: {quote: 'देवी, तुम कौन हो?'}, 8: {quote: 'मैं आपके ही तेज से जन्मी हूँ'}, 11: {label: 'पद्म पुराण'}},
  end: {pill: 'कालचित्र', title: 'ऐसी ही\nअनसुनी कथाएँ', sub: 'फॉलो करें @kaalchitra.verse'}, endScene: EndCard,
};

// ================= HANUMAN & SHANI =================
const HS1: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.4, dur * 0.8);
  return (
    <Svg zoom={1.25 - p(f, 0, 40) * 0.2} oy={1300}>
      <Sea f={f} c={['#1A1030', '#5A2A4A', '#2A3A6A']} />
      <Hanu x={260} y={1700} s={2.3} pose={{eyes: 'angry', mouth: 'grit', armR: -40}} />
      <TailWrap x0={300} y0={1660} cx={800} cy={1400} />
      <A who="shani" x={800} y={1700} s={2.1} flip pose={{eyes: 'sad', mouth: 'o', armL: -40}} />
      <Coils cx={800} cy={1400} />
      <OilPot x={720} y={900} s={1.1} tilt={k * 60} pour={k} f={f} />
    </Svg>
  );
};
const HS2: React.FC<SP> = ({f}) => (
  <Svg>
    <Sea f={f} />
    <Glow cx={540} cy={1300} r={420} c="#FFD27A" o={0.35} />
    <Rays f={f} cx={540} cy={1250} op={0.15} />
    <T x={540} y={960} s={120} c="#E2413A" o={0.6 + Math.sin(f / 8) * 0.3}>राम</T>
    <Hanu x={540} y={1700} s={2.5} gada={false} pose={{eyes: 'closed', mouth: 'smile', armL: 30, armR: -30}} />
  </Svg>
);
const HS3: React.FC<SP> = ({f, dur}) => {
  const k = p(f, 0, dur * 0.5);
  return (
    <Svg>
      <Sea f={f} c={['#0a0c1a', '#2A2A4A', '#3A4A6A']} />
      <Glow cx={800} cy={1300} r={420 * k} c="#6B7BB8" o={0.5} />
      <Hanu x={300} y={1700} s={2.3} gada={false} pose={{eyes: 'closed', mouth: 'smile', armL: 30, armR: -30}} />
      <A who="shani" x={800} y={1700} s={2.3} flip o={k} pose={{eyes: 'angry', mouth: 'flat', armL: -100}} />
    </Svg>
  );
};
const HS4: React.FC<SP> = ({f}) => (
  <Svg>
    <Sea f={f} c={['#0a0c1a', '#2A2A4A', '#3A4A6A']} />
    <Hanu x={300} y={1700} s={2.3} gada={false} pose={{eyes: 'open', mouth: 'smile', armL: 50, armR: -50, blink: blink(f)}} />
    <A who="shani" x={800} y={1700} s={2.3} flip pose={{eyes: 'angry', mouth: 'flat'}} />
  </Svg>
);
const HS5: React.FC<SP> = ({f}) => (
  <Svg>
    <Sea f={f} c={['#0a0c1a', '#1A1A3A', '#3A2A4A']} />
    <Glow cx={640} cy={1300} r={460} c="#4A5AA8" o={0.45} />
    <Hanu x={260} y={1700} s={2.2} gada={false} pose={{eyes: 'sad', mouth: 'flat'}} />
    <A who="shani" x={680} y={1700} s={2.5} flip pose={{eyes: 'angry', mouth: 'grit', armL: -150, armR: 150}} />
    <Q y={1000} />
  </Svg>
);
const HS6: React.FC<SP> = ({f, dur}) => {
  const k = p(f, dur * 0.1, dur * 0.7);
  return (
    <Svg>
      <Sea f={f} c={['#1A1030', '#5A2A4A', '#2A3A6A']} />
      <Hanu x={260} y={1700} s={2.3} pose={{eyes: 'angry', mouth: 'grit'}} />
      <TailWrap x0={300} y0={1660} cx={800} cy={1400} k={k} />
      <A who="shani" x={800} y={1700} s={2.2} flip pose={{eyes: 'shock', mouth: 'o'}} />
      <Coils cx={800} cy={1400} k={k} />
    </Svg>
  );
};
const HS7: React.FC<SP> = ({f}) => {
  const ph = Math.abs(Math.sin(f / 7));
  const y = 1620 - ph * 340;
  return (
    <Svg shake={ph < 0.15 ? f : 0}>
      <Sea f={f} c={['#1A1030', '#5A2A4A', '#2A3A6A']} />
      <Hanu x={240} y={1700} s={2.3} pose={{eyes: 'angry', mouth: 'grit'}} />
      <path d={`M300 1640 Q500 ${y + 200} 760 ${y - 100}`} stroke="#C0602B" strokeWidth={30} fill="none" strokeLinecap="round" />
      <Place x={800} y={y} s={1} rot={ph * 40}><A who="shani" x={0} y={0} s={1.9} pose={{eyes: 'shock', mouth: 'o', armL: -150, armR: 150}} /></Place>
      {[-60, 0, 60].map((dy, i) => <ellipse key={i} cx={800} cy={y - 140 + dy} rx={110} ry={30} fill="none" stroke="#C0602B" strokeWidth={24} />)}
      {ph < 0.2 && <Flash t={0.5} c="#FFE0C0" />}
    </Svg>
  );
};
const HSclose: React.FC<SP> = ({f}) => (
  <CloseUp who="shani" f={f} id="hsclose" c={['#05060f', '#1E2748', '#4A5A9A']} pose={{eyes: 'sad', mouth: 'o'}}>
    <Glow cx={540} cy={1050} r={600} c="#6B7BB8" o={0.3} />
  </CloseUp>
);
const HS9: React.FC<SP> = ({f}) => (
  <Svg>
    <Sea f={f} c={['#1A1430', '#3A2A4A', '#2A3A6A']} />
    <Hanu x={300} y={1700} s={2.4} pose={{eyes: 'open', mouth: 'flat', blink: blink(f)}} />
    <A who="shani" x={780} y={1760} s={1.8} flip pose={{eyes: 'sad', mouth: 'sad', armL: -70, armR: 70, legL: 60, legR: -60}} />
  </Svg>
);
const HS10: React.FC<SP> = ({f, dur}) => {
  const t = p(f, dur * 0.2, dur * 0.7);
  return (
    <Svg>
      <Sea f={f} />
      <Glow cx={540} cy={1300} r={380} c="#FFD27A" o={0.35} />
      <Hanu x={300} y={1700} s={2.3} gada={false} pose={{eyes: 'open', mouth: 'smile', armR: -70, blink: blink(f)}} />
      <A who="shani" x={800} y={1700} s={2.1} flip pose={{eyes: 'sad', mouth: 'flat', armL: -70}} />
      <OilPot x={lerp(t, 450, 640)} y={1380} s={0.9} />
    </Svg>
  );
};
const HS11: React.FC<SP> = ({f, dur}) => {
  const k = p(f, 0, dur * 0.7);
  return (
    <Svg>
      <Sea f={f} />
      <Rays f={f} cx={540} cy={1300} op={0.25 * k} />
      <Glow cx={540} cy={1300} r={520} c="#F2C24A" o={0.25 + k * 0.3} />
      <A who="shani" x={540} y={1700} s={2.5} pose={{eyes: k > 0.5 ? 'closed' : 'sad', mouth: k > 0.5 ? 'smile' : 'flat', armL: -30, armR: 30}} />
      {Array.from({length: 8}).map((_, i) => <circle key={i} cx={420 + i * 34} cy={1200 + ((f * 5 + i * 50) % 400)} r={8} fill="#F2C24A" opacity={0.8} />)}
    </Svg>
  );
};
const HSsrc: React.FC<SP> = ({f}) => <Scroll f={f} id="hssrc" />;
const HS13: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0012} oy={1500}>
    <Sky id="hs13" c={['#0a0608', '#1A1430', '#2A1A10']} />
    <Glow cx={540} cy={1450} r={420} c="#F2A02A" o={0.3} />
    <ShaniShila x={540} y={1700} s={1.2} />
    <OilPot x={430} y={1130} s={1} tilt={50} pour={1} f={f} />
    {[220, 860].map((x, i) => <g key={x} transform={`translate(${x} 1740) scale(1.3)`}><Diya flame={1} t={f + i * 9} /></g>)}
  </Svg>
);
const HS14: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="hs14" c={['#0a0608', '#2A1438', '#0a0608']} />
    <Versus a="हनुमान" b="शनि" f={f} />
    <Hanu x={260} y={1700} s={2.1} pose={{eyes: 'open', mouth: 'smile', blink: blink(f)}} />
    <A who="shani" x={820} y={1700} s={2.1} flip pose={{eyes: 'open', mouth: 'flat', blink: blink(f, 30)}} />
  </Svg>
);
export const hanumanshani: Cfg = {
  id: 'HanumanShani', voice: 'hanumanshani.wav', script: sHs, timings: tHs, pushIn: true,
  hook: 'शनिवार को शनि पर तेल क्यों चढ़ता है?',
  scenes: [[HS1, [0]], [HS2, [1]], [HS3, [2]], [HS4, [3]], [HS5, [4]], [HS6, [5]], [HS7, [6]], [HSclose, [7]], [HS9, [8]], [HS10, [9]], [HS11, [10]], [HSsrc, [11]], [HS13, [12]], [HS14, [13]], [HS1, [14]]],
  titles: [
    null,
    {pill: 'समुद्र किनारे', title: 'राम नाम'},
    {pill: 'आ गए', title: 'शनि देव', red: 'शनि'},
    {pill: 'हाथ जोड़कर', title: 'विनती'},
    {pill: 'शनि अड़ गए', title: 'ज़िद', red: 'ज़िद'},
    {pill: 'हनुमान की', title: 'पूँछ'},
    {pill: 'चट्टानों पर', title: 'पटका'},
    {pill: 'दर्द से कराहे', title: 'शनि देव'},
    {pill: 'शनि का', title: 'वचन'},
    {pill: 'घावों पर', title: 'तेल'},
    {pill: 'दर्द गया', title: 'शांति'},
    {pill: 'स्रोत', title: 'लोककथा'},
    {pill: 'अगले', title: 'शनिवार'},
    {pill: 'आपकी राय', title: 'ताकतवर कौन?'},
    {pill: 'कालचित्र', title: 'फॉलो करें'},
  ],
  fx: {2: {quote: 'अब मेरी दृष्टि तुम पर पड़ेगी'}, 3: {quote: 'मुझे राम का काम करने दीजिए'}, 8: {quote: 'तुम्हारे भक्तों को कभी नहीं सताऊँगा'}, 9: {label: 'सरसों का तेल'}, 11: {label: 'लोककथा • शास्त्र नहीं'}},
  end: {pill: 'कालचित्र', title: 'ऐसी ही\nअनसुनी कथाएँ', sub: 'फॉलो करें @kaalchitra.verse'}, endScene: EndCard,
};
