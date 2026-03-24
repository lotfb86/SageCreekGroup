"use client";

import { useEffect, useRef } from "react";

/* ── yield data ── */
const data: { m: string; r: number }[] = [
  {m:'Jan 2022',r:1.76},{m:'Feb 2022',r:1.97},{m:'Mar 2022',r:2.34},{m:'Apr 2022',r:2.89},
  {m:'May 2022',r:2.84},{m:'Jun 2022',r:3.01},{m:'Jul 2022',r:2.67},{m:'Aug 2022',r:3.04},
  {m:'Sep 2022',r:3.83},{m:'Oct 2022',r:4.10},{m:'Nov 2022',r:3.69},{m:'Dec 2022',r:3.88},
  {m:'Jan 2023',r:3.53},{m:'Feb 2023',r:3.92},{m:'Mar 2023',r:3.96},{m:'Apr 2023',r:3.57},
  {m:'May 2023',r:3.64},{m:'Jun 2023',r:3.84},{m:'Jul 2023',r:3.97},{m:'Aug 2023',r:4.25},
  {m:'Sep 2023',r:4.57},{m:'Oct 2023',r:4.93},{m:'Nov 2023',r:4.47},{m:'Dec 2023',r:3.97},
  {m:'Jan 2024',r:4.05},{m:'Feb 2024',r:4.25},{m:'Mar 2024',r:4.20},{m:'Apr 2024',r:4.68},
  {m:'May 2024',r:4.46},{m:'Jun 2024',r:4.36},{m:'Jul 2024',r:4.17},{m:'Aug 2024',r:3.84},
  {m:'Sep 2024',r:3.78},{m:'Oct 2024',r:4.24},{m:'Nov 2024',r:4.41},{m:'Dec 2024',r:4.57},
  {m:'Jan 2025',r:4.65},{m:'Feb 2025',r:4.50},{m:'Mar 2025',r:4.25},{m:'Apr 2025',r:4.30},
  {m:'May 2025',r:4.45},{m:'Jun 2025',r:4.42},{m:'Jul 2025',r:4.45},{m:'Aug 2025',r:4.20},
  {m:'Sep 2025',r:4.10},{m:'Oct 2025',r:4.20},{m:'Nov 2025',r:4.30},{m:'Dec 2025',r:4.35},
  {m:'Jan 2026',r:4.42},{m:'Feb 2026',r:4.30},{m:'Mar 2026',r:4.41},
];

function mk(tag: string, a?: Record<string, string>) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
  if (a) for (const [k, v] of Object.entries(a)) e.setAttribute(k, v);
  return e;
}

