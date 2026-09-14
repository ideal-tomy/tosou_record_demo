import { type ReactNode } from "react";
import { Count, DryStrip, Who } from "../components/ui";

export function KnowledgePane({
  all,
  north,
  rework,
  pending,
  today,
  showStrip,
  pop,
}: {
  all: number;
  north: number;
  rework: number;
  pending: number;
  today?: ReactNode;
  showStrip?: boolean;
  pop?: boolean;
}) {
  return (
    <div className="pane know">
      <Who mark="蓄" name="ナレッジ" role="いまの状態" />
      <div className="card">
        <div className="row">
          <span className="k">ベテランの判断</span>
          <Count n={all} pop={pop} />
        </div>
        <div className="row">
          <span className="k">うち 北面の記録</span>
          <Count n={north} pop={pop} />
        </div>
        <div className="row">
          <span className="k">うち 手直し</span>
          <Count n={rework} pop={pop} />
        </div>
        <div className="row">
          <span className="k">結果待ち</span>
          <Count n={pending} pop={pop} />
        </div>
      </div>
      <p className="lbl">今日 入った記録</p>
      <div>{today ?? <div className="ph">まだありません</div>}</div>
      {showStrip ? (
        <>
          <p className="lbl">同じ面の時間列</p>
          <DryStrip hi={0} />
        </>
      ) : null}
    </div>
  );
}
