import { useEffect, useRef, useCallback } from "react";
import { useThemeTransition } from "../context/ThemeTransitionContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type Star = {
    x: number; y: number;
    radius: number;
    baseOpacity: number;
    phase: number;   // sine-wave offset for pulsing
    speed: number;   // pulse frequency (rad/s)
};

type Meteor = {
    sx: number; sy: number;  // logical-pixel start position
    tailLen: number;
    spd: number;             // px/s
    width: number;
    progress: number;        // px traveled along trajectory
    maxTravel: number;
    waiting: number;         // seconds until (re)activate — counts down
    waitFor: number;         // reset delay after each pass
};

// ─── Meteor trajectory (matches original CSS: rotate(215deg) translateX) ──────

const ANGLE = 35 * (Math.PI / 180); // Equivalent to rotate(215deg) moving in negative X direction
const COS_A = Math.cos(ANGLE); // ≈ 0.819
const SIN_A = Math.sin(ANGLE); // ≈ 0.574

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MAX_STARS    = 150;
const METEOR_COUNT = 8;

function makeStars(w: number, h: number): Star[] {
    const n = Math.min(Math.floor((w * h) / 6000), MAX_STARS);
    return Array.from({ length: n }, () => ({
        x:           Math.random() * w,
        y:           Math.random() * h,
        radius:      Math.random() * 1.5 + 0.3,
        baseOpacity: Math.random() * 0.4 + 0.4,
        phase:       Math.random() * Math.PI * 2,
        speed:       0.3 + Math.random() * 0.7,
    }));
}

function makeMeteors(w: number, h: number): Meteor[] {
    return Array.from({ length: METEOR_COUNT }, (_, i) => ({
        sx:        w * (0.05 + (i / METEOR_COUNT) * 0.8),
        sy:        h * (0.02  + Math.random() * 0.22),
        tailLen:   60 + Math.random() * 80,
        spd:       150 + Math.random() * 100,
        width:     1   + Math.random() * 2,
        progress:  0,
        maxTravel: 700 + Math.random() * 200,
        waiting:   i * 2,           // stagger initial start
        waitFor:   1.5 + Math.random() * 2.5,
    }));
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Key optimization: ONE <canvas> replaces 150 DOM elements.
// No individual GPU compositing layers; no CSS animation state per star.
// The RAF loop uses refs exclusively — no React state updates mid-animation.

export const StarBackground = () => {
    const canvasRef  = useRef<HTMLCanvasElement>(null);
    const starsRef   = useRef<Star[]>([]);
    const meteorsRef = useRef<Meteor[]>([]);
    const rafRef     = useRef<number>(0);
    const lastRef    = useRef<number>(0);

    // Current and target star-field visibility (0 = hidden/light, 1 = visible/dark)
    const visRef    = useRef<number>(
        document.documentElement.classList.contains("dark") ? 1 : 0
    );
    const targetRef = useRef<number>(visRef.current);

    const { isTransitioning, direction } = useThemeTransition();

    // Sync visibility target when a theme transition starts
    useEffect(() => {
        if (isTransitioning) {
            targetRef.current = direction === "to-light" ? 0 : 1;
        }
    }, [isTransitioning, direction]);

    // (Re)initialise canvas size and generate scene data
    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const lw  = window.innerWidth;
        const lh  = window.innerHeight;

        // Setting width/height resets the context state (clears transforms, etc.)
        canvas.width  = lw * dpr;
        canvas.height = lh * dpr;
        canvas.style.width  = `${lw}px`;
        canvas.style.height = `${lh}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr); // draw in logical pixels from here on

        starsRef.current   = makeStars(lw, lh);
        meteorsRef.current = makeMeteors(lw, lh);
    }, []);

    // Mount init + debounced resize
    useEffect(() => {
        init();
        let timer: ReturnType<typeof setTimeout>;
        const onResize = () => { clearTimeout(timer); timer = setTimeout(init, 250); };
        window.addEventListener("resize", onResize, { passive: true });
        return () => { window.removeEventListener("resize", onResize); clearTimeout(timer); };
    }, [init]);

    // Animation loop — runs once, reads everything via refs
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const loop = (now: number) => {
            // Pause rendering when tab is hidden
            if (document.hidden) { lastRef.current = now; rafRef.current = requestAnimationFrame(loop); return; }

            const dt = Math.min((now - lastRef.current) / 1000, 0.1); // seconds, capped
            lastRef.current = now;

            // Tween visibility (3× speed factor → ~0.33s to fully transition)
            const cur = visRef.current, tgt = targetRef.current;
            visRef.current = Math.abs(cur - tgt) < 0.002 ? tgt : cur + (tgt - cur) * Math.min(dt * 3, 1);

            const vis = visRef.current;
            const lw  = canvas.width  / (window.devicePixelRatio || 1);
            const lh  = canvas.height / (window.devicePixelRatio || 1);
            const t   = now / 1000;

            ctx.clearRect(0, 0, lw, lh);

            if (vis < 0.005) { rafRef.current = requestAnimationFrame(loop); return; }

            // ── Stars ──────────────────────────────────────────────────────────
            for (const s of starsRef.current) {
                const pulse = Math.sin(t * s.speed + s.phase) * 0.25 + 0.75; // 0.5–1.0
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${+(s.baseOpacity * pulse * vis).toFixed(3)})`;
                ctx.fill();
            }

            // ── Meteors ────────────────────────────────────────────────────────
            for (const m of meteorsRef.current) {
                if (m.waiting > 0) { m.waiting -= dt; continue; }

                m.progress += m.spd * dt;
                if (m.progress >= m.maxTravel) {
                    m.progress = 0;
                    m.waiting  = m.waitFor;
                    continue;
                }

                const pct  = m.progress / m.maxTravel;
                // Fade in 0–10%, hold 10–70%, fade out 70–100%
                const mOpa = pct < 0.1 ? pct / 0.1 : pct > 0.7 ? (1 - pct) / 0.3 : 1;
                const a    = +(mOpa * vis).toFixed(3);

                // Head and tail positions
                const hx = m.sx + COS_A * m.progress;
                const hy = m.sy + SIN_A * m.progress;
                const tx = hx   - COS_A * m.tailLen;
                const ty = hy   - SIN_A * m.tailLen;

                const grad = ctx.createLinearGradient(tx, ty, hx, hy);
                grad.addColorStop(0,   `rgba(255,255,255,0)`);
                grad.addColorStop(0.6, `rgba(167,139,250,${+(a * 0.4).toFixed(3)})`);
                grad.addColorStop(1,   `rgba(255,255,255,${a})`);

                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(hx, hy);
                ctx.strokeStyle = grad;
                ctx.lineWidth   = m.width;
                ctx.lineCap     = "round";
                ctx.stroke();
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, []); // intentionally empty — loop reads everything through refs

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    );
};