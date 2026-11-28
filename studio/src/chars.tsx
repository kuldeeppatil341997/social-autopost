import React from 'react';

// Shared puppet pieces. Origin (0,0) = hips. Head centre ~ (0,-150).
export type Eyes = 'open' | 'closed' | 'shock' | 'angry' | 'glow' | 'sad' | 'down';
export type Mouth = 'smile' | 'o' | 'flat' | 'grit' | 'sad' | 'laugh';
export type Pose = {
  armL?: number; armR?: number; legL?: number; legR?: number;
  head?: number; eyes?: Eyes; mouth?: Mouth; blink?: boolean;
};

const Limb: React.FC<{x: number; y: number; rot: number; len: number; w: number; fill: string; band?: string; end?: React.ReactNode; children?: React.ReactNode}> = ({x, y, rot, len, w, fill, band, end, children}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-4} width={w} height={len} rx={w / 2} fill={fill} />
    <rect x={-w / 2} y={-4} width={w * 0.38} height={len} rx={w / 2} fill="#000" opacity={0.12} />
    {band && <rect x={-w / 2 - 1} y={len * 0.32} width={w + 2} height={6} rx={3} fill={band} />}
    <g transform={`translate(0 ${len})`}>{end}</g>
    {children}
  </g>
);

const Face: React.FC<{eyes: Eyes; mouth: Mouth; blink?: boolean; skin: string; eyeCol?: string}> = ({eyes, mouth, blink, eyeCol = '#2a160c'}) => {
  const e = blink && eyes === 'open' ? 'closed' : eyes;
  const eye = (x: number) => {
    if (e === 'closed') return <path key={x} d={`M${x - 8} -146 q8 6 16 0`} stroke={eyeCol} strokeWidth={3.5} fill="none" strokeLinecap="round" />;
    if (e === 'glow') return <ellipse key={x} cx={x} cy={-147} rx={8} ry={4} fill="#FFE27A" />;
    const r = e === 'shock' ? 9 : 6.5;
    return (
      <g key={x}>
        {e === 'shock' && <circle cx={x} cy={-147} r={r + 4} fill="#fff" />}
        <circle cx={x} cy={-147} r={r} fill={eyeCol} />
        <circle cx={x + 2} cy={-150} r={2.2} fill="#fff" />
        {e === 'angry' && <path d={`M${x - 11} ${x < 0 ? -162 : -157} L${x + 11} ${x < 0 ? -157 : -162}`} stroke={eyeCol} strokeWidth={4} strokeLinecap="round" />}
      </g>
    );
  };
  const m = ({
    smile: <path d="M-10 -122 q10 9 20 0" stroke="#5a2410" strokeWidth={3.5} fill="none" strokeLinecap="round" />,
    o: <ellipse cx={0} cy={-120} rx={6} ry={8} fill="#5a2410" />,
    flat: <path d="M-8 -121 h16" stroke="#5a2410" strokeWidth={3.5} strokeLinecap="round" />,
    grit: <rect x={-11} y={-126} width={22} height={9} rx={3} fill="#fff" stroke="#5a2410" strokeWidth={2.5} />,
  } as Record<string, React.ReactNode>)[mouth];
  return <g>{eye(-17)}{eye(17)}{m}</g>;
};

