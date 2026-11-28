import React from 'react';
import {interpolate} from 'remotion';
import {BabyVanar, Diya, Fish, Human, Medallion, Vanar} from './chars';
import {p, Rays, Stars} from './ui';

export type SP = {f: number; L: number[]; dur: number};
const W = 1080, H = 1920;
const Svg: React.FC<{children: React.ReactNode; zoom?: number; ox?: number; oy?: number}> = ({children, zoom = 1, ox = 540, oy = 1100}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
    <g transform={`translate(${ox} ${oy}) scale(${zoom}) translate(${-ox} ${-oy})`}>{children}</g>
  </svg>
);
const bob = (f: number, a = 6, s = 18) => Math.sin(f / s) * a;
const blink = (f: number, o = 0) => (f + o) % 95 < 4;
const Place: React.FC<{x: number; y: number; s: number; flip?: boolean; rot?: number; children: React.ReactNode}> = ({x, y, s, flip, rot = 0, children}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`}>{children}</g>
);
const Grad: React.FC<{id: string; stops: [number, string][]; x2?: number; y2?: number}> = ({id, stops, x2 = 0, y2 = 1}) => (
  <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>{stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}</linearGradient>
);
const Glow: React.FC<{cx: number; cy: number; r: number; c: string; o?: number}> = ({cx, cy, r, c, o = 0.6}) => (
  <g><defs><radialGradient id={`gl${cx}${cy}${r}`}><stop offset="0" stopColor={c} stopOpacity={o} /><stop offset="1" stopColor={c} stopOpacity={0} /></radialGradient></defs><circle cx={cx} cy={cy} r={r} fill={`url(#gl${cx}${cy}${r})`} /></g>
);

// 1. Hanuman meditating at sunset → question
export const S1: React.FC<SP> = ({f, L}) => {
  const reveal = p(f, 0, 22);
  const q = p(f, L[1], L[1] + 12);
  return (
    <>
      <Svg zoom={1 + f * 0.0006}>
        <defs><Grad id="sun1" stops={[[0, '#1a0f14'], [0.35, '#6b2a1e'], [0.6, '#D9773A'], [1, '#2a120c']]} /></defs>
        <rect width={W} height={H} fill="url(#sun1)" />
        <Glow cx={540} cy={1000} r={520} c="#FFD9A0" o={0.5} />
        <circle cx={540} cy={1000} r={270} fill="#FBE2A8" opacity={0.95} />
        <path d="M0 1350 L220 1130 L380 1260 L560 1080 L760 1280 L900 1150 L1080 1320 L1080 1920 L0 1920Z" fill="#3a1a14" />
        <path d="M0 1500 L300 1330 L520 1460 L780 1340 L1080 1480 L1080 1920 L0 1920Z" fill="#200d0b" />
        <Place x={540} y={1530} s={2.5}>
          <Vanar kind="hanuman" prop="gada" pose={{eyes: q > 0.5 ? 'open' : 'closed', mouth: q > 0.5 ? 'flat' : 'smile', armL: 20, armR: -30 + bob(f, 2), head: q * -6}} />
        </Place>
        <Stars n={30} f={f} seed="s1" color="#FFE7B0" h={900} />
      </Svg>
      {/* letterbox reveal */}
      <div style={{position: 'absolute', inset: 0, background: '#000', clipPath: `polygon(0 0,100% 0,100% ${interpolate(reveal, [0, 1], [46, 0])}%,0 ${interpolate(reveal, [0, 1], [46, 0])}%)`}} />
      <div style={{position: 'absolute', inset: 0, background: '#000', clipPath: `polygon(0 ${interpolate(reveal, [0, 1], [54, 100])}%,100% ${interpolate(reveal, [0, 1], [54, 100])}%,100% 100%,0 100%)`}} />
    </>
  );
};

// 2. Ocean: burning tail quenched, drop falls, fish swallows
export const S2: React.FC<SP> = ({f, L}) => {
  const steam = p(f, 0, 40);
  const drop = p(f, L[1], L[1] + 26);
  const fishIn = p(f, L[2] - 6, L[2] + 20);
  const gulp = p(f, L[2] + 20, L[2] + 30);
  const dropY = interpolate(drop, [0, 1], [520, 1080]) + gulp * 260;
  const fishX = interpolate(fishIn, [0, 1], [1400, 640]);
  return (
    <Svg zoom={1.02 + f * 0.0004}>
      <defs>
        <Grad id="sky2" stops={[[0, '#1b1020'], [0.6, '#C2552B'], [1, '#F29A4A']]} />
        <Grad id="sea2" stops={[[0, '#1E6C80'], [0.4, '#0E3A4E'], [1, '#04121c']]} />
      </defs>
      <rect width={W} height={900} fill="url(#sky2)" />
      <rect y={880} width={W} height={1040} fill="url(#sea2)" />
      <path d={`M0 885 ${Array.from({length: 12}).map((_, i) => `Q${i * 90 + 45} ${880 + Math.sin(f / 10 + i) * 6} ${i * 90 + 90} 885`).join(' ')}`} stroke="#8FE0EA" strokeWidth={3} fill="none" opacity={0.6} />
      <Stars n={50} f={f} seed="s2" color="#9FE6F0" />
      {/* tail dipping in sea with steam, line 0 */}
      <g opacity={1 - drop}>
        <path d={`M760 200 C700 400 820 600 ${700 + bob(f, 10)} 880`} stroke="#C0602B" strokeWidth={26} fill="none" strokeLinecap="round" />
        {Array.from({length: 7}).map((_, i) => (
          <circle key={i} cx={700 + Math.sin(i * 2 + f / 15) * 40} cy={860 - ((f * 3 + i * 60) % 420)} r={30 + i * 6} fill="#F4EEE6" opacity={0.18 * steam} />
        ))}
        <circle cx={700} cy={880} r={40} fill="#FFB347" opacity={0.6 * (1 - steam)} />
      </g>
      {/* drop + ripples */}
      {drop > 0 && gulp < 1 && (
        <g transform={`translate(${540} ${dropY})`} opacity={1 - gulp}>
          <path d="M0 -40 Q26 0 18 18 Q0 34 -18 18 Q-26 0 0 -40Z" fill="#CFEFFF" />
          <circle cx={-6} cy={6} r={6} fill="#fff" opacity={0.8} />
        </g>
      )}
      {[0, 1, 2].map((i) => {
        const r = p(f, L[1] + 14 + i * 6, L[1] + 50 + i * 6);
        return r > 0 && r < 1 ? <ellipse key={i} cx={540} cy={886} rx={40 + r * 300} ry={8 + r * 40} stroke="#CFEFFF" strokeWidth={3} fill="none" opacity={1 - r} /> : null;
      })}
      {fishIn > 0 && (
        <Place x={fishX} y={1260 + bob(f, 12, 14)} s={1.6}>
          <Fish mouthOpen={Math.sin(Math.min(1, gulp + fishIn * 0.4) * Math.PI)} tail={bob(f, 10, 6)} />
        </Place>
      )}
    </Svg>
  );
};

// 3. Paatal Lok: Ahiravan on throne
export const S3: React.FC<SP> = ({f}) => {
  const a = p(f, 4, 30);
  return (
    <Svg zoom={1.08 - f * 0.0007}>
      <defs><Grad id="pt3" stops={[[0, '#0b0714'], [0.6, '#21123a'], [1, '#07050c']]} /></defs>
      <rect width={W} height={H} fill="url(#pt3)" />
      <Stars n={40} f={f} seed="s3" color="#B48CFF" />
      <Glow cx={540} cy={1150} r={520} c="#7B3FE4" o={0.45} />
      {/* throne arch */}
      <path d="M260 1650 L260 900 Q540 560 820 900 L820 1650" stroke="#C9A24A" strokeWidth={8} fill="#140c22" />
      <path d="M300 1650 L300 930 Q540 640 780 930 L780 1650" stroke="#6E4FB0" strokeWidth={3} fill="none" opacity={0.6} />
      {/* skull staff + serpent lamps */}
      <g transform={`translate(860 ${1000 + bob(f, 8)})`}><rect x={-5} y={0} width={10} height={600} fill="#3b2a52" /><circle cy={-10} r={34} fill="#E9E3F7" /><circle cx={-12} cy={-14} r={8} fill="#2a1a3a" /><circle cx={12} cy={-14} r={8} fill="#2a1a3a" /><Glow cx={0} cy={-10} r={110} c="#B48CFF" o={0.5} /></g>
      {[220, 860].map((x) => <g key={x} transform={`translate(${x === 860 ? 220 : 200} 860)`}><path d="M0 0 Q-20 -40 0 -80 Q20 -40 0 0Z" fill="#3FBF6E" opacity={0.8 + Math.sin(f / 6) * 0.2} /></g>)}
      <g opacity={a}>
        <Place x={540} y={1500} s={2.4}><Human who="ahiravan" pose={{armL: 30, armR: -40 + bob(f, 4), mouth: 'grit', head: bob(f, 2, 30)}} /></Place>
      </g>
      {/* spikes floor */}
      <path d={`M0 1920 ${Array.from({length: 14}).map((_, i) => `L${i * 80 + 40} ${1700 - (i % 3) * 40} L${i * 80 + 80} 1920`).join(' ')}Z`} fill="#0a0612" />
    </Svg>
  );
};

// 4. Fish caught in net → baby vanar
export const S4: React.FC<SP> = ({f, L}) => {
  const lift = p(f, 0, 40);
  const baby = p(f, L[1], L[1] + 22);
  return (
    <Svg>
      <defs><Grad id="s4g" stops={[[0, '#05121c'], [1, '#0b2836']]} /></defs>
      <rect width={W} height={H} fill="url(#s4g)" />
      <Stars n={60} f={f} seed="s4" color="#9FE6F0" />
      <g opacity={1 - baby * 0.75}>
        <Place x={540} y={1350 - lift * 200} s={1.5} rot={-6 + bob(f, 3, 10)}><Fish tail={bob(f, 14, 5)} /></Place>
        {/* net */}
        <g transform={`translate(540 ${1350 - lift * 200})`} opacity={0.75}>
          {Array.from({length: 9}).map((_, i) => <path key={i} d={`M${-300 + i * 75} -200 Q${-300 + i * 75 + 20} 0 ${-280 + i * 70} 220`} stroke="#D8C49A" strokeWidth={3} fill="none" />)}
          {Array.from({length: 6}).map((_, i) => <path key={'h' + i} d={`M-320 ${-180 + i * 75} Q0 ${-150 + i * 75} 320 ${-180 + i * 75}`} stroke="#D8C49A" strokeWidth={3} fill="none" />)}
          <path d="M-300 -200 L0 -900 L300 -200" stroke="#D8C49A" strokeWidth={4} fill="none" />
        </g>
      </g>
      {baby > 0 && (
        <g opacity={baby}>
          <Glow cx={540} cy={1150} r={360 * baby} c="#FFD27A" o={0.7} />
          <Place x={540} y={1330 + (1 - baby) * 60} s={2.4 * (0.7 + baby * 0.3)}><BabyVanar eyes={blink(f) ? 'closed' : 'open'} /></Place>
        </g>
      )}
    </Svg>
  );
};

// Gate background (reused)
const Gate: React.FC<{f: number; glow?: number}> = ({f, glow = 1}) => (
  <g>
    <rect width={W} height={H} fill="#0d1a1a" />
    {Array.from({length: 26}).map((_, r) => Array.from({length: 7}).map((__, c) => (
      <rect key={`${r}-${c}`} x={c * 170 + (r % 2) * 85 - 60} y={r * 76} width={164} height={70} rx={4} fill="#13262a" />
    )))}
    <path d="M220 1720 L220 880 Q540 500 860 880 L860 1720Z" fill="#0a1414" stroke="#C9A24A" strokeWidth={10} />
    <defs><Grad id="gatein" stops={[[0, '#7FFFD4'], [0.5, '#1FAE88'], [1, '#062a24']]} /></defs>
    <path d="M250 1720 L250 895 Q540 545 830 895 L830 1720Z" fill="url(#gatein)" opacity={0.85 * glow + Math.sin(f / 9) * 0.05} />
    <Glow cx={540} cy={900} r={420} c="#7FFFD4" o={0.35 * glow} />
    <path d="M540 470 L560 510 L540 550 L520 510Z" fill="#C9A24A" />
    {[150, 930].map((x) => (
      <g key={x} transform={`translate(${x} 1000)`}><rect x={-8} y={0} width={16} height={60} fill="#5a3a1a" /><path d={`M0 ${-50 - Math.sin(f / 4 + x) * 8} Q22 -10 0 4 Q-22 -10 0 ${-50 - Math.sin(f / 4 + x) * 8}Z`} fill="#FFB02E" /><Glow cx={0} cy={-20} r={120} c="#FFB347" o={0.5} /></g>
    ))}
    <rect y={1720} width={W} height={200} fill="#081010" />
  </g>
);

// 5. Makardhwaj as gatekeeper
export const S5: React.FC<SP> = ({f}) => {
  const a = p(f, 0, 24);
  return (
    <Svg zoom={1.05 - f * 0.0005}>
      <Gate f={f} />
      <Place x={540} y={1560 + (1 - a) * 80} s={2.5}><Vanar kind="makar" prop="spear" pose={{armR: -10, armL: 12, mouth: 'flat', blink: blink(f, 20), head: bob(f, 1.5, 25)}} /></Place>
    </Svg>
  );
};

// 6. Maya: Ahiravan → Vibhishan, then Ram-Lakshman carried off
export const S6: React.FC<SP> = ({f, L}) => {
  const morph = p(f, 10, 40);
  const carry = p(f, L[1], L[1] + 20);
  const sink = p(f, L[1] + 20, L[1] + 90);
  return (
    <Svg>
      <defs><Grad id="s6g" stops={[[0, '#0c0a1e'], [0.6, '#2a1650'], [1, '#0a0716']]} /></defs>
      <rect width={W} height={H} fill="url(#s6g)" />
      <Stars n={70} f={f} seed="s6" />
      <path d="M900 600 a70 70 0 1 0 50 120 a56 56 0 1 1 -50 -120Z" fill="#F3EAD0" />
      <g opacity={1 - carry}>
        <Glow cx={540} cy={1150} r={480} c="#8E5BFF" o={0.5 * (1 - morph) + 0.2} />
        <g opacity={1 - morph}><Place x={540} y={1520} s={2.4}><Human who="ahiravan" pose={{armL: 40, armR: -60, mouth: 'grit'}} /></Place></g>
        <g opacity={morph}><Place x={540} y={1520} s={2.4}><Human who="vibhishan" pose={{armL: 10, armR: -10, mouth: 'smile', blink: blink(f)}} /></Place></g>
        {Array.from({length: 10}).map((_, i) => (
          <circle key={i} cx={540 + Math.cos(i + f / 12) * (200 + i * 10)} cy={1150 + Math.sin(i * 1.7 + f / 14) * 300} r={40 + i * 4} fill="#9B6BFF" opacity={0.12 * Math.sin(morph * Math.PI)} />
        ))}
      </g>
      {carry > 0 && (
        <g opacity={carry} transform={`translate(0 ${sink * 260})`}>
          <Place x={540} y={1060 + bob(f, 10)} s={1.5} rot={-90}><Human who="ram" pose={{eyes: 'closed', mouth: 'flat', armL: 10, armR: -10}} bow /></Place>
          <Place x={540} y={1260 + bob(f, 10, 20)} s={1.5} rot={-90}><Human who="lakshman" pose={{eyes: 'closed', mouth: 'flat', armL: 10, armR: -10}} /></Place>
          <ellipse cx={540} cy={1500} rx={360} ry={60} fill="#8E5BFF" opacity={0.25} />
          <ellipse cx={540} cy={1500} rx={260} ry={36} stroke="#B48CFF" strokeWidth={3} fill="none" opacity={0.5} />
        </g>
      )}
    </Svg>
  );
};

// 7. Hanuman dives into Paatal
export const S7: React.FC<SP> = ({f, dur}) => {
  const y = interpolate(f, [0, dur], [-300, 1300]);
  return (
    <Svg>
      <rect width={W} height={H} fill="#0c0714" />
      {Array.from({length: 22}).map((_, i) => {
        const x = (i * 97) % W;
        const yy = ((i * 211 - f * 40) % 2400 + 2400) % 2400 - 300;
        return <rect key={i} x={x} y={yy} width={4} height={180} fill="#C9A3FF" opacity={0.35} />;
      })}
      <Glow cx={540} cy={y} r={300} c="#FFB347" o={0.35} />
      <Place x={540} y={y} s={2.2} rot={180}><Vanar kind="hanuman" prop="gada" pose={{armL: -150, armR: 150, legL: 8, legR: -8, eyes: 'angry', mouth: 'grit'}} /></Place>
    </Svg>
  );
};

// 8. Confrontation at the gate (lines: guard / kaun ho / main Makardhwaj / chaunk / bow)
export const S8: React.FC<SP> = ({f, L}) => {
  const walk = p(f, 0, 30);
  const shock = f >= L[3] && f < L[4];
  const zoom = shock ? 1 + p(f, L[3], L[3] + 14) * 0.9 : 1;
  const block = f >= L[4];
  return (
    <Svg zoom={zoom} ox={330} oy={900}>
      <Gate f={f} />
      <Place x={interpolate(walk, [0, 1], [-200, 300])} y={1580} s={2.3}>
        <Vanar kind="hanuman" prop="gada" pose={{eyes: shock ? 'shock' : f >= L[1] && f < L[2] ? 'angry' : 'open', mouth: shock ? 'o' : f >= L[1] && f < L[2] ? 'grit' : 'flat', armL: 10, armR: shock ? -60 : -20, legL: walk < 1 ? Math.sin(f / 3) * 14 : 3, legR: walk < 1 ? -Math.sin(f / 3) * 14 : -3, blink: blink(f)}} />
      </Place>
      <Place x={790} y={1580} s={2.3} flip>
        <Vanar kind="makar" prop="spear" pose={{head: block ? 14 : 0, eyes: block ? 'closed' : 'open', mouth: f >= L[2] && f < L[3] ? 'smile' : 'flat', armL: block ? 70 : 12, armR: block ? -70 : -10, blink: blink(f, 33)}} />
      </Place>
    </Svg>
  );
};

// 9. Father vs son clash
export const S9: React.FC<SP> = ({f}) => {
  const hit = (f % 28) / 28;
  const close = p(f, 0, 14);
  return (
    <Svg>
      <Gate f={f} glow={0.6} />
      <Rays f={f * 6} color="#FFE7A0" cx={540} cy={1180} op={0.25 * (1 - hit)} />
      <Glow cx={540} cy={1180} r={260 * (1.2 - hit)} c="#FFF2C0" o={0.9 * (1 - hit)} />
      <Place x={interpolate(close, [0, 1], [240, 370]) - hit * 20} y={1600} s={2.2}><Vanar kind="hanuman" prop="gada" pose={{eyes: 'angry', mouth: 'grit', armR: -110 + hit * 50, armL: 30}} /></Place>
      <Place x={interpolate(close, [0, 1], [840, 710]) + hit * 20} y={1600} s={2.2} flip><Vanar kind="makar" prop="spear" pose={{eyes: 'angry', mouth: 'grit', armR: -100 + hit * 40, armL: 30}} /></Place>
      {Array.from({length: 10}).map((_, i) => <circle key={i} cx={540 + Math.cos(i) * hit * 300} cy={1180 + Math.sin(i * 2.3) * hit * 300} r={6} fill="#FFE27A" opacity={1 - hit} />)}
    </Svg>
  );
};

// 10. Five diyas (and 11 uses them too)
const diyaPos = [[540, 900], [250, 1150], [830, 1150], [340, 1500], [740, 1500]];
export const S10: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <rect width={W} height={H} fill="#07050b" />
    <Glow cx={540} cy={1200} r={600} c="#3B1F5E" o={0.6} />
    <g opacity={0.35}><Place x={540} y={1450} s={2.6}><Human who="ahiravan" pose={{mouth: 'grit'}} /></Place></g>
    <ellipse cx={540} cy={1250} rx={420} ry={320} stroke="#C9A24A" strokeWidth={2} fill="none" opacity={0.3} />
    {diyaPos.map(([x, y], i) => (
      <g key={i} opacity={p(f, i * 6, i * 6 + 14)}><Place x={x} y={y} s={1.3}><Diya flame={p(f, i * 6 + 6, i * 6 + 18)} t={f + i * 7} /></Place><Glow cx={x + 60} cy={y - 40} r={160} c="#FFB347" o={0.35} /></g>
    ))}
  </Svg>
);

