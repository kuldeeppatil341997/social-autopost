import React from 'react';
import script from '../../videos/barbarik/script.json';
import timings from '../../videos/barbarik/timings.json';
import {A, Arrow, BattleBG, blink, bob, CosmicBG, EndCard, FireAltar, Flash, ForestBG, Glow, H, Hills, interpolate, lerp, p, Place, Rays, Sky, Stars, Svg, W} from '../kit';
import {Person, Tree} from '../people';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

const B = 'barbarik';
const Arrows3: React.FC<{f: number; x: number; y: number; on?: number}> = ({f, x, y, on = 3}) => (
  <g>{[0, 1, 2].map((i) => <g key={i} opacity={i < on ? 1 : 0.15}><Glow cx={x + (i - 1) * 90} cy={y} r={90} c={['#FF5A3C', '#5AD1FF', '#FFD24A'][i]} o={0.5 + Math.sin(f / 6 + i) * 0.15} /><Arrow x={x + (i - 1) * 90} y={y} rot={-90} /></g>)}</g>
);

const S1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <BattleBG f={f} />
    <Glow cx={540} cy={1100} r={420} c="#FFD27A" o={0.4} />
    <A who={B} x={540} y={1560} s={2.6} prop="bow" pose={{armR: -40, armL: 30, mouth: 'flat', blink: blink(f)}} />
    <Arrows3 f={f} x={540} y={760} />
  </Svg>
);
const S2: React.FC<SP> = ({f}) => (
  <Svg zoom={1.25 - f * 0.001} oy={900}>
    <Sky id="b2" c={['#1a0a06', '#6A2A14', '#1a0a06']} />
    <Rays f={f} cx={540} cy={900} op={0.18} />
    <A who="bheem" x={250} y={1650} s={1.6} o={0.45} prop="mace" />
    <A who="ghatotkach" x={830} y={1650} s={1.6} o={0.45} />
    <A who={B} x={540} y={1600} s={2.7} prop="bow" pose={{armR: -20, mouth: 'smile', blink: blink(f)}} />
  </Svg>
);
const S3: React.FC<SP> = ({f, L}) => {
  const give = p(f, 10, 50);
  const demo = f >= L[1];
  const k = demo ? Math.min(3, Math.floor((f - L[1]) / 28) + 1) : 0;
  return (
    <Svg>
      <CosmicBG f={f} c="#1E2A5A" />
      {!demo && <><Glow cx={540} cy={700} r={400} c="#9FC8FF" o={0.5} /><A who="shiv" x={540} y={1050} s={1.8} prop="trishul" pose={{armR: -60, armL: 40, blink: blink(f)}} o={1 - give * 0.4} /></>}
      {!demo && [0, 1, 2].map((i) => <Arrow key={i} x={lerp(give, 540 + (i - 1) * 60, 540 + (i - 1) * 90)} y={lerp(give, 900, 1250)} rot={90} glow="#FFE27A" />)}
      <A who={B} x={540} y={1640} s={demo ? 1.6 : 1.9} prop="bow" pose={{armL: 120, armR: -120, eyes: demo ? 'open' : 'closed', mouth: 'smile'}} />
      {demo && <Arrows3 f={f} x={540} y={760} on={k} />}
      {demo && k >= 1 && [[200, 1100], [880, 1050], [300, 1300], [780, 1280]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14 + Math.sin(f / 4 + i) * 3} fill="#FF5A3C" opacity={0.85} />)}
      {demo && k >= 2 && <ellipse cx={540} cy={1400} rx={300} ry={420} stroke="#5AD1FF" strokeWidth={6} fill="none" opacity={0.6} />}
      {demo && k >= 3 && <Rays f={f * 4} color="#FFD24A" cx={540} cy={760} op={0.25} />}
    </Svg>
  );
};
const S4: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <Sky id="b4" c={['#20101a', '#7A3A2A', '#E09A5A']} />
    <Hills c="#3A1A14" y={1400} />
    <A who="mother" x={330} y={1600} s={2.2} pose={{armR: -60, mouth: 'smile', blink: blink(f, 30)}} />
    <A who={B} x={760} y={1600} s={2.3} flip prop="bow" pose={{armL: -80 + bob(f, 3), armR: -10, mouth: 'flat', blink: blink(f)}} />
    <g transform="translate(540 1050)"><path d="M0 0 L-140 0 M0 0 L140 0" stroke="#F0C25A" strokeWidth={6} /><rect x={-4} y={0} width={8} height={160} fill="#F0C25A" /><path d={`M-140 0 l-50 ${80 + Math.sin(f / 15) * 30} h100Z`} fill="#F0C25A" opacity={0.7} /><path d={`M140 0 l-50 ${80 - Math.sin(f / 15) * 30} h100Z`} fill="#F0C25A" opacity={0.7} /></g>
  </Svg>
);
const S5: React.FC<SP> = ({f, L}) => {
  const walk = p(f, 0, 30);
  const point = f >= L[1];
  return (
    <Svg>
      <ForestBG f={f} />
      <g transform="translate(560 1720) scale(1.5)"><Tree f={f} /></g>
      <A who="brahmin" x={260} y={1640} s={2.2} pose={{armR: point ? -150 : -20, armL: 10, blink: blink(f, 12)}} />
      <A who={B} x={lerp(walk, 1200, 830)} y={1640} s={2.2} flip prop="bow" pose={{legL: walk < 1 ? Math.sin(f / 3) * 14 : 2, legR: walk < 1 ? -Math.sin(f / 3) * 14 : -2, blink: blink(f), mouth: 'flat'}} />
    </Svg>
  );
};
const S6: React.FC<SP> = ({f, L}) => {
  const fly = p(f, 6, 30);
  const foot = f >= L[1];
  const ang = (f / 5) % (Math.PI * 2);
  return (
    <Svg zoom={foot ? 1 + p(f, L[1], L[1] + 14) * 1.2 : 1} ox={330} oy={1650}>
      <ForestBG f={f} />
      <g transform="translate(620 1720) scale(1.5)"><Tree f={f} holes={fly} /></g>
      <A who="brahmin" x={300} y={1640} s={2.2} pose={{mouth: 'smile', blink: blink(f, 12)}} />
      <g transform="translate(310 1660) rotate(-10)"><path d="M0 -14 Q20 0 0 14 Q-20 0 0 -14Z" fill="#5BAA5A" /><circle r={4} fill="#0b1a10" /></g>
      {fly < 1 ? <Arrow x={lerp(fly, 1000, 600)} y={lerp(fly, 1500, 1050) + Math.sin(fly * 9) * 120} rot={-120 + fly * 300} glow="#FFE27A" />
        : <Arrow x={310 + Math.cos(ang) * 120} y={1640 + Math.sin(ang) * 40} rot={(ang * 180) / Math.PI + 90} glow="#FFE27A" />}
    </Svg>
  );
};
const S7: React.FC<SP> = ({f, dur}) => {
  const t = f / dur;
  const side = Math.floor(f / 18) % 2;
  return (
    <Svg>
      <BattleBG f={f} night />
      {[0, 1, 2, 3, 4, 5].map((i) => <A key={i} who="soldier" x={i < 3 ? 120 + i * 110 : 640 + (i - 3) * 110} y={1640} s={1.3} flip={i >= 3} o={Math.max(0, 1 - t * 1.6 + (i % 3) * 0.1)} prop="spear" />)}
      <A who={B} x={side ? 380 : 700} y={1640} s={2} flip={!side} prop="bow" pose={{eyes: t > 0.7 ? 'sad' : 'angry', mouth: t > 0.7 ? 'sad' : 'grit'}} o={1} />
      <A who="krishna" x={540} y={900} s={1.3} o={0.55} pose={{eyes: 'closed', mouth: 'flat'}} />
    </Svg>
  );
};
const S8: React.FC<SP> = ({f, L}) => {
  const smile = f >= L[1];
  const give = f >= L[2];
  const fl = p(f, L[2] + 20, L[2] + 34);
  return (
    <Svg zoom={smile && !give ? 1.25 : 1} ox={760} oy={1100}>
      <Sky id="b8" c={['#1a0a14', '#5A2A3A', '#E0905A']} />
      <Glow cx={300} cy={1000} r={400} c="#7FB0FF" o={0.4} />
      <A who="krishna" x={300} y={1640} s={2.2} pose={{armR: -100, mouth: 'flat', blink: blink(f, 9)}} prop="flute" />
      <A who={B} x={780} y={give ? 1700 : 1640} s={2.3} flip prop={give ? 'none' : 'bow'} pose={{head: give ? 18 : 0, eyes: give ? 'closed' : 'open', mouth: 'smile', armL: give ? -150 : 6, armR: give ? 150 : -6, legL: give ? -70 : 2, legR: give ? 70 : -2}} />
      {give && <Rays f={f * 3} cx={780} cy={1200} op={0.3 * p(f, L[2], L[2] + 20)} />}
      <Flash t={fl} c="#FFF2C0" />
    </Svg>
  );
};
const HeadOnly: React.FC<{look: string; eyes?: string}> = ({look, eyes}) => (
  <g><defs><clipPath id={'ho' + look}><rect x={-120} y={-300} width={240} height={200} /></clipPath></defs><g clipPath={`url(#ho${look})`}><Person look={look} pose={{eyes: eyes as any, mouth: "smile"}} /></g></g>
);
const S9: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <Sky id="b9" c={['#1a0a06', '#A8502A', '#F2B05A']} />
    <path d="M0 1450 Q540 850 1080 1450 L1080 1920 L0 1920Z" fill="#3A1A10" />
    <Glow cx={540} cy={900} r={360} c="#FFE3A0" o={0.6} />
    <Place x={540} y={1170} s={2.4}><HeadOnly look={B} eyes={(f % 95) < 4 ? 'closed' : 'open'} /></Place>
    <g opacity={0.8}><BattleArmies f={f} /></g>
  </Svg>
);
const BattleArmies: React.FC<{f: number}> = ({f}) => (
  <g>{Array.from({length: 30}).map((_, i) => <rect key={i} x={i * 36} y={1600 + (i % 4) * 14 + Math.sin(f / 5 + i) * 6} width={20} height={50} rx={6} fill={i < 15 ? '#1a0f0c' : '#2a1410'} />)}</g>
);
const S10: React.FC<SP> = ({f, L}) => (
  <Svg zoom={1 + f * 0.0005}>
    <Sky id="b10" c={['#2A0E06', '#8A3A14', '#2A0E06']} />
    <Rays f={f} cx={540} cy={1000} op={0.25} />
    <path d="M300 1720 L300 1000 Q540 640 780 1000 L780 1720Z" fill="#E2B04A" />
    <path d="M340 1720 L340 1020 Q540 720 740 1020 L740 1720Z" fill="#7A0F1A" />
    <Glow cx={540} cy={1100} r={300} c="#FFE3A0" o={0.5} />
    <Place x={540} y={1300} s={2.2}><HeadOnly look={B} eyes="closed" /></Place>
    {Array.from({length: 16}).map((_, i) => <circle key={i} cx={380 + (i % 8) * 46} cy={1360 + Math.floor(i / 8) * 40} r={16} fill={i % 2 ? '#FF8A2A' : '#FFD24A'} />)}
    <g opacity={p(f, L[1], L[1] + 20)}>{[220, 860].map((x) => <g key={x} transform={`translate(${x} 1650)`}><ellipse rx={50} ry={14} fill="#A5521F" /><path d={`M0 ${-50 - Math.sin(f / 4) * 6} Q18 -16 0 -6 Q-18 -16 0 ${-50 - Math.sin(f / 4) * 6}Z`} fill="#FFB02E" /><Glow cx={0} cy={-30} r={120} c="#FFB347" o={0.5} /></g>)}</g>
  </Svg>
);

