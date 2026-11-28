import React from 'react';
import {AbsoluteFill} from 'remotion';
import '@fontsource/noto-serif-devanagari/800.css';
import '@fontsource/tiro-devanagari-hindi/400.css';
import '@fontsource/playfair-display/800.css';
import '@fontsource/montserrat/700.css';

const GOLD = '#F0C25A', GOLD2 = '#C98F2E', DEV = '"Noto Serif Devanagari", serif', TIRO = '"Tiro Devanagari Hindi", serif';
const Defs = () => (
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FBE3A0" /><stop offset="0.5" stopColor={GOLD} /><stop offset="1" stopColor={GOLD2} /></linearGradient>
    <radialGradient id="bgA" cx="50%" cy="45%" r="70%"><stop offset="0" stopColor="#4A1410" /><stop offset="1" stopColor="#120505" /></radialGradient>
    <radialGradient id="bgB" cx="50%" cy="40%" r="70%"><stop offset="0" stopColor="#1C2A3A" /><stop offset="1" stopColor="#06090E" /></radialGradient>
    <radialGradient id="bgC" cx="50%" cy="45%" r="70%"><stop offset="0" stopColor="#2A1A08" /><stop offset="1" stopColor="#0A0603" /></radialGradient>
    <radialGradient id="flame" cx="50%" cy="70%" r="60%"><stop offset="0" stopColor="#FFF6C8" /><stop offset="0.5" stopColor="#FFB02E" /><stop offset="1" stopColor="#E2552A" /></radialGradient>
    <radialGradient id="halo"><stop offset="0" stopColor="#FFD27A" stopOpacity={0.45} /><stop offset="1" stopColor="#FFD27A" stopOpacity={0} /></radialGradient>
  </defs>
);

// A: Kaal-chakra (time wheel) with a lamp flame at the centre
const MarkA: React.FC = () => (
  <g>
    <circle r={300} fill="url(#halo)" />
    <circle r={250} fill="none" stroke="url(#gold)" strokeWidth={22} />
    <circle r={214} fill="none" stroke="url(#gold)" strokeWidth={5} />
    {Array.from({length: 48}).map((_, i) => <rect key={i} x={-3} y={-246} width={6} height={i % 6 === 0 ? 26 : 12} fill="url(#gold)" transform={`rotate(${i * 7.5})`} />)}
    {Array.from({length: 8}).map((_, i) => (
      <g key={i} transform={`rotate(${i * 45})`}>
        <path d="M-9 -70 L-5 -210 L5 -210 L9 -70Z" fill="url(#gold)" />
        <circle cy={-140} r={13} fill="url(#gold)" />
      </g>
    ))}
    <circle r={72} fill="#1a0806" stroke="url(#gold)" strokeWidth={10} />
    <path d="M0 -58 Q36 -6 18 34 Q0 50 -18 34 Q-36 -6 0 -58Z" fill="url(#flame)" />
    <path d="M0 -20 Q12 4 6 22 Q0 28 -6 22 Q-12 4 0 -20Z" fill="#FFF6C8" />
  </g>
);
// B: Devanagari monogram "का" inside a sun-ray medallion
const MarkB: React.FC = () => (
  <g>
    <circle r={320} fill="url(#halo)" />
    {Array.from({length: 36}).map((_, i) => <path key={i} d={`M0 -228 L${i % 2 ? 8 : 14} -${i % 2 ? 268 : 300} L-${i % 2 ? 8 : 14} -${i % 2 ? 268 : 300}Z`} fill="url(#gold)" transform={`rotate(${i * 10})`} />)}
    <circle r={222} fill="#0B121A" stroke="url(#gold)" strokeWidth={14} />
    <circle r={196} fill="none" stroke="url(#gold)" strokeWidth={3} strokeDasharray="2 10" />
    <text x={0} y={70} textAnchor="middle" fontFamily={TIRO} fontSize={250} fill="url(#gold)">का</text>
  </g>
);
// C: Hourglass whose falling sand becomes a scroll/picture frame
const MarkC: React.FC = () => (
  <g>
    <circle r={300} fill="url(#halo)" />
    <circle r={260} fill="none" stroke="url(#gold)" strokeWidth={10} />
    <rect x={-150} y={-230} width={300} height={26} rx={10} fill="url(#gold)" />
    <rect x={-150} y={204} width={300} height={26} rx={10} fill="url(#gold)" />
    {[-130, 130].map((x) => <rect key={x} x={x - 7} y={-206} width={14} height={412} rx={6} fill="url(#gold)" />)}
    <path d="M-100 -200 Q-100 -60 -12 0 Q-100 60 -100 200 L100 200 Q100 60 12 0 Q100 -60 100 -200Z" fill="#140c05" stroke="url(#gold)" strokeWidth={8} />
    <path d="M-78 -150 Q-60 -70 0 -20 Q60 -70 78 -150Z" fill="url(#gold)" opacity={0.95} />
    <rect x={-3} y={-14} width={6} height={110} fill={GOLD} />
    {/* bottom: sand forms a little framed picture of a temple shikhara */}
    <path d="M-80 190 Q0 70 80 190Z" fill="url(#gold)" />
    <path d="M-26 190 L-26 150 L0 112 L26 150 L26 190Z" fill="#140c05" />
    <circle cx={0} cy={106} r={6} fill="#140c05" />
  </g>
);


