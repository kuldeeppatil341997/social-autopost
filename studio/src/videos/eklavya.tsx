import React from 'react';
import script from '../../videos/eklavya/script.json';
import timings from '../../videos/eklavya/timings.json';
import {A, Arrow, blink, bob, EndCard, Flash, ForestBG, Glow, lerp, p, PalaceBG, Place, Rays, Sky, Svg} from '../kit';
import {Dog} from '../people';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

const E = 'eklavya';
const S1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <ForestBG f={f} night />
    <Glow cx={540} cy={1000} r={460} c="#FFD27A" o={0.35} />
    <A who="drona" x={300} y={1640} s={2.1} o={0.6} pose={{armR: -110, mouth: 'flat'}} />
    <A who={E} x={760} y={1640} s={2.3} flip prop="bow" pose={{head: 10, eyes: 'closed', mouth: 'flat'}} />
  </Svg>
);
const S2: React.FC<SP> = ({f}) => {
  const shot = (f % 40) / 40;
  return (
    <Svg>
      <ForestBG f={f} />
      <g transform="translate(860 1300)"><circle r={70} fill="#F4EFE4" /><circle r={48} fill="#D2322F" /><circle r={26} fill="#F4EFE4" /><circle r={10} fill="#D2322F" /></g>
      <Arrow x={lerp(shot, 380, 820)} y={1300} rot={0} />
      <A who={E} x={300} y={1640} s={2.3} prop="bow" pose={{armR: -90, armL: -80, mouth: 'flat', blink: blink(f)}} />
    </Svg>
  );
};
const S3: React.FC<SP> = ({f, L}) => {
  const no = f >= L[1];
  return (
    <Svg>
      <PalaceBG tint="#2A1A0C" />
      <A who="arjun" x={180} y={1660} s={1.5} prop="bow" pose={{blink: blink(f, 5)}} />
      <A who="bheem" x={320} y={1660} s={1.5} prop="mace" pose={{blink: blink(f, 40)}} />
      <A who="drona" x={500} y={1640} s={2.1} pose={{armR: no ? -150 : -20, mouth: no ? 'flat' : 'smile', blink: blink(f, 20)}} />
      <A who={E} x={850} y={no ? 1660 : 1640} s={2.1} flip pose={{head: 14, eyes: no ? 'sad' : 'closed', mouth: no ? 'sad' : 'flat', armL: 40, armR: -40}} />
    </Svg>
  );
};
const S4: React.FC<SP> = ({f, L}) => {
  const build = p(f, 0, L[1] > 0 ? L[1] - 10 : 60);
  const prac = f >= L[1];
  const day = Math.sin(f / 25);
  return (
    <Svg>
      <ForestBG f={f} night={prac && day < 0} />
      {prac && <g transform={`translate(${540 + Math.cos(f / 25) * 400} ${700 - Math.abs(day) * 300})`}><circle r={60} fill={day > 0 ? '#FFE27A' : '#F3EAD0'} /></g>}
      <g style={{}} opacity={1}>
        <defs><clipPath id="ekb"><rect x={-200} y={lerp(build, 100, -320)} width={400} height={600} /></clipPath></defs>
        <g transform="translate(330 1640) scale(2.2)" clipPath="url(#ekb)"><A who="statue" x={0} y={0} s={1} pose={{eyes: 'closed', mouth: 'flat', armL: 20, armR: -20}} /></g>
      </g>
      <A who={E} x={800} y={1640} s={2.2} flip prop={prac ? 'bow' : 'none'} pose={prac ? {armL: -90, armR: -80, mouth: 'flat', blink: blink(f)} : {armL: -40 + bob(f, 20, 3), armR: -60 - bob(f, 20, 3), mouth: 'smile'}} />
      {prac && <Arrow x={lerp((f % 30) / 30, 700, 1300)} y={1340} rot={0} />}
    </Svg>
  );
};
const S5: React.FC<SP> = ({f, L}) => {
  const hit = f >= L[1];
  const fly = p(f, L[1], L[1] + 18);
  return (
    <Svg>
      <ForestBG f={f} />
      <Place x={hit ? 700 : 760 + bob(f, 6, 4)} y={1620} s={1.8}><Dog mouth={hit ? 0 : Math.abs(Math.sin(f / 3))} arrows={fly >= 1} /></Place>
      {!hit && [0, 1, 2].map((i) => <path key={i} d={`M${600 - i * 40} ${1500 - i * 30} q-20 -20 0 -40`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.7 * Math.abs(Math.sin(f / 4 + i))} />)}
      {hit && fly < 1 && [0, 1, 2, 3, 4, 5, 6].map((i) => <Arrow key={i} x={lerp(fly, 150, 560)} y={1540 + (i - 3) * 14} rot={0} />)}
      <A who={E} x={180} y={1640} s={2} prop="bow" pose={{armR: -90, armL: -80, eyes: 'closed', mouth: 'flat'}} o={hit ? 1 : 0.3} />
    </Svg>
  );
};
const S6: React.FC<SP> = ({f, L}) => {
  const vow = f >= L[1];
  return (
    <Svg zoom={vow ? 1 : 1 + p(f, 0, 14) * 0.6} ox={400} oy={1150}>
      <PalaceBG tint="#1E1208" />
      <Place x={760} y={1640} s={1.6}><Dog arrows /></Place>
      <A who="arjun" x={400} y={1640} s={2.3} prop="bow" pose={{eyes: vow ? 'open' : 'shock', mouth: vow ? 'flat' : 'o', blink: vow && blink(f)}} />
      {vow && <A who="drona" x={150} y={1640} s={2.2} pose={{armR: -60, mouth: 'smile', blink: blink(f, 20)}} />}
      {vow && <Rays f={f} cx={400} cy={1000} op={0.18} />}
    </Svg>
  );
};
const S7: React.FC<SP> = ({f, L}) => {
  const ask = f >= L[1];
  return (
    <Svg zoom={ask ? 1 + p(f, L[1], L[1] + 20) * 0.25 : 1} ox={540} oy={1300}>
      <ForestBG f={f} />
      <A who="drona" x={330} y={1640} s={2.3} pose={{armR: ask ? -70 : -20, mouth: 'flat', blink: blink(f, 20)}} />
      <A who={E} x={760} y={ask ? 1640 : 1700} s={2.2} flip prop="bow" pose={{head: ask ? 0 : 20, eyes: ask ? 'shock' : 'closed', mouth: ask ? 'o' : 'smile', legL: ask ? 2 : -60, legR: ask ? -2 : 60}} />
    </Svg>
  );
};
const S8: React.FC<SP> = ({f}) => {
  const fl = p(f, 18, 32);
  return (
    <Svg>
      <Sky id="ek8" c={['#1a0a06', '#6A2A14', '#2A0E06']} />
      <Rays f={f} cx={540} cy={1150} op={0.25 * fl} />
      <A who="drona" x={260} y={1640} s={2} pose={{eyes: fl > 0.5 ? 'sad' : 'open', mouth: 'flat'}} o={0.85} />
      <A who={E} x={640} y={1640} s={2.4} flip pose={{armL: -120, armR: -120, eyes: 'closed', mouth: 'smile'}} />
      <g transform="translate(560 1150)"><path d="M-60 0 Q0 30 60 0 Q0 -20 -60 0Z" fill="#3E8A4A" /><Glow cx={0} cy={0} r={90 + fl * 60} c="#FFE27A" o={0.6} /></g>
      <Flash t={fl} c="#FFF2C0" />
    </Svg>
  );
};
const S9: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0005}>
    <Sky id="ek9" c={['#2A1206', '#B8602A', '#F2B05A']} />
    <Rays f={f} cx={540} cy={1000} op={0.25} />
    <ForestBG f={f} />
    <Glow cx={540} cy={1100} r={500} c="#FFC870" o={0.35} />
    <A who="statue" x={330} y={1640} s={2.1} pose={{eyes: 'closed', mouth: 'flat'}} />
    <A who={E} x={760} y={1640} s={2.2} flip prop="bow" pose={{armL: 20, armR: -10, mouth: 'smile', blink: blink(f)}} />
  </Svg>
);