export const barbarik: Cfg = {
  id: 'Barbarik', voice: 'barbarik.wav', script, timings,
  scenes: [[S1, [0]], [S2, [1]], [S3, [2, 3]], [S4, [4]], [S5, [5, 6]], [S6, [7, 8]], [S7, [9]], [S8, [10, 11, 12]], [S9, [13]], [S10, [14, 15]]],
  titles: [
    {pill: 'MAHABHARAT KA', title: 'SABSE BADA\nYODDHA.'},
    {pill: 'BHEEM KA POTA', title: 'BARBARIK.'},
    {pill: 'SHIV KA VARDAAN', title: '3 BAAN.'}, null,
    {pill: 'MAA SE VAADA', title: 'VACHAN.'},
    {pill: 'RAASTE MEIN', title: 'EK BRAHMAN.'}, {pill: 'PAREEKSHA', title: 'EK PED.'},
    {pill: 'ACHOOK', title: 'HAR PATTA.'}, {pill: 'CHHUPA HUA', title: 'AAKHRI PATTA.', red: 'PATTA'},
    {pill: 'KRISHNA KI CHINTA', title: 'AKELA\nYODDHA.'},
    {pill: 'DAAN MEIN', title: 'SHEESH.', red: 'SHEESH'}, {pill: 'AAKHRI ICHCHHA', title: 'POORA YUDDH.'}, {title: 'BALIDAAN.'},
    {pill: 'PAHAADI SE', title: 'MAHABHARAT.'},
    {pill: 'AAJ HUM KEHTE HAIN', title: 'KHATU SHYAAM.'}, {title: 'HAARE KA\nSAHAARA.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'BARBARIK.', sub: 'Sheesh ke daani'}, endScene: EndCard,
};
void H; void W; void interpolate; void Stars; void FireAltar;
