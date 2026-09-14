export const img = (name: string) => `/${name}`;

export type Judge = "" | "wait" | "go";
export type Result = "" | "ok" | "rework";
export type TouchAns = "" | "stick" | "clean";
export type SunAns = "" | "sun" | "shade";
export type VetChoice = "" | "in" | "hold";
export type MicState = "idle" | "recording" | "done";

export type RecordItem = {
  id: string;
  date: string;
  face: string;
  wait: number;
  judge: Judge;
  result: Result;
  photo: string;
  temp: number;
  hum: number;
  voice: string;
  vet?: boolean;
};

export type Face = { id: string; name: string; thumb: string };

export const NOW = {
  id: "R-20260514-014",
  face: "M-S2",
  temp: 22,
  hum: 68,
  subst: 26,
  elapsed: "4:20",
  voice: "まだ指で触ると少し取れる。あと2時間見る",
};

export const FACES: Face[] = [
  { id: "M-S2", name: "南", thumb: img("IMG-08.png") },
  { id: "M-E1", name: "東", thumb: img("IMG-09.png") },
  { id: "M-N3", name: "北", thumb: img("IMG-10.png") },
  { id: "M-W4", name: "西", thumb: img("IMG-11.png") },
];

export const COMA = [
  { t: "15:20", s: "前回から 4:20", p: img("IMG-03.png"), hi: 3 },
  { t: "17:30", s: "前回から 6:30", p: img("IMG-04.png"), hi: 4 },
  { t: "翌朝 08:10", s: "5月15日", p: img("IMG-05.png"), hi: 5 },
] as const;

export const DRY_LABELS = ["直後", "2時間", "4時間", "6時間", "翌朝"] as const;

export function makeVet(): RecordItem {
  return {
    id: "R-20260514-013",
    date: "5/14",
    face: "M-N3",
    wait: 500,
    judge: "",
    result: "ok",
    photo: img("IMG-04.png"),
    temp: 22,
    hum: 67,
    voice: "今日の北は影が早い。指で触ると少し残る。8時間は見る",
    vet: true,
  };
}

export function makeRecords(): RecordItem[] {
  return [
    { id: "R-20260418-003", date: "4/18", face: "M-S1", wait: 260, judge: "go", result: "rework", photo: img("IMG-06.png"), temp: 23, hum: 62, voice: "触った感じは大丈夫。進める" },
    { id: "R-20260421-007", date: "4/21", face: "M-E2", wait: 310, judge: "go", result: "ok", photo: img("IMG-03.png"), temp: 24, hum: 60, voice: "東はもう乾いてる。行く" },
    { id: "R-20260425-011", date: "4/25", face: "M-W3", wait: 340, judge: "go", result: "ok", photo: img("IMG-03.png"), temp: 21, hum: 70, voice: "西は触って大丈夫だった" },
    { id: "R-20260508-009", date: "5/8", face: "M-N3", wait: 370, judge: "go", result: "ok", photo: img("IMG-04.png"), temp: 22, hum: 68, voice: "日が回ってきた。触っても指に付かない。行く" },
    { id: "R-20260502-004", date: "5/2", face: "M-S3", wait: 390, judge: "go", result: "ok", photo: img("IMG-04.png"), temp: 22, hum: 65, voice: "南はもう均一。30分見てから塗った" },
    { id: "R-20260510-012", date: "5/10", face: "M-S4", wait: 420, judge: "go", result: "ok", photo: img("IMG-04.png"), temp: 23, hum: 64, voice: "4階は乾きがいい。このくらいで揃う" },
    { id: "R-20260506-006", date: "5/6", face: "M-E1", wait: 420, judge: "wait", result: "ok", photo: img("IMG-04.png"), temp: 20, hum: 72, voice: "まだ少し冷たい。1時間見る" },
    { id: "R-20260504-008", date: "5/4", face: "M-W2", wait: 440, judge: "wait", result: "ok", photo: img("IMG-04.png"), temp: 21, hum: 71, voice: "西は午後から影。もう少し置く" },
    { id: "R-20260501-005", date: "5/1", face: "M-N2", wait: 450, judge: "wait", result: "ok", photo: img("IMG-04.png"), temp: 20, hum: 74, voice: "北はまだ冷たい。触ると指に色が残る" },
    { id: "R-20260428-010", date: "4/28", face: "M-N1", wait: 480, judge: "wait", result: "ok", photo: img("IMG-05.png"), temp: 19, hum: 75, voice: "1階の北は一日日が当たらない。夕方まで置く" },
    { id: "R-20260511-003", date: "5/11", face: "M-N5", wait: 540, judge: "wait", result: "ok", photo: img("IMG-05.png"), temp: 21, hum: 69, voice: "上の階でも北は遅い。今日のうちに塗る" },
    { id: "R-20260509-011", date: "5/9", face: "M-N4", wait: 570, judge: "wait", result: "ok", photo: img("IMG-04.png"), temp: 22, hum: 68, voice: "数字は同じでも、北の影が残ってる。指で触るとまだ取れる" },
  ];
}
