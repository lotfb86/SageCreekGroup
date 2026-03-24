"use client";

import { useEffect, useRef } from "react";

/* ── rate data ── */
const data: { p: string; r: number; s: "a" | "d" }[] = [
  {p:'1989Q1',r:10.29,s:'a'},{p:'1989Q2',r:10.27,s:'a'},{p:'1989Q3',r:9.45,s:'a'},{p:'1989Q4',r:9.43,s:'a'},
  {p:'1990Q1',r:9.62,s:'a'},{p:'1990Q2',r:9.96,s:'a'},{p:'1990Q3',r:9.96,s:'a'},{p:'1990Q4',r:9.83,s:'a'},
  {p:'1991Q1',r:9.83,s:'a'},{p:'1991Q2',r:9.69,s:'a'},{p:'1991Q3',r:9.76,s:'a'},{p:'1991Q4',r:9.62,s:'a'},
  {p:'1992Q1',r:9.31,s:'a'},{p:'1992Q2',r:9.35,s:'a'},{p:'1992Q3',r:9.03,s:'a'},{p:'1992Q4',r:8.64,s:'a'},
  {p:'1993Q1',r:8.60,s:'a'},{p:'1993Q2',r:8.26,s:'a'},{p:'1993Q3',r:8.08,s:'a'},{p:'1993Q4',r:7.82,s:'a'},
  {p:'1994Q1',r:7.77,s:'a'},{p:'1994Q2',r:8.49,s:'a'},{p:'1994Q3',r:8.80,s:'a'},{p:'1994Q4',r:9.18,s:'a'},
  {p:'1995Q1',r:9.13,s:'a'},{p:'1995Q2',r:8.23,s:'a'},{p:'1995Q3',r:7.83,s:'a'},{p:'1995Q4',r:7.56,s:'a'},
  {p:'1996Q1',r:7.39,s:'a'},{p:'1996Q2',r:8.06,s:'a'},{p:'1996Q3',r:8.25,s:'a'},{p:'1996Q4',r:7.94,s:'a'},
  {p:'1997Q1',r:7.89,s:'a'},{p:'1997Q2',r:8.07,s:'a'},{p:'1997Q3',r:7.65,s:'a'},{p:'1997Q4',r:7.30,s:'a'},
  {p:'1998Q1',r:7.09,s:'a'},{p:'1998Q2',r:6.97,s:'a'},{p:'1998Q3',r:6.84,s:'a'},{p:'1998Q4',r:7.03,s:'a'},
  {p:'1999Q1',r:7.17,s:'a'},{p:'1999Q2',r:7.43,s:'a'},{p:'1999Q3',r:7.77,s:'a'},{p:'1999Q4',r:8.08,s:'a'},
  {p:'2000Q1',r:8.49,s:'a'},{p:'2000Q2',r:8.23,s:'a'},{p:'2000Q3',r:8.16,s:'a'},{p:'2000Q4',r:7.99,s:'a'},
  {p:'2001Q1',r:7.43,s:'a'},{p:'2001Q2',r:7.30,s:'a'},{p:'2001Q3',r:7.24,s:'a'},{p:'2001Q4',r:6.87,s:'a'},
  {p:'2002Q1',r:6.98,s:'a'},{p:'2002Q2',r:6.94,s:'a'},{p:'2002Q3',r:6.25,s:'a'},{p:'2002Q4',r:5.75,s:'a'},
  {p:'2003Q1',r:5.69,s:'a'},{p:'2003Q2',r:5.31,s:'a'},{p:'2003Q3',r:5.24,s:'a'},{p:'2003Q4',r:5.42,s:'a'},
  {p:'2004Q1',r:5.23,s:'a'},{p:'2004Q2',r:5.39,s:'a'},{p:'2004Q3',r:5.62,s:'a'},{p:'2004Q4',r:5.32,s:'a'},
  {p:'2005Q1',r:5.32,s:'a'},{p:'2005Q2',r:5.41,s:'a'},{p:'2005Q3',r:5.33,s:'a'},{p:'2005Q4',r:5.56,s:'a'},
  {p:'2006Q1',r:5.71,s:'a'},{p:'2006Q2',r:6.03,s:'a'},{p:'2006Q3',r:6.21,s:'a'},{p:'2006Q4',r:5.93,s:'a'},
  {p:'2007Q1',r:5.79,s:'a'},{p:'2007Q2',r:5.89,s:'a'},{p:'2007Q3',r:6.11,s:'a'},{p:'2007Q4',r:6.05,s:'a'},
  {p:'2008Q1',r:5.72,s:'a'},{p:'2008Q2',r:6.11,s:'a'},{p:'2008Q3',r:6.29,s:'a'},{p:'2008Q4',r:6.90,s:'a'},
  {p:'2009Q1',r:7.53,s:'a'},{p:'2009Q2',r:7.49,s:'a'},{p:'2009Q3',r:7.25,s:'a'},{p:'2009Q4',r:7.05,s:'a'},
  {p:'2010Q1',r:6.39,s:'a'},{p:'2010Q2',r:6.00,s:'a'},{p:'2010Q3',r:5.23,s:'a'},{p:'2010Q4',r:4.81,s:'a'},
  {p:'2011Q1',r:5.10,s:'a'},{p:'2011Q2',r:4.94,s:'a'},{p:'2011Q3',r:4.67,s:'a'},{p:'2011Q4',r:4.51,s:'a'},
  {p:'2012Q1',r:4.36,s:'a'},{p:'2012Q2',r:4.22,s:'a'},{p:'2012Q3',r:4.21,s:'a'},{p:'2012Q4',r:4.03,s:'a'},
  {p:'2013Q1',r:3.97,s:'a'},{p:'2013Q2',r:4.25,s:'a'},{p:'2013Q3',r:4.85,s:'a'},{p:'2013Q4',r:5.05,s:'a'},
  {p:'2014Q1',r:5.00,s:'a'},{p:'2014Q2',r:4.90,s:'a'},{p:'2014Q3',r:4.80,s:'a'},{p:'2014Q4',r:4.50,s:'a'},
  {p:'2015Q1',r:4.15,s:'a'},{p:'2015Q2',r:4.40,s:'a'},{p:'2015Q3',r:4.20,s:'a'},{p:'2015Q4',r:4.20,s:'a'},
  {p:'2016Q1',r:3.89,s:'d'},{p:'2016Q2',r:3.54,s:'d'},{p:'2016Q3',r:3.46,s:'d'},{p:'2016Q4',r:4.19,s:'d'},
  {p:'2017Q1',r:4.23,s:'d'},{p:'2017Q2',r:3.95,s:'d'},{p:'2017Q3',r:4.00,s:'d'},{p:'2017Q4',r:4.15,s:'d'},
  {p:'2018Q1',r:4.64,s:'d'},{p:'2018Q2',r:4.78,s:'d'},{p:'2018Q3',r:4.85,s:'d'},{p:'2018Q4',r:4.83,s:'d'},
  {p:'2019Q1',r:4.53,s:'d'},{p:'2019Q2',r:4.27,s:'d'},{p:'2019Q3',r:3.87,s:'d'},{p:'2019Q4',r:3.67,s:'d'},
  {p:'2020Q1',r:3.87,s:'d'},{p:'2020Q2',r:4.20,s:'d'},{p:'2020Q3',r:3.48,s:'d'},{p:'2020Q4',r:3.43,s:'d'},
  {p:'2021Q1',r:3.57,s:'d'},{p:'2021Q2',r:3.58,s:'d'},{p:'2021Q3',r:3.35,s:'d'},{p:'2021Q4',r:3.44,s:'d'},
  {p:'2022Q1',r:4.22,s:'d'},{p:'2022Q2',r:5.51,s:'d'},{p:'2022Q3',r:6.23,s:'d'},{p:'2022Q4',r:6.72,s:'d'},
  {p:'2023Q1',r:6.60,s:'d'},{p:'2023Q2',r:6.75,s:'d'},{p:'2023Q3',r:7.25,s:'d'},{p:'2023Q4',r:7.39,s:'d'},
  {p:'2024Q1',r:6.70,s:'d'},{p:'2024Q2',r:6.88,s:'d'},{p:'2024Q3',r:6.15,s:'d'},{p:'2024Q4',r:6.22,s:'d'},
  {p:'2025Q1',r:6.18,s:'d'},{p:'2025Q2',r:6.10,s:'d'},{p:'2025Q3',r:5.95,s:'d'},
  {p:'2026Q1',r:6.31,s:'d'},
];

