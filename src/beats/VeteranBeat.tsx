import { img, type Judge, type MicState } from "../data/fixture";
import { FaceRow, MicButton, Pair, ShotButton, Who } from "../components/ui";

export function VeteranBeat({
  shot,
  mic,
  voice,
  judge,
  onTake,
  onSay,
  onSave,
}: {
  shot: boolean;
  mic: MicState;
  voice: string;
  judge: Judge;
  onTake: () => void;
  onSay: () => void;
  onSave: (j: Exclude<Judge, "">) => void;
}) {
  const ready = shot && !judge;
  return (
    <div className="pane field">
      <Who mark="田" name="田中" role="職人 22年" extra="北面 3階" />
      <FaceRow sel="M-N3" />
      <div className="card">
        <div className="metrics">
          <div>
            <span>気温</span>22℃
          </div>
          <div>
            <span>湿度</span>67%
          </div>
          <div>
            <span>素地</span>24℃
          </div>
          <div>
            <span>前回から</span>8:20
          </div>
        </div>
        <img className="srcimg" src={img("IMG-13.png")} alt="素地の表面温度を測っている手元" />
      </div>
      <ShotButton has={shot} src={img("IMG-04.png")} onClick={onTake} />
      <MicButton on={mic === "recording"} label={mic === "recording" ? "録音中" : "録音"} onClick={onSay} />
      {mic === "done" ? <div className="said">{voice}</div> : null}
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
