import React from 'react';
import {interpolate, random} from 'remotion';
import {p, Rays, Stars} from './ui';
import {Person, Look, Prop} from './people';
import type {Pose} from './chars';

export {p, Rays, Stars};
export const W = 1080, H = 1920;
export const bob = (f: number, a = 6, s = 18) => Math.sin(f / s) * a;
export const blink = (f: number, o = 0) => (f + o) % 95 < 4;
export const lerp = (t: number, a: number, b: number) => a + (b - a) * t;
export {interpolate};

export const Svg: React.FC<{children: React.ReactNode; zoom?: number; ox?: number; oy?: number; shake?: number}> = ({children, zoom = 1, ox = 540, oy = 1100, shake = 0}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute'}}>
    <g transform={`translate(${shake ? (random(shake) - 0.5) * 18 : 0} ${shake ? (random(shake + 1) - 0.5) * 18 : 0}) translate(${ox} ${oy}) scale(${zoom}) translate(${-ox} ${-oy})`}>{children}</g>
  </svg>
);
export const Place: React.FC<{x: number; y: number; s: number; flip?: boolean; rot?: number; o?: number; children: React.ReactNode}> = ({x, y, s, flip, rot = 0, o = 1, children}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`} opacity={o}>{children}</g>
);
// Actor shorthand
export const A: React.FC<{who: string | Look; x: number; y: number; s?: number; flip?: boolean; rot?: number; o?: number; pose?: Pose & {eyes?: string; mouth?: string}; prop?: Prop; propL?: Prop}> = ({who, x, y, s = 2.3, flip, rot, o, pose, prop, propL}) => (
  <Place x={x} y={y} s={s} flip={flip} rot={rot} o={o}><Person look={who} pose={pose as any} prop={prop} propL={propL} /></Place>
);
let gid = 0;
export const Glow: React.FC<{cx: number; cy: number; r: number; c: string; o?: number}> = ({cx, cy, r, c, o = 0.6}) => {
  const id = `kg${cx | 0}_${cy | 0}_${r | 0}_${c.slice(1)}`;
  return <g><defs><radialGradient id={id}><stop offset="0" stopColor={c} stopOpacity={o} /><stop offset="1" stopColor={c} stopOpacity={0} /></radialGradient></defs><circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} /></g>;
};
export const Sky: React.FC<{c: string[]; id: string}> = ({c, id}) => (
  <g>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{c.map((col, i) => <stop key={i} offset={i / (c.length - 1)} stopColor={col} />)}</linearGradient></defs>
    <rect width={W} height={H} fill={`url(#${id})`} />
  </g>
);
export const Hills: React.FC<{c: string; y: number; seed?: number}> = ({c, y, seed = 1}) => (
  <path d={`M0 ${y} ${Array.from({length: 7}).map((_, i) => `Q${i * 180 + 90} ${y - 80 - ((i * 37 * seed) % 90)} ${i * 180 + 180} ${y}`).join(' ')} L1080 1920 L0 1920Z`} fill={c} />
);
export const Peaks: React.FC<{y: number}> = ({y}) => (
  <g>
    <path d={`M0 ${y} L200 ${y - 300} L360 ${y - 140} L540 ${y - 420} L740 ${y - 160} L900 ${y - 320} L1080 ${y - 80} L1080 1920 L0 1920Z`} fill="#5B6F8F" />
    <path d={`M150 ${y - 250} L200 ${y - 300} L250 ${y - 250} L225 ${y - 230} L200 ${y - 245} L175 ${y - 230}Z M470 ${y - 330} L540 ${y - 420} L610 ${y - 330} L575 ${y - 300} L540 ${y - 320} L505 ${y - 300}Z M850 ${y - 270} L900 ${y - 320} L950 ${y - 270} L900 ${y - 255}Z`} fill="#F1F5FA" />
    <path d={`M0 ${y + 120} Q300 ${y} 540 ${y + 80} T1080 ${y + 60} L1080 1920 L0 1920Z`} fill="#DCE6F0" />
  </g>
);
export const ForestBG: React.FC<{f: number; night?: boolean}> = ({f, night}) => (
  <g>
    <Sky id={night ? 'fbn' : 'fbd'} c={night ? ['#081410', '#12301F', '#06100A'] : ['#F2C27A', '#7FB06A', '#24502C']} />
    {[0, 1, 2].map((layer) => (
      <g key={layer} opacity={0.5 + layer * 0.25}>
        {Array.from({length: 7}).map((_, i) => {
          const x = ((i * 190 + layer * 70) % 1240) - 80; const h = 600 + ((i * 53 + layer * 31) % 300);
          return <g key={i} transform={`translate(${x} ${1500 + layer * 120})`}><rect x={-14} y={-h * 0.4} width={28} height={h * 0.4} fill={night ? '#0b1a10' : '#4A3220'} /><ellipse cx={0} cy={-h * 0.55} rx={110} ry={h * 0.32} fill={night ? ['#0f2a1a', '#14361f', '#1a4426'][layer] : ['#3E7A46', '#2F6A3A', '#24582E'][layer]} /></g>;
        })}
      </g>
    ))}
    <rect y={1700} width={W} height={220} fill={night ? '#07120b' : '#2B4A22'} />
    {Array.from({length: 14}).map((_, i) => <circle key={i} cx={(i * 211 + f * 0.6) % W} cy={900 + ((i * 137) % 700) + Math.sin(f / 15 + i) * 20} r={3} fill={night ? '#D8FF8A' : '#FFF5C0'} opacity={0.5 + 0.4 * Math.sin(f / 9 + i)} />)}
  </g>
);
export const BattleBG: React.FC<{f: number; night?: boolean}> = ({f, night}) => (
  <g>
    <Sky id={night ? 'btn' : 'btd'} c={night ? ['#0b0716', '#2A1638', '#4A1E1A'] : ['#5A2A14', '#C2602A', '#F2A04A']} />
    {night && <Stars n={50} f={f} seed="bt" h={900} />}
    <Glow cx={540} cy={1400} r={700} c="#FF7A2A" o={night ? 0.25 : 0.35} />
    {Array.from({length: 26}).map((_, i) => {
      const x = i * 44 - 20; const y = 1450 + (i % 3) * 10;
      return <g key={i} opacity={0.9}><rect x={x} y={y - 60} width={22} height={60} rx={8} fill="#1a0f0c" /><circle cx={x + 11} cy={y - 70} r={11} fill="#1a0f0c" /><rect x={x + 18} y={y - 140 - (i % 4) * 10} width={3} height={90} fill="#1a0f0c" />{i % 5 === 0 && <path d={`M${x + 21} ${y - 150} l30 10 l-30 10Z`} fill="#7A1E22" />}</g>;
    })}
    <rect y={1450} width={W} height={470} fill="#1a0f0c" />
    {Array.from({length: 18}).map((_, i) => <circle key={i} cx={(i * 97 + f * 2) % W} cy={1400 - ((f * 3 + i * 80) % 1000)} r={3} fill="#FFB347" opacity={0.6} />)}
  </g>
);
export const PalaceBG: React.FC<{tint?: string}> = ({tint = '#3A1408'}) => (
  <g>
    <rect width={W} height={H} fill={tint} />
    <Glow cx={540} cy={900} r={700} c="#FFC870" o={0.3} />
    {[120, 360, 720, 960].map((x) => <g key={x}><rect x={x - 34} y={500} width={68} height={1300} fill="#B8862E" /><rect x={x - 46} y={480} width={92} height={30} fill="#D9A23A" /><rect x={x - 46} y={1790} width={92} height={30} fill="#D9A23A" /></g>)}
    <path d="M0 480 Q540 300 1080 480" stroke="#D9A23A" strokeWidth={14} fill="none" />
    <rect y={1800} width={W} height={120} fill="#2A0E06" />
  </g>
);
export const FireAltar: React.FC<{f: number; x?: number; y?: number; s?: number}> = ({f, x = 540, y = 1650, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Glow cx={0} cy={-80} r={320} c="#FF8A2A" o={0.55} />
    <path d="M-150 0 L150 0 L120 70 L-120 70Z" fill="#7A3A16" /><path d="M-160 -14 h320 v18 h-320Z" fill="#A5521F" />
    {[-90, -40, 0, 40, 90].map((dx, i) => {
      const h = 130 + Math.sin(f / 4 + i * 1.7) * 30 + (i === 2 ? 70 : 0);
      return <path key={i} d={`M${dx} ${-h} Q${dx + 40} -40 ${dx + 26} 0 L${dx - 26} 0 Q${dx - 40} -40 ${dx} ${-h}Z`} fill={i % 2 ? '#FFB02E' : '#FF7A1A'} />;
    })}
    <path d="M0 -120 Q22 -40 12 0 L-12 0 Q-22 -40 0 -120Z" fill="#FFF3B0" />
  </g>
);
export const CosmicBG: React.FC<{f: number; c?: string}> = ({f, c = '#2A1A5A'}) => (
  <g>
    <Sky id={'cos' + c.slice(1)} c={['#05040c', c, '#05040c']} />
    <Stars n={90} f={f} seed={'cos' + c} />
  </g>
);
export const EndCard: React.FC<{f: number}> = ({f}) => (
  <Svg><rect width={W} height={H} fill="#0e0907" /><Glow cx={540} cy={900} r={500} c="#F0C25A" o={0.15 + p(f, 0, 30) * 0.1} /></Svg>
);
// Arrow flying
export const Arrow: React.FC<{x: number; y: number; rot: number; glow?: string}> = ({x, y, rot, glow}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {glow && <ellipse cx={-40} cy={0} rx={90} ry={14} fill={glow} opacity={0.4} />}
    <rect x={-80} y={-3} width={110} height={6} fill="#8A5A1C" /><path d="M30 -10 L56 0 L30 10Z" fill="#D9E1E8" /><path d="M-80 0 l-16 -12 h12 l10 12 l-10 12 h-12Z" fill="#E57A2B" />
  </g>
);
export const Flash: React.FC<{t: number; c?: string}> = ({t, c = '#fff'}) => (t > 0 && t < 1 ? <rect width={W} height={H} fill={c} opacity={Math.sin(t * Math.PI) * 0.8} /> : null);
