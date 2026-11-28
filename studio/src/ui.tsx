import React from 'react';
import {AbsoluteFill, Easing, interpolate, random} from 'remotion';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/800.css';
import '@fontsource/playfair-display/700-italic.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/tiro-devanagari-hindi/400.css';

export const SERIF = '"Playfair Display", "Tiro Devanagari Hindi", serif';
export const DEV = '"Tiro Devanagari Hindi", serif';
export const SANS = 'Montserrat, sans-serif';
export const GOLD = '#F0C25A';
export const YEL = '#FFD84A';

export const ease = Easing.bezier(0.33, 0, 0.2, 1);
export const p = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});

export type TitleSpec = {pill?: string; title: string; sub?: string; red?: string};

// Pill + serif title block at the top; re-animates whenever `k` changes
export const TitleBlock: React.FC<{spec: TitleSpec; f: number}> = ({spec, f}) => {
  const a = p(f, 0, 14);
  const lines = spec.title.split('\n');
  return (
    <div style={{position: 'absolute', top: 210, left: 0, right: 0, textAlign: 'center', opacity: a}}>
      {spec.pill && (
        <div style={{display: 'inline-block', background: `linear-gradient(180deg,#F7D27A,#D9A23A)`, color: '#3A2208', fontFamily: `${SANS}, "Tiro Devanagari Hindi"`, fontWeight: 800, fontSize: 26, letterSpacing: 3, padding: '8px 22px', borderRadius: 30, transform: `translateY(${(1 - a) * -20}px)`, boxShadow: '0 4px 18px rgba(0,0,0,.35)'}}>
          {spec.pill}
        </div>
      )}
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, margin: '18px 0 6px', opacity: p(f, 4, 18)}}>
        <div style={{width: interpolate(a, [0, 1], [0, 110]), height: 2, background: `linear-gradient(90deg,transparent,${GOLD})`}} />
        <div style={{width: 10, height: 10, background: GOLD, transform: 'rotate(45deg)'}} />
        <div style={{width: interpolate(a, [0, 1], [0, 110]), height: 2, background: `linear-gradient(270deg,transparent,${GOLD})`}} />
      </div>
      {lines.map((ln, i) => {
        const la = p(f, 5 + i * 5, 22 + i * 5);
        return (
          <div key={i} style={{fontFamily: SERIF, fontWeight: 800, fontSize: ln.length > 12 ? 96 : 118, lineHeight: 1.05, letterSpacing: interpolate(la, [0, 1], [18, 4]), color: GOLD, textShadow: '0 6px 30px rgba(0,0,0,.6), 0 0 40px rgba(240,194,90,.25)', opacity: la, filter: `blur(${(1 - la) * 8}px)`}}>
            {ln.split(' ').map((w, j) => (
              <span key={j} style={{color: spec.red && w.includes(spec.red) ? '#E2413A' : undefined}}>{w}{' '}</span>
            ))}
          </div>
        );
      })}
      {spec.sub && <div style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 700, fontSize: 40, color: '#E9D9B5', opacity: p(f, 16, 30), marginTop: 6}}>{spec.sub}</div>}
    </div>
  );
};

// Word-by-word captions. `cap` uses *word* = gold italic serif, ^WORD = yellow sans, plain = white sans caps.
type W = {t: string; style: 'n' | 'i' | 'y'; w: number};
export const parseCap = (cap: string): W[] => {
  let inI = false;
  return cap.split(/\s+/).filter(Boolean).map((raw) => {
    let style: W['style'] = 'n';
    const t0 = raw.startsWith('*');
    if (t0) inI = true;
    if (inI) style = 'i';
    if (raw.replace(/[,.?!]$/, '').endsWith('*') || (t0 && raw.endsWith('*'))) inI = false;
    let t = raw.replace(/\*/g, '');
    if (style === 'n' && t.startsWith('^')) { style = 'y'; t = t.slice(1); }
    return {t, style, w: t.replace(/[^\w]/g, '').length + 2};
  });
};
export const Captions: React.FC<{cap: string; f: number; dur: number}> = ({cap, f, dur}) => {
  const words = parseCap(cap);
  const total = words.reduce((s, w) => s + w.w, 0);
  // word start frames (speech spans ~92% of the line)
  let acc = 0;
  const starts = words.map((w) => { const s = (acc / total) * dur * 0.92; acc += w.w; return s; });
  // chunk into groups of max 3, break after punctuation
  const chunks: number[][] = [];
  let cur: number[] = [];
  words.forEach((w, i) => {
    cur.push(i);
    if (cur.length === 3 || /[,.?!]$/.test(w.t)) { chunks.push(cur); cur = []; }
  });
  if (cur.length) chunks.push(cur);
  const ci = chunks.findIndex((c, k) => f >= starts[c[0]] && (k === chunks.length - 1 || f < starts[chunks[k + 1][0]]));
  if (ci < 0) return null;
  return (
    <div style={{position: 'absolute', top: 1500, left: 60, right: 60, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', gap: '0 22px'}}>
      {chunks[ci].map((wi) => {
        const w = words[wi];
        const a = p(f, starts[wi] - 1, starts[wi] + 5);
        const base: React.CSSProperties = {opacity: a, transform: `translateY(${(1 - a) * 18}px) scale(${0.85 + a * 0.15})`, display: 'inline-block', textShadow: '0 4px 18px rgba(0,0,0,.85), 0 0 2px rgba(0,0,0,.9)'};
        if (w.style === 'i') return <span key={wi} style={{...base, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 700, fontSize: 78, color: GOLD}}>{w.t}</span>;
        return <span key={wi} style={{...base, fontFamily: SANS, fontWeight: 800, fontSize: 58, letterSpacing: 1, color: w.style === 'y' ? YEL : '#fff', textTransform: 'uppercase'}}>{w.t}</span>;
      })}
    </div>
  );
};

export const Grain: React.FC<{f: number}> = ({f}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <svg width="1080" height="1920">
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" seed={Math.floor(f / 2) % 50} numOctaves={2} /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0" /></filter>
      <rect width="1080" height="1920" filter="url(#grain)" />
    </svg>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,.6) 100%)'}} />
  </AbsoluteFill>
);

