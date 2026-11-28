import React from 'react';
import {AbsoluteFill} from 'remotion';
import type {Cfg} from './engine';
import {FPS} from './engine';
import {Grain, GOLD, SANS, SERIF} from './ui';

export type CoverSpec = {scene: number; at: number; pill: string; title: string; sub?: string; red?: string; zoom?: number; oy?: number};

// Static poster: a frozen scene frame, darkened top, big hook title inside the 3:4 grid-safe zone (y 240–1680)
export const Cover: React.FC<{cfg: Cfg; spec: CoverSpec}> = ({cfg, spec}) => {
  const [C, ls] = cfg.scenes[spec.scene];
  const T = cfg.timings;
  const from = spec.scene === 0 ? 0 : Math.round(T[ls[0]].s * FPS) - 4;
  const L = ls.map((l) => Math.round(T[l].s * FPS) - from);
  const lines = spec.title.split('\n');
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{transform: `scale(${spec.zoom ?? 1.08}) translateY(${spec.oy ?? 60}px)`}}>
        <C f={spec.at} L={L} dur={600} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(6,3,2,.92) 0%, rgba(6,3,2,.75) 30%, rgba(6,3,2,0) 50%, rgba(6,3,2,0) 78%, rgba(6,3,2,.7) 100%)'}} />
      <AbsoluteFill style={{border: `6px solid ${GOLD}`, margin: 28, borderRadius: 18, opacity: 0.55}} />
      <div style={{position: 'absolute', top: 300, left: 40, right: 40, textAlign: 'center'}}>
        <div style={{display: 'inline-block', background: 'linear-gradient(180deg,#F7D27A,#D9A23A)', color: '#3A2208', fontFamily: `${SANS}, "Tiro Devanagari Hindi"`, fontWeight: 800, fontSize: 34, letterSpacing: 4, padding: '10px 28px', borderRadius: 40}}>{spec.pill}</div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, margin: '22px 0 10px'}}>
          <div style={{width: 140, height: 3, background: `linear-gradient(90deg,transparent,${GOLD})`}} />
          <div style={{width: 14, height: 14, background: GOLD, transform: 'rotate(45deg)'}} />
          <div style={{width: 140, height: 3, background: `linear-gradient(270deg,transparent,${GOLD})`}} />
        </div>
        {lines.map((ln, i) => (
          <div key={i} style={{fontFamily: SERIF, fontWeight: 800, fontSize: ln.length > 11 ? 112 : 140, lineHeight: 1.02, letterSpacing: 3, color: GOLD, textShadow: '0 8px 40px rgba(0,0,0,.8), 0 0 50px rgba(240,194,90,.3)'}}>
            {ln.split(' ').map((w, j) => <span key={j} style={{color: spec.red && w.includes(spec.red) ? '#E2413A' : undefined}}>{w}{' '}</span>)}
          </div>
        ))}
        {spec.sub && <div style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 700, fontSize: 54, color: '#F3E6C8', marginTop: 14, textShadow: '0 4px 20px rgba(0,0,0,.9)'}}>{spec.sub}</div>}
      </div>
      <Grain f={1} />
    </AbsoluteFill>
  );
};
