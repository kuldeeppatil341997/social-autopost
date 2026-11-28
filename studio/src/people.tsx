import React from 'react';
import {Pose} from './chars';

// Configurable human-style puppet. Origin = hips, head centre ~(0,-150).
export type Look = {
  skin: string; torso?: string; dhoti: string; sash?: string; belt?: string;
  crown?: 'mukut' | 'tall' | 'feather' | 'jata' | 'bun' | 'shikha' | 'helmet' | 'wild' | 'dark' | 'none';
  hair?: string; beard?: string; mustache?: boolean; tusks?: boolean; bulk?: number;
  eyeCol?: string; glowEyes?: string; snake?: boolean; kundal?: boolean; armor?: string; cape?: string;
  extraHeads?: number; elephant?: boolean; saree?: boolean; tilak?: string; crescent?: boolean;
};
export type Prop = 'bow' | 'mace' | 'trishul' | 'sword' | 'flute' | 'quiver3' | 'spear' | 'none';

const GOLD = '#EBB43C';

export const LOOKS: Record<string, Look> = {
  krishna: {skin: '#3E6FD8', dhoti: '#F2B632', sash: '#E7E2D5', crown: 'feather', hair: '#1d1410', tilak: '#F2B632', kundal: true},
  brahmin: {skin: '#E9C49A', torso: '#E9C49A', dhoti: '#F4EFE4', sash: '#E57A2B', crown: 'shikha', hair: '#1d1410', tilak: '#D2322F'},
  barbarik: {skin: '#B9764A', dhoti: '#7A1E22', armor: '#3B4A6B', crown: 'helmet', hair: '#1d1410', belt: GOLD, mustache: false},
  eklavya: {skin: '#7A4B2E', torso: '#7A4B2E', dhoti: '#8A6A3A', sash: '#4E7A3A', crown: 'bun', hair: '#1d1410'},
  drona: {skin: '#E2B98E', torso: '#E2B98E', dhoti: '#E57A2B', sash: '#F4EFE4', crown: 'bun', hair: '#EEE9E0', beard: '#EEE9E0', tilak: '#F4EFE4'},
  arjun: {skin: '#E5B88C', dhoti: '#F2F0EA', armor: '#D9A23A', crown: 'mukut', hair: '#1d1410', kundal: true},
  ghatotkach: {skin: '#4E6B5A', torso: '#3F5A4B', dhoti: '#5A2A18', belt: GOLD, crown: 'wild', hair: '#1a1410', tusks: true, bulk: 1.25, glowEyes: '#FF5A3C', mustache: true},
  karna: {skin: '#D9A877', dhoti: '#8A1E1E', armor: '#F0C25A', crown: 'mukut', hair: '#1d1410', kundal: true},
  duryodhan: {skin: '#C99A70', dhoti: '#3B1E4A', armor: '#5A2A6A', crown: 'tall', hair: '#1d1410', mustache: true, cape: '#7A1626'},
  ravan: {skin: '#8C5A3A', dhoti: '#7A1626', armor: '#2A1E14', crown: 'tall', hair: '#1d1410', mustache: true, kundal: true, cape: '#3A0E14', bulk: 1.12},
  shiv: {skin: '#8FB3D6', torso: '#8FB3D6', dhoti: '#D9A23A', sash: '#6B4A2A', crown: 'jata', hair: '#3a2a20', snake: true, crescent: true, tilak: '#F4EFE4'},
  shani: {skin: '#2E3D6E', dhoti: '#141A33', armor: '#1E2748', crown: 'dark', hair: '#0e1020', cape: '#0A0E1F', eyeCol: '#0e0a14'},
  parvati: {skin: '#EDC09A', dhoti: '#C2262E', torso: '#C2262E', sash: GOLD, crown: 'mukut', hair: '#1d1410', saree: true, kundal: true, tilak: '#D2322F'},
  vishnu: {skin: '#3A63C8', dhoti: '#F2B632', sash: '#E7E2D5', crown: 'tall', hair: '#1d1410', kundal: true, tilak: '#F4EFE4'},
  lakshman: {skin: '#EDBE92', dhoti: '#F2B632', sash: '#E7E2D5', crown: 'mukut', hair: '#1d1410', tilak: '#D2322F'},
  ram: {skin: '#4C7FD6', dhoti: '#F2B632', sash: '#E7E2D5', crown: 'mukut', hair: '#1d1410', tilak: '#D2322F'},
  bheem: {skin: '#C98A5A', torso: '#C98A5A', dhoti: '#7A1E22', sash: '#EBB43C', crown: 'mukut', hair: '#1d1410', bulk: 1.3, mustache: true},
  hidimba: {skin: '#5E7A5E', torso: '#3E5A3E', dhoti: '#5A2A18', crown: 'wild', hair: '#1a1410', saree: true, kundal: true},
  mother: {skin: '#C99A70', torso: '#2E5A8A', dhoti: '#2E5A8A', sash: '#EBB43C', crown: 'none', hair: '#1d1410', saree: true, kundal: true, tilak: '#D2322F'},
  shaniwife: {skin: '#C99A70', torso: '#3A1E5A', dhoti: '#3A1E5A', sash: '#9B5CFF', crown: 'mukut', hair: '#1d1410', saree: true, glowEyes: '#C9A3FF'},
  sita: {skin: '#EDC09A', torso: '#E6A23A', dhoti: '#E6A23A', sash: '#C2262E', crown: 'none', hair: '#1d1410', saree: true, tilak: '#D2322F'},
  statue: {skin: '#A8744A', torso: '#A8744A', dhoti: '#9A6A40', crown: 'bun', hair: '#8A5A34', beard: '#8A5A34', eyeCol: '#6A4426'},
  abhimanyu: {skin: '#E2B488', dhoti: '#1F4E8A', armor: '#C99A3A', crown: 'mukut', hair: '#1d1410', kundal: true},
  subhadra: {skin: '#EDC09A', torso: '#2E7A5A', dhoti: '#2E7A5A', sash: '#EBB43C', crown: 'mukut', hair: '#1d1410', saree: true, kundal: true, tilak: '#D2322F'},
  jayadrath: {skin: '#B88A60', dhoti: '#4A2A10', armor: '#6A5A3A', crown: 'tall', hair: '#1d1410', mustache: true},
  indra: {skin: '#F0D2A8', dhoti: '#F4EFE4', armor: '#E9D18A', crown: 'tall', hair: '#1d1410', kundal: true, tilak: '#D2322F'},
  surya: {skin: '#F2A93A', dhoti: '#C2262E', armor: '#F7D27A', crown: 'tall', hair: '#7A2A10', kundal: true, glowEyes: '#FFF3B0'},
  shravan: {skin: '#C99A6A', torso: '#C99A6A', dhoti: '#F2E2C0', sash: '#E57A2B', crown: 'shikha', hair: '#1d1410', tilak: '#D2322F'},
  oldman: {skin: '#C9A07A', torso: '#C9A07A', dhoti: '#EDE6DA', sash: '#E57A2B', crown: 'bun', hair: '#EEE9E0', beard: '#EEE9E0', eyeCol: '#9A9A9A'},
  oldwoman: {skin: '#C9A07A', torso: '#EDE6DA', dhoti: '#EDE6DA', sash: '#B8862E', crown: 'none', hair: '#DDD8CE', saree: true, eyeCol: '#9A9A9A'},
  dashrath: {skin: '#D9A877', dhoti: '#7A1E22', armor: '#E2B04A', crown: 'mukut', hair: '#1d1410', mustache: true, kundal: true},
  nachiketa: {skin: '#E2B488', torso: '#E2B488', dhoti: '#F2B632', sash: '#F4EFE4', crown: 'shikha', hair: '#1d1410', tilak: '#D2322F'},
  vajashravas: {skin: '#D9B08A', torso: '#D9B08A', dhoti: '#F4EFE4', sash: '#E57A2B', crown: 'bun', hair: '#3a2a20', beard: '#3a2a20', tilak: '#F4EFE4'},
  yama: {skin: '#3E5A4A', dhoti: '#1A1410', armor: '#2A2A3A', crown: 'tall', hair: '#0e0a08', mustache: true, kundal: true, cape: '#3A0E14', bulk: 1.15},
  bhishma: {skin: '#E2B98E', dhoti: '#F4EFE4', armor: '#D9D2C2', crown: 'tall', hair: '#EEE9E0', beard: '#EEE9E0', kundal: true, tilak: '#F4EFE4'},
  devvrat: {skin: '#E2B98E', dhoti: '#F4EFE4', armor: '#D9A23A', crown: 'mukut', hair: '#1d1410', kundal: true},
  shantanu: {skin: '#D9A877', dhoti: '#5A1E6A', armor: '#E2B04A', crown: 'tall', hair: '#1d1410', beard: '#3a2a20', kundal: true},
  ganga: {skin: '#E9D8C8', torso: '#BFE6F2', dhoti: '#BFE6F2', sash: '#F4EFE4', crown: 'mukut', hair: '#1d1410', saree: true, kundal: true},
  satyavati: {skin: '#C99A6A', torso: '#2E7A8A', dhoti: '#2E7A8A', sash: '#F2B632', crown: 'none', hair: '#1d1410', saree: true, tilak: '#D2322F'},
  fisherman: {skin: '#A8744A', torso: '#A8744A', dhoti: '#5A6A7A', sash: '#C9A24A', crown: 'none', hair: '#1d1410', mustache: true},
  shikhandi: {skin: '#D9A877', dhoti: '#8A1E4A', armor: '#7A5A8A', crown: 'helmet', hair: '#1d1410'},
  anjana: {skin: '#C0602B', torso: '#2E5A8A', dhoti: '#2E5A8A', sash: '#EBB43C', crown: 'none', hair: '#7E3517', saree: true, kundal: true},
  pavan: {skin: '#BFD8E8', dhoti: '#7FB0D0', sash: '#F4EFE4', crown: 'tall', hair: '#5A7A9A', kundal: true, cape: '#A8C8E0'},
  brahma: {skin: '#E2B04A', dhoti: '#C2262E', sash: '#F4EFE4', crown: 'tall', hair: '#EEE9E0', beard: '#EEE9E0', extraHeads: 2, kundal: true},
  soldier: {skin: '#C99A70', dhoti: '#4A2A1A', armor: '#5A5F66', crown: 'helmet', hair: '#1d1410', mustache: true},
  amba: {skin: '#EDC09A', torso: '#7A2A8A', dhoti: '#7A2A8A', sash: '#EBB43C', crown: 'none', hair: '#1d1410', saree: true, tilak: '#D2322F', kundal: true},
  shalva: {skin: '#D2A47A', dhoti: '#2A4A7A', armor: '#C9A24A', crown: 'mukut', hair: '#1d1410', mustache: true, kundal: true},
  gandhari: {skin: '#E8C29E', torso: '#6A1E3A', dhoti: '#6A1E3A', sash: '#EBB43C', crown: 'mukut', hair: '#1d1410', saree: true, kundal: true},
  sahadev: {skin: '#D9A877', dhoti: '#2A5A8A', armor: '#C9A24A', crown: 'mukut', hair: '#1d1410', kundal: true},
  pandu: {skin: '#EFE0CC', torso: '#EFE0CC', dhoti: '#E7E2D5', sash: '#EBB43C', crown: 'mukut', hair: '#1d1410', beard: '#1d1410', mustache: true},
  jarasandh: {skin: '#A8784E', dhoti: '#3A1A10', armor: '#6A4A2A', crown: 'tall', hair: '#1d1410', mustache: true, beard: '#1d1410', bulk: 1.35, kundal: true},
  queen: {skin: '#EDC09A', torso: '#B21E2A', dhoti: '#B21E2A', sash: '#EBB43C', crown: 'mukut', hair: '#1d1410', saree: true, tilak: '#D2322F'},
  urmila: {skin: '#EDC09A', torso: '#D24A7A', dhoti: '#D24A7A', sash: '#EBB43C', crown: 'none', hair: '#1d1410', saree: true, tilak: '#D2322F', kundal: true},
  nidra: {skin: '#8A8AD8', torso: '#2A2A6A', dhoti: '#2A2A6A', sash: '#C8C8FF', crown: 'mukut', hair: '#14142a', saree: true, kundal: true},
  meghnad: {skin: '#8A5A4A', dhoti: '#3A0E0E', armor: '#5A1E1E', crown: 'tall', hair: '#1a1410', mustache: true, tusks: true, kundal: true},
  ashwatthama: {skin: '#D2A47A', dhoti: '#3A2A4A', armor: '#8A6A3A', crown: 'bun', hair: '#1d1410', kundal: true, mustache: true},
  ashwold: {skin: '#A88468', torso: '#7A6A5A', dhoti: '#4A3E34', crown: 'jata', hair: '#8A847C', beard: '#8A847C', eyeCol: '#3a2a20'},
  iravan: {skin: '#C99A70', dhoti: '#2E6A5A', armor: '#C9A24A', crown: 'mukut', hair: '#1d1410', kundal: true},
  uloopi: {skin: '#9FC8B8', torso: '#2E7A6A', dhoti: '#2E7A6A', sash: '#EBB43C', crown: 'mukut', hair: '#14281f', saree: true, snake: true, kundal: true},
  kali: {skin: '#2A2E5A', torso: '#2A2E5A', dhoti: '#7A1626', sash: '#EBB43C', crown: 'wild', hair: '#0e0a08', saree: true, glowEyes: '#FF5A3C', tilak: '#D2322F', kundal: true},
  mohini: {skin: '#3E6FD8', torso: '#E85A8A', dhoti: '#E85A8A', sash: '#EBB43C', crown: 'mukut', hair: '#1d1410', saree: true, kundal: true, tilak: '#D2322F'},
  kumbhakarna: {skin: '#7A5A4A', torso: '#6A4A3A', dhoti: '#5A1E1E', belt: '#EBB43C', crown: 'wild', hair: '#1a1410', tusks: true, mustache: true, bulk: 1.45, kundal: true},
  saraswati: {skin: '#F2E2D0', torso: '#F4F2EA', dhoti: '#F4F2EA', sash: '#EBB43C', crown: 'mukut', hair: '#1d1410', saree: true, kundal: true, tilak: '#D2322F'},
  bhairav: {skin: '#2A2E5A', torso: '#2A2E5A', dhoti: '#C98A2A', sash: '#F4EFE4', crown: 'wild', hair: '#0e0a08', glowEyes: '#FF5A3C', snake: true, mustache: true, kundal: true, tilak: '#D2322F'},
  brahmahatya: {skin: '#6A6A7A', torso: '#2A1A2A', dhoti: '#2A1A2A', sash: '#5A4A6A', crown: 'wild', hair: '#D8D8E0', saree: true, glowEyes: '#C8F0FF'},
  ekadashi: {skin: '#F2D2B0', torso: '#F2B632', dhoti: '#F2B632', sash: '#C2262E', crown: 'tall', hair: '#1d1410', saree: true, kundal: true, tilak: '#D2322F'},
  mur: {skin: '#5A3A6A', dhoti: '#2A0E1A', armor: '#3A1E2A', crown: 'wild', hair: '#140a10', tusks: true, mustache: true, bulk: 1.35, glowEyes: '#FF5A3C', kundal: true},
  uttara: {skin: '#EDC09A', torso: '#C24A7A', dhoti: '#C24A7A', sash: '#EBB43C', crown: 'none', hair: '#1d1410', saree: true, tilak: '#D2322F'},
};