// ---------- VANAR (Hanuman / Makardhwaj / baby) ----------
export const Vanar: React.FC<{kind: 'hanuman' | 'makar'; pose?: Pose; prop?: 'gada' | 'spear' | 'none'; glow?: boolean; kid?: boolean; swollen?: boolean}> = ({kind, pose = {}, prop = 'none', kid, swollen}) => {
  const {armL = 8, armR = -8, legL = 3, legR = -3, head = 0, eyes = 'open', mouth = 'smile', blink} = pose;
  const fur = kind === 'hanuman' ? '#C0602B' : '#A9522A';
  const furD = '#7E3517';
  const face = '#F6CFA0';
  const gold = '#EBB43C';
  const hand = <circle r={10} fill={fur} />;
  const propEl = prop === 'gada'
    ? (<g transform="rotate(-20)"><rect x={-3} y={-70} width={6} height={80} rx={3} fill="#8A5A1C" /><circle cy={-78} r={20} fill={gold} /><circle cy={-78} r={20} fill="url(#gShine)" /><path d="M-20 -78 h40 M0 -98 v40" stroke="#B9852A" strokeWidth={2.5} /><circle cy={-100} r={5} fill={gold} /></g>)
    : prop === 'spear'
      ? (<g><rect x={-2.5} y={-150} width={5} height={175} rx={2} fill="#6B4A2A" /><path d="M0 -185 L9 -150 L-9 -150 Z" fill="#D9E1E8" /><path d="M0 -185 L0 -150" stroke="#9AA6B2" strokeWidth={1.5} /><rect x={-7} y={-150} width={14} height={5} fill={gold} /></g>)
      : null;
  return (
    <g>
      <defs>
        <radialGradient id="gShine" cx="35%" cy="30%" r="60%"><stop offset="0" stopColor="#fff" stopOpacity={0.55} /><stop offset="1" stopColor="#fff" stopOpacity={0} /></radialGradient>
        <pattern id="scales" width="14" height="10" patternUnits="userSpaceOnUse"><path d="M0 10 q7 -10 14 0" fill="none" stroke="#7FD1B9" strokeWidth={1.4} opacity={0.6} /></pattern>
      </defs>
      {/* tail */}
      <path d="M8 -20 C60 -10 70 -80 40 -95 C25 -102 22 -84 34 -82" stroke={fur} strokeWidth={10} fill="none" strokeLinecap="round" />
      {/* legs */}
      <Limb x={-15} y={-6} rot={legL} len={58} w={22} fill={fur} end={<ellipse cx={-4} cy={2} rx={15} ry={8} fill={furD} />} />
      <Limb x={15} y={-6} rot={legR} len={58} w={22} fill={fur} end={<ellipse cx={4} cy={2} rx={15} ry={8} fill={furD} />} />
      {/* torso */}
      {kind === 'hanuman' ? (
        <g>
          <path d="M-34 -100 Q-38 -40 -30 -8 L30 -8 Q38 -40 34 -100 Q0 -112 -34 -100Z" fill={fur} />
          <path d="M-22 -92 Q0 -70 22 -92 Q20 -50 0 -42 Q-20 -50 -22 -92Z" fill={face} opacity={0.85} />
          <path d="M-36 -22 h72 l6 34 h-84 Z" fill="#B42A2E" />
          <path d="M-36 -22 h72 v8 h-72 Z" fill={gold} />
          <path d="M-30 -100 L30 -14" stroke={gold} strokeWidth={9} strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <path d="M-36 -100 Q-40 -40 -32 -6 L32 -6 Q40 -40 36 -100 Q0 -112 -36 -100Z" fill="#1E6656" />
          <path d="M-36 -100 Q-40 -40 -32 -6 L32 -6 Q40 -40 36 -100 Q0 -112 -36 -100Z" fill="url(#scales)" />
          <path d="M-36 -18 h72 l5 30 h-82 Z" fill="#14473C" />
          <rect x={-36} y={-22} width={72} height={8} rx={2} fill="#C9D3DC" />
          <circle cx={0} cy={-62} r={7} fill="#C9D3DC" /><circle cx={0} cy={-62} r={3.5} fill="#2BB58F" />
          <ellipse cx={-34} cy={-96} rx={16} ry={11} fill="#C9D3DC" /><ellipse cx={34} cy={-96} rx={16} ry={11} fill="#C9D3DC" />
        </g>
      )}
      {/* arms */}
      <Limb x={-34} y={-94} rot={armL} len={62} w={19} fill={fur} band={gold} end={hand} />
      <Limb x={34} y={-94} rot={armR} len={62} w={19} fill={fur} band={gold} end={<g>{propEl && <g transform={`rotate(${-armR})`}>{propEl}</g>}{hand}</g>} />
      {/* head */}
      <g transform={`rotate(${head} 0 -110)`}>
        <circle cx={-50} cy={-148} r={15} fill={fur} /><circle cx={-50} cy={-148} r={8} fill={face} />
        <circle cx={50} cy={-148} r={15} fill={fur} /><circle cx={50} cy={-148} r={8} fill={face} />
        <circle cx={0} cy={-152} r={50} fill={fur} />
        <path d="M-36 -160 Q-30 -178 -10 -172 Q0 -166 10 -172 Q30 -178 36 -160 Q42 -128 22 -112 Q0 -102 -22 -112 Q-42 -128 -36 -160Z" fill={face} />
        <ellipse cx={0} cy={-124} rx={20} ry={13} fill="#EDB98A" />
        <Face eyes={eyes} mouth={mouth} blink={blink} skin={face} />
        <path d="M0 -176 v12" stroke="#D2322F" strokeWidth={4} strokeLinecap="round" />
        {kid ? (swollen ? <ellipse cx={0} cy={-112} rx={22} ry={12} fill="#E8A87A" /> : null) : kind === 'hanuman' ? (
          <g>
            <path d="M-42 -178 Q0 -196 42 -178 L36 -214 Q0 -232 -36 -214 Z" fill={gold} />
            <path d="M-42 -178 Q0 -196 42 -178" stroke="#B9852A" strokeWidth={4} fill="none" />
            <path d="M-14 -224 L0 -262 L14 -224 Z" fill={gold} />
            <circle cx={0} cy={-202} r={8} fill="#D2322F" /><circle cx={-2} cy={-205} r={2.5} fill="#fff" opacity={0.7} />
            <path d="M-36 -214 Q0 -232 36 -214 L42 -178 Q0 -196 -42 -178Z" fill="url(#gShine)" />
          </g>
        ) : (
          <g>
            <path d="M-46 -168 Q-48 -214 0 -218 Q48 -214 46 -168 Q0 -182 -46 -168Z" fill="#C9D3DC" />
            <path d="M-46 -168 Q0 -182 46 -168" stroke="#8D9AA6" strokeWidth={4} fill="none" />
            {/* makara (fish) crest */}
            <path d="M-6 -214 C-20 -250 20 -262 24 -236 C30 -246 38 -244 36 -232 C30 -226 24 -228 22 -230 C14 -214 4 -212 -6 -214Z" fill="#E9EEF2" stroke="#8D9AA6" strokeWidth={2} />
            <circle cx={6} cy={-236} r={2.5} fill="#2BB58F" />
            <circle cx={0} cy={-190} r={6} fill="#2BB58F" />
            <path d="M-46 -168 Q-48 -214 0 -218 Q48 -214 46 -168" fill="url(#gShine)" />
          </g>
        )}
      </g>
    </g>
  );
};