// D: Lord Ram silhouette drawing a bow upward, inside the gold time ring
const RamSil: React.FC = () => {
  const ink = '#140504';
  const T = (x1: number, y1: number, x2: number, y2: number, w1: number, w2: number) => {
    const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), nx = -dy / l, ny = dx / l;
    return <g><path d={`M${x1 + nx * w1 / 2} ${y1 + ny * w1 / 2} L${x2 + nx * w2 / 2} ${y2 + ny * w2 / 2} L${x2 - nx * w2 / 2} ${y2 - ny * w2 / 2} L${x1 - nx * w1 / 2} ${y1 - ny * w1 / 2}Z`} fill={ink} /><circle cx={x1} cy={y1} r={w1 / 2} fill={ink} /><circle cx={x2} cy={y2} r={w2 / 2} fill={ink} /></g>;
  };
  // Draw point (hand at chin) and bow grip directly above it -> arrow points straight up
  const D = {x: 6, y: -40}, G = {x: 6, y: -166};
  return (
    <g transform="translate(0 22) scale(0.84)">
      {/* quiver slanted on the back */}
      <g transform="rotate(-24 -26 -10)"><rect x={-36} y={-70} width={20} height={92} rx={8} fill={ink} />{[0, 1, 2].map((i) => <path key={i} d={`M${-34 + i * 7} -70 l-5 -20 l10 0z`} fill={ink} />)}</g>
      {/* kneeling legs: back knee on the ground, front knee raised */}
      {T(-6, 74, -44, 160, 30, 20)}{T(-44, 160, -104, 164, 18, 12)}<path d="M-112 156 L-100 168 L-120 170Z" fill={ink} />
      {T(8, 72, 54, 98, 30, 20)}{T(54, 98, 52, 162, 20, 14)}<path d="M40 158 L80 160 L78 170 L38 170Z" fill={ink} />
      {/* dhoti and hanging sash */}
      <path d="M-30 50 L28 50 L40 98 Q18 106 4 92 Q-16 110 -40 98Z" fill={ink} />
      <path d="M-26 60 Q-48 96 -54 132 Q-38 112 -20 82Z" fill={ink} />
      {/* upright torso */}
      <path d="M-24 -22 Q2 -32 30 -20 Q28 20 20 56 L-18 56 Q-28 20 -24 -22Z" fill={ink} />
      <g transform="translate(-30 6) rotate(-10 4 -40)">
      {/* neck, head tilted up, flowing hair */}
      {T(4, -24, 6, -38, 16, 14)}
      <circle cx={4} cy={-58} r={21} fill={ink} />
      <path d="M-12 -64 Q-40 -50 -46 -14 Q-34 -32 -22 -28 Q-40 -8 -34 12 Q-14 -26 -4 -44Z" fill={ink} />
      {/* mukut */}
      <path d="M-16 -72 L22 -74 L18 -88 L12 -84 L8 -118 L2 -130 L-4 -118 L-6 -84 L-12 -88Z" fill={ink} />
      <circle cx={2} cy={-134} r={4} fill={ink} />
      </g>
      {/* bow arm straight up to the grip */}
      {T(22, -18, G.x + 6, G.y + 10, 16, 12)}
      {/* draw arm: elbow out to the side, hand at the chin */}
      {T(-18, -18, -46, -26, 15, 13)}{T(-46, -26, D.x - 4, D.y, 13, 11)}
      {/* bow: horizontal, limbs flexed back toward the archer, recurved tips */}
      <path d={`M${G.x} ${G.y} C${G.x - 50} ${G.y - 14} ${G.x - 96} ${G.y + 4} ${G.x - 112} ${G.y + 40}`} stroke={ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d={`M${G.x} ${G.y} C${G.x + 50} ${G.y - 14} ${G.x + 96} ${G.y + 4} ${G.x + 112} ${G.y + 40}`} stroke={ink} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d={`M${G.x - 112} ${G.y + 40} q-4 10 -16 12 M${G.x + 112} ${G.y + 40} q4 10 16 12`} stroke={ink} strokeWidth={6} fill="none" strokeLinecap="round" />
      <rect x={G.x - 7} y={G.y - 8} width={14} height={18} rx={4} fill={ink} />
      {/* string pulled to the chin */}
      <path d={`M${G.x - 112} ${G.y + 40} L${D.x} ${D.y} L${G.x + 112} ${G.y + 40}`} stroke={ink} strokeWidth={2.2} fill="none" />
      {/* arrow straight up */}
      <line x1={D.x} y1={D.y + 6} x2={D.x} y2={G.y - 44} stroke={ink} strokeWidth={4.5} />
      <path d={`M${D.x} ${G.y - 66} L${D.x + 9} ${G.y - 42} L${D.x - 9} ${G.y - 42}Z`} fill={ink} />
      <path d={`M${D.x} ${D.y + 4} l-9 10 v-14z M${D.x} ${D.y + 4} l9 10 v-14z`} fill={ink} />
    </g>
  );
};
const MarkD: React.FC = () => (
  <g>
    <defs>
      <radialGradient id="sunset" cx="50%" cy="58%" r="60%"><stop offset="0" stopColor="#FFE7A8" /><stop offset="0.45" stopColor="#F6A443" /><stop offset="1" stopColor="#B4401E" /></radialGradient>
      <clipPath id="inner"><circle r={214} /></clipPath>
    </defs>
    <circle r={300} fill="url(#halo)" />
    <circle r={214} fill="url(#sunset)" />
    <g clipPath="url(#inner)">
      <path d="M-220 150 Q-100 120 0 150 T220 140 L220 230 L-220 230Z" fill="#7A2A14" opacity={0.75} />
      <path d="M-220 190 Q-120 172 -40 178 Q40 168 110 186 Q170 176 220 190 L220 230 L-220 230Z" fill="#140504" />
      {Array.from({length: 3}).map((_, i) => <path key={i} d={`M${-150 + i * 60} ${-120 + i * 14} q8 -6 16 0 q8 -6 16 0`} stroke="#7A2A14" strokeWidth={3} fill="none" opacity={0.6} />)}
      <RamSil />
    </g>
    <circle r={250} fill="none" stroke="url(#gold)" strokeWidth={22} />
    <circle r={214} fill="none" stroke="url(#gold)" strokeWidth={8} />
    {Array.from({length: 48}).map((_, i) => <rect key={i} x={-3} y={-246} width={6} height={i % 6 === 0 ? 26 : 12} fill="url(#gold)" transform={`rotate(${i * 7.5})`} />)}
  </g>
);