const Limb: React.FC<{x: number; y: number; rot: number; len: number; w: number; fill: string; band?: string; children?: React.ReactNode}> = ({x, y, rot, len, w, fill, band, children}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-4} width={w} height={len} rx={w / 2} fill={fill} />
    <rect x={-w / 2} y={-4} width={w * 0.38} height={len} rx={w / 2} fill="#000" opacity={0.12} />
    {band && <rect x={-w / 2 - 1} y={len * 0.32} width={w + 2} height={6} rx={3} fill={band} />}
    <g transform={`translate(0 ${len})`}>{children}</g>
  </g>
);

const PropEl: React.FC<{p: Prop}> = ({p}) => {
  switch (p) {
    case 'bow': return <g><path d="M-4 -95 Q-60 0 -4 95" stroke="#8A5A1C" strokeWidth={7} fill="none" strokeLinecap="round" /><path d="M-4 -95 L-4 95" stroke="#EDE6DA" strokeWidth={1.5} /><circle cx={-32} cy={0} r={5} fill={GOLD} /></g>;
    case 'mace': return <g transform="rotate(-20)"><rect x={-3} y={-70} width={6} height={80} rx={3} fill="#8A5A1C" /><circle cy={-80} r={22} fill={GOLD} /><path d="M-22 -80 h44 M0 -102 v44" stroke="#B9852A" strokeWidth={2.5} /><circle cy={-104} r={5} fill={GOLD} /></g>;
    case 'trishul': return <g><rect x={-3} y={-170} width={6} height={200} fill="#6B4A2A" /><path d="M0 -215 L7 -170 L-7 -170Z M-30 -200 Q-30 -170 0 -165 Q30 -170 30 -200 L24 -178 Q0 -172 -24 -178Z" fill="#D9E1E8" /><circle cy={-150} r={9} fill="#C9A24A" /></g>;
    case 'sword': return <g transform="rotate(-10)"><rect x={-3} y={-130} width={8} height={120} rx={3} fill="#D9E1E8" /><rect x={-14} y={-12} width={30} height={7} rx={3} fill={GOLD} /><rect x={-3} y={-6} width={8} height={22} fill="#3a2a20" /></g>;
    case 'flute': return <g transform="rotate(-70)"><rect x={-4} y={-70} width={8} height={90} rx={4} fill="#9A6A2A" />{[0, 1, 2, 3].map((i) => <circle key={i} cx={0} cy={-50 + i * 14} r={2} fill="#3a2a20" />)}</g>;
    case 'spear': return <g><rect x={-2.5} y={-150} width={5} height={175} rx={2} fill="#6B4A2A" /><path d="M0 -185 L9 -150 L-9 -150 Z" fill="#D9E1E8" /></g>;
    default: return null;
  }
};

