import React from 'react';
import sB from '../../videos/bhishma/script.json';
import tB from '../../videos/bhishma/timings.json';
import sH from '../../videos/balhanuman/script.json';
import tH from '../../videos/balhanuman/timings.json';
import {A, Arrow, BattleBG, blink, bob, CosmicBG, EndCard, Flash, Glow, Hills, lerp, p, PalaceBG, Place, Rays, Sky, Stars, Svg} from '../kit';
import {Vanar} from '../chars';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

// ---------------- BHISHMA ----------------
const ArrowBed: React.FC<{f: number; n?: number}> = ({f, n = 22}) => (
  <g>
    {Array.from({length: n}).map((_, i) => {
      const x = 240 + (i * 600) / n; const tilt = ((i * 37) % 30) - 15;
      return <g key={i} transform={`translate(${x} 1640) rotate(${tilt + Math.sin(f / 30 + i) * 0.5})`}><rect x={-2.5} y={-170} width={5} height={170} fill="#8A5A1C" /><path d="M0 -170 l-9 -14 h18z" fill="#E57A2B" /></g>;
    })}
  </g>
);
const B1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <Sky id="bh1" c={['#120808', '#5A1E10', '#E07A3A']} />
    <Rays f={f} cx={540} cy={1250} op={0.2} />
    <ArrowBed f={f} />
    <A who="bhishma" x={700} y={1400} s={2} rot={-90} pose={{eyes: 'closed', mouth: 'smile', armL: 10, armR: -10}} />
  </Svg>
);
const B2: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="bh2" c={['#4A7AA0', '#9AC8E0', '#E8F2F8']} />
    <path d="M0 1450 Q540 1380 1080 1450 L1080 1920 L0 1920Z" fill="#5AA8C8" />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M${(i * 280 + f * 2) % 1200 - 100} ${1520 + i * 80} q40 -12 80 0`} stroke="#E8F6FF" strokeWidth={5} fill="none" opacity={0.6} />)}
    <A who="shantanu" x={220} y={1640} s={1.9} pose={{mouth: 'smile', blink: blink(f, 9)}} />
    <A who="ganga" x={860} y={1560} s={1.9} flip pose={{mouth: 'smile', blink: blink(f, 30), armL: -60}} o={0.9} />
    <A who="devvrat" x={540} y={1660} s={2.2} prop="bow" pose={{mouth: 'smile', blink: blink(f)}} />
  </Svg>
);
const B3: React.FC<SP> = ({f, L}) => {
  const cond = f >= L[1];
  return (
    <Svg>
      <Sky id="bh3" c={['#3A2A4A', '#C2602A', '#F2B05A']} />
      <path d="M0 1500 Q540 1460 1080 1500 L1080 1920 L0 1920Z" fill="#2A6A7A" />
      <A who="shantanu" x={220} y={1640} s={2} pose={{mouth: cond ? 'sad' : 'smile', eyes: cond ? 'sad' : 'open', blink: !cond && blink(f)}} />
      <A who="satyavati" x={560} y={1640} s={2} pose={{mouth: 'smile', blink: blink(f, 40)}} />
      {cond && <A who="fisherman" x={860} y={1640} s={2} flip pose={{armL: -110, mouth: 'flat', eyes: 'angry'}} />}
    </Svg>
  );
};
const B4: React.FC<SP> = ({f, L}) => {
  const vow = f >= L[2];
  const flowers = f >= L[3];
  return (
    <Svg zoom={vow && !flowers ? 1 + p(f, L[2], L[2] + 20) * 0.35 : 1} oy={1150}>
      <PalaceBG tint="#2A1208" />
      {!vow && <path d="M380 1500 h320 v40 h-320Z M420 1300 h240 v200 h-240Z" fill="#D9A23A" opacity={0.85} />}
      <A who="fisherman" x={200} y={1660} s={1.8} pose={{eyes: vow ? 'shock' : 'open', mouth: vow ? 'o' : 'flat'}} o={0.85} />
      <A who="devvrat" x={vow ? 540 : 820} y={1660} s={2.3} flip={!vow} prop={vow ? 'none' : 'bow'} pose={{armR: vow ? -170 : -10, eyes: vow ? 'closed' : 'open', mouth: 'flat', blink: !vow && blink(f)}} />
      {vow && <Rays f={f * 2} cx={540} cy={900} op={0.25} />}
      {flowers && Array.from({length: 26}).map((_, i) => { const t = ((f - L[3]) * (1 + (i % 4) * 0.2) + i * 30) % 400; return <circle key={i} cx={100 + ((i * 97) % 880) + Math.sin(t / 30 + i) * 30} cy={t * 4 - 100} r={10} fill={i % 2 ? '#FF8A2A' : '#FFD24A'} />; })}
    </Svg>
  );
};
const B5: React.FC<SP> = ({f}) => (
  <Svg>
    <PalaceBG tint="#2A1208" />
    <Rays f={f} cx={540} cy={1000} op={0.2} />
    <A who="shantanu" x={280} y={1660} s={2.1} pose={{armR: -110, mouth: 'smile'}} />
    <A who="bhishma" x={780} y={1700} s={2.1} flip pose={{legL: -60, legR: 60, eyes: 'closed', mouth: 'smile', head: 12}} />
    <Glow cx={780} cy={1300} r={260} c="#FFE27A" o={0.5} />
  </Svg>
);
const B6: React.FC<SP> = ({f, L}) => {
  const tell = f >= L[1];
  return (
    <Svg>
      <BattleBG f={f} night={tell} />
      {!tell ? <><A who="bhishma" x={540} y={1600} s={2.6} prop="bow" pose={{armR: -90, armL: -80, eyes: 'angry', mouth: 'grit'}} />{[0, 1, 2].map((i) => <Arrow key={i} x={lerp(((f + i * 12) % 30) / 30, 640, 1200)} y={1200 + i * 60} rot={0} />)}</>
        : <><A who="bhishma" x={760} y={1640} s={2.2} flip pose={{mouth: 'flat', eyes: 'open', armL: -60}} /><A who="arjun" x={260} y={1640} s={2} prop="bow" pose={{eyes: 'sad', mouth: 'flat'}} /><A who="krishna" x={460} y={1660} s={1.7} pose={{mouth: 'flat', blink: blink(f)}} /></>}
    </Svg>
  );
};
const B7: React.FC<SP> = ({f, L}) => {
  const fall = f >= L[1];
  const tilt = p(f, L[1], L[1] + 30);
  return (
    <Svg shake={!fall && f % 12 < 2 ? f : 0}>
      <BattleBG f={f} />
      {!fall && <><A who="shikhandi" x={330} y={1660} s={2} prop="spear" pose={{mouth: 'grit'}} /><A who="arjun" x={180} y={1660} s={2} prop="bow" pose={{armR: -90, armL: -80, mouth: 'grit', eyes: 'angry'}} />{Array.from({length: 6}).map((_, i) => <Arrow key={i} x={lerp(((f + i * 8) % 24) / 24, 300, 820)} y={1150 + i * 40} rot={0} />)}<A who="bhishma" x={820} y={1640} s={2.2} flip prop="bow" pose={{eyes: 'closed', mouth: 'flat', armL: 6}} /></>}
      {fall && <><ArrowBed f={f} /><A who="bhishma" x={lerp(tilt, 540, 700)} y={lerp(tilt, 1640, 1400)} s={2} rot={lerp(tilt, 0, -90)} pose={{eyes: 'closed', mouth: 'smile'}} /></>}
    </Svg>
  );
};
const B8: React.FC<SP> = ({f, L}) => {
  const day = Math.sin(f / 14);
  return (
    <Svg>
      {f < L[1] ? <Sky id={day > 0 ? 'bh8d' : 'bh8n'} c={day > 0 ? ['#3A2A1A', '#C2702A', '#F2B05A'] : ['#05070f', '#141E40', '#2A2450']} /> : <Sky id="bh8e" c={['#2A0E06', '#8A3A14', '#F2A04A']} />}
      {f < L[1] && <g transform={`translate(${540 + Math.cos(f / 14) * 420} ${700 - Math.abs(day) * 260})`}><circle r={60} fill={day > 0 ? '#FFE27A' : '#F3EAD0'} /></g>}
      {f >= L[1] && <Rays f={f} cx={540} cy={900} op={0.25} />}
      <ArrowBed f={f} />
      <A who="bhishma" x={700} y={1400} s={2} rot={-90} pose={{eyes: f >= L[1] ? 'closed' : 'open', mouth: 'smile'}} />
    </Svg>
  );
};
export const bhishma: Cfg = {
  id: 'Bhishma', voice: 'bhishma.wav', script: sB, timings: tB,
  scenes: [[B1, [0]], [B2, [1]], [B3, [2, 3]], [B4, [4, 5, 6, 7]], [B5, [8]], [B6, [9, 10]], [B7, [11, 12]], [B8, [13, 14]]],
  titles: [
    {pill: 'MAUT BHI RUKI', title: 'ICHCHHA\nMRITYU.'},
    {pill: 'GANGA PUTRA', title: 'DEVVRAT.'},
    {pill: 'PITA KA PREM', title: 'SATYAVATI.'}, {pill: 'EK', title: 'SHART.', red: 'SHART'},
    {pill: 'PITA KE LIYE', title: 'TYAAG.'}, {pill: 'PHIR BHI', title: 'DAR.'}, {pill: 'BHEESHAN', title: 'PRATIGYA.'}, {pill: 'US DIN SE', title: 'BHEESHM.'},
    {pill: 'PITA KA', title: 'VARDAAN.'},
    {pill: 'MAHABHARAT', title: 'DAS DIN.'}, {pill: 'KHUD BATAAYA', title: 'SHIKHANDI.'},
    {pill: 'ARJUN KE', title: 'BAAN.'}, {title: 'BAANON KI\nSHAIYYA.', red: 'SHAIYYA'},
    {pill: 'UTTARAYAN TAK', title: '58 DIN.'}, {title: 'VACHAN.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'BHEESHM.', sub: 'Ek pratigya ki keemat'}, endScene: EndCard,
};

// ---------------- BAL HANUMAN ----------------
const KidH: React.FC<{x: number; y: number; s?: number; rot?: number; pose?: any; swollen?: boolean}> = ({x, y, s = 1.4, rot = 0, pose, swollen}) => (
  <Place x={x} y={y} s={s} rot={rot}><Vanar kind="hanuman" kid swollen={swollen} pose={pose} /></Place>
);
const SunBall: React.FC<{x: number; y: number; r: number; f: number}> = ({x, y, r, f}) => (
  <g><Glow cx={x} cy={y} r={r * 3} c="#FF8A2A" o={0.6} /><circle cx={x} cy={y} r={r} fill="#FF7A2A" /><circle cx={x} cy={y} r={r * 0.75} fill="#FFB347" /><circle cx={x - r * 0.25} cy={y - r * 0.25} r={r * 0.25} fill="#FFE2A0" opacity={0.6 + Math.sin(f / 8) * 0.2} /></g>
);
const H1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <Sky id="hh1" c={['#3A1206', '#E0602A', '#FFC870']} />
    <SunBall x={540} y={760} r={150} f={f} />
    <KidH x={540} y={1500} s={2.3} pose={{armL: 140, armR: -140, mouth: 'o', eyes: 'shock', legL: 20, legR: -20}} />
  </Svg>
);
const H2: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="hh2" c={['#3A5A8A', '#9AC0E0', '#F2E2B0']} />
    <Hills c="#5A8A4A" y={1480} />
    {[0, 1, 2].map((i) => <path key={i} d={`M${((i * 400 + f * 6) % 1300) - 150} ${800 + i * 140} q60 -30 120 0 q60 30 120 0`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.5} />)}
    <A who="pavan" x={240} y={1300} s={1.5} o={0.6} pose={{armR: -60, mouth: 'smile'}} />
    <A who="anjana" x={780} y={1660} s={2} flip pose={{armL: -60, mouth: 'smile', blink: blink(f, 20)}} />
    <KidH x={520} y={1660} s={1.7} pose={{mouth: 'smile', blink: blink(f), armL: 30, armR: -30}} />
  </Svg>
);
const H3: React.FC<SP> = ({f, L}) => {
  const see = f >= L[1];
  return (
    <Svg zoom={see ? 1 : 1.15} oy={1300}>
      <Sky id="hh3" c={['#5A2A2A', '#E07A3A', '#FFD27A']} />
      <SunBall x={800} y={see ? 700 : 1100} r={see ? 110 : 80} f={f} />
      <Hills c="#5A6A3A" y={1480} />
      <KidH x={360} y={1660} s={2} pose={{mouth: see ? 'smile' : 'sad', eyes: see ? 'open' : 'sad', armR: see ? -150 : -10, head: see ? -10 : 0, blink: blink(f)}} />
      {!see && [0, 1, 2].map((i) => <circle key={i} cx={420 + i * 26} cy={1360 - ((f * 2 + i * 20) % 60)} r={6} fill="#fff" opacity={0.5} />)}
    </Svg>
  );
};
const H4: React.FC<SP> = ({f, L, dur}) => {
  const t = f / dur;
  return (
    <Svg>
      <Sky id="hh4" c={['#5A1A0A', '#E0602A', '#FFC870']} />
      {Array.from({length: 14}).map((_, i) => <rect key={i} x={(i * 83) % 1080} y={((i * 211 + f * 30) % 2200) - 200} width={4} height={160} fill="#FFF2C0" opacity={0.4} />)}
      <SunBall x={540} y={lerp(t, 500, 640)} r={lerp(t, 90, 260)} f={f} />
      <KidH x={540} y={lerp(t, 1700, 1200)} s={lerp(t, 1.6, 1.1)} rot={-10} pose={{armL: 160, armR: -160, legL: 10, legR: -10, mouth: f >= L[1] ? 'laugh' : 'smile'}} />
    </Svg>
  );
};
const H5: React.FC<SP> = ({f, L}) => {
  const dark = f >= L[1];
  const eat = p(f, 0, 30);
  return (
    <Svg>
      {dark ? <CosmicBG f={f} c="#0a0a18" /> : <Sky id="hh5" c={['#5A1A0A', '#E0602A', '#FFC870']} />}
      {!dark && <SunBall x={lerp(eat, 760, 560)} y={lerp(eat, 900, 1060)} r={lerp(eat, 160, 30)} f={f} />}
      <KidH x={540} y={1450} s={2.2} swollen={eat > 0.8} pose={{armL: 60, armR: -60, mouth: eat > 0.8 ? 'flat' : 'o', eyes: dark ? 'closed' : 'open'}} />
      {dark && <Glow cx={540} cy={1180} r={140} c="#FF8A2A" o={0.45} />}
      {dark && <Hills c="#05050a" y={1700} />}
    </Svg>
  );
};
const H6: React.FC<SP> = ({f, L}) => {
  const hit = f >= L[1];
  const fl = p(f, L[0] + 30, L[0] + 44);
  const fall = p(f, L[1], L[1] + 40);
  return (
    <Svg shake={fl > 0 && fl < 1 ? f : 0}>
      <CosmicBG f={f} c="#1A1A3A" />
      {!hit && <><A who="indra" x={260} y={1500} s={2} pose={{armR: -150, eyes: 'angry', mouth: 'grit'}} /><KidH x={780} y={1050} s={1.6} swollen pose={{mouth: 'flat'}} /><path d={`M300 1060 L${lerp(fl, 300, 760)} ${lerp(fl, 1060, 1000)}`} stroke="#E9F6FF" strokeWidth={10} opacity={fl > 0 ? 1 : 0} /><Flash t={fl} c="#E9F6FF" /></>}
      {hit && <><Hills c="#2A3A2A" y={1600} /><KidH x={lerp(fall, 760, 540)} y={lerp(fall, 900, 1640)} s={1.6} rot={lerp(fall, 0, 90)} swollen pose={{eyes: 'closed', mouth: 'flat'}} /></>}
    </Svg>
  );
};
const H7: React.FC<SP> = ({f, L}) => {
  const gods = f >= L[1];
  return (
    <Svg>
      <Sky id="hh7" c={['#1A1E2A', '#3A4A5A', '#2A3030']} />
      <Hills c="#2A3A2A" y={1600} />
      <KidH x={540} y={1650} s={1.5} rot={90} swollen pose={{eyes: 'closed', mouth: 'flat'}} />
      <A who="pavan" x={gods ? 300 : 540} y={1560} s={2.2} pose={{eyes: 'sad', mouth: 'sad', head: 12, legL: -60, legR: 60}} />
      {!gods && Array.from({length: 6}).map((_, i) => <path key={i} d={`M${100 + i * 160} 900 q40 -20 80 0`} stroke="#9AA" strokeWidth={4} fill="none" opacity={0.3} />)}
      {gods && <><A who="indra" x={760} y={1600} s={1.7} flip pose={{mouth: 'sad', eyes: 'sad'}} /><A who="brahma" x={930} y={1600} s={1.7} flip pose={{mouth: 'smile', armL: -90}} /><Glow cx={540} cy={1560} r={260} c="#FFE27A" o={0.3} /></>}
    </Svg>
  );
};
const H8: React.FC<SP> = ({f, L}) => {
  const name = f >= L[1];
  return (
    <Svg zoom={name ? 1.35 : 1} oy={1200}>
      <Sky id="hh8" c={['#2A1206', '#C2702A', '#FFD27A']} />
      <Rays f={f} cx={540} cy={1100} op={0.28} />
      <Glow cx={540} cy={1150} r={460} c="#FFE3A0" o={0.5} />
      <A who="brahma" x={200} y={1660} s={1.8} pose={{armR: -90, mouth: 'smile'}} o={name ? 0 : 1} />
      <A who="pavan" x={880} y={1660} s={1.8} flip pose={{mouth: 'smile'}} o={name ? 0 : 1} />
      <KidH x={540} y={1560} s={2} swollen pose={{mouth: 'smile', eyes: 'open', blink: blink(f), armL: 40, armR: -40}} />
      {name && <circle cx={540} cy={1336} r={40} fill="none" stroke="#FFE27A" strokeWidth={4} opacity={0.6 + Math.sin(f / 5) * 0.3} />}
    </Svg>
  );
};
export const balhanuman: Cfg = {
  id: 'BalHanuman', voice: 'balhanuman.wav', script: sH, timings: tH,
  scenes: [[H1, [0]], [H2, [1]], [H3, [2, 3]], [H4, [4, 5]], [H5, [6, 7]], [H6, [8, 9]], [H7, [10, 11]], [H8, [12, 13, 14]]],
  titles: [
    {pill: 'EK BAALAK NE', title: 'SOORAJ\nNIGLA.', red: 'NIGLA'},
    {pill: 'PAVAN PUTRA', title: 'BAAL HANUMAN.'},
    {pill: 'SUBAH SUBAH', title: 'BHOOKH.'}, {pill: 'LAAL LAAL', title: 'PHAL?'},
    {pill: 'SOORAJ KI OR', title: 'UDAAN.'}, {pill: 'HAWA KA BETA', title: 'PAL BHAR.'},
    {pill: 'MUNH MEIN', title: 'SOORAJ.'}, {title: 'ANDHERA.', red: 'ANDHERA'},
    {pill: 'INDRA KA', title: 'VAJRA.'}, {pill: 'THODI PAR', title: 'CHOT.'},
    {pill: 'PAVAN DEV', title: 'ROOTHE.'}, {pill: 'HAWA BAND', title: 'HAAHAAKAAR.'},
    {pill: 'BRAHMA KA', title: 'VARDAAN.'}, {pill: 'HANU MATLAB THODI', title: 'HANUMAN.'}, {title: 'PEHCHAAN.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'BAAL\nHANUMAN.', sub: 'Naam ke peechhe ki kahani'}, endScene: EndCard,
};
void bob; void Stars;

// ---------------- BAL HANUMAN (30s cut: cold open, fewer lines, comment question) ----------------
import sH30 from '../../videos/balhanuman30/script.json';
import tH30 from '../../videos/balhanuman30/timings.json';
const HOpen: React.FC<SP> = (p) => <H5 {...p} L={[0, 99999]} />;
const HAsk: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <CosmicBG f={f} c="#1A1A3A" />
    <A who="indra" x={290} y={1560} s={2} pose={{armR: -60, eyes: 'open', mouth: 'flat', blink: blink(f)}} />
    <KidH x={790} y={1560} s={1.7} swollen pose={{mouth: 'smile', eyes: 'open', blink: blink(f, 30)}} />
    <text x={540} y={1060} textAnchor="middle" fontSize={180} fontFamily="Georgia, serif" fill="#F0C25A" opacity={0.8 + Math.sin(f / 6) * 0.2}>?</text>
  </Svg>
);
export const balhanuman30: Cfg = {
  id: 'BalHanuman30', voice: 'balhanuman30.wav', script: sH30, timings: tH30,
  scenes: [[HOpen, [0]], [H4, [1, 2]], [H5, [3, 4]], [H6, [5, 6]], [H8, [7, 8]], [HAsk, [9]]],
  titles: [
    {pill: 'EK BAALAK NE', title: 'SOORAJ\nNIGLA.', red: 'NIGLA'},
    {pill: 'LAAL LAAL', title: 'PHAL?'}, {pill: 'SOORAJ KI OR', title: 'UDAAN.'},
    {pill: 'MUNH MEIN', title: 'SOORAJ.'}, {title: 'ANDHERA.', red: 'ANDHERA'},
    {pill: 'INDRA KA', title: 'VAJRA.'}, {pill: 'THODI PAR', title: 'CHOT.'},
    {pill: 'HANU MATLAB THODI', title: 'HANUMAN.'}, {title: 'PEHCHAAN.'},
    {pill: 'AAP BATAO', title: 'SAHI YA\nGALAT?', red: 'GALAT?'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'BAAL\nHANUMAN.', sub: 'Follow @kaalchitra.verse'}, endScene: EndCard,
};
