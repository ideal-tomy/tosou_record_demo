import type { Judge, SunAns, TouchAns } from "../data/fixture";
import { Count, Who } from "../components/ui";

export function RecordSlot({
  aTouch,
  aSun,
  judge,
  actLine,
  resLine,
  done,
  pending,
  popAct,
  popRes,
}: {
  aTouch: TouchAns;
  aSun: SunAns;
  judge: Judge;
  actLine: string;
  resLine: string;
  done: number;
  pending: number;
  popAct?: boolean;
  popRes?: boolean;
}) {
  const j = judge === "wait" ? "まだ塗れない" : "塗れる";
  return (
    <div className="pane know">
      <Who mark="録" name="いまの記録" extra="R-20260514-014" />
      <div className="card">
        <div className="slot">
          <div className="k">確認</div>
          <div className="v">
            {aTouch === "stick" ? "指に少し付く" : "指に付かない"}
            {"　"}
            {aSun === "shade" ? "日陰" : "日が当たる"}
          </div>
        </div>
        <div className="slot">
          <div className="k">判断</div>
          <div className="v">{j}</div>
        </div>
        <div className="slot">
          <div className="k">実際</div>
          <div className={`v${actLine ? "" : " empty"}${popAct ? " pop" : ""}`}>{actLine || "まだ"}</div>
        </div>
        <div className="slot">
          <div className="k">結果</div>
          <div className={`v${resLine ? "" : " empty"}${popRes ? " pop" : ""}`}>
            {resLine || "翌朝に入ります"}
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 10 }}>
        <div className="row">
          <span className="k">結果あり</span>
          <Count n={done} pop={popRes} />
        </div>
        <div className="row">
          <span className="k">結果待ち</span>
          <Count n={pending} pop={popRes} />
        </div>
      </div>
    </div>
  );
}