export const BabyVanar: React.FC<{eyes?: Eyes}> = ({eyes = 'open'}) => (
  <g>
    <circle cx={-40} cy={-150} r={13} fill="#C0602B" /><circle cx={40} cy={-150} r={13} fill="#C0602B" />
    <circle cx={0} cy={-150} r={42} fill="#C0602B" />
    <path d="M-30 -158 Q-26 -172 -8 -167 Q0 -162 8 -167 Q26 -172 30 -158 Q34 -130 0 -116 Q-34 -130 -30 -158Z" fill="#F6CFA0" />
    <Face eyes={eyes} mouth="smile" skin="#F6CFA0" />
    <path d="M-30 -112 Q0 -96 30 -112 Q36 -70 0 -62 Q-36 -70 -30 -112Z" fill="#C0602B" />
  </g>
);

// ---------- HUMAN puppet (Ahiravan / Ram / Lakshman / Vibhishan) ----------
export const Human: React.FC<{who: 'ahiravan' | 'ram' | 'lakshman' | 'vibhishan'; pose?: Pose; bow?: boolean}> = ({who, pose = {}, bow}) => {
  const {armL = 6, armR = -6, legL = 2, legR = -2, head = 0, eyes = 'open', mouth = 'smile', blink} = pose;
  const skin = {ahiravan: '#5B43A8', ram: '#4C7FD6', lakshman: '#EDBE92', vibhishan: '#E3C29A'}[who];
  const robe = {ahiravan: '#16121F', ram: '#F2B632', lakshman: '#F2B632', vibhishan: '#F1EEE6'}[who];
  const gold = '#EBB43C';
  return (
    <g>
      {who === 'ahiravan' && <path d="M-44 -100 Q-70 -10 -60 60 L60 60 Q70 -10 44 -100Z" fill="#7A1626" />}
      <Limb x={-14} y={-6} rot={legL} len={60} w={20} fill={skin} end={<ellipse cx={-3} cy={2} rx={13} ry={7} fill="#3a2a20" />} />
      <Limb x={14} y={-6} rot={legR} len={60} w={20} fill={skin} end={<ellipse cx={3} cy={2} rx={13} ry={7} fill="#3a2a20" />} />
      <path d="M-32 -102 Q-36 -40 -30 -6 L30 -6 Q36 -40 32 -102 Q0 -112 -32 -102Z" fill={who === 'ahiravan' ? '#2A2140' : who === 'vibhishan' ? '#F1EEE6' : skin} />
      <path d="M-34 -24 h68 l8 44 h-84 Z" fill={robe} />
      <rect x={-34} y={-28} width={68} height={8} rx={2} fill={gold} />
      {who !== 'ahiravan' && <path d="M-28 -100 L26 -20" stroke={who === 'vibhishan' ? '#C9A24A' : '#E7E2D5'} strokeWidth={4} />}
      {who === 'ahiravan' && <path d="M-22 -100 L0 -60 L22 -100" stroke={gold} strokeWidth={4} fill="none" />}
      <Limb x={-32} y={-94} rot={armL} len={60} w={17} fill={who === 'vibhishan' ? '#F1EEE6' : skin} band={gold} end={<circle r={9} fill={skin} />} />
      <Limb x={32} y={-94} rot={armR} len={60} w={17} fill={who === 'vibhishan' ? '#F1EEE6' : skin} band={gold} end={<g><circle r={9} fill={skin} />{bow && <path d="M-6 -70 Q-40 0 -6 70" stroke="#8A5A1C" strokeWidth={6} fill="none" />}</g>} />
      <g transform={`rotate(${head} 0 -110)`}>
        <rect x={-14} y={-118} width={28} height={16} fill={skin} />
        <ellipse cx={0} cy={-150} rx={40} ry={44} fill={skin} />
        <path d="M-40 -150 Q-42 -196 0 -196 Q42 -196 40 -150 Q30 -176 0 -176 Q-30 -176 -40 -150Z" fill="#1d1410" />
        <Face eyes={who === 'ahiravan' && eyes === 'open' ? 'glow' : eyes} mouth={mouth} blink={blink} skin={skin} eyeCol="#1d1410" />
        {who === 'ahiravan' && <path d="M-18 -128 Q-8 -122 0 -128 Q8 -122 18 -128 Q24 -116 30 -120" stroke="#0e0a14" strokeWidth={5} fill="none" strokeLinecap="round" />}
        {who === 'ahiravan' ? (
          <g>
            <path d="M-38 -186 L-30 -232 L-16 -200 L0 -248 L16 -200 L30 -232 L38 -186 Z" fill={gold} />
            <circle cx={0} cy={-206} r={6} fill="#9B5CFF" />
          </g>
        ) : who === 'vibhishan' ? (
          <path d="M-34 -186 Q0 -230 34 -186 Q0 -196 -34 -186Z" fill="#F1EEE6" stroke="#C9A24A" strokeWidth={3} />
        ) : (
          <g>
            <path d="M-30 -186 L-26 -222 Q0 -238 26 -222 L30 -186 Q0 -196 -30 -186Z" fill={gold} />
            <path d="M-8 -230 L0 -252 L8 -230Z" fill={gold} />
            <circle cx={0} cy={-206} r={5} fill="#D2322F" />
          </g>
        )}
        {who !== 'ahiravan' && <path d="M0 -176 v14" stroke="#D2322F" strokeWidth={3.5} strokeLinecap="round" />}
      </g>
    </g>
  );
};

