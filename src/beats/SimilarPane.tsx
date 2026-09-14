import type { ReactNode } from "react";
import type { RecordItem } from "../data/fixture";
import { RecordCard, Who } from "../components/ui";

export function SimilarPane({
  count,
  note,
  list,
  short,
  fade,
}: {
  count: number;
  note?: ReactNode;
  list: RecordItem[];
  short: boolean;
  fade: boolean;
}) {
  return (
    <div className="pane know">
      <Who mark="照" name="近い条件の記録" extra={`${count}件`} />
      {note ? <p className="lbl" style={{ marginTop: 0 }}>{note}</p> : null}
      <div className="scroll">
        {list.map((r) => (
          <RecordCard key={r.id} r={r} short={short} fade={fade} />
        ))}
      </div>
    </div>
  );
}