// 11. Panchmukhi Hanuman blows out the diyas
export const S11: React.FC<SP> = ({f, dur}) => {
  const form = p(f, 0, 30);
  const out = p(f, dur - 40, dur - 26);
  return (
    <Svg>
      <defs><Grad id="s11" stops={[[0, '#2a1206'], [0.5, '#8A4A14'], [1, '#1a0b04']]} /></defs>
      <rect width={W} height={H} fill="url(#s11)" />
      <Rays f={f} cx={540} cy={1000} op={0.25} />
      <Glow cx={540} cy={1000} r={520} c="#FFD27A" o={0.5} />
      {(['eagle', 'lion', 'horse', 'boar'] as const).map((k, i) => {
        const ang = [-150, -110, -70, -30][i] * (Math.PI / 180);
        const r = 300 * form;
        return <g key={k} opacity={form}><Place x={540 + Math.cos(ang) * r} y={1010 + Math.sin(ang) * r} s={1.9}><Medallion kind={k} /></Place></g>;
      })}
      <Place x={540} y={1560} s={2.4}><Vanar kind="hanuman" prop="gada" pose={{armL: 60 + bob(f, 4), armR: -60, mouth: out > 0 ? 'o' : 'smile', eyes: 'open', blink: blink(f)}} /></Place>
      {[[150, 1600], [930, 1600]].map(([x, y], i) => <Place key={i} x={x} y={y} s={1}><Diya flame={1 - out} t={f} /></Place>)}
      {out > 0 && out < 1 && <path d="M540 1180 Q300 1300 150 1560 M540 1180 Q780 1300 930 1560" stroke="#F4EEE6" strokeWidth={30 * (1 - out)} opacity={0.3} fill="none" />}
    </Svg>
  );
};

