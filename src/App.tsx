import { useEffect, useState, type ReactNode } from "react";
import { Cover } from "./components/Cover";
import { Finale } from "./components/Finale";
import { RecordCard } from "./components/ui";
import { JuniorBeat } from "./beats/JuniorBeat";
import { KnowledgePane } from "./beats/KnowledgePane";
import { OfficeBeat, OfficeKnow } from "./beats/OfficeBeat";
import { RecordSlot } from "./beats/RecordSlot";
import { SeedBeat } from "./beats/SeedBeat";
import { TimeBeat } from "./beats/TimeBeat";
import { VeteranBeat } from "./beats/VeteranBeat";
import {
  img,
  makeRecords,
  makeVet,
  NOW,
  type Judge,
  type MicState,
  type RecordItem,
  type Result,
  type SunAns,
  type TouchAns,
  type VetChoice,
} from "./data/fixture";
import { countUp, filterByAnswers, hm, nearRecords } from "./lib/format";
import { Stage } from "./theater";

export default function App() {
  const [cover, setCover] = useState<"on" | "off" | "gone">("on");
  const [cur, setCur] = useState(0);
  const [seedStatus, setSeedStatus] = useState<"idle" | "loading" | "done">("idle");
  const [tick, setTick] = useState({ all: 0, north: 0, rework: 0, pending: 0 });
  const [know, setKnow] = useState({ all: 0, north: 0, rework: 0 });
  const [office, setOffice] = useState({ done: 0, pending: 0 });
  const [bars, setBars] = useState({ S: 5.5, E: 5.5, N: 7.4, W: 5.5 });
  const [records, setRecords] = useState(makeRecords);
  const [vetItem, setVetItem] = useState(makeVet);

  const [vShot, setVShot] = useState(false);
  const [vMic, setVMic] = useState<MicState>("idle");
  const [vJudge, setVJudge] = useState<Judge>("");
  const [showJunior, setShowJunior] = useState(false);

  const [yShot, setYShot] = useState(false);
  const [aTouch, setATouch] = useState<TouchAns>("");
  const [aSun, setASun] = useState<SunAns>("");
  const [yJudge, setYJudge] = useState<Judge>("");
  const [canJudge, setCanJudge] = useState(false);
  const [similarFade, setSimilarFade] = useState(false);
  const [similarFiltered, setSimilarFiltered] = useState<RecordItem[] | null>(null);
  const [similarNote, setSimilarNote] = useState<ReactNode>(null);

  const [coma, setComa] = useState<0 | 1 | 2>(0);
  const [eveJudge, setEveJudge] = useState<Judge>("");
  const [actLine, setActLine] = useState("");
  const [resLine, setResLine] = useState("");
  const [newRec, setNewRec] = useState<RecordItem | null>(null);
  const [showOffice, setShowOffice] = useState(false);
  const [vetted, setVetted] = useState<VetChoice>("");
  const [juniorKnow, setJuniorKnow] = useState(0);
  const [popVet, setPopVet] = useState(false);
  const [popAct, setPopAct] = useState(false);
  const [popRes, setPopRes] = useState(false);
  const [popJunior, setPopJunior] = useState(false);
  const [finalePhase, setFinalePhase] = useState<"idle" | "message" | "cta">("idle");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("button");
      if (t) window.setTimeout(() => t.blur(), 0);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!canJudge || yJudge) return;
    const el = document.getElementById("junior-judge");
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 420);
    return () => window.clearTimeout(t);
  }, [canJudge, yJudge]);

  function start() {
    setCover("off");
    window.setTimeout(() => setCover("gone"), 420);
    setCur(0);
  }

  function seed() {
    if (seedStatus !== "idle") return;
    setSeedStatus("loading");
    countUp(128, (n) => setTick((t) => ({ ...t, all: n })));
    window.setTimeout(() => countUp(34, (n) => setTick((t) => ({ ...t, north: n }))), 140);
    window.setTimeout(() => countUp(6, (n) => setTick((t) => ({ ...t, rework: n }))), 280);
    window.setTimeout(() => countUp(6, (n) => setTick((t) => ({ ...t, pending: n }))), 420);
    window.setTimeout(() => {
      setKnow({ all: 128, north: 34, rework: 6 });
      setOffice({ done: 128, pending: 6 });
      setTick({ all: 128, north: 34, rework: 6, pending: 6 });
      setSeedStatus("done");
      setCur(2);
    }, 1900);
  }

  function vTake() {
    if (vShot) return;
    setVShot(true);
  }

  function vSay() {
    if (vMic !== "idle") return;
    setVMic("recording");
    window.setTimeout(() => setVMic("done"), 1000);
  }

  function vSave(j: Exclude<Judge, "">) {
    if (vJudge) return;
    const next = { ...vetItem, judge: j };
    setVJudge(j);
    setVetItem(next);
    setRecords((rs) => [next, ...rs]);
    setKnow({ all: 129, north: 35, rework: 6 });
    setOffice((o) => ({ ...o, pending: 7 }));
    setPopVet(true);
    window.setTimeout(() => {
      setShowJunior(true);
      setCur(4);
    }, 1500);
  }

  function applyFilter(touch: TouchAns, sun: SunAns, rs: RecordItem[]) {
    if (!touch || !sun) return;
    setSimilarFade(true);
    window.setTimeout(() => {
      const list = filterByAnswers(rs, touch, sun);
      const long = list.every((r) => r.wait >= 360);
      const rw = list.some((r) => r.result === "rework");
      const near = nearRecords(rs).length;
      setSimilarFiltered(list);
      setSimilarNote(
        <>
          {near}件から絞りました
          {long ? (
            <>
              <br />
              いずれも6時間以上あけています
            </>
          ) : null}
          {rw ? (
            <>
              <br />
              うち1件は手直しになっています
            </>
          ) : null}
        </>,
      );
      setSimilarFade(false);
      setCanJudge(true);
    }, 360);
  }

  function yTake() {
    if (yShot) return;
    setYShot(true);
  }

  function onTouch(v: Exclude<TouchAns, "">) {
    setATouch(v);
    applyFilter(v, aSun, records);
  }

  function onSun(v: Exclude<SunAns, "">) {
    setASun(v);
    applyFilter(aTouch, v, records);
  }

  function ySave(j: Exclude<Judge, "">) {
    if (yJudge) return;
    const rec: RecordItem = {
      id: NOW.id,
      date: "5/14",
      face: "M-S2",
      wait: 390,
      judge: j,
      result: "",
      photo: img("IMG-03.png"),
      temp: NOW.temp,
      hum: NOW.hum,
      voice: NOW.voice,
    };
    setYJudge(j);
    setNewRec(rec);
    setRecords((rs) => [rec, ...rs]);
    setOffice((o) => ({ ...o, pending: 8 }));
    setEveJudge("");
    setActLine("");
    setResLine("");
    setComa(0);
    setCur(5);
  }

  function skipTime(n: 1 | 2) {
    setComa(n);
  }

  function reJudge(j: Exclude<Judge, "">) {
    if (eveJudge) return;
    setEveJudge(j);
    setActLine(j === "go" ? "17:30に上塗りを始めた" : "17:30もまだ待った");
    setPopAct(true);
    if (j === "go") setNewRec((r) => (r ? { ...r, wait: 390 } : r));
  }

  function setMorningResult(r: Exclude<Result, "">) {
    if (resLine) return;
    setNewRec((rec) => (rec ? { ...rec, result: r } : rec));
    setResLine(r === "ok" ? "剥がれなし（5/15 08:10）" : "手直しになった（5/15 08:10）");
    setOffice({ done: 130, pending: 7 });
    if (r === "rework") setKnow((k) => ({ ...k, rework: 7 }));
    setPopRes(true);
    window.setTimeout(() => {
      setShowOffice(true);
      setCur(7);
    }, 1000);
  }

  function vet(k: Exclude<VetChoice, "">) {
    if (vetted) return;
    setVetted(k);
    if (k === "in") {
      setJuniorKnow(1);
      setBars((b) => ({ ...b, N: 7.5 }));
      setPopJunior(true);
    }
    setFinalePhase("message");
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2000;
    window.setTimeout(() => setFinalePhase("cta"), delay);
  }

  const similarSource = similarFiltered ?? nearRecords(records);
  const vetToday = vShot ? (
    <RecordCard
      r={vetItem}
      title={vetItem.judge ? `${hm(vetItem.wait)} で${vetItem.judge === "wait" ? "待った" : "塗った"}` : "写真"}
      voice={vMic === "done" ? vetItem.voice : "まだ一言がありません"}
      mute={vMic !== "done"}
    />
  ) : undefined;

  return (
    <>
      {cover !== "gone" ? <Cover off={cover === "off"} onStart={start} /> : null}
      <Stage cur={cur}>
        <SeedBeat status={seedStatus} onSeed={seed} />
        <KnowledgePane all={tick.all} north={tick.north} rework={tick.rework} pending={tick.pending} />
        {seedStatus === "done" ? (
          <VeteranBeat
            shot={vShot}
            mic={vMic}
            voice={vetItem.voice}
            judge={vJudge}
            onTake={vTake}
            onSay={vSay}
            onSave={vSave}
          />
        ) : (
          <span />
        )}
        <KnowledgePane
          all={know.all}
          north={know.north}
          rework={know.rework}
          pending={office.pending}
          today={vetToday}
          showStrip={know.all > 0}
          pop={popVet}
        />
        {showJunior ? (
          <JuniorBeat
            shot={yShot}
            aTouch={aTouch}
            aSun={aSun}
            judge={yJudge}
            north={know.north}
            canJudge={canJudge}
            similarCount={similarFiltered ? similarFiltered.length : similarSource.length}
            similarNote={similarNote}
            similarList={similarSource}
            similarShort={!similarFiltered}
            similarFade={similarFade}
            onTake={yTake}
            onTouch={onTouch}
            onSun={onSun}
            onSave={ySave}
          />
        ) : (
          <span />
        )}
        {yJudge ? (
          <TimeBeat
            coma={coma}
            eveJudge={eveJudge}
            resLine={resLine}
            onSkip={skipTime}
            onReJudge={reJudge}
            onResult={setMorningResult}
          />
        ) : (
          <span />
        )}
        {yJudge ? (
          <RecordSlot
            aTouch={aTouch}
            aSun={aSun}
            judge={yJudge}
            actLine={actLine}
            resLine={resLine}
            done={office.done}
            pending={office.pending}
            popAct={popAct}
            popRes={popRes}
          />
        ) : (
          <span />
        )}
        {showOffice && newRec ? <OfficeBeat rec={newRec} vetted={vetted} onVet={vet} /> : <span />}
        {showOffice ? (
          <OfficeKnow junior={juniorKnow} north={know.north} bars={bars} vetted={vetted} popJunior={popJunior} />
        ) : (
          <span />
        )}
      </Stage>
      {finalePhase === "idle" ? (
        <div className="foot">
          <button type="button" onClick={() => location.reload()}>
            最初から
          </button>
        </div>
      ) : null}
      <Finale phase={finalePhase} choice={vetted} />
    </>
  );
}