export const Stars: React.FC<{n: number; f: number; seed: string; color?: string; h?: number}> = ({n, f, seed, color = '#fff', h = 1920}) => (
  <g>
    {Array.from({length: n}).map((_, i) => {
      const x = random(seed + 'x' + i) * 1080;
      const y = random(seed + 'y' + i) * h;
      const r = 1 + random(seed + 'r' + i) * 2.4;
      const tw = 0.3 + 0.7 * Math.abs(Math.sin(f / 20 + i));
      return <circle key={i} cx={x} cy={y - ((f * (0.2 + r * 0.1)) % 40)} r={r} fill={color} opacity={tw * 0.7} />;
    })}
  </g>
);

export const Rays: React.FC<{f: number; color?: string; cx?: number; cy?: number; op?: number}> = ({f, color = '#FFD27A', cx = 540, cy = 760, op = 0.22}) => (
  <g transform={`translate(${cx} ${cy}) rotate(${f * 0.15})`} opacity={op}>
    {Array.from({length: 24}).map((_, i) => (
      <path key={i} d="M0 0 L-38 -1400 L38 -1400 Z" fill={color} transform={`rotate(${i * 15})`} opacity={i % 2 ? 0.5 : 1} />
    ))}
  </g>
);

// ---- On-screen text layers (Hindi) ----
// Big gold hook line in the top third, building word by word.
export const HookText: React.FC<{text: string; f: number}> = ({text, f}) => {
  const words = text.split(' ');
  return (
    <div style={{position: 'absolute', top: 190, left: 60, right: 60, textAlign: 'center', lineHeight: 1.25}}>
      {words.map((w, i) => {
        const a = p(f, i * 5, i * 5 + 8);
        return <span key={i} style={{display: 'inline-block', marginRight: 18, fontFamily: DEV, fontSize: 92, color: GOLD, opacity: a, transform: `translateY(${(1 - a) * 24}px) scale(${0.9 + a * 0.1})`, textShadow: '0 6px 28px rgba(0,0,0,.75), 0 0 36px rgba(240,194,90,.3)'}}>{w}</span>;
      })}
    </div>
  );
};
export type Fx = {label?: string; quote?: string; num?: string};
export const FxLayer: React.FC<{fx: Fx; f: number}> = ({fx, f}) => {
  const a = p(f, 4, 16);
  return (
    <>
      {fx.label && (
        <div style={{position: 'absolute', top: 760, left: 0, right: 0, textAlign: 'center', opacity: a}}>
          <span style={{display: 'inline-block', fontFamily: DEV, fontSize: 46, color: '#2A1406', background: 'linear-gradient(180deg,#F7D27A,#D9A23A)', padding: '6px 30px 12px', borderRadius: 40, boxShadow: '0 6px 20px rgba(0,0,0,.45)', transform: `scale(${0.85 + a * 0.15})`}}>{fx.label}</span>
        </div>
      )}
      {fx.quote && (
        <div style={{position: 'absolute', top: 640, left: 90, right: 90, opacity: a, transform: `translateY(${(1 - a) * 20}px)`}}>
          <div style={{background: 'rgba(12,8,6,.82)', border: `3px solid ${GOLD}`, borderRadius: 28, padding: '22px 34px 30px', fontFamily: DEV, fontSize: 52, color: '#F7EBD2', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,.5)'}}>“{fx.quote}”</div>
        </div>
      )}
      {fx.num && (
        <div style={{position: 'absolute', top: 560, left: 0, right: 0, textAlign: 'center', fontFamily: DEV, fontSize: 210, color: '#FFE27A', opacity: a, transform: `scale(${1.4 - a * 0.4})`, textShadow: '0 10px 40px rgba(0,0,0,.7), 0 0 60px rgba(255,210,90,.45)'}}>{fx.num}</div>
      )}
    </>
  );
};