// E: Claude's pick — "का" monogram whose matra is a diya flame, inside a clock-like time ring
const MarkE: React.FC = () => (
  <g>
    <defs>
      <radialGradient id="discE" cx="50%" cy="42%" r="65%"><stop offset="0" stopColor="#5A1A12" /><stop offset="1" stopColor="#1A0606" /></radialGradient>
    </defs>
    <circle r={330} fill="url(#halo)" />
    {/* outer ring with 12 hour marks */}
    <circle r={262} fill="none" stroke="url(#gold)" strokeWidth={6} />
    <circle r={240} fill="url(#discE)" stroke="url(#gold)" strokeWidth={16} />
    {Array.from({length: 12}).map((_, i) => (
      <g key={i} transform={`rotate(${i * 30})`}>
        {i % 3 === 0 ? <path d="M0 -276 L9 -262 L0 -248 L-9 -262Z" fill="url(#gold)" /> : <circle cy={-262} r={4.5} fill="url(#gold)" />}
      </g>
    ))}
    {/* soft rays behind the letter */}
    <g opacity={0.16}>{Array.from({length: 24}).map((_, i) => <path key={i} d="M0 0 L-10 -220 L10 -220Z" fill="#FFD27A" transform={`rotate(${i * 15})`} />)}</g>
    {/* monogram: क + custom matra that rises into a flame */}
    <g transform="translate(-28 0)">
      <text x={-30} y={92} textAnchor="middle" fontFamily={TIRO} fontSize={300} fill="url(#gold)">क</text>
      <rect x={58} y={-86} width={74} height={20} fill="url(#gold)" />
      <path d="M100 -70 L118 -70 L116 120 Q109 132 102 120Z" fill="url(#gold)" />
      <g transform="translate(109 -96)">
        <circle cy={-34} r={46} fill="#FFB347" opacity={0.25} />
        <path d="M0 -78 Q26 -36 14 -8 Q0 4 -14 -8 Q-26 -36 0 -78Z" fill="url(#flame)" />
        <path d="M0 -44 Q9 -24 5 -12 Q0 -8 -5 -12 Q-9 -24 0 -44Z" fill="#FFF6C8" />
      </g>
    </g>
  </g>
);