const ctxMap: Record<string, string> = {
  '1989Q1':'S&L Crisis — peak of the high-inflation era',
  '1994Q4':'Fed hike cycle — bond market rout',
  '1998Q4':'LTCM / Russia default — credit spread widening',
  '2000Q1':'Tech bubble peak; CRE still well-priced',
  '2001Q4':'Post-9/11 Fed cuts begin',
  '2003Q2':'Historically low rates — at the time',
  '2007Q3':'Peak pre-GFC transaction volume',
  '2008Q4':'Lehman collapse — CMBS market freezes',
  '2009Q1':'GFC spread peak: +480 bps over UST',
  '2013Q1':'Post-GFC trough; zero-rate era commences',
  '2016Q3':'Briefly touch new lows',
  '2020Q2':'COVID shock — CRE lending largely frozen',
  '2021Q3':'All-time trough: 3.35%',
  '2022Q4':'Fastest Fed hike cycle since the 1980s',
  '2023Q4':'Current-cycle peak: 7.39%',
  '2025Q3':'Post-hike normalization · Near 36-year average',
  '2026Q1':'Rate spike · 10-Yr UST @ 4.41% · Geopolitical premium',
};

function mk(tag: string, a?: Record<string, string>) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
  if (a) for (const [k, v] of Object.entries(a)) e.setAttribute(k, v);
  return e;
}

