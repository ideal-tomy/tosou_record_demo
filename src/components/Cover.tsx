import { img } from "../data/fixture";

export function Cover({ off, onStart }: { off: boolean; onStart: () => void }) {
  return (
    <div className={`cover${off ? " off" : ""}`}>
      <div className="cbox">
        <img className="cover-hero" src={img("IMG-15.png")} alt="足場の上で塗った面を確認している職人" />
        <h1>塗り重ね記録</h1>
        <p className="s">乾き具合の判断を残して、次の現場で使う</p>
        <div className="peek" aria-hidden="true">
          <div className="t">
            南面 2階 <span style={{ fontWeight: 400, color: "#5B635F" }}>中塗り → 上塗り</span>
          </div>
          <div className="r">
            <span>22℃</span>
            <span>68%</span>
            <span>素地 26℃</span>
            <span>4:20</span>
          </div>
          <img src={img("IMG-03.png")} alt="" />
        </div>
        <button className="btn" type="button" onClick={onStart}>
          はじめる
        </button>
        <p className="cfoot">北野塗装工業 ／ みどりが丘ハイツ 外壁改修</p>
      </div>
    </div>
  );
}
