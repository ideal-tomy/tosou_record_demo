import { img, NOW, type Judge, type SunAns, type TouchAns } from "../data/fixture";
import { FaceRow, Pair, ShotButton, Who } from "../components/ui";

export function JuniorBeat({
  shot,
  aTouch,
  aSun,
  judge,
  north,
  canJudge,
  onTake,
  onTouch,
  onSun,
  onSave,
}: {
  shot: boolean;
  aTouch: TouchAns;
  aSun: SunAns;
  judge: Judge;
  north: number;
  canJudge: boolean;
  onTake: () => void;
  onTouch: (v: Exclude<TouchAns, "">) => void;
  onSun: (v: Exclude<SunAns, "">) => void;
  onSave: (j: Exclude<Judge, "">) => void;
}) {
  const ready = canJudge && !judge;
  return (
    <div className="pane field">
      <Who mark="岡" name="岡崎" role="職人 1年目" extra="南面 2階" />
      <FaceRow sel="M-S2" />
      <div className="card">
        <div className="metrics">
          <div>
            <span>気温</span>
            {NOW.temp}℃
          </div>
          <div>
            <span>湿度</span>
            {NOW.hum}%
          </div>
          <div>
            <span>素地</span>
            {NOW.subst}℃
          </div>
          <div>
            <span>前回から</span>
            {NOW.elapsed}
          </div>
        </div>
        <img className="srcimg" src={img("IMG-12.png")} alt="足場の柱の温湿度計 22.4℃ 68%" />
        <div className="std">塗料の表示　3時間以上</div>
      </div>
      <ShotButton has={shot} src={img("IMG-03.png")} onClick={onTake} />
      {shot ? (
        <>
          <p className="lbl">確認</p>
          <div className="card q">
            <h3>指で触ると、色が指に付きますか</h3>
            <p className="src">5/9 M-N4 の記録から</p>
            <div className="pair" style={{ marginTop: 0 }}>
              <button className={`opt${aTouch === "stick" ? " sel" : ""}`} type="button" onClick={() => onTouch("stick")}>
                少し付く
              </button>
              <button className={`opt${aTouch === "clean" ? " sel" : ""}`} type="button" onClick={() => onTouch("clean")}>
                付かない
              </button>
            </div>
          </div>
          <div className="card q">
            <h3>この面に、いま日は当たっていますか</h3>
            <p className="src">北面の記録 {north}件から</p>
            <div className="pair" style={{ marginTop: 0 }}>
              <button className={`opt${aSun === "sun" ? " sel" : ""}`} type="button" onClick={() => onSun("sun")}>
                当たっている
              </button>
              <button className={`opt${aSun === "shade" ? " sel" : ""}`} type="button" onClick={() => onSun("shade")}>
                日陰
              </button>
            </div>
          </div>
        </>
      ) : null}
      <Pair>
        <button className="btn" type="button" disabled={!ready} onClick={() => onSave("wait")}>
          まだ塗れない
        </button>
        <button className="btn ghost" type="button" disabled={!ready} onClick={() => onSave("go")}>
          塗れる
        </button>
      </Pair>
    </div>
  );
}
