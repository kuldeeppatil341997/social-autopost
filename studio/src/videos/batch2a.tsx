import React from 'react';
import sA from '../../videos/abhimanyu/script.json';
import tA from '../../videos/abhimanyu/timings.json';
import sK from '../../videos/karna/script.json';
import tK from '../../videos/karna/timings.json';
import {A, Arrow, BattleBG, blink, bob, CosmicBG, EndCard, Flash, Glow, lerp, p, PalaceBG, Place, Rays, Sky, Stars, Svg} from '../kit';
import {Wheel} from '../people';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

// ---------------- ABHIMANYU ----------------
const Vyuh: React.FC<{f: number; c?: string; rings?: number; o?: number}> = ({f, c = '#F0C25A', rings = 6, o = 0.8}) => (
  <g transform={`translate(540 1150) rotate(${f * 0.2})`} opacity={o}>
    {Array.from({length: rings}).map((_, i) => (
      <circle key={i} r={90 + i * 70} fill="none" stroke={c} strokeWidth={6} strokeDasharray={`${60 + i * 10} 40`} opacity={1 - i * 0.12} />
    ))}
  </g>
);
const Womb: React.FC<{f: number}> = ({f}) => (
  <g transform="translate(540 1050)">
    <circle r={150} fill="#B8402A" opacity={0.35} /><circle r={150} fill="none" stroke="#F0C25A" strokeWidth={4} opacity={0.6} />
    <g transform={`rotate(${Math.sin(f / 20) * 6}) scale(0.9)`}>
      <circle cx={0} cy={-20} r={44} fill="#EDB98A" /><ellipse cx={10} cy={40} rx={40} ry={56} fill="#EDB98A" />
      <path d="M-14 -24 q8 6 16 0" stroke="#5a2410" strokeWidth={3} fill="none" />
    </g>
  </g>
);
const A1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <BattleBG f={f} />
    <Vyuh f={f} o={0.45} />
    <A who="abhimanyu" x={540} y={1600} s={2.6} prop="bow" pose={{armR: -40, mouth: 'flat', blink: blink(f)}} />
  </Svg>
);
const A2: React.FC<SP> = ({f, L}) => {
  const inside = f >= L[1];
  return (
    <Svg>
      <Sky id="ab2" c={['#140a1e', '#3A1E4A', '#140a1e']} />
      <Stars n={40} f={f} seed="ab2" />
      <A who="subhadra" x={330} y={1640} s={2.2} pose={{eyes: f > L[2] ? 'closed' : 'open', mouth: 'smile', head: f > L[2] ? 14 : 0, armL: 20}} />
      <A who="arjun" x={780} y={1640} s={2.2} flip pose={{armL: -60 + bob(f, 20, 6), mouth: f < L[2] ? (f % 16 < 8 ? 'o' : 'smile') : 'flat', blink: blink(f)}} />
      {!inside && <Vyuh f={f} rings={5} o={0.5} />}
      {inside && <g opacity={p(f, L[1], L[1] + 16)}><Womb f={f} /></g>}
      {inside && f < L[2] && [0, 1, 2].map((i) => <circle key={i} cx={lerp(((f + i * 10) % 30) / 30, 700, 560)} cy={1100} r={6} fill="#F0C25A" />)}
    </Svg>
  );
};
const A3: React.FC<SP> = ({f, L}) => (
  <Svg zoom={1 + f * 0.0006}>
    <BattleBG f={f} />
    <A who="drona" x={260} y={1640} s={2.1} pose={{armR: -120, mouth: 'flat', blink: blink(f)}} />
    <Vyuh f={f} />
    {f >= L[1] && <A who="arjun" x={900} y={900} s={1.1} o={0.35} prop="bow" />}
  </Svg>
);
const A4: React.FC<SP> = ({f, L}) => {
  const charge = f >= L[1];
  const x = charge ? lerp(p(f, L[1], L[1] + 40), 200, 540) : 540;
  return (
    <Svg zoom={charge ? 1 : 1.25} oy={1100}>
      <BattleBG f={f} />
      <Vyuh f={f} o={charge ? 0.9 : 0.3} />
      {charge && Array.from({length: 6}).map((_, i) => (f > L[1] + 20 + i * 10) && <circle key={i} cx={540 + Math.cos(i) * (90 + i * 70)} cy={1150 + Math.sin(i) * (90 + i * 70)} r={30} fill="#FFE27A" opacity={0.5} />)}
      <A who="abhimanyu" x={x} y={1640} s={charge ? 2 : 2.6} prop="bow" pose={{armR: charge ? -90 : -30, eyes: charge ? 'angry' : 'open', mouth: charge ? 'grit' : 'smile', legL: charge ? Math.sin(f / 3) * 14 : 2, blink: !charge && blink(f)}} />
    </Svg>
  );
};
const A5: React.FC<SP> = ({f, L}) => {
  const alone = f >= L[1];
  return (
    <Svg>
      <BattleBG f={f} />
      <Vyuh f={f} c="#E2413A" o={0.7} />
      {!alone && <><A who="jayadrath" x={540} y={1700} s={2.3} prop="mace" pose={{mouth: 'grit', eyes: 'angry', armL: 60}} /><A who="bheem" x={160} y={1700} s={1.6} o={0.6} /><A who="soldier" x={900} y={1700} s={1.6} o={0.6} flip /></>}
      {alone && <A who="abhimanyu" x={540} y={1500} s={1.8} prop="bow" pose={{eyes: 'shock', mouth: 'o', blink: false}} />}
    </Svg>
  );
};
const A6: React.FC<SP> = ({f, L}) => {
  const wheel = f >= L[1];
  return (
    <Svg shake={f % 30 < 3 ? f : 0}>
      <BattleBG f={f} night />
      {Array.from({length: 7}).map((_, i) => { const a = (i / 7) * Math.PI * 2 + f / 80; return <A key={i} who={(['karna', 'drona', 'duryodhan', 'soldier', 'jayadrath', 'soldier', 'karna'] as const)[i]} x={540 + Math.cos(a) * 400} y={1600 + Math.sin(a) * 120} s={1.2} flip={Math.cos(a) > 0} prop="spear" pose={{eyes: 'angry', mouth: 'grit'}} o={0.85} />; })}
      <A who="abhimanyu" x={540} y={1560} s={2.1} prop={wheel ? 'none' : 'bow'} pose={{armL: wheel ? 150 : 30, armR: wheel ? -150 : -60, eyes: 'angry', mouth: 'grit'}} />
      {wheel && <Place x={540} y={1100} s={1.1}><Wheel r={80} rot={f * 2} /></Place>}
    </Svg>
  );
};
const A7: React.FC<SP> = ({f, L}) => {
  const fade = p(f, 0, 50);
  return (
    <Svg>
      <Sky id="ab7" c={['#1a0a06', '#8A3A14', '#F2A04A']} />
      <Rays f={f} cx={540} cy={1000} op={0.25} />
      <Glow cx={540} cy={1100} r={520} c="#FFE3A0" o={0.45} />
      <Place x={540} y={1650} s={0.9}><Wheel r={90} /></Place>
      <A who="abhimanyu" x={540} y={1560} s={2.4} o={f >= L[1] ? 1 : 1 - fade * 0.3} pose={{eyes: f >= L[1] ? 'open' : 'closed', mouth: 'smile', armL: 20, armR: -20}} />
    </Svg>
  );
};
export const abhimanyu: Cfg = {
  id: 'Abhimanyu', voice: 'abhimanyu.wav', script: sA, timings: tA,
  scenes: [[A1, [0]], [A2, [1, 2, 3]], [A3, [4, 5]], [A4, [6, 7]], [A5, [8, 9]], [A6, [10, 11, 12]], [A7, [13, 14]]],
  titles: [
    {pill: 'GARBH MEIN SEEKHA', title: 'YUDDH.'},
    {pill: 'ARJUN KA RAHASYA', title: 'CHAKRAVYUH.'}, {pill: 'GARBH MEIN', title: 'ABHIMANYU.'}, {pill: 'ADHOORA', title: 'GYAAN.', red: 'GYAAN'},
    {pill: 'KURUKSHETRA', title: 'DIN 13.'}, {pill: 'SIRF EK', title: 'YODDHA.'},
    {pill: 'SIRF 16 SAAL', title: 'ABHIMANYU.'}, {title: 'AKELA.'},
    {pill: 'RAASTA BAND', title: 'JAYADRATH.', red: 'JAYADRATH'}, {title: 'VYUH KE BEECH.'},
    {pill: 'EK PAR SAAT', title: 'MAHARATHI.'}, {pill: 'DHANUSH TOOTA', title: 'RATH KA PAHIYA.'}, {title: 'AAKHRI SAANS.'},
    {pill: 'PEECHHE NAHI HATA', title: 'VEER.'}, {title: 'SAAHAS.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'ABHIMANYU.', sub: 'Chakravyuh ka veer'}, endScene: EndCard,
};

// ---------------- KARNA ----------------
const Kavach: React.FC<{x: number; y: number; s?: number; glow?: number}> = ({x, y, s = 1, glow = 0.6}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Glow cx={0} cy={0} r={160} c="#FFD24A" o={glow} />
    <path d="M-70 -80 Q0 -100 70 -80 Q76 0 50 70 Q0 96 -50 70 Q-76 0 -70 -80Z" fill="#F0C25A" stroke="#B9852A" strokeWidth={6} />
    <circle r={22} fill="#FFF3B0" /><path d="M-50 -40 Q0 -20 50 -40 M-46 10 Q0 30 46 10" stroke="#B9852A" strokeWidth={4} fill="none" />
  </g>
);
const Sun: React.FC<{f: number; x?: number; y?: number; r?: number}> = ({f, x = 540, y = 700, r = 150}) => (
  <g><Rays f={f} color="#FFD24A" cx={x} cy={y} op={0.3} /><Glow cx={x} cy={y} r={r * 2.5} c="#FFD27A" o={0.6} /><circle cx={x} cy={y} r={r} fill="#FFE27A" /></g>
);
const K1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <Sky id="k1" c={['#2A1206', '#C2602A', '#F2B05A']} />
    <Sun f={f} y={800} r={120} />
    {[0, 1, 2].map((i) => <Arrow key={i} x={lerp(((f + i * 15) % 40) / 40, 100, 470)} y={1150 + i * 60} rot={0} />)}
    {[0, 1, 2].map((i) => ((f + i * 15) % 40) > 36 && <circle key={'s' + i} cx={480} cy={1150 + i * 60} r={20} fill="#FFF3B0" />)}
    <A who="karna" x={600} y={1640} s={2.5} prop="bow" pose={{mouth: 'smile', blink: blink(f)}} />
  </Svg>
);
const K2: React.FC<SP> = ({f, L}) => (
  <Svg>
    <Sky id="k2" c={['#3A1806', '#E07A2A', '#FFD27A']} />
    <Sun f={f} y={760} />
    <A who="surya" x={300} y={1300} s={1.4} o={0.55} pose={{armR: -60}} />
    <A who="karna" x={620} y={1640} s={2.5} pose={{mouth: 'smile', blink: blink(f), armL: 20}} />
    {f >= L[1] && <Kavach x={620} y={1360} s={1.1} glow={0.4 + Math.sin(f / 6) * 0.15} />}
  </Svg>
);
const K3: React.FC<SP> = ({f, L}) => (
  <Svg>
    <CosmicBG f={f} c="#1E2A5A" />
    <A who="indra" x={540} y={1600} s={2.3} pose={{eyes: f >= L[0] + 20 ? 'sad' : 'open', mouth: 'flat', armR: -80}} />
    <g opacity={0.3}><A who="arjun" x={850} y={1300} s={1.2} prop="bow" /></g>
    <Glow cx={540} cy={700} r={200} c="#9FD8FF" o={0.4} />
    {f % 40 < 4 && <path d="M500 400 L470 600 L520 600 L480 800" stroke="#E9F6FF" strokeWidth={8} fill="none" />}
  </Svg>
);
const K4: React.FC<SP> = ({f, L}) => {
  const reply = f >= L[2];
  return (
    <Svg>
      <Sky id="k4" c={['#05070f', '#141E40', '#2A2450']} />
      <Stars n={70} f={f} seed="k4" />
      <path d="M200 1500 h680 v60 h-680Z" fill="#3A2A20" />
      <A who="karna" x={540} y={reply ? 1600 : 1520} s={2.2} rot={reply ? 0 : -90} pose={{eyes: reply ? 'open' : 'closed', mouth: 'smile', armL: 10, armR: -10}} />
      {!reply && <g opacity={0.9}><Glow cx={540} cy={700} r={260} c="#FFD27A" o={0.6} /><A who="surya" x={540} y={1000} s={1.5} pose={{armR: -110, mouth: 'flat', eyes: 'open'}} /></g>}
    </Svg>
  );
};
const K5: React.FC<SP> = ({f, L}) => {
  const ask = f >= L[1];
  return (
    <Svg>
      <Sky id="k5" c={['#3A1806', '#E07A2A', '#FFE2A0']} />
      <Sun f={f} y={700} r={110} />
      <path d={`M0 1500 Q540 1460 1080 1500 L1080 1920 L0 1920Z`} fill="#2A6A7A" />
      <A who="karna" x={700} y={1640} s={2.3} flip pose={{armL: -150, armR: 150, eyes: ask ? 'open' : 'closed', mouth: 'smile'}} />
      <A who="brahmin" x={260} y={1640} s={2.1} pose={{armR: ask ? -70 : -20, mouth: 'flat', blink: blink(f)}} />
      {ask && <Kavach x={700} y={1100} s={0.8} glow={0.5} />}
    </Svg>
  );
};
const K6: React.FC<SP> = ({f, L}) => {
  const g0 = L[0] + 26;
  const give = f >= g0;
  const fl = p(f, g0 + 4, g0 + 18);
  const mv = p(f, g0 + 18, g0 + 50);
  return (
    <Svg zoom={give ? 1 : 1 + p(f, 0, 14) * 0.4} ox={700} oy={1200}>
      <Sky id="k6" c={['#3A1806', '#C2502A', '#2A0E06']} />
      <Sun f={f} y={600} r={90} />
      <A who="brahmin" x={260} y={1640} s={2.1} pose={{armR: -60, mouth: give ? 'o' : 'flat', eyes: give ? 'shock' : 'open'}} />
      <A who={give ? {skin: '#D9A877', dhoti: '#8A1E1E', torso: '#D9A877', crown: 'mukut', hair: '#1d1410'} : 'karna'} x={720} y={1640} s={2.3} flip pose={{mouth: 'smile', eyes: give ? 'closed' : 'open', armL: give ? -80 : 10}} />
      {give && <Kavach x={lerp(mv, 720, 360)} y={1360} s={0.8} glow={0.6} />}
      <Flash t={fl} c="#FFF3B0" />
    </Svg>
  );
};
const K7: React.FC<SP> = ({f, L}) => (
  <Svg>
    <CosmicBG f={f} c="#1A2A5A" />
    <Rays f={f} color="#9FD8FF" cx={540} cy={900} op={0.2} />
    {f < L[1] ? <A who="indra" x={540} y={1600} s={2.3} pose={{eyes: 'sad', mouth: 'flat', head: 12, armR: -100}} />
      : <g><A who="ghatotkach" x={760} y={1600} s={2.2} flip o={0.6} /><g transform={`translate(${lerp(p(f, L[1], L[1] + 40), 200, 640)} 1200) rotate(-6)`}><ellipse cx={-60} rx={160} ry={20} fill="#9FD8FF" opacity={0.35} /><rect x={-140} y={-5} width={180} height={10} fill="#F0C25A" /><path d="M40 -18 L90 0 L40 18Z" fill="#E9F6FF" /></g></g>}
  </Svg>
);
const K8: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <Sky id="k8" c={['#2A1206', '#C2602A', '#F2B05A']} />
    <Sun f={f} y={900} r={160} />
    <A who="karna" x={540} y={1640} s={2.6} prop="bow" pose={{mouth: 'smile', blink: blink(f), armL: 30}} />
  </Svg>
);
export const karna: Cfg = {
  id: 'Karna', voice: 'karna.wav', script: sK, timings: tK,
  scenes: [[K1, [0]], [K2, [1, 2, 3]], [K3, [4]], [K4, [5, 6, 7]], [K5, [8, 9, 10]], [K6, [11]], [K7, [12, 13]], [K8, [14]]],
  titles: [
    {pill: 'ACHHED YODDHA', title: 'KAVACH.'},
    {pill: 'SURYA PUTRA', title: 'KARN.'}, {pill: 'JANAM SE', title: 'KAVACH\nKUNDAL.'}, {title: 'AMAR.'},
    {pill: 'INDRA KA', title: 'DAR.', red: 'DAR'},
    {pill: 'PITA KI', title: 'CHETAAVNI.'}, {title: 'MAT DENA.', red: 'MAT'}, {pill: 'KARN KA', title: 'VACHAN.'},
    {pill: 'SUBAH KA ARGHYA', title: 'EK BRAHMAN.'}, {pill: 'DAAN MEIN', title: 'KAVACH.'}, {pill: 'ASLI ROOP', title: 'INDRA.'},
    {title: 'DAAN.'},
    {pill: 'BADLE MEIN', title: 'SHAKTI.'}, {pill: 'WAHI SHAKTI', title: 'GHATOTKACH.'},
    {title: 'DAANVEER.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'DAANVEER\nKARN.', sub: 'Kavach ka daan'}, endScene: EndCard,
};
void PalaceBG;