const Eyes: React.FC<{e: string; col: string; glow?: string; y?: number}> = ({e, col, glow, y = -147}) => {
  const one = (x: number) => {
    if (e === 'closed') return <path key={x} d={`M${x - 8} ${y + 1} q8 6 16 0`} stroke={col} strokeWidth={3.5} fill="none" strokeLinecap="round" />;
    if (e === 'down') return <path key={x} d={`M${x - 8} ${y + 3} h16`} stroke={col} strokeWidth={4} strokeLinecap="round" />;
    if (glow && e !== 'shock') return <g key={x}><ellipse cx={x} cy={y} rx={8} ry={4.5} fill={glow} /><circle cx={x} cy={y} r={14} fill={glow} opacity={0.2} /></g>;
    const r = e === 'shock' ? 9 : 6.5;
    return (
      <g key={x}>
        {e === 'shock' && <circle cx={x} cy={y} r={r + 4} fill="#fff" />}
        <circle cx={x} cy={y} r={r} fill={col} /><circle cx={x + 2} cy={y - 3} r={2.2} fill="#fff" />
        {e === 'angry' && <path d={`M${x - 11} ${x < 0 ? y - 15 : y - 10} L${x + 11} ${x < 0 ? y - 10 : y - 15}`} stroke={col} strokeWidth={4} strokeLinecap="round" />}
        {e === 'sad' && <path d={`M${x - 10} ${x < 0 ? y - 10 : y - 15} L${x + 10} ${x < 0 ? y - 15 : y - 10}`} stroke={col} strokeWidth={3.5} strokeLinecap="round" />}
      </g>
    );
  };
  return <g>{one(-16)}{one(16)}</g>;
};

