import { useEffect, useRef, type ReactNode } from "react";
import type { VetChoice } from "../data/fixture";

const SLIDE_URL = "/slides/塗装_提案スライド.html";

export function Finale({
  phase,
  choice,
}: {
  phase: "idle" | "message" | "cta";
  choice: VetChoice;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "idle" || !choice) return;
    const t = window.setTimeout(() => dialogRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [phase, choice]);

  if (phase === "idle" || !choice) return null;

  const message: ReactNode =
    choice === "in" ? (
      <>
        現場判断を知識として蓄積していき、
        <br />
        今後に役立てる
      </>
    ) : (
      "判断は残しました。確認が終わったら、ナレッジに入れられます"
    );

  return (
    <div className="finale-overlay on" role="dialog" aria-modal="true" aria-live="polite">
      <div className="finale-backdrop" aria-hidden="true" />
      <div className="finale-stack" ref={dialogRef} tabIndex={-1}>
        <div className="finale-dialog">
          <p className="finale-msg">{message}</p>
        </div>
        {phase === "cta" ? (
          <div className="finale-cta">
            <button className="btn" type="button" onClick={() => location.reload()}>
              最初から
            </button>
            <a className="btn ghost" href={SLIDE_URL}>
              資料を確認
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
