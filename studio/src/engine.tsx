import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import type {SP} from './scenes';
import {Captions, Fx, FxLayer, Grain, HookText, TitleBlock, TitleSpec, p} from './ui';

export const FPS = 30;
export const END_HOLD = 2.8;
export type Cfg = {
  id: string; voice: string; script: {cap: string}[]; timings: {s: number; e: number}[];
  scenes: [React.FC<SP>, number[]][]; titles: (TitleSpec | null)[]; end: TitleSpec; endScene: React.FC<SP>;
  hook?: string; fx?: Record<number, Fx>; pushIn?: boolean;
};
const fr = (sec: number) => Math.round(sec * FPS);
export const totalFrames = (c: Cfg) => fr(c.timings[c.timings.length - 1].e + END_HOLD);

const SceneWrap: React.FC<{from: number; dur: number; L: number[]; C: React.FC<SP>; push?: boolean}> = ({from, dur, L, C, push}) => {
  const f = useCurrentFrame();
  const a = from === 0 ? 1 : p(f, 0, 12);
  const z = push ? 1 + (f / Math.max(dur, 1)) * 0.06 : 1;
  return (
    <AbsoluteFill style={{opacity: a, transform: `scale(${(1.03 - a * 0.03) * z})`}}>
      <C f={f} L={L} dur={dur} />
    </AbsoluteFill>
  );
};

export const Video: React.FC<{cfg: Cfg}> = ({cfg}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const T = cfg.timings;
  const starts = cfg.scenes.map(([, ls], i) => (i === 0 ? 0 : fr(T[ls[0]].s) - 4));
  const endStart = fr(T[T.length - 1].e + 0.3);
  let li = -1;
  T.forEach((t, i) => { if (frame >= fr(t.s) - 3) li = i; });
  let tIdx = li;
  while (tIdx > 0 && !cfg.titles[tIdx]) tIdx--;
  const inEnd = frame >= endStart;
  const titleSpec = inEnd ? cfg.end : tIdx >= 0 ? cfg.titles[tIdx] : null;
  const titleStart = inEnd ? endStart : tIdx >= 0 ? fr(T[tIdx].s) - 3 : 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {cfg.scenes.map(([C, ls], i) => {
        const from = starts[i];
        const to = i < cfg.scenes.length - 1 ? starts[i + 1] + 12 : endStart + 12;
        return (
          <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
            <SceneWrap from={from} dur={to - from} L={ls.map((l) => fr(T[l].s) - from)} C={C} push={cfg.pushIn} />
          </Sequence>
        );
      })}
      <Sequence from={endStart} layout="none"><SceneWrap from={endStart} dur={durationInFrames - endStart} L={[0]} C={cfg.endScene} /></Sequence>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,4,2,.72) 0%, rgba(8,4,2,.45) 22%, rgba(8,4,2,0) 38%)', pointerEvents: 'none'}} />
      {cfg.hook && !inEnd && li <= 0 ? <HookText text={cfg.hook} f={frame} /> : titleSpec && <TitleBlock key={'t' + titleStart} spec={titleSpec} f={frame - titleStart} />}
      {!inEnd && li >= 0 && cfg.fx?.[li] && frame < fr(T[li].e) + 8 && <FxLayer key={'fx' + li} fx={cfg.fx[li]} f={frame - fr(T[li].s)} />}
      {!inEnd && li >= 0 && frame < fr(T[li].e) + 8 && (
        <Captions key={'c' + li} cap={cfg.script[li].cap} f={frame - fr(T[li].s)} dur={fr(T[li].e - T[li].s)} />
      )}
      <Grain f={frame} />
      <Audio src={staticFile(cfg.voice)} />
      <AbsoluteFill style={{background: '#000', opacity: interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], {extrapolateLeft: 'clamp'})}} />
    </AbsoluteFill>
  );
};
