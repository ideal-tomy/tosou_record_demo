import type { RecordItem, TouchAns, SunAns } from "../data/fixture";
import { NOW } from "../data/fixture";

export function hm(m: number) {
  const h = Math.floor(m / 60);
  const n = m % 60;
  return `${h}:${n < 10 ? "0" : ""}${n}`;
}

export function nearRecords(records: RecordItem[]) {
  return records.filter(
    (r) => Math.abs(r.temp - NOW.temp) <= 2 && Math.abs(r.hum - NOW.hum) <= 6,
  );
}

export function filterByAnswers(records: RecordItem[], aTouch: TouchAns, aSun: SunAns) {
  const list = records.filter((r) => {
    const a = aTouch === "stick" ? r.judge === "wait" : r.judge === "go";
    const n = /^M-[NW]/.test(r.face);
    return a && (aSun === "shade" ? n : !n);
  });
  list.sort((x, y) => (aTouch === "stick" ? y.wait - x.wait : x.wait - y.wait));
  const v = list.filter((r) => r.vet);
  const o = list.filter((r) => !r.vet);
  return v.concat(o).slice(0, 3);
}

export function countUp(to: number, onTick: (n: number) => void, onDone?: () => void) {
  let v = 0;
  const st = Math.max(1, Math.round(to / 22));
  const t = window.setInterval(() => {
    v += st;
    if (v >= to) {
      v = to;
      window.clearInterval(t);
      onTick(v);
      onDone?.();
      return;
    }
    onTick(v);
  }, 28);
  return () => window.clearInterval(t);
}