// 12. Shri Ram crowns Makardhwaj
export const S12: React.FC<SP> = ({f}) => {
  const crown = p(f, 10, 50);
  return (
    <Svg zoom={1.04 - f * 0.0004}>
      <defs><Grad id="s12" stops={[[0, '#3a1f08'], [0.5, '#A4651C'], [1, '#1e1006']]} /></defs>
      <rect width={W} height={H} fill="url(#s12)" />
      <Rays f={f} cx={540} cy={700} op={0.3} />
      <Glow cx={540} cy={800} r={600} c="#FFE3A0" o={0.45} />
      <Place x={330} y={1580} s={2.2}><Human who="ram" bow pose={{armR: -120 + crown * 30, mouth: 'smile', blink: blink(f)}} /></Place>
      <Place x={760} y={1580} s={2.2} flip><Vanar kind="makar" prop="spear" pose={{head: 10, eyes: 'closed', mouth: 'smile', armL: 20, armR: -10}} /></Place>
      <g transform={`translate(${interpolate(crown, [0, 1], [470, 760])} ${interpolate(crown, [0, 1], [1000, 940])})`} opacity={crown}>
        <path d="M-50 0 L-40 -50 L-20 -24 L0 -64 L20 -24 L40 -50 L50 0Z" fill="#F0C25A" /><circle cy={-18} r={8} fill="#D2322F" />
        <Glow cx={0} cy={-30} r={120} c="#FFF2C0" o={0.6} />
      </g>
    </Svg>
  );
};