// F: no letters — a diya inside the clock-like time ring
const MarkF: React.FC = () => (
  <g>
    <defs>
      <radialGradient id="discF" cx="50%" cy="45%" r="65%"><stop offset="0" stopColor="#5A1A12" /><stop offset="1" stopColor="#1A0606" /></radialGradient>
      <linearGradient id="clay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F7D27A" /><stop offset="1" stopColor="#B8792A" /></linearGradient>
    </defs>
    <circle r={330} fill="url(#halo)" />
    <circle r={262} fill="none" stroke="url(#gold)" strokeWidth={6} />
    <circle r={240} fill="url(#discF)" stroke="url(#gold)" strokeWidth={16} />
    {Array.from({length: 12}).map((_, i) => (
      <g key={i} transform={`rotate(${i * 30})`}>
        {i % 3 === 0 ? <path d="M0 -276 L9 -262 L0 -248 L-9 -262Z" fill="url(#gold)" /> : <circle cy={-262} r={4.5} fill="url(#gold)" />}
      </g>
    ))}
    <g transform="translate(0 -30)" opacity={0.18}>{Array.from({length: 24}).map((_, i) => <path key={i} d="M0 0 L-9 -210 L9 -210Z" fill="#FFD27A" transform={`rotate(${i * 15})`} />)}</g>
    {/* flame */}
    <g transform="translate(0 -14)">
      <circle cy={-40} r={120} fill="#FFB347" opacity={0.18} />
      <circle cy={-30} r={70} fill="#FFC870" opacity={0.25} />
      <path d="M0 -150 Q58 -66 34 -6 Q0 22 -34 -6 Q-58 -66 0 -150Z" fill="url(#flame)" />
      <path d="M0 -86 Q20 -44 12 -16 Q0 -6 -12 -16 Q-20 -44 0 -86Z" fill="#FFF6C8" />
      <rect x={-3} y={-14} width={6} height={22} rx={3} fill="#3A1A08" />
    </g>
    {/* diya bowl */}
    <g transform="translate(0 26)">
      <path d="M-150 0 Q-150 92 0 104 Q150 92 150 0 Q78 22 0 22 Q-78 22 -150 0Z" fill="url(#clay)" />
      <path d="M-150 0 Q-78 -26 0 -24 Q78 -26 150 0 Q78 22 0 22 Q-78 22 -150 0Z" fill="#7A3A14" />
      <path d="M-120 44 Q0 84 120 44" stroke="#8A4A18" strokeWidth={5} fill="none" opacity={0.7} />
      {[-80, -40, 0, 40, 80].map((x) => <circle key={x} cx={x} cy={58 + Math.abs(x) * -0.1} r={5} fill="#8A4A18" opacity={0.7} />)}
      <path d="M-46 104 L46 104 L36 126 L-36 126Z" fill="url(#clay)" />
    </g>
  </g>
);
const WordOne: React.FC<{y: number}> = ({y}) => (
  <g transform={`translate(540 ${y})`}>
    <text textAnchor="middle" fontFamily='"Playfair Display", serif' fontWeight={800} fontSize={112} letterSpacing={12} fill="url(#gold)">KAALCHITRA</text>
  </g>
);