export default function CommercialMortgageRatesChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ttpRef = useRef<HTMLDivElement>(null);
  const ttrRef = useRef<HTMLDivElement>(null);
  const ttcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const tt = tooltipRef.current;
    if (!svg || !tt) return;

    // Clear any previous render
    svg.innerHTML = "";

    const W = 1100, H = 420, p = { t: 44, r: 38, b: 52, l: 50 };
    const cW = W - p.l - p.r, cH = H - p.t - p.b, n = data.length;
    const mn = 3.0, mx = 11.0;
    const xs = (i: number) => p.l + (i / (n - 1)) * cW;
    const ys = (r: number) => p.t + cH - ((r - mn) / (mx - mn)) * cH;

    const defs = mk("defs");

    // Area gradient
    const ag = mk("linearGradient", { id: "cmr-ag", x1: "0", y1: "0", x2: "0", y2: "1" });
    [{ o: "0%", op: "0.18", c: "#155e75" }, { o: "100%", op: "0.01", c: "#155e75" }].forEach(({ o, op, c }) => {
      const s = mk("stop", { offset: o }); s.style.cssText = `stop-color:${c};stop-opacity:${op}`; ag.appendChild(s);
    });

    // Line gradient
    const lg = mk("linearGradient", { id: "cmr-lg", x1: "0", y1: "0", x2: "1", y2: "0" });
    [{ o: "0%", c: "#155e75" }, { o: "55%", c: "#1a7a96" }, { o: "100%", c: "#4a9eba" }].forEach(({ o, c }) => {
      const s = mk("stop", { offset: o }); s.style.cssText = `stop-color:${c}`; lg.appendChild(s);
    });

    defs.appendChild(ag); defs.appendChild(lg); svg.appendChild(defs);

    // Era bands
    [
      { f: "1989Q1", t: "1993Q4", l: "S&L / RECESSION", c: "rgba(192,57,43,0.07)" },
      { f: "1994Q1", t: "2000Q4", l: "GREAT MODERATION", c: "rgba(21,94,117,0.06)" },
      { f: "2001Q1", t: "2006Q4", l: "DOT-COM RECOVERY", c: "rgba(74,158,186,0.05)" },
      { f: "2007Q1", t: "2011Q4", l: "GFC & AFTERMATH", c: "rgba(192,57,43,0.08)" },
      { f: "2012Q1", t: "2021Q4", l: "ZERO-RATE ERA", c: "rgba(45,90,45,0.07)" },
      { f: "2022Q1", t: "2026Q1", l: "RATE RESET CYCLE", c: "rgba(74,158,186,0.07)" },
    ].forEach((e) => {
      const i1 = data.findIndex((d) => d.p === e.f);
      const i2 = data.findIndex((d) => d.p === e.t);
      if (i1 < 0 || i2 < 0) return;
      const x1 = xs(i1), x2 = xs(Math.min(i2, n - 1));
      svg.appendChild(mk("rect", { x: String(x1), y: String(p.t), width: String(x2 - x1), height: String(cH), fill: e.c }));
      const lb = mk("text", { x: String((x1 + x2) / 2), y: String(p.t - 11), "text-anchor": "middle", fill: "#1a1f2a", "font-size": "9", "font-weight": "900", "letter-spacing": "0.05em" });
      lb.textContent = e.l; svg.appendChild(lb);
    });

    // Grid lines
    [4, 5, 6, 7, 8, 9, 10].forEach((r) => {
      svg.appendChild(mk("line", { x1: String(p.l), y1: String(ys(r)), x2: String(p.l + cW), y2: String(ys(r)), stroke: "rgba(0,0,0,0.08)", "stroke-width": "1" }));
      const lb = mk("text", { x: String(p.l - 7), y: String(ys(r) + 4), "text-anchor": "end", fill: "#3a3f4a", "font-size": "11", "font-weight": "700" });
      lb.textContent = r + "%"; svg.appendChild(lb);
    });

    // 36-yr average line
    const avg = data.reduce((s, d) => s + d.r, 0) / data.length;
    svg.appendChild(mk("line", { x1: String(p.l), y1: String(ys(avg)), x2: String(p.l + cW), y2: String(ys(avg)), stroke: "rgba(26,31,42,0.25)", "stroke-width": "1.5", "stroke-dasharray": "5,4" }));
    const alb = mk("text", { x: String(p.l + cW + 4), y: String(ys(avg) + 4), fill: "#3a3f4a", "font-size": "9.5", "font-weight": "700" });
    alb.textContent = "36yr avg"; svg.appendChild(alb);

    // Area fill (actual section only)
    const ae = data.reduce((last, d, i) => (d.s === "a" ? i : last), 0);
    let ap = `M ${xs(0)} ${ys(data[0].r)}`;
    for (let i = 1; i <= ae; i++) ap += ` L ${xs(i)} ${ys(data[i].r)}`;
    ap += ` L ${xs(ae)} ${p.t + cH} L ${xs(0)} ${p.t + cH} Z`;
    svg.appendChild(mk("path", { d: ap, fill: "url(#cmr-ag)" }));

    // Actual line (teal gradient)
    let lp = `M ${xs(0)} ${ys(data[0].r)}`;
    for (let i = 1; i <= ae; i++) lp += ` L ${xs(i)} ${ys(data[i].r)}`;
    svg.appendChild(mk("path", { d: lp, fill: "none", stroke: "url(#cmr-lg)", "stroke-width": "2.5", "stroke-linejoin": "round", "stroke-linecap": "round" }));

    // Derived line (forest green dashed)
    let dp = `M ${xs(ae)} ${ys(data[ae].r)}`;
    for (let i = ae + 1; i < n; i++) dp += ` L ${xs(i)} ${ys(data[i].r)}`;
    svg.appendChild(mk("path", { d: dp, fill: "none", stroke: "#2d5a2d", "stroke-width": "2.5", "stroke-dasharray": "7,3", "stroke-linejoin": "round" }));

    // X axis year labels
    ["1989", "1992", "1995", "1998", "2001", "2004", "2007", "2010", "2013", "2016", "2019", "2022", "2025"].forEach((yr) => {
      const i = data.findIndex((d) => d.p === yr + "Q1");
      if (i < 0) return;
      const x = xs(i);
      svg.appendChild(mk("line", { x1: String(x), y1: String(p.t + cH), x2: String(x), y2: String(p.t + cH + 5), stroke: "rgba(0,0,0,0.1)", "stroke-width": "1" }));
      const lb = mk("text", { x: String(x), y: String(p.t + cH + 17), "text-anchor": "middle", fill: "#1a1f2a", "font-size": "11.5", "font-weight": "700" });
      lb.textContent = yr; svg.appendChild(lb);
    });

    // Key markers
    [
      { p: "1989Q1", c: "#e05c4b", lb: "Peak 10.29%", dy: -15, ta: "middle" },
      { p: "2009Q1", c: "#e05c4b", lb: "GFC Peak 7.53%", dy: -15, ta: "middle" },
      { p: "2021Q3", c: "#4aab4a", lb: "Trough 3.35%", dy: 19, ta: "middle" },
      { p: "2023Q4", c: "#4a9eba", lb: "Cycle Peak 7.39%", dy: -15, ta: "start" },
      { p: "2026Q1", c: "#4a9eba", lb: "Current ~6.3%", dy: -15, ta: "end" },
    ].forEach((m) => {
      const i = data.findIndex((d) => d.p === m.p);
      if (i < 0) return;
      const x = xs(i), y = ys(data[i].r);
      svg.appendChild(mk("circle", { cx: String(x), cy: String(y), r: "5", fill: m.c, stroke: "#ffffff", "stroke-width": "2" }));
      const lb = mk("text", { x: String(x), y: String(y + m.dy), "text-anchor": m.ta, fill: m.c, "font-size": "11", "font-weight": "800" });
      lb.textContent = m.lb; svg.appendChild(lb);
    });

    // Y axis label
    const yl = mk("text", { x: "12", y: String(p.t + cH / 2), "text-anchor": "middle", fill: "#3a3f4a", "font-size": "10.5", "font-weight": "700", transform: `rotate(-90,12,${p.t + cH / 2})` });
    yl.textContent = "INTEREST RATE"; svg.appendChild(yl);

    // Hover tooltips
    data.forEach((d, i) => {
      const x = xs(i), y = ys(d.r);
      const h = mk("circle", { cx: String(x), cy: String(y), r: "11", fill: "transparent", cursor: "crosshair" });
      h.addEventListener("mouseover", (e) => {
        if (ttpRef.current) ttpRef.current.textContent = d.p.replace("Q", " \u00b7 Q");
        if (ttrRef.current) ttrRef.current.textContent = d.r.toFixed(2) + "%";
        if (ttcRef.current) ttcRef.current.textContent = ctxMap[d.p] || (d.s === "d" ? "Derived: 10-Yr UST + calibrated CRE spread" : "");
        tt.style.display = "block";
        const rc = svg.getBoundingClientRect();
        let lft = e.clientX - rc.left + 18;
        const tp = e.clientY - rc.top + 18;
        if (lft + 220 > W) lft = e.clientX - rc.left - 230;
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
      <div style={{ margin: "20px 0 6px", borderLeft: "4px solid #2d5a2d", paddingLeft: 20 }}>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 34, fontWeight: "bold", color: "#1a1f2a", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
          37 Years of <span style={{ color: "#155e75" }}>Commercial Mortgage Rates</span>
        </div>
        <div style={{ fontSize: 13, color: "#3a3f4a", marginTop: 7, letterSpacing: "0.01em" }}>
          Permanent Financing &nbsp;&middot;&nbsp; Stabilized Investor Real Estate &nbsp;&middot;&nbsp; 10-Year Fixed Rate &nbsp;&middot;&nbsp; Quarterly &nbsp;&middot;&nbsp; 1989–Q1 2026
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: 13, margin: "20px 0", flexWrap: "wrap" }}>
        {[
          { label: "All-Time Peak", val: "10.29%", ctx: "Q1 1989 \u00b7 S&L Crisis & High-Inflation Era", color: "#c0392b", border: "#c0392b" },
          { label: "All-Time Trough", val: "3.35%", ctx: "Q3 2021 \u00b7 COVID Zero-Rate Environment", color: "#2d5a2d", border: "#2d5a2d" },
          { label: "Current Rate", val: "~6.3%", ctx: "Q1 2026 \u00b7 Rate Spike \u2014 10-Yr UST @ 4.41%", color: "#4a9eba", border: "#155e75" },
          { label: "36-Year Average", val: "6.21%", ctx: "2013\u20132021 was the anomaly \u00b7 Today is normal", color: "#1a7a96", border: "#4a9eba" },
        ].map((c) => (
          <div key={c.label} style={{ flex: 1, minWidth: 180, background: "#f7f8fa", border: "1px solid #e8e8e8", borderRadius: 10, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: c.border }} />
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3a3f4a", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 26, fontWeight: "bold", lineHeight: 1, color: c.color }}>{c.val}</div>
            <div style={{ fontSize: 11, color: "#3a3f4a", marginTop: 4, lineHeight: 1.4 }}>{c.ctx}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: "#f7f8fa", border: "1px solid rgba(45,90,45,0.3)", borderRadius: 14, padding: "30px 20px 18px", position: "relative" }}>
        <div
          ref={tooltipRef}
          style={{ position: "absolute", background: "rgba(15,20,32,0.97)", border: "1px solid rgba(45,90,45,0.5)", borderRadius: 9, padding: "10px 15px", pointerEvents: "none", display: "none", zIndex: 100, boxShadow: "0 4px 28px rgba(0,0,0,0.18)", minWidth: 195 }}
        >
          <div ref={ttpRef} style={{ fontSize: 9.5, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }} />
          <div ref={ttrRef} style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24, fontWeight: "bold", color: "#4a9eba", margin: "3px 0 2px", letterSpacing: "-0.01em" }} />
          <div ref={ttcRef} style={{ fontSize: 10.5, color: "#94a3b8", lineHeight: 1.4 }} />
        </div>
        <svg ref={svgRef} width="100%" viewBox="0 0 1100 420" preserveAspectRatio="xMidYMid meet" />
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginTop: 14, paddingTop: 14, borderTop: "1px solid #e8e8e8", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a1f2a" }}>Key:</span>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 24, height: 3, background: "linear-gradient(90deg,#155e75,#4a9eba)", borderRadius: 2 }} />Actual 1989–2015
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 24, height: 0, borderTop: "3px dashed #2d5a2d" }} />Derived 2016–Q1 2026
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 24, height: 0, borderTop: "2px dashed rgba(26,31,42,0.3)" }} />36-Yr Average (6.21%)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#c0392b" }} />All-Time Peak
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#4aab4a" }} />All-Time Trough
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1a1f2a" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#4a9eba" }} />Current / Cycle High
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 16, borderTop: "1px solid #e8e8e8", paddingTop: 14 }}>
        <div style={{ fontSize: 11, color: "#3a3f4a", lineHeight: 1.65 }}>
          <strong style={{ color: "#2d5a2d" }}>Data &amp; Methodology:</strong> Rates represent average 10-year fixed permanent financing for stabilized income-producing investor real estate — all property types combined. 1989–2015 sourced from Federal Reserve H.15 releases and ACLI mortgage survey data. 2016–Q1 2026 derived by applying historically-calibrated spreads to 10-Year US Treasury yields. &copy; 2026 Sage Creek Group LLC.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 10, flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#1a1f2a" }}>
            Want to know where your deal prices today? &nbsp;<strong style={{ color: "#155e75" }}>Call Tim: 208.755.4809</strong>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 11.5, fontStyle: "italic", color: "#8a8f9a", marginBottom: 3 }}>The Best Deal Is the One That Closes.</div>
            <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 11, fontWeight: "bold", color: "#2d5a2d", letterSpacing: "0.02em" }}>
              Sage Creek Group &nbsp;<span style={{ fontFamily: "Calibri, Arial, sans-serif", fontSize: 9, fontWeight: 400, color: "#6b7a8d" }}>sagecreekgroup.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
