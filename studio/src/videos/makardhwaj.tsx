import script from '../../script.json';
import timings from '../../timings.json';
import * as S from '../scenes';
import type {Cfg} from '../engine';
import type {TitleSpec} from '../ui';
// scene component -> line indices it covers
const SCENES: Cfg['scenes'] = [
  [S.S1, [0, 1]], [S.S2, [2, 3, 4]], [S.S3, [5]], [S.S4, [6, 7]], [S.S5, [8]], [S.S6, [9, 10]],
  [S.S7, [11]], [S.S8, [12, 13, 14, 15, 16]], [S.S9, [17]], [S.S10, [18]], [S.S11, [19]], [S.S12, [20]], [S.S13, [21]],
];

// title per line (null = keep previous)
const TITLES: (TitleSpec | null)[] = [
  {pill: 'HANUMAN JI', title: 'AAJEEVAN\nBRAHMACHARI.', red: 'BRAHMACHARI'},
  {pill: 'PHIR BHI', title: 'EK BETA?'},
  {pill: 'LANKA DAHAN KE BAAD', title: 'SAMUDRA.'},
  {pill: 'PASEENE KI', title: '1 BOOND.'}, null,
  {pill: 'DHARTI KE NEECHE', title: 'PAATAL LOK.', red: 'LOK'},
  {pill: 'AHIRAVAN KE MACHHUAARE', title: 'MACHHLI KA RAAZ.'}, null,
  {pill: 'PAATAL KA', title: 'DWAARPAAL.'},
  {pill: 'AHIRAVAN KI MAAYA', title: 'NAKLI VIBHISHAN.'}, null,
  {pill: 'PEECHHA', title: 'PAATAL KI OR.'},
  {pill: 'DWAAR PAR', title: 'MAKARDHWAJ.', sub: 'Hanuman ka putra?'}, null, null, null, null,
  {title: 'PITA vs PUTRA.', red: 'PUTRA'},
  {pill: 'PRAAN', title: '5 DIYE.', sub: '5 dishaon mein'},
  {title: 'PANCHMUKHI\nHANUMAN.'},
  {pill: 'SHRI RAM NE BANAYA', title: 'PAATAL KA RAJA.'},
  {title: 'WAFAADAARI.'},
];
const END_TITLE: TitleSpec = {pill: 'ANSUNI KATHA', title: 'MAKARDHWAJ.', sub: 'Pavanputra ka putra'};


export const makardhwaj: Cfg = {id: 'Makardhwaj', voice: 'voice.wav', script, timings, scenes: SCENES, titles: TITLES, end: END_TITLE, endScene: S.S14};
