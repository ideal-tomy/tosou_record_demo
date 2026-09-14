import { COMA, type Judge, type Result } from "../data/fixture";
import { DryStrip, Pair, Who } from "../components/ui";

export function TimeBeat({
  coma,
  eveJudge,
  resLine,
  onSkip,
  onReJudge,
  onResult,
}: {
  coma: 0 | 1 | 2;
  eveJudge: Judge;
  resLine: string;
  onSkip: (n: 1 | 2) => void;
  onReJudge: (j: Exclude<Judge, "">) => void;
  onResult: (r: Exclude<Result, "">) => void;
}) {
  const c = COMA[coma];
  return (
    <div className="pane time">
      <Who mark="岡" name="岡崎" role="職人 1年目" extra="南面 2階" />
      <div className="clock">
        {c.t}
        <small>{c.s}</small>
      </div>
      <DryStrip hi={c.hi} />
      <img className="dphoto" src={c.p} alt="南面2階の塗った面" />
      <div className="t-act">{timeActions({ coma, eveJudge, resLine, onSkip, onReJudge, onResult })}</div>
    </div>
  );
}

function timeActions({
  coma,
  eveJudge,
  resLine,
  onSkip,
  onReJudge,
  onResult,
}: {
  coma: 0 | 1 | 2;
  eveJudge: Judge;
  resLine: string;
  onSkip: (n: 1 | 2) => void;
  onReJudge: (j: Exclude<Judge, "">) => void;
  onResult: (r: Exclude<Result, "">) => void;
}) {
  if (coma === 0) {
    return (
      <button className="btn" type="button" onClick={() => onSkip(1)}>
        17:30の状態を見る
      </button>
    );
  }
  if (coma === 1 && !eveJudge) {
    return (
      <>
        <p className="lbl" style={{ marginTop: 0 }}>
          いまは塗れますか
        </p>
        <Pair style={{ marginTop: 0 }}>
          <button className="btn" type="button" onClick={() => onReJudge("wait")}>
            まだ塗れない
          </button>
          <button className="btn ghost" type="button" onClick={() => onReJudge("go")}>
            塗れる
          </button>
        </Pair>
      </>
    );
  }
  if (coma === 1 && eveJudge) {
    return (
      <button className="btn" type="button" onClick={() => onSkip(2)}>
        翌朝の状態を見る
      </button>
    );
  }
  if (coma === 2 && !resLine) {
    return (
      <>
        <p className="lbl" style={{ marginTop: 0 }}>
          翌朝の結果
        </p>
        <Pair style={{ marginTop: 0 }}>
          <button className="btn" type="button" onClick={() => onResult("ok")}>
            剥がれなし
          </button>
          <button className="btn ghost" type="button" onClick={() => onResult("rework")}>
            手直し
          </button>
        </Pair>
      </>
    );
  }
  return null;
}