// ---------- FISH ----------
export const Fish: React.FC<{mouthOpen?: number; tail?: number}> = ({mouthOpen = 0, tail = 0}) => (
  <g>
    <defs>
      <linearGradient id="fishG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2F8EA0" /><stop offset="1" stopColor="#0F3E52" /></linearGradient>
      <pattern id="fscale" width="22" height="16" patternUnits="userSpaceOnUse"><path d="M0 16 q11 -16 22 0" fill="none" stroke="#8FE0EA" strokeWidth={1.6} opacity={0.35} /></pattern>
    </defs>
    <g transform={`rotate(${tail} 160 0)`}><path d="M150 0 L240 -70 Q220 0 240 70 Z" fill="#1C5E72" /></g>
    <path d="M-170 0 Q-120 -110 40 -100 Q150 -80 170 0 Q150 80 40 100 Q-120 110 -170 0Z" fill="url(#fishG)" />
    <path d="M-170 0 Q-120 -110 40 -100 Q150 -80 170 0 Q150 80 40 100 Q-120 110 -170 0Z" fill="url(#fscale)" />
    <path d="M-20 -98 Q30 -150 90 -88Z" fill="#1C5E72" />
    <circle cx={-110} cy={-24} r={16} fill="#E9F6F8" /><circle cx={-114} cy={-24} r={8} fill="#0b1c24" />
    <path d={`M-170 0 L-120 ${8 + mouthOpen * 30} L-120 ${8 - mouthOpen * 2}`} fill="#08222c" />
    <path d="M-70 -70 Q-56 0 -70 70" stroke="#8FE0EA" strokeWidth={3} fill="none" opacity={0.4} />
  </g>
);