const Mouth: React.FC<{m: string}> = ({m}) => ({
  smile: <path d="M-10 -122 q10 9 20 0" stroke="#5a2410" strokeWidth={3.5} fill="none" strokeLinecap="round" />,
  o: <ellipse cx={0} cy={-120} rx={6} ry={8} fill="#5a2410" />,
  flat: <path d="M-8 -121 h16" stroke="#5a2410" strokeWidth={3.5} strokeLinecap="round" />,
  grit: <rect x={-11} y={-126} width={22} height={9} rx={3} fill="#fff" stroke="#5a2410" strokeWidth={2.5} />,
  sad: <path d="M-9 -118 q9 -8 18 0" stroke="#5a2410" strokeWidth={3.5} fill="none" strokeLinecap="round" />,
  laugh: <path d="M-12 -126 h24 q0 16 -12 16 q-12 0 -12 -16Z" fill="#5a2410" />,
} as Record<string, React.ReactNode>)[m] ?? null;

const Head: React.FC<{L: Look; eyes: string; mouth: string}> = ({L, eyes, mouth}) => {
  const col = L.eyeCol ?? '#1d1410';
  if (L.elephant) {
    return (
      <g>
        <ellipse cx={-52} cy={-150} rx={30} ry={38} fill="#D7A9A0" /><ellipse cx={52} cy={-150} rx={30} ry={38} fill="#D7A9A0" />
        <ellipse cx={-52} cy={-150} rx={30} ry={38} fill="none" stroke="#B9878A" strokeWidth={3} /><ellipse cx={52} cy={-150} rx={30} ry={38} fill="none" stroke="#B9878A" strokeWidth={3} />
        <ellipse cx={0} cy={-152} rx={40} ry={42} fill="#C9A6A6" />
        <path d="M-10 -130 Q-12 -90 10 -78 Q22 -74 20 -88 Q8 -92 10 -128Z" fill="#C9A6A6" />
        <path d="M14 -128 l14 6 l-12 4z" fill="#F4EFE4" />
        <Eyes e={eyes} col={col} y={-155} />
        <path d="M0 -186 v12" stroke="#D2322F" strokeWidth={4} strokeLinecap="round" />
        <path d="M-26 -188 Q0 -210 26 -188 L22 -214 Q0 -228 -22 -214Z" fill={GOLD} />
      </g>
    );
  }
  return (
    <g>
      <rect x={-14} y={-118} width={28} height={16} fill={L.skin} />
      {L.saree && <path d="M-44 -160 Q-50 -90 -36 -70 L36 -70 Q50 -90 44 -160 Q0 -205 -44 -160Z" fill={L.hair} />}
      {L.kundal && <><circle cx={-40} cy={-128} r={7} fill={GOLD} /><circle cx={40} cy={-128} r={7} fill={GOLD} /></>}
      <ellipse cx={0} cy={-150} rx={40} ry={44} fill={L.skin} />
      {L.crown !== 'shikha' && L.crown !== 'wild' && <path d="M-40 -150 Q-42 -196 0 -196 Q42 -196 40 -150 Q30 -176 0 -176 Q-30 -176 -40 -150Z" fill={L.hair ?? '#1d1410'} />}
      {L.crown === 'shikha' && <><path d="M-40 -150 Q-42 -196 0 -196 Q42 -196 40 -150 Q30 -186 0 -188 Q-30 -186 -40 -150Z" fill={L.skin} opacity={0.9} /><path d="M0 -194 q14 -20 4 -34" stroke="#1d1410" strokeWidth={6} fill="none" strokeLinecap="round" /></>}
      {L.beard && <path d="M-38 -140 Q-36 -86 0 -70 Q36 -86 38 -140 Q20 -112 0 -114 Q-20 -112 -38 -140Z" fill={L.beard} />}
      <Eyes e={eyes} col={col} glow={L.glowEyes} />
      {!L.beard && <Mouth m={mouth} />}
      {L.beard && <path d="M-8 -121 h16" stroke="#8a7a6a" strokeWidth={3} strokeLinecap="round" />}
      {L.mustache && <path d="M-20 -128 Q-8 -122 0 -128 Q8 -122 20 -128 Q26 -118 30 -122 M-20 -128 Q-26 -118 -30 -122" stroke="#1d1410" strokeWidth={5} fill="none" strokeLinecap="round" />}
      {L.tusks && <><path d="M-14 -122 l-4 -14 l8 2z" fill="#F4EFE4" /><path d="M14 -122 l4 -14 l-8 2z" fill="#F4EFE4" /></>}
      {L.tilak && <path d="M0 -178 v14" stroke={L.tilak} strokeWidth={3.5} strokeLinecap="round" />}
      {/* headgear */}
      {L.crown === 'mukut' && <g><path d="M-30 -186 L-26 -222 Q0 -238 26 -222 L30 -186 Q0 -196 -30 -186Z" fill={GOLD} /><path d="M-8 -230 L0 -252 L8 -230Z" fill={GOLD} /><circle cx={0} cy={-206} r={5} fill="#D2322F" /></g>}
      {L.crown === 'tall' && <g><path d="M-32 -186 L-26 -250 Q0 -272 26 -250 L32 -186 Q0 -198 -32 -186Z" fill={GOLD} /><path d="M-26 -250 Q0 -272 26 -250 L0 -290Z" fill={GOLD} /><circle cx={0} cy={-222} r={7} fill="#2BB58F" /><path d="M-30 -200 h60" stroke="#B9852A" strokeWidth={3} /></g>}
      {L.crown === 'feather' && <g><path d="M-30 -186 L-26 -218 Q0 -232 26 -218 L30 -186 Q0 -196 -30 -186Z" fill={GOLD} /><g transform="translate(14 -226) rotate(18)"><path d="M0 0 Q-16 -40 0 -76 Q16 -40 0 0Z" fill="#1F8A6A" /><ellipse cx={0} cy={-52} rx={9} ry={12} fill="#1E5FB0" /><circle cx={0} cy={-52} r={4} fill="#123" /></g><circle cx={0} cy={-204} r={5} fill="#D2322F" /></g>}
      {L.crown === 'jata' && <g><ellipse cx={0} cy={-212} rx={30} ry={30} fill={L.hair} /><ellipse cx={0} cy={-232} rx={20} ry={20} fill={L.hair} />{L.crescent && <path d="M-26 -236 a16 16 0 1 0 14 -16 a12 12 0 1 1 -14 16Z" fill="#F3EAD0" />}<path d="M18 -228 q16 -30 4 -50" stroke="#7FD1EA" strokeWidth={5} fill="none" opacity={0.8} /></g>}
      {L.crown === 'bun' && <g><circle cx={0} cy={-206} r={18} fill={L.hair} />{L.hair === '#1d1410' && <path d="M8 -216 q10 -30 22 -36 q-4 20 -16 36z" fill="#C9A24A" />}</g>}
      {L.crown === 'helmet' && <g><path d="M-44 -166 Q-46 -214 0 -218 Q46 -214 44 -166 Q0 -180 -44 -166Z" fill={L.armor ?? '#5A5F66'} /><path d="M-44 -166 Q0 -180 44 -166" stroke={GOLD} strokeWidth={5} fill="none" /><path d="M0 -218 L-6 -246 L6 -246Z" fill={GOLD} /><path d="M2 -246 q20 -10 30 6" stroke="#B42A2E" strokeWidth={6} fill="none" strokeLinecap="round" /></g>}
      {L.crown === 'wild' && <g>{Array.from({length: 9}).map((_, i) => <path key={i} d="M0 0 L-12 -46 L12 -46Z" fill={L.hair} transform={`translate(0 -160) rotate(${-80 + i * 20}) translate(0 -36)`} />)}<ellipse cx={0} cy={-176} rx={42} ry={22} fill={L.hair} /><path d="M-34 -182 h68" stroke={GOLD} strokeWidth={6} /></g>}
      {L.crown === 'dark' && <g><path d="M-34 -186 L-30 -232 L-14 -206 L0 -246 L14 -206 L30 -232 L34 -186Z" fill="#1A1F36" stroke="#6B7BB8" strokeWidth={3} /><circle cx={0} cy={-206} r={6} fill="#6B7BB8" /></g>}
    </g>
  );
};

