import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

/* ─── Types ─── */
type RGB = [number, number, number];
interface Palette { [k: string]: RGB }

/* ─── Constants ─── */
const TAU = Math.PI * 2;
const MAX_NODES = 55;
const CONN_RECALC_MS = 150;
const DOUBLE_TAP_MS = 300;

const N_: Palette = {
  bg:[9,9,11], co:[255,255,255], ci:[18,22,38], cg:[170,195,255],
  ob:[255,255,255], nd:[255,255,255], ng:[170,195,255], cn:[200,215,255],
  ri:[190,205,235], edge:[120,140,180], st:[255,255,255], hl:[255,255,255],
};
const D_: Palette = {
  bg:[250,250,250], co:[168,165,162], ci:[240,238,236], cg:[192,190,188],
  ob:[212,212,212], nd:[178,178,180], ng:[148,148,150], cn:[168,168,170],
  ri:[188,188,190], edge:[155,153,150], st:[218,218,218], hl:[255,255,255],
};

const ORBITS = [
  { ar: .18, br: .065, tilt: -.30, sp: .00095 },
  { ar: .30, br: .11,  tilt: -.28, sp: .00078 },
  { ar: .44, br: .16,  tilt: -.26, sp: .00060 },
  { ar: .58, br: .21,  tilt: -.24, sp: .00045 },
  { ar: .72, br: .26,  tilt: -.22, sp: .00035 },
  { ar: .88, br: .32,  tilt: -.20, sp: .00025 },
  { ar:1.06, br: .38,  tilt: -.18, sp: .00017 },
  { ar:1.24, br: .45,  tilt: -.16, sp: .00011 },
];

const NODE_NAMES = [
  "认知共识","价值共识","情感共识","行为共识","文化共识","制度共识",
  "技术共识","生态共识","伦理共识","审美共识","知识共识","信仰共识",
  "协作共识","创新共识","秩序共识","自由共识","理性共识","直觉共识",
];

const NODES_PER_ORBIT = [1, 2, 3, 3, 2, 2, 1, 1];

/* ─── Helpers (pure, outside component) ─── */
const lerp = (a: RGB, b: RGB, p: number): RGB =>
  [(a[0] + (b[0] - a[0]) * p) | 0, (a[1] + (b[1] - a[1]) * p) | 0, (a[2] + (b[2] - a[2]) * p) | 0];

const rgba = (c: RGB, a?: number) =>
  a != null ? `rgba(${c[0]},${c[1]},${c[2]},${a})` : `rgb(${c[0]},${c[1]},${c[2]})`;

