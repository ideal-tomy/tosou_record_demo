import type { CSSProperties, ReactNode } from "react";
import { DRY_LABELS, FACES, img, type RecordItem } from "../data/fixture";
import { hm } from "../lib/format";

export function Who({
  mark,
  name,
  role,
  extra,
}: {
  mark: string;
  name: string;
  role?: string;
  extra?: string;
}) {
  return (
    <div className="who">
      <i>{mark}</i>
      <b>
        {name}
        {role ? <span>{role}</span> : null}
      </b>
      {extra ? <em>{extra}</em> : null}
    </div>
  );
}

export function Count({ n, pop }: { n: number; pop?: boolean }) {
  return (
    <span className={`v${pop ? " pop" : ""}`}>
      {n}
      <em>件</em>
    </span>
  );
}

export function FaceRow({ sel }: { sel: string }) {
  return (
    <div className="faces">
      {FACES.map((f) => (
        <div key={f.id} className={`face${f.id === sel ? " on" : ""}`}>
          <img src={f.thumb} alt="" />
          <span>{f.name}</span>
        </div>
      ))}
    </div>
  );
}

export function DryStrip({ hi }: { hi: number }) {
  return (
    <div className="strip">
      {[1, 2, 3, 4, 5].map((n) => (
        <figure key={n} className={n === hi ? "on" : undefined}>
          <img src={img(`IMG-0${n}.png`)} alt="" />
          <figcaption>{DRY_LABELS[n - 1]}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function RecordCard({
  r,
  short,
  fade,
  title,
  voice,
  mute,
}: {
  r: RecordItem;
  short?: boolean;
  fade?: boolean;
  title?: string;
  voice?: string;
  mute?: boolean;
}) {
  const line = title ?? (r.judge ? `${hm(r.wait)} で${r.judge === "wait" ? "待った" : "塗った"}` : "写真");
  const text = voice ?? r.voice;
  return (
    <article className={`hc${r.vet ? " today" : ""}${fade ? " fade" : ""}`}>
      <img src={r.photo} alt="" />
      <div className="b">
        <div className="m">
          {r.date}　{r.face}　{r.temp}℃・{r.hum}%
        </div>
        <div className={`d ${r.judge}`}>{line}</div>
        {text ? (
          <p className={[short ? "one" : "", mute ? "mute" : ""].filter(Boolean).join(" ") || undefined}>{text}</p>
        ) : null}
        {!short && r.result === "rework" ? <span className="rw">手直しになった</span> : null}
      </div>
    </article>
  );
}

export function ShotButton({ has, src, onClick }: { has: boolean; src?: string; onClick: () => void }) {
  return (
    <button className={`shot${has ? " has" : ""}`} type="button" onClick={onClick}>
      {has && src ? <img src={src} alt="" /> : null}
      <span className="g" />
      <span className="lb">写真を撮る</span>
    </button>
  );
}

export function MicIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function MicButton({
  on,
  label,
  onClick,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button className={`mic${on ? " on" : ""}`} type="button" onClick={onClick}>
      <MicIcon />
      {label}
    </button>
  );
}

export function Pair({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="pair" style={style}>
      {children}
    </div>
  );
}