// 13. Throne / moral
export const S13: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0005}>
    <rect width={W} height={H} fill="#1a0806" />
    <Glow cx={540} cy={1100} r={600} c="#B4232B" o={0.5} />
    {[200, 880].map((x) => <rect key={x} x={x - 22} y={700} width={44} height={1100} fill="#E2B04A" />)}
    <path d="M280 1750 L280 960 Q540 560 800 960 L800 1750Z" fill="#E2B04A" />
    <path d="M320 1750 L320 980 Q540 640 760 980 L760 1750Z" fill="#7A0F1A" />
    <circle cx={540} cy={860} r={26} fill="#2BB58F" />
    <Place x={540} y={1600} s={2.4}><Vanar kind="makar" prop="spear" pose={{eyes: 'open', mouth: 'smile', blink: blink(f), armL: 14, armR: -12, head: bob(f, 1.5, 30)}} /></Place>
    <g transform="translate(540 1680)"><rect x={-260} y={0} width={520} height={60} rx={10} fill="#C9922F" /></g>
  </Svg>
);

// 14. End card
export const S14: React.FC<SP> = ({f}) => (
  <Svg>
    <rect width={W} height={H} fill="#0e0907" />
    <Glow cx={540} cy={900} r={500} c="#F0C25A" o={0.15 + p(f, 0, 30) * 0.1} />
  </Svg>
);