export const Person: React.FC<{look: Look | string; pose?: Pose & {eyes?: any; mouth?: any}; prop?: Prop; propL?: Prop; noHead?: boolean}> = ({look, pose = {}, prop = 'none', propL = 'none', noHead}) => {
  const L = typeof look === 'string' ? LOOKS[look] : look;
  const {armL = 6, armR = -6, legL = 2, legR = -2, head = 0, blink} = pose;
  const eyes = blink && (pose.eyes ?? 'open') === 'open' ? 'closed' : (pose.eyes ?? 'open');
  const mouth = pose.mouth ?? 'smile';
  const b = L.bulk ?? 1;
  const torso = L.armor ?? L.torso ?? L.skin;
  return (
    <g>
      {L.cape && <path d="M-44 -100 Q-70 -10 -60 60 L60 60 Q70 -10 44 -100Z" fill={L.cape} transform={`scale(${b} 1)`} />}
      <Limb x={-14 * b} y={-6} rot={legL} len={60} w={20 * b} fill={L.skin}><ellipse cx={-3} cy={2} rx={13} ry={7} fill="#3a2a20" /></Limb>
      <Limb x={14 * b} y={-6} rot={legR} len={60} w={20 * b} fill={L.skin}><ellipse cx={3} cy={2} rx={13} ry={7} fill="#3a2a20" /></Limb>
      <g transform={`scale(${b} 1)`}>
        <path d="M-32 -102 Q-36 -40 -30 -6 L30 -6 Q36 -40 32 -102 Q0 -112 -32 -102Z" fill={torso} />
        {L.armor && <path d="M-26 -96 Q0 -80 26 -96 M-26 -76 Q0 -60 26 -76 M-26 -56 Q0 -40 26 -56" stroke="#000" strokeWidth={2} opacity={0.18} fill="none" />}
        {L.saree ? <path d="M-34 -30 h68 l16 90 h-100Z" fill={L.dhoti} /> : <path d="M-34 -24 h68 l8 44 h-84 Z" fill={L.dhoti} />}
        <rect x={-34} y={-28} width={68} height={8} rx={2} fill={L.belt ?? GOLD} />
        {L.sash && <path d="M-28 -100 L26 -20" stroke={L.sash} strokeWidth={L.saree ? 12 : 5} />}
        {L.snake && <path d="M-26 -100 Q0 -70 26 -100" stroke="#3E8A5A" strokeWidth={9} fill="none" strokeLinecap="round" />}
        {L.snake && <circle cx={26} cy={-104} r={7} fill="#3E8A5A" />}
      </g>
      <Limb x={-32 * b} y={-94} rot={armL} len={60} w={17 * b} fill={L.skin} band={GOLD}><g transform={`rotate(${-armL})`}><PropEl p={propL} /></g><circle r={9} fill={L.skin} /></Limb>
      <Limb x={32 * b} y={-94} rot={armR} len={60} w={17 * b} fill={L.skin} band={GOLD}><g transform={`rotate(${-armR})`}><PropEl p={prop} /></g><circle r={9} fill={L.skin} /></Limb>
      {!noHead && (
        <g transform={`rotate(${head} 0 -110)`}>
          {L.extraHeads ? Array.from({length: L.extraHeads}).map((_, i) => {
            const side = i % 2 ? 1 : -1; const k = Math.floor(i / 2) + 1;
            return <g key={i} transform={`translate(${side * k * 46} ${k * 6}) scale(${1 - k * 0.07})`} opacity={1}><Head L={{...L, crown: 'mukut'}} eyes={eyes} mouth={mouth} /></g>;
          }).reverse() : null}
          <Head L={L} eyes={eyes} mouth={mouth} />
        </g>
      )}
    </g>
  );
};

