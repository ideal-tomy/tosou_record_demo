import {
  Children,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

export const WA = 336;
export const WE = 428;
export const WH = 176;
export const G = 28;

function useViewportWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

function colW(k: number, cur: number) {
  if (k === cur) return WA;
  if (k === cur + 1) return WE;
  return WH;
}

export function Stage({ cur, children }: { cur: number; children: ReactNode }) {
  const vw = useViewportWidth();
  const phone = vw <= 900;
  const cols = Children.toArray(children);
  let x = 0;
  for (let k = 0; k < cur; k++) x += colW(k, cur) + G;
  const sliver = cur > 0 ? 120 : 48;
  const windowW = sliver + WA + G + WE;
  const leftEdge = Math.max(14, (vw - windowW) / 2);
  const transform = phone ? "none" : `translateX(${leftEdge + sliver - x}px)`;

  useLayoutEffect(() => {
    if (!phone) return;
    const n = document.getElementById(`c${cur}`);
    if (!n) return;
    const top = n.getBoundingClientRect().top + window.pageYOffset - 8;
    window.scrollTo(0, Math.max(0, top));
  }, [cur, phone]);

  return (
    <div className="stage">
      <div className="track" style={{ transform }}>
        {cols.map((child, k) => {
          const role = k === cur ? "act" : k === cur + 1 ? "fx" : "hist dim";
          return (
            <div
              key={k}
              id={`c${k}`}
              className={`col ${role}`}
              style={phone ? undefined : { width: colW(k, cur) }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