const Word: React.FC<{y: number; size?: number}> = ({y, size = 1}) => (
  <g transform={`translate(540 ${y}) scale(${size})`}>
    <text textAnchor="middle" y={0} fontFamily='"Playfair Display", serif' fontWeight={800} fontSize={104} letterSpacing={10} fill="url(#gold)">KAALCHITRA</text>
    <g transform="translate(0 40)"><rect x={-240} y={0} width={180} height={3} fill={GOLD} opacity={0.7} /><rect x={60} y={0} width={180} height={3} fill={GOLD} opacity={0.7} /><rect x={-8} y={-6} width={14} height={14} fill={GOLD} transform="rotate(45)" /></g>
    <text textAnchor="middle" y={118} fontFamily={DEV} fontWeight={800} fontSize={58} fill="#F3E6C8">कालचित्र</text>
  </g>
);

const MARKS = {A: MarkA, B: MarkB, C: MarkC, D: MarkD, E: MarkE, F: MarkF};
const BGS = {A: 'url(#bgA)', B: 'url(#bgB)', C: 'url(#bgC)', D: 'url(#bgA)', E: 'url(#bgA)', F: 'url(#bgA)'};

export const LogoIcon: React.FC<{k: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'}> = ({k}) => {
  const M = MARKS[k];
  return (
    <AbsoluteFill>
      <svg width={1080} height={1080} viewBox="0 0 1080 1080"><Defs /><rect width={1080} height={1080} fill={BGS[k]} />
        <g transform="translate(540 540) scale(1.32)"><M /></g>
      </svg>
    </AbsoluteFill>
  );
};
export const LogoFull: React.FC<{k: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'}> = ({k}) => {
  const M = MARKS[k];
  return (
    <AbsoluteFill>
      <svg width={1080} height={1080} viewBox="0 0 1080 1080"><Defs /><rect width={1080} height={1080} fill={BGS[k]} />
        <g transform="translate(540 400) scale(0.95)"><M /></g>
        {k === 'F' ? <WordOne y={900} /> : <Word y={830} />}
      </svg>
    </AbsoluteFill>
  );
};

export const Watermark: React.FC = () => (
  <AbsoluteFill style={{background: 'transparent'}}>
    <svg width={640} height={120} viewBox="0 0 640 120"><Defs />
      <g transform="translate(60 60) scale(0.19)"><MarkF /></g>
      <text x={128} y={78} fontFamily='"Playfair Display", serif' fontWeight={800} fontSize={58} letterSpacing={8} fill="#FFFFFF">KAALCHITRA</text>
    </svg>
  </AbsoluteFill>
);

export const WatermarkText: React.FC = () => (
  <AbsoluteFill style={{background: 'transparent'}}>
    <svg width={520} height={90} viewBox="0 0 520 90">
      <text x={260} y={62} textAnchor="middle" fontFamily='"Playfair Display", serif' fontWeight={800} fontSize={56} letterSpacing={8} fill="#FFFFFF">KAALCHITRA</text>
    </svg>
  </AbsoluteFill>
);

export const WatermarkHandle: React.FC = () => (
  <AbsoluteFill style={{background: 'transparent'}}>
    <svg width={520} height={90} viewBox="0 0 520 90">
      <text x={260} y={62} textAnchor="middle" fontFamily='Montserrat, sans-serif' fontWeight={700} fontSize={44} letterSpacing={2} fill="#FFFFFF">@kaalchitra.verse</text>
    </svg>
  </AbsoluteFill>
);