export const BabyHuman: React.FC<{eyes?: string; elephant?: boolean}> = ({eyes = 'closed', elephant}) => (
  <g>
    <ellipse cx={0} cy={-40} rx={70} ry={46} fill="#F4EFE4" />
    <path d="M-70 -40 Q0 10 70 -40" stroke="#E2B04A" strokeWidth={6} fill="none" />
    <g transform="translate(0 40) scale(0.6)">
      {elephant ? <Person look={{skin: '#EDC09A', dhoti: '#F2B632', elephant: true, eyeCol: '#1d1410'}} pose={{eyes: eyes as any}} /> : (
        <g><ellipse cx={0} cy={-150} rx={42} ry={44} fill="#EDC09A" /><path d="M-30 -178 Q0 -200 30 -178" stroke="#1d1410" strokeWidth={10} fill="none" /><Eyes e={eyes} col="#1d1410" /><Mouth m="smile" /></g>
      )}
    </g>
  </g>
);

export const Dog: React.FC<{mouth?: number; arrows?: boolean}> = ({mouth = 0, arrows}) => (
  <g>
    <ellipse cx={0} cy={0} rx={70} ry={34} fill="#B07A44" />
    <rect x={-56} y={10} width={14} height={44} rx={6} fill="#8A5A2A" /><rect x={40} y={10} width={14} height={44} rx={6} fill="#8A5A2A" />
    <path d="M66 -10 q30 -20 24 -46" stroke="#B07A44" strokeWidth={12} fill="none" strokeLinecap="round" />
    <g transform="translate(-74 -30)">
      <ellipse cx={0} cy={0} rx={36} ry={30} fill="#B07A44" /><path d="M-6 -24 L14 -50 L22 -18Z" fill="#8A5A2A" />
      <ellipse cx={-30} cy={10} rx={18} ry={12} fill="#C99A6A" /><circle cx={-44} cy={4} r={6} fill="#1d1410" /><circle cx={-6} cy={-6} r={5} fill="#1d1410" />
      <path d={`M-40 ${16} L-14 ${16 + mouth * 18}`} stroke="#5a2410" strokeWidth={4} />
      {arrows && [-12, 0, 12].map((d, i) => <path key={i} d={`M${-60} ${10 + d * 0.6} L${-10} ${14 + d}`} stroke="#8A5A1C" strokeWidth={3} />)}
    </g>
  </g>
);

