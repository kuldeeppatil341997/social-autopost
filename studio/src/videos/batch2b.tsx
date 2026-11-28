import React from 'react';
import sJ from '../../videos/jatayu/script.json';
import tJ from '../../videos/jatayu/timings.json';
import sS from '../../videos/shravan/script.json';
import tS from '../../videos/shravan/timings.json';
import sN from '../../videos/nachiketa/script.json';
import tN from '../../videos/nachiketa/timings.json';
import {A, Arrow, blink, bob, CosmicBG, EndCard, FireAltar, Flash, ForestBG, Glow, Hills, lerp, p, Place, Rays, Sky, Stars, Svg} from '../kit';
import {Cow, Jatayu, Kanwad, Pushpak} from '../people';
import type {SP} from '../scenes';
import type {Cfg} from '../engine';

// ---------------- JATAYU ----------------
const SkyDay: React.FC = () => <Sky id="jsky" c={['#3A5A8A', '#8AAAD0', '#F2C27A']} />;
const Clouds: React.FC<{f: number}> = ({f}) => <g>{[0, 1, 2, 3].map((i) => <ellipse key={i} cx={((i * 330 - f * 4) % 1400 + 1400) % 1400 - 160} cy={600 + i * 300} rx={200} ry={46} fill="#fff" opacity={0.35} />)}</g>;
const J1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <Sky id="j1" c={['#1a0a14', '#7A2A2A', '#F2A04A']} />
    <Clouds f={f} />
    <Place x={540} y={1150 + bob(f, 16, 10)} s={1.5}><Jatayu f={f} /></Place>
    <A who="ravan" x={540} y={1800} s={1.5} o={0.5} prop="sword" />
  </Svg>
);
const J2: React.FC<SP> = ({f}) => (
  <Svg>
    <Sky id="j2" c={['#2A3A5A', '#A8B8D0', '#E8D8B0']} />
    <Hills c="#5A6A4A" y={1450} />
    <path d="M700 1450 L760 1250 L900 1260 L960 1450Z" fill="#6A5A4A" />
    <Place x={830} y={1150} s={1.1}><Jatayu f={f} wing={-0.6} /></Place>
    <A who="dashrath" x={330} y={1650} s={2.2} pose={{mouth: 'smile', blink: blink(f), armR: -60}} />
  </Svg>
);
const J3: React.FC<SP> = ({f, L}) => {
  const fly = p(f, L[1], L[1] + 60);
  return (
    <Svg>
      {fly > 0 ? <><SkyDay /><Clouds f={f} /></> : <ForestBG f={f} />}
      {fly === 0 && <><A who="sita" x={330} y={1640} s={2.2} pose={{eyes: 'shock', mouth: 'o', armL: 60, armR: -60}} /><A who="ravan" x={760} y={1640} s={2.3} flip prop="sword" pose={{mouth: 'laugh', armL: -60}} /></>}
      {fly > 0 && <Place x={lerp(fly, 300, 760)} y={lerp(fly, 1500, 1000)} s={1.4}><Pushpak /><A who="ravan" x={-50} y={-30} s={0.6} prop="sword" pose={{mouth: 'laugh'}} /><A who="sita" x={60} y={-30} s={0.55} pose={{eyes: 'sad', mouth: 'o', armR: -150}} /></Place>}
    </Svg>
  );
};
const J4: React.FC<SP> = ({f, L}) => {
  const go = f >= L[1];
  return (
    <Svg>
      <Sky id="j4" c={['#2A3A5A', '#A8B8D0', '#E8D8B0']} />
      <Hills c="#5A6A4A" y={1450} />
      {[0, 1, 2].map((i) => <path key={i} d={`M${700 - i * 60} ${700 + i * 40} q-30 -20 0 -40`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.6 * Math.abs(Math.sin(f / 5 + i))} />)}
      <Place x={go ? lerp(p(f, L[1], L[1] + 40), 540, 1300) : 540} y={go ? lerp(p(f, L[1], L[1] + 40), 1250, 600) : 1250} s={go ? 1.6 : 1.4} rot={go ? -30 : 0}><Jatayu f={f * (go ? 3 : 1)} /></Place>
    </Svg>
  );
};
const J5: React.FC<SP> = ({f, L}) => {
  const fall = f >= L[1];
  const ram = p(f, 0, 30);
  return (
    <Svg shake={f % 20 < 3 ? f : 0}>
      <SkyDay /><Clouds f={f * 3} />
      <Place x={640} y={1250 + (fall ? p(f, L[1], L[1] + 30) * 500 : 0)} s={1.3} rot={fall ? 40 : 0}><Pushpak /><A who="ravan" x={-50} y={-30} s={0.6} prop="sword" pose={{mouth: 'grit', eyes: 'angry'}} /></Place>
      <Place x={lerp(ram, 200, 380)} y={900 + bob(f, 20, 5)} s={1.3} rot={20}><Jatayu f={f * 3} /></Place>
      {fall && [0, 1, 2].map((i) => <ellipse key={i} cx={640 + (i - 1) * 120} cy={1300 + p(f, L[1], L[1] + 40) * 600} rx={40} ry={24} fill="#5A3A20" />)}
    </Svg>
  );
};
const J6: React.FC<SP> = ({f, L}) => {
  const cut = p(f, 10, 24);
  const down = f >= L[1];
  return (
    <Svg>
      <Sky id="j6" c={['#1a0a14', '#7A2A2A', '#3A1A14']} />
      {!down && <><A who="ravan" x={720} y={1500} s={2.2} flip prop="sword" pose={{armL: -160 + cut * 120, eyes: 'angry', mouth: 'grit'}} /><Place x={300} y={1000 - cut * 100} s={1.2}><Jatayu f={f} wing={0.8} /></Place><Flash t={p(f, 20, 34)} c="#FFDDAA" /></>}
      {down && <><Hills c="#3A2A1A" y={1600} /><Place x={540} y={1560} s={2.1} rot={-70}><Jatayu f={0} hurt /></Place></>}
    </Svg>
  );
};
const J7: React.FC<SP> = ({f, L}) => {
  const came = p(f, 0, 30);
  const tell = f >= L[1];
  const last = f >= L[2];
  return (
    <Svg zoom={last ? 1 + p(f, L[2], L[2] + 20) * 0.3 : 1} oy={1400}>
      <ForestBG f={f} />
      <Place x={430} y={1610} s={1.8} rot={-70}><Jatayu f={0} hurt /></Place>
      <A who="ram" x={lerp(came, 1200, 700)} y={last ? 1700 : 1640} s={2.2} flip prop="bow" pose={{eyes: last ? 'sad' : 'open', mouth: 'sad', legL: last ? -60 : 2, legR: last ? 60 : -2, armL: last ? 60 : 10}} />
      {tell && !last && <path d="M300 900 L140 900 M140 900 l30 -20 M140 900 l30 20" stroke="#F0C25A" strokeWidth={10} strokeLinecap="round" opacity={0.8} />}
      {last && <Glow cx={460} cy={1450} r={260} c="#FFE3A0" o={0.5 * p(f, L[2], L[2] + 30)} />}
    </Svg>
  );
};
const J8: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <Sky id="j8" c={['#1a0a06', '#8A3A14', '#F2A04A']} />
    <Rays f={f} cx={540} cy={1000} op={0.22} />
    <FireAltar f={f} y={1720} s={1.3} />
    <A who="ram" x={250} y={1660} s={2} prop="bow" pose={{eyes: 'closed', mouth: 'flat', armL: -150, armR: 150}} />
    <A who="lakshman" x={850} y={1660} s={1.9} flip pose={{eyes: 'closed', mouth: 'flat', armL: -150, armR: 150} as any} />
    <g opacity={0.35}><Place x={540} y={900 + bob(f, 10)} s={1.3}><Jatayu f={f} /></Place></g>
  </Svg>
);
const LAKSHMAN = {skin: '#EDBE92', dhoti: '#F2B632', sash: '#E7E2D5', crown: 'mukut' as const, hair: '#1d1410'};
void LAKSHMAN;
export const jatayu: Cfg = {
  id: 'Jatayu', voice: 'jatayu.wav', script: sJ, timings: tJ,
  scenes: [[J1, [0]], [J2, [1]], [J3, [2, 3]], [J4, [4, 5]], [J5, [6, 7]], [J6, [8, 9]], [J7, [10, 11, 12]], [J8, [13, 14]]],
  titles: [
    {pill: 'EK BOODHA PAKSHI', title: 'RAAVAN SE\nYUDDH.'},
    {pill: 'DASHRATH KA MITRA', title: 'JATAYU.'},
    {pill: 'PANCHVATI', title: 'SITA HARAN.', red: 'HARAN'}, {pill: 'AASMAAN MEIN', title: 'PUSHPAK.'},
    {pill: 'SITA KI', title: 'PUKAAR.'}, {pill: 'BINA SOCHE', title: 'UDAAN.'},
    {title: 'HAMLA.'}, {pill: 'RATH TOOTA', title: 'RAAVAN GIRA.'},
    {pill: 'RAAVAN KI', title: 'TALWAAR.', red: 'TALWAAR'}, {pill: 'PAR SAANSEIN', title: 'BAAKI.'},
    {pill: 'RAM KA', title: 'INTEZAAR.'}, {pill: 'AAKHRI SANDESH', title: 'DAKSHIN.'}, {pill: 'RAM KI', title: 'GOD.'},
    {pill: 'PITA KI TARAH', title: 'ANTIM\nSANSKAAR.'}, {title: 'DHARM.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'JATAYU.', sub: 'Pehla yoddha'}, endScene: EndCard,
};

// ---------------- SHRAVAN ----------------
const River: React.FC<{f: number}> = ({f}) => (
  <g><path d="M0 1480 Q540 1440 1080 1480 L1080 1920 L0 1920Z" fill="#2A6A7A" />{[0, 1, 2, 3].map((i) => <path key={i} d={`M${(i * 300 + f * 2) % 1200 - 100} ${1540 + i * 70} q40 -10 80 0`} stroke="#9FE6F0" strokeWidth={4} fill="none" opacity={0.5} />)}</g>
);
const Pot: React.FC = () => <g><ellipse cx={0} cy={0} rx={36} ry={32} fill="#A5521F" /><rect x={-16} y={-44} width={32} height={16} rx={4} fill="#8A4A18" /></g>;
const Sh1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <ForestBG f={f} night />
    <Glow cx={540} cy={1100} r={400} c="#9FD8FF" o={0.2} />
    <Arrow x={lerp((f % 40) / 40, -100, 1180)} y={1150} rot={0} glow="#FFE27A" />
    {[0, 1, 2].map((i) => <path key={i} d={`M${700 + i * 50} ${1300} q20 -20 0 -40`} stroke="#fff" strokeWidth={5} fill="none" opacity={0.5 * Math.abs(Math.sin(f / 4 + i))} />)}
  </Svg>
);
const Sh2: React.FC<SP> = ({f, L}) => (
  <Svg>
    <ForestBG f={f} />
    <g transform={`translate(${f >= L[1] ? 540 - ((f - L[1]) % 400) * 0 : 540} 0)`}>
      <Place x={0} y={0} s={1}><g /></Place>
    </g>
    <Place x={540} y={1340} s={1.1}><Kanwad f={f} /></Place>
    <A who="oldman" x={320} y={1400} s={1.1} pose={{eyes: 'closed', mouth: 'smile', legL: -70, legR: 70}} />
    <A who="oldwoman" x={760} y={1400} s={1.1} pose={{eyes: 'closed', mouth: 'smile'}} />
    <A who="shravan" x={540} y={1640} s={2.2} pose={{armL: -170, armR: 170, mouth: 'smile', blink: blink(f), legL: Math.sin(f / 4) * 10, legR: -Math.sin(f / 4) * 10}} />
  </Svg>
);
const Sh3: React.FC<SP> = ({f, L}) => {
  const go = f >= L[1];
  return (
    <Svg>
      <Sky id="sh3" c={['#2A1A3A', '#C2602A', '#F2B05A']} />
      <Hills c="#3A4A2A" y={1450} />
      <A who="oldman" x={300} y={1650} s={1.8} pose={{eyes: 'closed', mouth: 'sad', legL: -70, legR: 70, armR: -40}} />
      <A who="oldwoman" x={520} y={1650} s={1.8} pose={{eyes: 'closed', mouth: 'sad'}} />
      <A who="shravan" x={go ? lerp(p(f, L[1], L[1] + 40), 820, 1200) : 820} y={1650} s={2.1} flip={!go} pose={{mouth: 'smile', armR: go ? -20 : -60, blink: blink(f)}} />
      {go && <Place x={lerp(p(f, L[1], L[1] + 40), 860, 1240)} y={1500} s={1}><Pot /></Place>}
    </Svg>
  );
};
const Sh4: React.FC<SP> = ({f, L}) => {
  const sound = f >= L[1];
  const shoot = f >= L[3];
  const fly = p(f, L[3] + 6, L[3] + 26);
  return (
    <Svg zoom={sound && !shoot ? 1.15 : 1} ox={300} oy={1300}>
      <ForestBG f={f} night />
      <A who="dashrath" x={300} y={1640} s={2.2} prop="bow" pose={{armR: shoot ? -90 : -30, armL: shoot ? -80 : 10, eyes: f >= L[2] ? 'angry' : 'open', mouth: 'flat', head: sound ? -8 : 0}} />
      {sound && !shoot && [0, 1, 2].map((i) => <path key={i} d={`M${800 + i * 40} ${1250} q20 -20 0 -40`} stroke="#9FE6F0" strokeWidth={6} fill="none" opacity={0.7 * Math.abs(Math.sin(f / 4 + i))} />)}
      {f >= L[2] && !shoot && <g opacity={0.4}><ellipse cx={880} cy={1500} rx={70} ry={36} fill="#C98A4A" /><path d="M840 1470 l-20 -60 M850 1470 l10 -60" stroke="#8A5A2A" strokeWidth={6} /></g>}
      {shoot && fly < 1 && <Arrow x={lerp(fly, 420, 1000)} y={1260} rot={0} glow="#FFE27A" />}
    </Svg>
  );
};
const Sh5: React.FC<SP> = ({f, L}) => (
  <Svg>
    <ForestBG f={f} night />
    <River f={f} />
    <Flash t={p(f, 0, 12)} c="#fff" />
    <A who="shravan" x={560} y={1660} s={2.1} rot={-80} pose={{eyes: f >= L[1] ? 'sad' : 'shock', mouth: f >= L[1] ? 'o' : 'o'}} />
    <Place x={780} y={1560} s={1} rot={60}><Pot /></Place>
    {f >= L[1] && <A who="dashrath" x={250} y={1660} s={2.1} pose={{eyes: 'sad', mouth: 'sad', head: 14, legL: -60, legR: 60}} prop="bow" />}
  </Svg>
);
const Sh6: React.FC<SP> = ({f, L}) => {
  const curse = f >= L[0] + 40;
  return (
    <Svg shake={curse && f < L[0] + 48 ? f : 0}>
      <Sky id="sh6" c={['#0a0614', '#2A1438', '#0a0614']} />
      <Stars n={40} f={f} seed="sh6" />
      <A who="dashrath" x={780} y={1660} s={2.1} flip pose={{eyes: 'sad', mouth: 'sad', head: 16}} />
      <A who="oldman" x={260} y={1660} s={1.9} pose={{eyes: 'closed', mouth: curse ? 'grit' : 'sad', armR: curse ? -120 : -30}} />
      <A who="oldwoman" x={460} y={1660} s={1.8} pose={{eyes: 'closed', mouth: 'sad'}} />
      {curse && <Glow cx={600} cy={1100} r={300} c="#9B5CFF" o={0.35} />}
    </Svg>
  );
};
const Sh7: React.FC<SP> = ({f, L}) => (
  <Svg zoom={1 + f * 0.0005}>
    <Sky id="sh7" c={['#1a0a06', '#6A2A14', '#2A0E06']} />
    {f < L[1] ? <><A who="dashrath" x={540} y={1620} s={2.3} pose={{eyes: 'closed', mouth: 'sad', head: 12}} /><g opacity={0.4}><A who="ram" x={880} y={1500} s={1.2} prop="bow" flip /></g></>
      : <><Rays f={f} cx={540} cy={1000} op={0.2} /><Glow cx={540} cy={1100} r={400} c="#FFC870" o={0.3} /><Place x={540} y={1400} s={1.4}><Arrow x={-80} y={0} rot={0} /></Place></>}
  </Svg>
);
export const shravan: Cfg = {
  id: 'Shravan', voice: 'shravan.wav', script: sS, timings: tS,
  scenes: [[Sh1, [0]], [Sh2, [1, 2]], [Sh3, [3, 4]], [Sh4, [5, 6, 7, 8]], [Sh5, [9, 10, 11]], [Sh6, [12]], [Sh7, [13, 14]]],
  titles: [
    {pill: 'AAWAAZ PAR', title: 'EK TEER.'},
    {pill: 'MAATA PITA KA', title: 'SHRAVAN.'}, {pill: 'KAANWAD MEIN', title: 'TEERTH YAATRA.'},
    {pill: 'EK SHAAM', title: 'PYAAS.'}, {pill: 'NADI KI OR', title: 'SHRAVAN.'},
    {pill: 'SHIKAAR PAR', title: 'DASHRATH.'}, {title: 'AAWAAZ.'}, {pill: 'DASHRATH KO LAGA', title: 'HIRAN?'}, {pill: 'BINA DEKHE', title: 'SHABDBHEDI.'},
    {title: 'CHEEKH.', red: 'CHEEKH'}, {pill: 'AAKHRI ICHCHHA', title: 'PAANI.'}, {pill: 'DASHRATH NE BATAAYA', title: 'SACH.'},
    {pill: 'DUKHI PITA KA', title: 'SHRAAP.', red: 'SHRAAP'},
    {pill: 'SAALON BAAD', title: 'VANVAAS.'}, {title: 'JALDBAAZI.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'SHRAVAN\nKUMAR.', sub: 'Ek teer ka shraap'}, endScene: EndCard,
};

// ---------------- NACHIKETA ----------------
const YamaHall: React.FC<{f: number}> = ({f}) => (
  <g>
    <Sky id="yh" c={['#05080a', '#0E2A24', '#05080a']} />
    <Glow cx={540} cy={1000} r={600} c="#2BB58F" o={0.25} />
    {[150, 930].map((x) => <g key={x}><rect x={x - 40} y={500} width={80} height={1300} fill="#14241E" /><g transform={`translate(${x} 900)`}><path d={`M0 ${-50 - Math.sin(f / 4 + x) * 8} Q22 -10 0 4 Q-22 -10 0 ${-50 - Math.sin(f / 4 + x) * 8}Z`} fill="#5AE0B0" /><Glow cx={0} cy={-20} r={120} c="#5AE0B0" o={0.4} /></g></g>)}
    <rect y={1720} width={1080} height={200} fill="#081410" />
  </g>
);
const N1: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0008}>
    <YamaHall f={f} />
    <path d="M330 1720 L330 900 Q540 640 750 900 L750 1720Z" fill="#0A1410" stroke="#C9A24A" strokeWidth={8} />
    <A who="nachiketa" x={540} y={1700} s={1.9} pose={{legL: -70, legR: 70, eyes: 'open', mouth: 'flat', blink: blink(f), armL: 40, armR: -40}} />
  </Svg>
);
const N2: React.FC<SP> = ({f, L}) => (
  <Svg>
    <Sky id="n2" c={['#2A1206', '#B8602A', '#F2C27A']} />
    <FireAltar f={f} x={300} y={1720} s={1} />
    <A who="vajashravas" x={300} y={1500} s={1.9} pose={{armL: -120, armR: 120, eyes: 'closed', mouth: 'flat'}} />
    {f >= L[1] && [0, 1].map((i) => <Place key={i} x={720 + i * 180} y={1620 - i * 20} s={0.9}><Cow old /></Place>)}
    <A who="nachiketa" x={600} y={1680} s={1.6} pose={{eyes: f >= L[1] ? 'sad' : 'open', mouth: 'flat', blink: blink(f)}} o={f >= L[1] ? 0.95 : 1} />
  </Svg>
);
const N3: React.FC<SP> = ({f, L}) => {
  const angry = f >= L[1] + 20;
  return (
    <Svg zoom={angry ? 1.15 : 1} ox={300} oy={1200}>
      <Sky id="n3" c={['#2A1206', '#B8602A', '#F2C27A']} />
      <A who="vajashravas" x={300} y={1640} s={2.2} pose={{eyes: angry ? 'angry' : 'open', mouth: angry ? 'grit' : 'flat', armR: angry ? -110 : -20}} />
      <A who="nachiketa" x={780} y={1660} s={1.8} flip pose={{armL: -60, eyes: angry ? 'shock' : 'open', mouth: angry ? 'o' : 'smile', blink: !angry && blink(f)}} />
    </Svg>
  );
};
const N4: React.FC<SP> = ({f, L}) => {
  const walk = p(f, 0, 50);
  return (
    <Svg>
      <YamaHall f={f} />
      {f < L[1] ? <A who="nachiketa" x={lerp(walk, 100, 540)} y={1700} s={1.9} pose={{legL: Math.sin(f / 3) * 14, legR: -Math.sin(f / 3) * 14, mouth: 'flat'}} />
        : <><A who="nachiketa" x={540} y={1720} s={1.9} pose={{legL: -70, legR: 70, eyes: 'closed', mouth: 'flat', head: bob(f, 3, 20)}} />
          <g transform={`translate(${540 + Math.cos(f / 10) * 400} ${700 - Math.abs(Math.sin(f / 10)) * 200})`}><circle r={50} fill={Math.sin(f / 10) > 0 ? '#E9F6FF' : '#FFE27A'} opacity={0.7} /></g></>}
    </Svg>
  );
};
const N5: React.FC<SP> = ({f, L}) => {
  const k = L.filter((l) => f >= l).length; // 1..4 lines into this scene
  const icons = [
    <g key="p"><A who="vajashravas" x={0} y={60} s={0.7} pose={{mouth: 'smile', eyes: 'closed'}} /></g>,
    <g key="a"><FireAltar f={f} x={0} y={60} s={0.45} /></g>,
    <g key="q"><circle r={60} fill="#5AE0B0" opacity={0.3} /><text y={30} textAnchor="middle" fontSize={110} fill="#E9F6FF" fontFamily="serif">?</text></g>,
  ];
  return (
    <Svg>
      <YamaHall f={f} />
      <A who="yama" x={280} y={1660} s={2.3} pose={{mouth: 'smile', armR: -60, blink: blink(f)}} prop="mace" />
      <A who="nachiketa" x={820} y={1680} s={1.8} flip pose={{mouth: 'smile', armL: -80, blink: blink(f, 20)}} />
      {[0, 1, 2].map((i) => k >= i + 2 && <g key={i} transform={`translate(${300 + i * 240} 900)`} opacity={p(f, L[i + 1], L[i + 1] + 14)}><circle r={90} fill="#0A1A14" stroke="#F0C25A" strokeWidth={5} />{icons[i]}</g>)}
    </Svg>
  );
};
const N6: React.FC<SP> = ({f, L}) => {
  const refuse = f >= L[1];
  return (
    <Svg>
      <YamaHall f={f} />
      <A who="yama" x={280} y={1660} s={2.3} pose={{mouth: 'smile', armR: -90}} prop="mace" />
      {!refuse && [0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${520 + (i % 2) * 120} ${1100 + Math.floor(i / 2) * 120})`}><circle r={40} fill="#F0C25A" /><Glow cx={0} cy={0} r={80} c="#FFD24A" o={0.4} /></g>)}
      <A who="nachiketa" x={820} y={1680} s={1.8} flip pose={{mouth: 'flat', armL: refuse ? -100 : -20, head: refuse ? Math.sin(f / 4) * 10 : 0}} />
    </Svg>
  );
};
const N7: React.FC<SP> = ({f}) => (
  <Svg zoom={1 + f * 0.0006}>
    <CosmicBG f={f} c="#0E2A3A" />
    <Rays f={f} color="#BFF0FF" cx={540} cy={1000} op={0.25} />
    <Glow cx={540} cy={1050} r={500} c="#BFF0FF" o={0.45} />
    <A who="yama" x={280} y={1660} s={2.1} pose={{mouth: 'smile', eyes: 'closed', armR: -60}} o={0.8} />
    <A who="nachiketa" x={780} y={1660} s={2} flip pose={{mouth: 'smile', eyes: 'closed', legL: -70, legR: 70}} />
    <circle cx={780} cy={1300 + bob(f, 10)} r={40} fill="#FFFFFF" opacity={0.6} />
  </Svg>
);
export const nachiketa: Cfg = {
  id: 'Nachiketa', voice: 'nachiketa.wav', script: sN, timings: tN,
  scenes: [[N1, [0]], [N2, [1, 2]], [N3, [3, 4]], [N4, [5, 6]], [N5, [7, 8, 9, 10]], [N6, [11, 12]], [N7, [13, 14]]],
  titles: [
    {pill: 'MAUT KE DARWAAZE PAR', title: 'EK BAALAK.'},
    {pill: 'PITA KA', title: 'YAGYA.'}, {pill: 'DAAN MEIN', title: 'BOODHI GAAYEIN.'},
    {pill: 'BAALAK KA', title: 'SAWAAL.'}, {pill: 'GUSSE MEIN', title: 'YAM KO DAAN.', red: 'YAM'},
    {pill: 'VACHAN NIBHAAYA', title: 'YAMLOK.'}, {pill: 'BHOOKHA PYAASA', title: '3 DIN.'},
    {pill: 'YAM PRASANN', title: '3 VARDAAN.'}, {pill: 'PEHLA', title: 'PITA KI SHAANTI.'}, {pill: 'DOOSRA', title: 'AGNI VIDYA.'}, {pill: 'TEESRA', title: 'MRITYU KA\nRAHASYA.'},
    {pill: 'LAALACH', title: 'SONA, RAJYA.'}, {title: 'SATYA.'},
    {pill: 'YAM NE DIYA', title: 'AATMA GYAAN.'}, {title: 'SAWAAL.'},
  ],
  end: {pill: 'ANSUNI KATHA', title: 'NACHIKETA.', sub: 'Jisne maut se sawaal poochha'}, endScene: EndCard,
};
