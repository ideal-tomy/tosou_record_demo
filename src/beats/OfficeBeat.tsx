import { img, type RecordItem, type VetChoice } from "../data/fixture";
import { Count, Pair, RecordCard, Who } from "../components/ui";
import { hm } from "../lib/format";

export function OfficeBeat({
  rec,
  vetted,
  onVet,
}: {
  rec: RecordItem;
  vetted: VetChoice;
  onVet: (k: Exclude<VetChoice, "">) => void;
}) {
  return (
    <div className="pane office">
      <Who mark="西" name="西村" role="工務" extra="新しく入った記録" />
      <img className="banner" src={img("IMG-07.png")} alt="足場のかかったみどりが丘ハイツ" />
      <p className="lbl" style={{ marginTop: 0 }}>
        1年目の判断です
      </p>
      <RecordCard r={rec} title={`${hm(rec.wait)} で${rec.judge === "wait" ? "待った" : "塗った"}`} />
      <p className="lbl">これをナレッジに入れますか</p>
      <Pair style={{ marginTop: 0 }}>
        <button className="btn" type="button" disabled={!!vetted} onClick={() => onVet("in")}>
          入れる
        </button>
        <button className="btn ghost" type="button" disabled={!!vetted} onClick={() => onVet("hold")}>
          保留にする
        </button>
      </Pair>
    </div>
  );
}

export function OfficeKnow({
  junior,
  north,
  bars,
  vetted,
  popJunior,
}: {
  junior: number;
  north: number;
  bars: { S: number; E: number; N: number; W: number };
  vetted: VetChoice;
  popJunior?: boolean;
}) {
  return (
    <div className="pane know">
      <Who mark="蓄" name="ナレッジ" role="いまの状態" />
      <div className="card">
        <div className="row">
          <span className="k">ベテランの判断</span>
          <Count n={129} />
        </div>
        <div className="row">
          <span className="k">1年目の判断</span>
          <Count n={junior} pop={popJunior} />
        </div>
      </div>
      <p className="lbl">面ごとの乾燥時間</p>
      <div className="card bar">
        <BarRow name="南" v={bars.S} />
        <BarRow name="東" v={bars.E} />
        <BarRow name="北" v={bars.N} hi />
        <BarRow name="西" v={bars.W} />
      </div>
      <p className="lbl">溜まって分かったこと</p>
      <div className="card">
        <div className="kn">K-P7　西村（工務）</div>
        <div className="kb">この時期の北面は乾きが遅い。工程を組むときに北面を先に回すと、足場が1日縮む</div>
        <div className="kg">
          {vetted === "in" ? (
            <>
              北面 {north}件　南面に1年目の記録 1件
              <br />
              乾燥時間の中央値 7:30（他の面 5:30）
            </>
          ) : vetted === "hold" ? (
            <>
              北面 {north}件
              <br />
              乾燥時間の中央値 7:24（他の面 5:30）
              <br />
              保留 1件
            </>
          ) : (
            <>
              北面 {north}件
              <br />
              乾燥時間の中央値 7:24（他の面 5:30）
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BarRow({ name, v, hi }: { name: string; v: number; hi?: boolean }) {
  return (
    <div className={`r${hi ? " hi" : ""}`}>
      <i>{name}</i>
      <div className="t">
        <u style={{ width: `${Math.round((v / 7.5) * 100)}%` }} />
      </div>
      <em>{v.toFixed(1)}</em>
    </div>
  );
}