export const Tree: React.FC<{f: number; holes?: number}> = ({f, holes = 0}) => (
  <g>
    <path d="M-30 0 Q-24 -200 -10 -320 L10 -320 Q24 -200 30 0Z" fill="#6B4226" />
    {Array.from({length: 22}).map((_, i) => {
      const a = i * 2.4; const r = 60 + (i % 5) * 34;
      const x = Math.cos(a) * r; const y = -380 + Math.sin(a) * r * 0.7;
      return (
        <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 47) % 360 + Math.sin(f / 20 + i) * 6})`}>
          <path d="M0 -26 Q20 0 0 26 Q-20 0 0 -26Z" fill={i % 3 ? '#3E8A4A' : '#5BAA5A'} />
          {i < holes * 22 && <circle r={5} fill="#0b1a10" />}
        </g>
      );
    })}
  </g>
);

export const Jatayu: React.FC<{f: number; wing?: number; hurt?: boolean}> = ({f, wing, hurt}) => {
  const w = wing ?? Math.sin(f / 4) * 0.5;
  const Wing = ({side}: {side: number}) => (
    <g transform={`scale(${side} 1) rotate(${-20 + w * 40})`}>
      <path d="M10 -10 Q120 -120 260 -60 Q200 -40 230 -10 Q170 -10 190 20 Q120 10 10 20Z" fill={hurt ? '#6A5A4A' : '#7A4E2A'} />
      <path d="M60 -30 Q150 -80 240 -50 M80 0 Q160 -30 210 -10" stroke="#4A2E16" strokeWidth={5} fill="none" />
    </g>
  );
  return (
    <g>
      {!hurt && <Wing side={-1} />}{!hurt && <Wing side={1} />}
      <ellipse cx={0} cy={0} rx={60} ry={80} fill="#8A5A30" />
      <path d="M-40 -50 Q0 -90 40 -50 Q0 -30 -40 -50Z" fill="#EDE6DA" />
      <g transform="translate(0 -110)">
        <path d="M-20 30 Q0 -40 20 30Z" fill="#E9D8C0" />
        <circle cx={0} cy={-6} r={30} fill="#E9C8A8" />
        <path d="M14 -6 Q50 0 38 22 Q30 6 14 8Z" fill="#E2B04A" />
        <circle cx={6} cy={-12} r={6} fill="#1d1410" /><circle cx={8} cy={-14} r={2} fill="#fff" />
        <path d="M-24 -26 Q0 -44 24 -26 L18 -40 Q0 -54 -18 -40Z" fill="#EBB43C" />
      </g>
      <path d="M-20 76 l-10 40 M20 76 l10 40" stroke="#E2B04A" strokeWidth={8} strokeLinecap="round" />
      <path d="M-30 110 l-14 10 M-30 110 l0 16 M30 110 l14 10 M30 110 l0 16" stroke="#E2B04A" strokeWidth={5} strokeLinecap="round" />
    </g>
  );
};
export const Cow: React.FC<{old?: boolean}> = ({old}) => (
  <g>
    <ellipse cx={0} cy={0} rx={90} ry={46} fill={old ? '#B8AFA0' : '#F2EDE2'} />
    {old && <path d="M-60 -20 v40 M-40 -24 v44 M-20 -26 v46" stroke="#8A8070" strokeWidth={3} />}
    {[-60, -36, 40, 64].map((x) => <rect key={x} x={x - 7} y={30} width={14} height={50} rx={5} fill={old ? '#9A9080' : '#E2DACA'} />)}
    <path d="M86 -10 q20 30 6 60" stroke={old ? '#9A9080' : '#E2DACA'} strokeWidth={8} fill="none" />
    <g transform="translate(-96 -30)">
      <ellipse rx={34} ry={28} fill={old ? '#B8AFA0' : '#F2EDE2'} /><ellipse cx={-14} cy={14} rx={20} ry={13} fill="#E9B9A8" />
      <path d="M-6 -24 q-10 -24 -24 -24 M10 -24 q10 -24 24 -26" stroke="#8A6A3A" strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={-6} cy={-4} r={4} fill="#1d1410" />
    </g>
  </g>
);
export const Wheel: React.FC<{r?: number; rot?: number}> = ({r = 70, rot = 0}) => (
  <g transform={`rotate(${rot})`}>
    <circle r={r} fill="none" stroke="#8A5A1C" strokeWidth={12} /><circle r={r} fill="none" stroke="#EBB43C" strokeWidth={4} />
    {Array.from({length: 8}).map((_, i) => <rect key={i} x={-3} y={-r} width={6} height={r} fill="#8A5A1C" transform={`rotate(${i * 45})`} />)}
    <circle r={14} fill="#EBB43C" />
  </g>
);
export const Kanwad: React.FC<{f: number}> = ({f}) => (
  <g>
    <path d={`M-220 ${-10 + Math.sin(f / 8) * 4} Q0 -40 220 ${-10 - Math.sin(f / 8) * 4}`} stroke="#8A5A1C" strokeWidth={10} fill="none" />
    {[-1, 1].map((sd) => (
      <g key={sd} transform={`translate(${sd * 200} ${-10 + sd * Math.sin(f / 8) * 4})`}>
        <path d="M-50 140 L0 0 L50 140" stroke="#C9A24A" strokeWidth={3} fill="none" />
        <path d="M-70 140 Q0 200 70 140Z" fill="#B8862E" /><rect x={-70} y={130} width={140} height={14} rx={6} fill="#8A5A1C" />
      </g>
    ))}
  </g>
);
export const Pushpak: React.FC = () => (
  <g>
    <path d="M-220 0 Q0 80 220 0 L180 -30 L-180 -30Z" fill="#D9A23A" />
    <path d="M-220 0 Q0 80 220 0" stroke="#8A5A1C" strokeWidth={6} fill="none" />
    <path d="M-120 -30 L-120 -140 Q0 -220 120 -140 L120 -30" fill="#B8862E" stroke="#EBB43C" strokeWidth={6} />
    <path d="M-20 -200 L0 -250 L20 -200Z" fill="#EBB43C" />
    {[-160, 160].map((x) => <path key={x} d={`M${x} -10 q${x > 0 ? 60 : -60} -30 ${x > 0 ? 90 : -90} -10 q${x > 0 ? -40 : 40} 10 ${x > 0 ? -90 : 90} 30Z`} fill="#F7D27A" />)}
  </g>
);
