import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Video, FPS, totalFrames, Cfg} from './engine';
import {makardhwaj} from './videos/makardhwaj';
import {ALL} from './videos/all';
import {Cover, CoverSpec} from './cover';
import {Still} from 'remotion';
import {LogoIcon, LogoFull, Watermark, WatermarkText, WatermarkHandle} from './logo';
const COVERS: Record<string, CoverSpec> = {
  Makardhwaj: {scene: 8, at: 8, pill: 'ANSUNI KATHA', title: 'HANUMAN KA\nBETA?', sub: 'Pita vs Putra'},
  Barbarik: {scene: 0, at: 60, pill: 'MAHABHARAT KA', title: '3 BAAN.\nEK PAL.', sub: 'Phir bhi sheesh de diya', red: 'PAL'},
  Eklavya: {scene: 7, at: 10, pill: 'GURU DAKSHINA', title: 'EK\nANGOOTHA.', sub: 'Bina sikhaye shishya', red: 'ANGOOTHA'},
  Ghatotkach: {scene: 0, at: 40, pill: 'PANDAVON KA', title: 'RAAKSHAS\nBETA.', sub: 'Jiski maut par Krishna muskuraaye', red: 'RAAKSHAS'},
  Ravan: {scene: 0, at: 40, pill: 'JANAM SE NAHI THE', title: 'RAAVAN KE\n10 SIR.', sub: 'Asli kahani', red: 'SIR'},
  Abhimanyu: {scene: 5, at: 60, pill: 'SIRF 16 SAAL', title: 'EK AKELA.\n7 MAHARATHI.', sub: 'Chakravyuh ka sach', red: '7'},
  Karna: {scene: 1, at: 80, pill: 'SURYA PUTRA', title: 'KAVACH KA\nDAAN.', sub: 'Jaan kar bhi de diya', red: 'DAAN'},
  Jatayu: {scene: 4, at: 20, pill: 'EK BOODHA PAKSHI', title: 'RAAVAN SE\nYUDDH.', sub: 'Pehla yoddha', red: 'YUDDH'},
  Shravan: {scene: 1, at: 30, pill: 'EK TEER, EK SHRAAP', title: 'SHRAVAN\nKUMAR.', sub: 'Dashrath ki galti', red: 'KUMAR'},
  Nachiketa: {scene: 4, at: 200, pill: 'MAUT SE SAWAAL', title: 'NACHIKETA.', sub: 'Yamraj ke 3 vardaan'},
  Bhishma: {scene: 0, at: 40, pill: 'MAUT BHI RUKI', title: 'BAANON KI\nSHAIYYA.', sub: '58 din ka intezaar', red: 'SHAIYYA'},
  BalHanuman: {scene: 0, at: 40, pill: 'EK BAALAK NE', title: 'SOORAJ\nNIGLA.', sub: 'Hanuman naam ka rahasya', red: 'NIGLA'},
  Amba: {scene: 0, at: 70, pill: 'BHISHMA KI MAUT', title: 'DOOSRA\nJANM.', sub: 'Amba ka badla', red: 'JANM.'},
  Gandhari: {scene: 0, at: 75, pill: 'MAA KI EK NAZAR', title: 'LOHE KA\nSHARIR.', sub: 'Bas ek jagah chhodkar', red: 'SHARIR.'},
  Sahadev: {scene: 10, at: 40, zoom: 1.12, oy: 120, pill: 'कालचित्र', title: 'सहदेव चुप\nक्यों रहा?', sub: 'महाभारत का अनसुना सच', red: 'क्यों'},
  Jarasandh: {scene: 7, at: 40, zoom: 1.12, oy: 120, pill: 'कालचित्र', title: 'दो टुकड़ों में\nजन्म?', sub: 'जरासंध की कथा', red: 'जन्म?'},
  Urmila: {scene: 11, at: 40, zoom: 1.12, oy: 120, pill: 'कालचित्र', title: 'लक्ष्मण 14 साल\nक्यों नहीं सोए?', sub: 'उर्मिला का त्याग', red: 'क्यों'},
  KaalBhairav: {scene: 3, at: 40, zoom: 1.12, oy: 120, pill: 'कालचित्र', title: 'ब्रह्मा का पाँचवाँ\nसिर किसने काटा?', sub: 'काल भैरव की कथा', red: 'किसने'},
  Ekadashi: {scene: 8, at: 40, zoom: 1.12, oy: 120, pill: 'कालचित्र', title: 'एकादशी\nकौन हैं?', sub: 'एक देवी, जिसने विष्णु को बचाया', red: 'कौन'},
  HanumanShani: {scene: 7, at: 40, zoom: 1.12, oy: 120, pill: 'कालचित्र', title: 'शनि पर तेल\nक्यों चढ़ता है?', sub: 'हनुमान और शनि की लोककथा', red: 'क्यों'},
  Ashwatthama: {scene: 0, at: 60, pill: '5000 SAAL SE', title: 'AAJ BHI\nZINDA.', sub: 'Krishna ka shraap', red: 'ZINDA.'},
  Iravan: {scene: 5, at: 70, pill: 'KRISHNA BANE MOHINI', title: 'EK RAAT KI\nSHAADI.', sub: 'Phir balidaan', red: 'SHAADI.'},
  Kumbhakarna: {scene: 0, at: 40, pill: 'EK GALAT SHABD', title: '6 MAHINE\nNEEND.', sub: 'Kumbhakarna ka vardaan', red: 'NEEND.'},
  Shani: {scene: 0, at: 20, pill: 'SHANI KI EK NAZAR', title: 'GANESH KA\nSIR.', sub: 'Asli wajah', red: 'SIR'},
};

const list: Cfg[] = [makardhwaj, ...ALL];
const comps: Record<string, React.FC> = Object.fromEntries(list.map((c) => [c.id, () => <Video cfg={c} />]));
const Root: React.FC = () => (
  <><Still id="Watermark" component={Watermark} width={640} height={120} /><Still id="WatermarkText" component={WatermarkText} width={520} height={90} /><Still id="WatermarkHandle" component={WatermarkHandle} width={520} height={90} />{(['A','B','C','D','E','F'] as const).map((k) => <React.Fragment key={k}><Still id={'LogoIcon-' + k} component={() => <LogoIcon k={k} />} width={1080} height={1080} /><Still id={'LogoFull-' + k} component={() => <LogoFull k={k} />} width={1080} height={1080} /></React.Fragment>)}{list.map((c) => <Still key={'c' + c.id} id={'Cover-' + c.id} component={() => <Cover cfg={c} spec={COVERS[c.id]} />} width={1080} height={1920} />)}{list.map((c) => <Composition key={c.id} id={c.id} component={comps[c.id]} durationInFrames={totalFrames(c)} fps={FPS} width={1080} height={1920} />)}</>
);
registerRoot(Root);