export const eklavya: Cfg = {
  id: 'Eklavya', voice: 'eklavya.wav', script, timings,
  scenes: [[S1, [0]], [S2, [1]], [S3, [2, 3]], [S4, [4, 5]], [S5, [6, 7]], [S6, [8, 9]], [S7, [10, 11]], [S8, [12]], [S9, [13, 14]]],
  titles: [
    {pill: 'BINA SIKHAYE', title: 'GURU\nDAKSHINA?'},
    {pill: 'JUNGLE KA BAALAK', title: 'EKLAVYA.'},
    {pill: 'RAJ GURU', title: 'DRONAACHARYA.'}, {pill: 'SIRF RAAJKUMAAR', title: 'INKAAR.', red: 'INKAAR'},
    {pill: 'MITTI SE BANE', title: 'GURU.'}, {pill: 'DIN RAAT', title: 'ABHYAAS.'},
    {pill: 'JUNGLE MEIN', title: 'EK KUTTA.'}, {title: '7 BAAN.'},
    {pill: 'HAIRAAN', title: 'ARJUN.'}, {pill: 'DRONA KA', title: 'VACHAN.'},
    {pill: 'JUNGLE MEIN', title: 'GURU AAYE.'}, {pill: 'GURU DAKSHINA', title: 'ANGOOTHA.', red: 'ANGOOTHA'},
    {title: 'SAMARPAN.'},
    {pill: 'AMAR SHISHYA', title: 'EKLAVYA.'}, {title: 'LAGAN.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'EKLAVYA.', sub: 'Guru ke bina shishya'}, endScene: EndCard,
};