const rand = (lo: number, hi: number) => Math.random() * (hi - lo) + lo;
const dist = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x1 - x2, y1 - y2);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ─── Component ─── */
export function VisionGraphic() {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  const mtTargetRef = useRef(resolvedTheme === "light" ? 0 : 1);
  const setThemeRef = useRef(setTheme);

  useEffect(() => { mtTargetRef.current = resolvedTheme === "light" ? 0 : 1; }, [resolvedTheme]);
  useEffect(() => { setThemeRef.current = setTheme; }, [setTheme]);

  const onVisible = useCallback(([e]: IntersectionObserverEntry[]) => {
    if (e.isIntersecting) setStarted(true);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(onVisible, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onVisible]);

  /* ─── Main animation effect ─── */
  useEffect(() => {
    if (!started) return;
    const cvs = canvasRef.current;
    const wrap = containerRef.current;
    if (!cvs || !wrap) return;
    const ctx = cvs.getContext("2d", { alpha: false });
    if (!ctx) return;

    const isTouch = "ontouchstart" in window;
    const dpr = Math.min(devicePixelRatio || 1, isTouch ? 2 : 2);
    let W = 0, H = 0, cx = 0, cy = 0, t = 0;
    let sf = 1; // scale factor, recalculated on resize
    let mt = mtTargetRef.current;
    let bgMt = mtTargetRef.current;
    const mouse = { x: -9e3, y: -9e3 };
    let hoverIdx: number | null = null;
    let animId = 0;
    let tiltX = 0, tiltY = 0;

    const gc = (k: string) => lerp(N_[k], D_[k], 1 - mt);

    /* ─── Canvas coords from event ─── */
    function canvasXY(e: MouseEvent | Touch) {
      const r = cvs.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
    }

    /* ─── Orbits ─── */
    function orb(i: number) {
      const base = Math.min(W, H) * .38;
      const d = ORBITS[i];
      return { a: base * d.ar, b: base * d.br * (1 + tiltY * .6), tilt: d.tilt + tiltX, sp: d.sp };
    }
    function orbPos(i: number, ang: number) {
      const o = orb(i);
      const cosA = Math.cos(ang), sinA = Math.sin(ang);
      const cosT = Math.cos(o.tilt), sinT = Math.sin(o.tilt);
      return {
        x: cx + o.a * cosA * cosT - o.b * sinA * sinT,
        y: cy + o.a * cosA * sinT + o.b * sinA * cosT,
      };
    }

    /* ─── Stars (pre-rendered to offscreen canvas for perf) ─── */
    type Star = { x: number; y: number; sz: number; br: number; ts: number; tp: number };
    let stars: Star[] = [];
    let starCanvas: OffscreenCanvas | HTMLCanvasElement | null = null;
    let starCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;

    function mkStars() {
      const density = isTouch ? 2200 : 1400;
      const n = clamp((W * H / density) | 0, 60, 600);
      stars = [];
      for (let i = 0; i < n; i++) {
        stars.push({
          x: rand(0, W), y: rand(0, H),
          sz: rand(.3, 1.2), br: rand(.1, .5),
          ts: rand(.004, .016), tp: rand(0, TAU),
        });
      }
      try {
        starCanvas = new OffscreenCanvas(W * dpr, H * dpr);
        starCtx = starCanvas.getContext("2d");
      } catch {
        starCanvas = document.createElement("canvas");
        starCanvas.width = W * dpr; starCanvas.height = H * dpr;
        starCtx = starCanvas.getContext("2d");
      }
    }

    let starsDirty = true;
    function renderStarsToCache() {
      if (!starCtx || !starCanvas) return;
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      starCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sc = gc("st");
      const nb = bgMt * .2;
      for (const s of stars) {
        const tw = Math.sin(t * s.ts + s.tp) * .3 + .7;
        const a = clamp((s.br * tw + nb) * .75, 0, 1);
        starCtx.fillStyle = rgba(sc, a);
        starCtx.fillRect(s.x, s.y, s.sz, s.sz);
      }
      starsDirty = false;
    }

    function drawStars() {
      if (starsDirty || Math.abs(bgMt - mt) > .01) renderStarsToCache();
      if (starCanvas) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(starCanvas as any, 0, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.restore();
      }
    }

    /* ─── Ambient particles ─── */
    type Amb = { x: number; y: number; vx: number; vy: number; sz: number; al: number };
    let amb: Amb[] = [];
    function mkAmb() {
      const n = isTouch ? 12 : 25;
      amb = [];
      for (let i = 0; i < n; i++) {
        amb.push({
          x: rand(0, W), y: rand(0, H),
          vx: rand(-.08, .08), vy: rand(-.08, .08),
          sz: rand(.3, .8), al: rand(.02, .05),
        });
      }
    }

    /* ─── Nodes ─── */
    type Nd = {
      id: number; oi: number; ang: number; sz: number; name: string;
      cv: number; hasRing: boolean; ringSz: number; ringTilt: number;
      pp: number; op: number; delay: number;
    };
    let nodes: Nd[] = [], nid = 0;
    type Fx = { x: number; y: number; vx: number; vy: number; life: number; dec: number; sz: number };
    let fx: Fx[] = [];
    type Rip = { x: number; y: number; r: number; life: number };
    let ripples: Rip[] = [];

    function mkNode(oi: number, ang?: number, sz?: number, name?: string | null, delay?: number) {
      if (nodes.length >= MAX_NODES) return null;
      const nd: Nd = {
        id: nid++, oi,
        ang: ang ?? rand(0, TAU),
        sz: sz || rand(2.8, 5.5) * sf,
        name: name || NODE_NAMES[(Math.random() * NODE_NAMES.length) | 0],
        cv: Math.random(),
        hasRing: Math.random() > .72,
        ringSz: rand(1.6, 2.6), ringTilt: rand(-.5, .5),
        pp: rand(0, TAU), op: 0, delay: delay || 0,
      };
      nodes.push(nd);
      return nd;
    }

    function spawnFx(nd: Nd) {
      const p = orbPos(nd.oi, nd.ang);
      const count = isTouch ? 5 : 8;
      for (let i = 0; i < count; i++) {
        const a = (TAU / count) * i;
        fx.push({
          x: p.x, y: p.y,
          vx: Math.cos(a) * rand(.5, 1.8), vy: Math.sin(a) * rand(.5, 1.8),
          life: 1, dec: rand(.015, .04), sz: rand(.8, 2) * sf,
        });
      }
    }

    /* ─── Connections ─── */
    type Conn = { a: number; b: number; s: number };
    let conns: Conn[] = [];
    function calcConns() {
      conns = [];
      const md = Math.max(70, 130 * sf);
      const vis: { i: number; x: number; y: number }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].op > .3) {
          const p = orbPos(nodes[i].oi, nodes[i].ang);
          vis.push({ i, x: p.x, y: p.y });
        }
      }
      for (let i = 0; i < vis.length; i++) {
        for (let j = i + 1; j < vis.length; j++) {
          const d = dist(vis[i].x, vis[i].y, vis[j].x, vis[j].y);
          if (d < md && d > 8 * sf) {
            const s = 1 - Math.abs(nodes[vis[i].i].cv - nodes[vis[j].i].cv);
            if (s > .45) conns.push({ a: vis[i].i, b: vis[j].i, s: s * (1 - d / md) });
          }
        }
      }
    }

    /* ─── Draw: Background ─── */
    function drawBg() {
      const bg = lerp(N_.bg, D_.bg, 1 - bgMt);
      ctx.fillStyle = rgba(bg);
      ctx.fillRect(0, 0, W, H);
      const cg = gc("cg");
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * .48);
      g.addColorStop(0, rgba(cg, .03 + (1 - mt) * .006));
      g.addColorStop(.35, rgba(cg, .006 + (1 - mt) * .002));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function orbitPt(o: { a: number; b: number; tilt: number }, ang: number) {
      const cosA = Math.cos(ang), sinA = Math.sin(ang);
      const cosT = Math.cos(o.tilt), sinT = Math.sin(o.tilt);
      return {
        x: cx + o.a * cosA * cosT - o.b * sinA * sinT,
        y: cy + o.a * cosA * sinT + o.b * sinA * cosT,
      };
    }

    function drawOrbitGrid() {
      const oc = gc("ob");
      const lightF = 1 - mt;
      const gridAlpha = .025 + mt * .015 + lightF * .06;
      const gridCount = isTouch ? 24 : 36;
      ctx.strokeStyle = rgba(oc, gridAlpha);
      ctx.lineWidth = Math.max(.15, .2 * sf);
      for (let ai = 0; ai < gridCount; ai++) {
        const ang = (TAU / gridCount) * ai;
        ctx.beginPath();
        let first = true;
        for (let oi = 0; oi < ORBITS.length; oi++) {
          const o = orb(oi);
          const p = orbitPt(o, ang);
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    }

    function drawVignette() {
      if (bgMt < .05) return;
      const bg = gc("bg");
      const g = ctx.createRadialGradient(cx, cy, Math.min(W, H) * .25, cx, cy, Math.max(W, H) * .8);
      g.addColorStop(0, rgba(bg, 0));
      g.addColorStop(1, rgba(bg, bgMt * .55));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function drawOrbits() {
      const oc = gc("ob");
      const step = isTouch ? .04 : .02;
      for (let i = 0; i < ORBITS.length; i++) {
        const o = orb(i);
        ctx.beginPath();
        for (let a = 0; a <= TAU + step; a += step) {
          const cosA = Math.cos(a), sinA = Math.sin(a);
          const x = cx + o.a * cosA * Math.cos(o.tilt) - o.b * sinA * Math.sin(o.tilt);
          const y = cy + o.a * cosA * Math.sin(o.tilt) + o.b * sinA * Math.cos(o.tilt);
          a < step ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        const lightF = 1 - mt;
        ctx.strokeStyle = rgba(oc, .04 + mt * .025 + lightF * .08);
        ctx.lineWidth = Math.max(.3, .45 * sf);
        ctx.stroke();
      }
    }

    /* ─── Draw: Connections ─── */
    function drawConns() {
      const cc = gc("cn");
      const lightF = 1 - mt;
      for (const cn of conns) {
        const pi = orbPos(nodes[cn.a].oi, nodes[cn.a].ang);
        const pj = orbPos(nodes[cn.b].oi, nodes[cn.b].ang);
        const al = cn.s * (.18 + lightF * .35) * Math.min(nodes[cn.a].op, nodes[cn.b].op);
        const pulse = Math.sin(t * .003 + cn.a * .7) * .15 + .85;
        const mx = (pi.x + pj.x) / 2, my = (pi.y + pj.y) / 2;
        const dx = cx - mx, dy = cy - my;
        const lw = Math.max(.3, cn.s * (.7 + lightF * .3) * sf);
        ctx.beginPath();
        ctx.moveTo(pi.x, pi.y);
        ctx.quadraticCurveTo(mx + dx * .18, my + dy * .18, pj.x, pj.y);
        ctx.strokeStyle = rgba(cc, al * pulse);
        ctx.lineWidth = lw;
        ctx.stroke();
        if (lightF > .3) {
          const da = al * pulse * .35;
          const dotR = Math.max(.8, lw * 1.2);
          ctx.beginPath(); ctx.arc(pi.x, pi.y, dotR, 0, TAU);
          ctx.fillStyle = rgba(cc, da); ctx.fill();
          ctx.beginPath(); ctx.arc(pj.x, pj.y, dotR, 0, TAU);
          ctx.fillStyle = rgba(cc, da); ctx.fill();
        }
      }
    }

    /* ─── Draw: Core (golden sun) ─── */
    function drawCore() {
      const br = Math.sin(t * .0015) * .03 + 1;
      const R = Math.max(12, 22 * sf);
      const glowA = .06 + mt * .06;
      let g: CanvasGradient;

      g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 9 * br);
      g.addColorStop(0, `rgba(255,175,55,${glowA})`);
      g.addColorStop(.12, `rgba(255,145,35,${glowA * .45})`);
      g.addColorStop(.35, `rgba(255,110,15,${glowA * .12})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 9 * br, 0, TAU); ctx.fill();

      g = ctx.createRadialGradient(cx, cy, R * .7, cx, cy, R * 2.8 * br);
      g.addColorStop(0, "rgba(255,200,80,.22)");
      g.addColorStop(.25, "rgba(255,160,40,.08)");
      g.addColorStop(.6, "rgba(255,120,20,.015)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 2.8 * br, 0, TAU); ctx.fill();

      const hx = cx - R * .22, hy = cy - R * .22;
      g = ctx.createRadialGradient(hx, hy, 0, cx, cy, R);
      g.addColorStop(0, "rgba(255,242,195,1)");
      g.addColorStop(.12, "rgba(255,218,100,1)");
      g.addColorStop(.32, "rgba(255,188,55,1)");
      g.addColorStop(.58, "rgba(248,152,30,1)");
      g.addColorStop(.82, "rgba(225,118,18,.95)");
      g.addColorStop(1, "rgba(200,90,12,.85)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();

      const sx = cx - R * .26, sy = cy - R * .28;
      g = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * .4);
      g.addColorStop(0, "rgba(255,255,240,.65)");
      g.addColorStop(.3, "rgba(255,250,220,.2)");
      g.addColorStop(1, "rgba(255,245,200,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, R * .4, 0, TAU); ctx.fill();

      g = ctx.createRadialGradient(cx, cy, R * .88, cx, cy, R * 1.12);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(.5, "rgba(255,190,70,.06)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.12, 0, TAU); ctx.fill();
    }

    /* ─── Draw: Nodes ─── */
    function drawNodes() {
      const nc = gc("nd"), ng = gc("ng"), rc = gc("ri"), hl = gc("hl");
      const buf: { nd: Nd; i: number; x: number; y: number }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        if (t < nodes[i].delay) continue;
        const p = orbPos(nodes[i].oi, nodes[i].ang);
        buf.push({ nd: nodes[i], i, x: p.x, y: p.y });
      }
      buf.sort((a, b) => a.y - b.y);

      const dr = 350 * sf;
      const lightF = 1 - mt;

      for (const { nd, i, x, y } of buf) {
        nd.op = Math.min(1, nd.op + .018);
        const al = nd.op;
        const df = .55 + (y - (cy - dr * .5)) / dr * .45;
        const cdf = clamp(df, .45, 1.25);
        let sz = nd.sz * cdf;
        sz = Math.max(.6, sz * (Math.sin(t * .004 + nd.pp) * .14 + 1));
        const isH = hoverIdx === i;
        if (isH) sz *= 1.5;

        const R = Math.max(.5, sz);
        let g: CanvasGradient;

        if (lightF > .3) {
          const sh = R * 1.8;
          const shx = x + R * .25, shy = y + R * .35;
          g = ctx.createRadialGradient(shx, shy, R * .3, shx, shy, sh);
          g.addColorStop(0, rgba(ng, .12 * lightF * al));
          g.addColorStop(.5, rgba(ng, .04 * lightF * al));
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(shx, shy, sh, 0, TAU); ctx.fill();
        } else {
          const gs = Math.max(1, sz * 4);
          g = ctx.createRadialGradient(x, y, 0, x, y, gs);
          g.addColorStop(0, rgba(ng, .22 * al));
          g.addColorStop(.45, rgba(ng, .025 * al));
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, gs, 0, TAU); ctx.fill();
        }

        const hx = x - R * .28, hy = y - R * .28;
        const edgeDk: RGB = [
          Math.max(0, nc[0] - 35) | 0,
          Math.max(0, nc[1] - 30) | 0,
          Math.max(0, nc[2] - 15) | 0,
        ];
        g = ctx.createRadialGradient(hx, hy, 0, x, y, R);
        g.addColorStop(0, rgba(hl, al * (.4 + lightF * .55)));
        g.addColorStop(.25, rgba(nc, al * .95));
        g.addColorStop(.7, rgba(lerp(nc, edgeDk, lightF * .6), al * .9));
        g.addColorStop(1, rgba(edgeDk, al * (.5 + lightF * .35)));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill();

        if (lightF > .3) {
          const rx = x - R * .3, ry = y - R * .32;
          const hr = R * .55;
          g = ctx.createRadialGradient(rx, ry, 0, rx, ry, hr);
          g.addColorStop(0, rgba([255, 255, 255], al * .85 * lightF));
          g.addColorStop(.5, rgba([255, 255, 255], al * .15 * lightF));
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(rx, ry, hr, 0, TAU); ctx.fill();

          ctx.beginPath(); ctx.arc(x, y, R, 0, TAU);
          ctx.strokeStyle = rgba(edgeDk, al * .12 * lightF);
          ctx.lineWidth = .5; ctx.stroke();
        } else {
          g = ctx.createRadialGradient(x - R * .2, y - R * .2, 0, x, y, R * .5);
          g.addColorStop(0, rgba(hl, al * .65));
          g.addColorStop(.3, rgba(hl, al * .12));
          g.addColorStop(1, rgba(hl, 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R * .5, 0, TAU); ctx.fill();
        }

        if (nd.hasRing && sz > 2) {
          ctx.beginPath(); ctx.ellipse(x, y, sz * nd.ringSz, sz * .35, nd.ringTilt, 0, TAU);
          ctx.strokeStyle = rgba(rc, al * (.22 + lightF * .12));
          ctx.lineWidth = Math.max(.3, .4 * sf); ctx.stroke();
        }
        if (isH) {
          ctx.beginPath(); ctx.arc(x, y, sz * 3, 0, TAU);
          ctx.strokeStyle = rgba(nc, .15); ctx.lineWidth = Math.max(.3, .4 * sf);
          ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);
        }
      }
    }

    /* ─── Draw: Effects ─── */
    function drawFx() {
      const nc = gc("nd");
      let j = 0;
      for (let i = 0; i < fx.length; i++) {
        const p = fx[i];
        p.x += p.vx; p.y += p.vy; p.vx *= .97; p.vy *= .97; p.life -= p.dec;
        if (p.life > 0) {
          ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(.2, p.sz * p.life), 0, TAU);
          ctx.fillStyle = rgba(nc, p.life * .45); ctx.fill();
          fx[j++] = p;
        }
      }
      fx.length = j;
    }

    function drawRipples() {
      const nc = gc("nd");
      let j = 0;
      for (let i = 0; i < ripples.length; i++) {
        const r = ripples[i]; r.r += 1.8 * sf; r.life -= .014;
        if (r.life > 0) {
          ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, TAU);
          ctx.strokeStyle = rgba(nc, r.life * .25); ctx.lineWidth = .5 * sf; ctx.stroke();
          ripples[j++] = r;
        }
      }
      ripples.length = j;
    }

    function drawAmb() {
      const nc = gc("nd");
      for (const p of amb) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.sz * sf, 0, TAU);
        ctx.fillStyle = rgba(nc, p.al * (.25 + mt * .65)); ctx.fill();
      }
    }

    /* ─── Update ─── */
    function updateNodes() {
      for (const nd of nodes) {
        if (t < nd.delay) continue;
        nd.ang += orb(nd.oi).sp;
        if (nd.ang > TAU) nd.ang -= TAU;
      }
    }

    /* ─── Interaction helpers ─── */
    function findNode(mx: number, my: number) {
      let best: number | null = null, bestD = 1e9;
      const hitPad = isTouch ? 22 : 10;
      for (let i = 0; i < nodes.length; i++) {
        if (t < nodes[i].delay) continue;
        const p = orbPos(nodes[i].oi, nodes[i].ang);
        const d = dist(mx, my, p.x, p.y);
        const hr = Math.max(hitPad, nodes[i].sz * 3);
        if (d < hr && d < bestD) { best = i; bestD = d; }
      }
      return best;
    }

    function closeOrb(mx: number, my: number) {
      const d = dist(mx, my, cx, cy);
      let best = 0, bestD = 1e9;
      for (let i = 0; i < ORBITS.length; i++) {
        const od = Math.abs(d - orb(i).a * .72);
        if (od < bestD) { bestD = od; best = i; }
      }
      return best;
    }

    function toggleSiteTheme() {
      const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
      const apply = () => setThemeRef.current(next);
      if (document.startViewTransition) document.startViewTransition(apply);
      else apply();
    }

    function handleTap(tx: number, ty: number) {
      const coreR = Math.max(12, 22 * sf);
      if (dist(tx, ty, cx, cy) < coreR + 8) { toggleSiteTheme(); return; }
      if (findNode(tx, ty) !== null) return;
      if (nodes.length >= MAX_NODES) return;
      const oi = closeOrb(tx, ty);
      const nd = mkNode(oi, Math.atan2(ty - cy, tx - cx), rand(2.5, 5) * sf);
      if (nd) { spawnFx(nd); ripples.push({ x: tx, y: ty, r: 0, life: 1 }); }
    }

    function handleDoubleTap(tx: number, ty: number) {
      const idx = findNode(tx, ty);
      if (idx === null || nodes.length >= MAX_NODES - 2) return;
      const nd = nodes[idx], p = orbPos(nd.oi, nd.ang);
      const nOi = clamp(nd.oi + (Math.random() > .5 ? 1 : -1), 0, ORBITS.length - 1);
      for (let k = 0; k < 2; k++) {
        const ch = mkNode(nOi, nd.ang + rand(-.35, .35), nd.sz * rand(.45, .72), nd.name);
        if (ch) ch.cv = clamp(nd.cv + rand(-.18, .18), 0, 1);
      }
      nd.sz *= .6;
      ripples.push({ x: p.x, y: p.y, r: 0, life: 1 });
      ripples.push({ x: p.x, y: p.y, r: 0, life: .6 });
      const burstCount = isTouch ? 8 : 16;
      for (let i = 0; i < burstCount; i++) {
        const a = rand(0, TAU), sp = rand(.8, 3.5);
        fx.push({
          x: p.x, y: p.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: 1, dec: rand(.008, .025), sz: rand(.8, 2.5) * sf,
        });
      }
    }

    /* ─── Event handlers ─── */
    function onMouseMove(e: MouseEvent) {
      const pos = canvasXY(e);
      mouse.x = pos.x; mouse.y = pos.y;
      hoverIdx = findNode(mouse.x, mouse.y);
      const coreR = Math.max(12, 22 * sf);
      cvs.style.cursor = hoverIdx !== null ? "pointer"
        : dist(mouse.x, mouse.y, cx, cy) < coreR + 8 ? "pointer" : "crosshair";
    }

    function onClick(e: MouseEvent) {
      const pos = canvasXY(e);
      handleTap(pos.x, pos.y);
    }

    function onDblClick(e: MouseEvent) {
      e.preventDefault();
      const pos = canvasXY(e);
      handleDoubleTap(pos.x, pos.y);
    }

    function onMouseLeave() {
      mouse.x = -9e3; mouse.y = -9e3; hoverIdx = null;
    }

    /* ─── Touch: double-tap detection ─── */
    let lastTapTime = 0;
    let lastTapPos = { x: 0, y: 0 };

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        const pos = canvasXY(e.touches[0]);
        mouse.x = pos.x; mouse.y = pos.y;
        hoverIdx = findNode(mouse.x, mouse.y);
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 1) {
        const pos = canvasXY(e.touches[0]);
        mouse.x = pos.x; mouse.y = pos.y;
      }
    }

    function onTouchEnd(e: TouchEvent) {
      if (e.changedTouches.length !== 1) return;
      const pos = canvasXY(e.changedTouches[0]);
      const now = performance.now();
      const tapDist = dist(pos.x, pos.y, lastTapPos.x, lastTapPos.y);

      if (now - lastTapTime < DOUBLE_TAP_MS && tapDist < 30 * sf) {
        handleDoubleTap(pos.x, pos.y);
        lastTapTime = 0;
      } else {
        handleTap(pos.x, pos.y);
        lastTapTime = now;
        lastTapPos = { x: pos.x, y: pos.y };
      }
      mouse.x = -9e3; mouse.y = -9e3;
      hoverIdx = null;
    }

    cvs.addEventListener("mousemove", onMouseMove);
    cvs.addEventListener("click", onClick);
    cvs.addEventListener("dblclick", onDblClick);
    cvs.addEventListener("mouseleave", onMouseLeave);
    cvs.addEventListener("touchstart", onTouchStart, { passive: true });
    cvs.addEventListener("touchmove", onTouchMove, { passive: true });
    cvs.addEventListener("touchend", onTouchEnd);

    /* ─── Resize (deferred to animation frame to prevent flicker) ─── */
    let needsResize = true;

    function applyResize() {
      const rect = wrap.getBoundingClientRect();
      W = rect.width; H = rect.height;
      cvs.width = W * dpr; cvs.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      sf = clamp(Math.min(W, H) / 520, .45, 1.8);
      starsDirty = true;
      mkStars(); mkAmb();
      needsResize = false;
    }

    const ro = new ResizeObserver(() => { needsResize = true; });
    ro.observe(wrap);

    /* ─── Init ─── */
    applyResize();
    let dl = 500;
    for (let oi = 0; oi < ORBITS.length; oi++) {
      for (let i = 0; i < NODES_PER_ORBIT[oi]; i++) {
        mkNode(oi, (TAU / NODES_PER_ORBIT[oi]) * i + rand(-.2, .2), rand(2.5, 5.5) * sf, null, dl);
        dl += 100;
      }
    }

    /* ─── Main loop ─── */
    let lastConn = 0;
    function loop(ts: number) {
      t = ts || 0;
      if (needsResize) applyResize();
      bgMt = mtTargetRef.current;
      mt = mtTargetRef.current;

      const MAX_TILT = .12;
      const mouseActive = mouse.x > -1e3;
      const targetTiltX = mouseActive ? ((mouse.x - cx) / (W || 1)) * MAX_TILT : 0;
      const targetTiltY = mouseActive ? ((mouse.y - cy) / (H || 1)) * MAX_TILT : 0;
      tiltX += (targetTiltX - tiltX) * .045;
      tiltY += (targetTiltY - tiltY) * .045;

      updateNodes();
      if (t - lastConn > CONN_RECALC_MS) { calcConns(); lastConn = t; }

      ctx.clearRect(0, 0, W, H);
      drawBg();
      drawOrbits();
      drawOrbitGrid();
      drawStars();
      drawAmb();
      drawVignette();
      drawConns();
      drawCore();
      drawNodes();
      drawRipples();
      drawFx();

      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      cvs.removeEventListener("mousemove", onMouseMove);
      cvs.removeEventListener("click", onClick);
      cvs.removeEventListener("dblclick", onDblClick);
      cvs.removeEventListener("mouseleave", onMouseLeave);
      cvs.removeEventListener("touchstart", onTouchStart);
      cvs.removeEventListener("touchmove", onTouchMove);
      cvs.removeEventListener("touchend", onTouchEnd);
    };
  }, [started]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Top gradient fade – blends with page background */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 sm:h-32 md:h-40"
        style={{
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
        }}
      />
      <div className="w-full relative">
        <div
          ref={containerRef}
          className="w-full"
          style={{ minHeight: "clamp(360px, 50vh, 640px)" }}
        >
          <canvas
            ref={canvasRef}
            className="block w-full h-full"
            style={{ cursor: "crosshair", touchAction: "manipulation" }}
          />
        </div>
        <p
          className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center text-xs sm:text-sm text-muted-foreground/50 tracking-widest z-10"
          style={{ opacity: started ? 1 : 0, transition: "opacity 1.5s ease 0.5s" }}
        >
          {t("home.visionSlogan")}
        </p>
      </div>
    </section>
  );
}
