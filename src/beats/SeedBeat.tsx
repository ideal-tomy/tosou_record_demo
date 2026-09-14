import { img } from "../data/fixture";
import { Who } from "../components/ui";

export function SeedBeat({
  status,
  onSeed,
}: {
  status: "idle" | "loading" | "done";
  onSeed: () => void;
}) {
  const label = status === "idle" ? "投入する" : status === "loading" ? "入れています" : "入りました";
  return (
    <div className="pane seed">
      <Who mark="設" name="ナレッジの投入" />
      <img className="banner" src={img("IMG-07.png")} alt="足場のかかったみどりが丘ハイツ" />
      <p className="note">実際はここに御社の記録が入ります。この先は、仮のナレッジを入れた状態でご覧ください。</p>
      <div className="card">
        <div className="row">
          <span className="k">ベテランの判断</span>
          <span className="v">
            128<em>件</em>
          </span>
        </div>
        <div className="row">
          <span className="k">うち 北面の記録</span>
          <span className="v">
            34<em>件</em>
          </span>
        </div>
        <div className="row">
          <span className="k">うち 手直しになった記録</span>
          <span className="v">
            6<em>件</em>
          </span>
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <button className="btn" type="button" disabled={status !== "idle"} onClick={onSeed}>
          {label}
        </button>
      </div>
    </div>
  );
}