export default function TreasuryWedgeChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ttpRef = useRef<HTMLDivElement>(null);
  const ttrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const tt = tooltipRef.current;
    if (!svg || !tt) return;

    // Clear any previous render
    svg.innerHTML = "";

    const W = 900, H = 580, p = { t: 42, r: 64, b: 46, l: 50 };
    const cW = W - p.l - p.r, cH = H - p.t - p.b, n = data.length;
    const mn = 1.4, mx = 5.4;
    const xs = (i: number) => p.l + (i / (n - 1)) * cW;
    const ys = (r: number) => p.t + cH - ((r - mn) / (mx - mn)) * cH;

    const defs = mk("defs");

    // Line gradient
    const lg = mk("linearGradient", { id: "tw-lg", x1: "0", y1: "0", x2: "1", y2: "0" });
    [{ o: "0%", c: "#155e75" }, { o: "55%", c: "#1a7a96" }, { o: "100%", c: "#4a9eba" }].forEach(({ o, c }) => {
      const s = mk("stop", { offset: o }); s.style.cssText = `stop-color:${c}`; lg.appendChild(s);
    });

    // Area gradient
    const ag = mk("linearGradient", { id: "tw-ag", x1: "0", y1: "0", x2: "0", y2: "1" });
    [{ o: "0%", op: "0.14", c: "#155e75" }, { o: "100%", op: "0.01", c: "#155e75" }].forEach(({ o, op, c }) => {
      const s = mk("stop", { offset: o }); s.style.cssText = `stop-color:${c};stop-opacity:${op}`; ag.appendChild(s);
    });

    defs.appendChild(lg); defs.appendChild(ag); svg.appendChild(defs);

    // Grid lines
    [2, 2.5, 3, 3.5, 4, 4.5, 5].forEach((r) => {
      svg.appendChild(mk("line", { x1: String(p.l), y1: String(ys(r)), x2: String(p.l + cW), y2: String(ys(r)), stroke: "rgba(0,0,0,0.07)", "stroke-width": "1" }));
      const lb = mk("text", { x: String(p.l - 7), y: String(ys(r) + 4), "text-anchor": "end", fill: "#3a3f4a", "font-size": "11", "font-weight": "700" });
      lb.textContent = r.toFixed(1) + "%"; svg.appendChild(lb);
    });

    // Year dividers + labels
    ["2022", "2023", "2024", "2025", "2026"].forEach((yr) => {
      const i = data.findIndex((d) => d.m === "Jan " + yr);
      if (i < 0) return;
      const x = xs(i);
      svg.appendChild(mk("line", { x1: String(x), y1: String(p.t), x2: String(x), y2: String(p.t + cH), stroke: "rgba(0,0,0,0.05)", "stroke-width": "1", "stroke-dasharray": "4,4" }));
      svg.appendChild(mk("line", { x1: String(x), y1: String(p.t + cH), x2: String(x), y2: String(p.t + cH + 5), stroke: "rgba(0,0,0,0.12)", "stroke-width": "1" }));
      const lb = mk("text", { x: String(x), y: String(p.t + cH + 18), "text-anchor": "middle", fill: "#1a1f2a", "font-size": "12", "font-weight": "700" });
      lb.textContent = yr; svg.appendChild(lb);
    });

    // ─── WEDGE TRENDLINES ───
    const uSlope = (4.65 - 4.93) / (36 - 21);
    const uRef_i = 21, uRef_r = 4.93;
    const uX1 = xs(9), uY1 = ys(uRef_r + uSlope * (9 - uRef_i));
    const uX2 = xs(53), uY2 = ys(uRef_r + uSlope * (53 - uRef_i));

    const lSlope = (3.78 - 3.53) / (32 - 12);
    const lRef_i = 12, lRef_r = 3.53;
    const lX1 = xs(12), lY1 = ys(lRef_r);
    const lX2 = xs(53), lY2 = ys(lRef_r + lSlope * (53 - lRef_i));

    // Wedge fill
    const fillSteps = 42;
    let wPath = `M ${xs(12)} ${ys(uRef_r + uSlope * (12 - uRef_i))}`;
    for (let s = 1; s <= fillSteps; s++) {
      const ii = 12 + s;
      wPath += ` L ${xs(ii)} ${ys(uRef_r + uSlope * (ii - uRef_i))}`;
    }
    for (let s = fillSteps; s >= 0; s--) {
      const ii = 12 + s;
      wPath += ` L ${xs(ii)} ${ys(lRef_r + lSlope * (ii - lRef_i))}`;
    }
    wPath += " Z";
    svg.appendChild(mk("path", { d: wPath, fill: "rgba(192,57,43,0.05)" }));

    // Draw resistance line
    svg.appendChild(mk("line", { x1: String(uX1), y1: String(uY1), x2: String(uX2), y2: String(uY2), stroke: "rgba(192,57,43,0.85)", "stroke-width": "2", "stroke-linecap": "round" }));

    // Draw support line
    svg.appendChild(mk("line", { x1: String(lX1), y1: String(lY1), x2: String(lX2), y2: String(lY2), stroke: "rgba(192,57,43,0.55)", "stroke-width": "2", "stroke-linecap": "round" }));

    // Area fill under yield line
    let ap = `M ${xs(0)} ${ys(data[0].r)}`;
    for (let i = 1; i < n; i++) ap += ` L ${xs(i)} ${ys(data[i].r)}`;
    ap += ` L ${xs(n - 1)} ${p.t + cH} L ${xs(0)} ${p.t + cH} Z`;
    svg.appendChild(mk("path", { d: ap, fill: "url(#tw-ag)" }));

    // Yield line
    let lp = `M ${xs(0)} ${ys(data[0].r)}`;
    for (let i = 1; i < n; i++) lp += ` L ${xs(i)} ${ys(data[i].r)}`;
    svg.appendChild(mk("path", { d: lp, fill: "none", stroke: "url(#tw-lg)", "stroke-width": "2.3", "stroke-linejoin": "round", "stroke-linecap": "round" }));

    // Key markers
    [
      { i: 21, r: 4.93, lb: "Cycle Peak 4.93%", dy: -14, ta: "middle", c: "#c0392b" },
      { i: 27, r: 4.68, lb: "Apr 2024 4.68%", dy: -14, ta: "middle", c: "#c0392b" },
      { i: 36, r: 4.65, lb: "Jan 2025 4.65%", dy: -14, ta: "end", c: "#c0392b" },
      { i: 32, r: 3.78, lb: "Trough 3.78%", dy: 18, ta: "middle", c: "#2d5a2d" },
      { i: 12, r: 3.53, lb: "3.53%", dy: 18, ta: "start", c: "#2d5a2d" },
      { i: 50, r: 4.41, lb: "Current 4.41%", dy: -15, ta: "end", c: "#4a9eba" },
    ].forEach((m) => {
      const x = xs(m.i), y = ys(m.r);
      svg.appendChild(mk("circle", { cx: String(x), cy: String(y), r: "5", fill: m.c, stroke: "#ffffff", "stroke-width": "2" }));
      const lb = mk("text", { x: String(x), y: String(y + m.dy), "text-anchor": m.ta, fill: m.c, "font-size": "10.5", "font-weight": "800" });
      lb.textContent = m.lb; svg.appendChild(lb);
    });

    // "Testing Resistance" annotation
    const annX = xs(50) - 6, annY = ys(4.41) - 32;
    const ann = mk("text", { x: String(annX), y: String(annY), "text-anchor": "end", fill: "rgba(192,57,43,0.9)", "font-size": "10.5", "font-weight": "800", "font-style": "italic" });
    ann.textContent = "\u25b2 Testing Resistance";
    svg.appendChild(ann);

    // Y axis label
    const yl = mk("text", { x: "13", y: String(p.t + cH / 2), "text-anchor": "middle", fill: "#3a3f4a", "font-size": "10", "font-weight": "700", transform: `rotate(-90,13,${p.t + cH / 2})` });
    yl.textContent = "YIELD (%)"; svg.appendChild(yl);

    // Hover hit targets
    data.forEach((d, i) => {
      const x = xs(i), y = ys(d.r);
      const h = mk("circle", { cx: String(x), cy: String(y), r: "11", fill: "transparent", cursor: "crosshair" });
      h.addEventListener("mouseover", (e) => {
        if (ttpRef.current) ttpRef.current.textContent = d.m;
        if (ttrRef.current) ttrRef.current.textContent = d.r.toFixed(2) + "%";
        tt.style.display = "block";
        const rc = svg.getBoundingClientRect();
        let lft = e.clientX - rc.left + 18;
        const tp = e.clientY - rc.top + 18;
        if (lft + 185 > W) lft = e.clientX - rc.left - 195;
        tt.style.left = lft + "px";
        tt.style.top = tp + "px";
      });
      h.addEventListener("mouseout", () => { tt.style.display = "none"; });
      svg.appendChild(h);
    });
  }, []);

  return (
    <div style={{ fontFamily: "Calibri, Arial, sans-serif", color: "#3a3f4a" }}>
      {/* Title */}
      <div style={{ margin: "0 0 16px", borderLeft: "4px solid #2d5a2d", paddingLeft: 18 }}>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, fontWeight: "bold", color: "#1a1f2a", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
          10-Year Treasury Yield — <span style={{ color: "#155e75" }}>Converging Wedge</span>
        </div>
        <div style={{ fontSize: 12.5, color: "#3a3f4a", marginTop: 6, letterSpacing: "0.01em" }}>
          Weekly &middot; January 2022 – March 2026 &nbsp;&middot;&nbsp; Yield Testing Upper Resistance &nbsp;&middot;&nbsp; Potential Inflection Approaching
        </div>
      </div>

      {/* Chart */}
      <div style={{ background: "#f7f8fa", border: "1px solid rgba(45,90,45,0.3)", borderRadius: 14, padding: "28px 18px 16px", position: "relative" }}>
        <div
          ref={tooltipRef}
          style={{ position: "absolute", background: "rgba(15,20,32,0.97)", border: "1px solid rgba(45,90,45,0.5)", borderRadius: 9, padding: "9px 13px", pointerEvents: "none", display: "none", zIndex: 100, boxShadow: "0 4px 24px rgba(0,0,0,0.18)", minWidth: 170 }}
        >
          <div ref={ttpRef} style={{ fontSize: 9.5, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }} />
          <div ref={ttrRef} style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 22, fontWeight: "bold", color: "#4a9eba", margin: "3px 0 2px" }} />
        </div>
        <svg ref={svgRef} width="100%" viewBox="0 0 900 580" preserveAspectRatio="xMidYMid meet" />
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 18, marginTop: 12, paddingTop: 12, borderTop: "1px solid #e8e8e8", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a1f2a" }}>Key:</span>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 24, height: 2.5, background: "linear-gradient(90deg,#155e75,#4a9eba)", borderRadius: 2 }} />10-Yr UST Yield
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 24, height: 0, borderTop: "2px solid rgba(192,57,43,0.85)" }} />Resistance (Declining Highs)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 24, height: 0, borderTop: "2px solid rgba(192,57,43,0.55)" }} />Support (Rising Lows)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#c0392b" }} />Cycle Peak
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#2d5a2d" }} />Cycle Low
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#4a9eba" }} />Current
        </div>
      </div>

      {/* Footer note */}
      <div style={{ marginTop: 12, fontSize: 10.5, color: "#6b7a8d", lineHeight: 1.6 }}>
        Source: U.S. Treasury / Federal Reserve H.15. Monthly averages. Sep 2025–Mar 2026 approximate. Trendlines are analytical observations connecting pivot highs/lows; not investment advice. &copy; 2026 Sage Creek Group LLC.
      </div>
    </div>
  );
}