export const Diya: React.FC<{flame: number; t: number}> = ({flame, t}) => (
  <g>
    <ellipse cx={0} cy={0} rx={48} ry={14} fill="#7A3A16" />
    <path d="M-48 -2 Q0 40 48 -2 Q40 26 0 28 Q-40 26 -48 -2Z" fill="#A5521F" />
    <path d="M30 -6 L58 -16 L40 4Z" fill="#A5521F" />
    {flame > 0 && (
      <g transform={`translate(52 -20) scale(${flame * (1 + Math.sin(t * 0.7) * 0.06)}, ${flame * (1 + Math.sin(t * 0.9 + 1) * 0.1)})`}>
        <circle r={60} fill="#FFB347" opacity={0.18} />
        <path d="M0 -46 Q20 -14 10 4 Q0 12 -10 4 Q-20 -14 0 -46Z" fill="#FFB02E" />
        <path d="M0 -26 Q9 -8 4 2 Q0 6 -4 2 Q-9 -8 0 -26Z" fill="#FFF3B0" />
      </g>
    )}
  </g>
);

// Panchmukhi side faces (simple medallions)
export const Medallion: React.FC<{kind: 'lion' | 'eagle' | 'boar' | 'horse'}> = ({kind}) => {
  const c = {lion: '#E58A2B', eagle: '#2E8B57', boar: '#4A4652', horse: '#EDE6DA'}[kind];
  return (
    <g>
      {kind === 'lion' && Array.from({length: 12}).map((_, i) => <path key={i} d="M0 -46 L8 -30 L-8 -30Z" fill="#B85E16" transform={`rotate(${i * 30})`} />)}
      <circle r={32} fill={c} />
      <path d="M-24 -30 Q0 -52 24 -30 L20 -42 Q0 -56 -20 -42Z" fill="#EBB43C" />
      <circle cx={-10} cy={-6} r={4} fill="#1d1410" /><circle cx={10} cy={-6} r={4} fill="#1d1410" />
      {kind === 'lion' && <path d="M-8 8 Q0 16 8 8" stroke="#5a2410" strokeWidth={3} fill="none" />}
      {kind === 'eagle' && <path d="M-8 2 L0 22 L8 2Z" fill="#F2C14E" />}
      {kind === 'boar' && <g><ellipse cx={0} cy={10} rx={12} ry={8} fill="#8C8496" /><circle cx={-4} cy={10} r={2} fill="#1d1410" /><circle cx={4} cy={10} r={2} fill="#1d1410" /></g>}
      {kind === 'horse' && <g><ellipse cx={0} cy={12} rx={10} ry={13} fill="#D8CDBC" /><path d="M-24 -26 L-18 -44 L-12 -28Z M24 -26 L18 -44 L12 -28Z" fill="#EDE6DA" /></g>}
    </g>
  );
};
