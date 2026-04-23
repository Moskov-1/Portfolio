import { useEffect, useState, useCallback, useRef, memo } from "react";
import { cn } from "../lib/utils";
import { useThemeTransition } from "../context/ThemeTransitionContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type Star = {
    id: number;
    size: number;
    x: number;
    y: number;
    opacity: number;
    animationDuration: number;
    animationDelay: number;
};

type ActiveMeteor = {
    poolIndex: number;
    key: number;
    delay: number;
};

// ─── Constants (module-level, never recreated) ────────────────────────────────

const METEOR_POOL = [
    // Small meteors
    { size: 1.2, x: 5,  y: 5,  duration: 3.5 },
    { size: 1.5, x: 92, y: 10, duration: 4   },
    { size: 1.3, x: 35, y: 3,  duration: 3.8 },
    { size: 1.8, x: 68, y: 18, duration: 3.2 },
    { size: 1.4, x: 22, y: 12, duration: 3.6 },
    { size: 1.6, x: 80, y: 7,  duration: 3.9 },
    { size: 1.1, x: 48, y: 22, duration: 3.3 },
    { size: 1.9, x: 15, y: 8,  duration: 4.1 },
    { size: 1.7, x: 58, y: 15, duration: 3.7 },
    { size: 1.3, x: 88, y: 20, duration: 3.4 },
    // Medium meteors
    { size: 2.8, x: 12, y: 6,  duration: 4.5 },
    { size: 3.2, x: 75, y: 14, duration: 5   },
    { size: 2.5, x: 42, y: 10, duration: 4.2 },
    { size: 3.5, x: 28, y: 22, duration: 5.2 },
    { size: 2.9, x: 65, y: 4,  duration: 4.8 },
    { size: 3.0, x: 8,  y: 18, duration: 4.6 },
    { size: 3.8, x: 52, y: 8,  duration: 5.4 },
    { size: 2.6, x: 85, y: 16, duration: 4.3 },
    { size: 3.3, x: 38, y: 25, duration: 5.1 },
    { size: 2.7, x: 95, y: 12, duration: 4.7 },
    // Large meteors
    { size: 5.0, x: 18, y: 5,  duration: 5.5 },
    { size: 5.5, x: 72, y: 15, duration: 6   },
    { size: 4.8, x: 45, y: 20, duration: 5.8 },
    { size: 6.0, x: 30, y: 10, duration: 6.2 },
    // Extra small for variety
    { size: 1.0, x: 3,  y: 24, duration: 3.1 },
    { size: 1.1, x: 60, y: 3,  duration: 3.2 },
    { size: 1.2, x: 78, y: 28, duration: 3.3 },
    { size: 1.0, x: 25, y: 6,  duration: 3.0 },
    { size: 1.1, x: 90, y: 18, duration: 3.15},
    { size: 1.2, x: 55, y: 12, duration: 3.25},
] as const;

const VISIBLE_COUNT = 4;
const MAX_STARS = 150; // Hard cap — prevents 2000+ DOM nodes on large screens

// ─── Memoized sub-components ──────────────────────────────────────────────────

const StarDot = memo(({
    star,
    isTransitioning,
    direction,
}: {
    star: Star;
    isTransitioning: boolean;
    direction: string | null;
}) => {
    const base: React.CSSProperties = {
        top:    `${star.y}%`,
        left:   `${star.x}%`,
        width:  `${star.size}px`,
        height: `${star.size}px`,
        // Promote to its own GPU layer so the browser composites rather than repaints
        willChange: "transform, opacity",
        transform: "translateZ(0)",
    };

    let style: React.CSSProperties;
    if (isTransitioning && direction === "to-light") {
        style = { ...base, animation: "stars-timelapse-out 1.5s ease-in-out forwards" };
    } else if (isTransitioning && direction === "to-dark") {
        style = { ...base, animation: "stars-timelapse-in 1.5s ease-in-out forwards" };
    } else {
        style = {
            ...base,
            opacity:           star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay:    `${star.animationDelay}s`,
        };
    }

    return (
        <div
            className={cn(
                "absolute bg-white rounded-full star",
                !isTransitioning && "animate-pulse-subtle"
            )}
            style={style}
        />
    );
});
StarDot.displayName = "StarDot";

const MeteorDot = memo(({
    meteor,
    delay,
    isTransitioning,
    direction,
    meteorKey,
    onComplete,
}: {
    meteor: typeof METEOR_POOL[number];
    delay: number;
    isTransitioning: boolean;
    direction: string | null;
    meteorKey: number;
    onComplete: (key: number) => void;
}) => {
    const base: React.CSSProperties = {
        top:    `${meteor.y}%`,
        left:   `${meteor.x}%`,
        width:  `${meteor.size * 50}px`,
        height: `${meteor.size}px`,
        willChange: "transform, opacity",
        transform: "translateZ(0)",
    };

    const style: React.CSSProperties =
        isTransitioning && direction === "to-light"
            ? { ...base, animation: "meteor-timelapse 0.8s ease-in-out forwards" }
            : { ...base, animationDelay: `${delay}s`, animationDuration: `${meteor.duration}s` };

    return (
        <div
            className={cn("meteor rounded-full", !isTransitioning && "animate-meteor")}
            style={style}
            onAnimationIteration={
                isTransitioning ? undefined : () => onComplete(meteorKey)
            }
        />
    );
});
MeteorDot.displayName = "MeteorDot";

// ─── Main component ───────────────────────────────────────────────────────────

export const StarBackground = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const [activeMeteors, setActiveMeteors] = useState<ActiveMeteor[]>([]);

    const nextPoolIndexRef = useRef(VISIBLE_COUNT);
    const keyCounterRef   = useRef(VISIBLE_COUNT);

    const { isTransitioning, direction } = useThemeTransition();

    const generateStars = useCallback(() => {
        const count = Math.min(
            Math.floor((window.innerWidth * window.innerHeight) / 6000),
            MAX_STARS
        );
        setStars(
            Array.from({ length: count }, (_, i) => ({
                id:                i,
                size:              Math.floor(Math.random() * Math.floor(Math.random() * 6)) + 1,
                x:                 Math.random() * 100,
                y:                 Math.random() * 100,
                opacity:           Math.random() * 0.5 + 0.5,
                animationDuration: 4 + Math.random() * 4,
                animationDelay:    Math.random() * 6,
            }))
        );
    }, []);

    // Initialize meteors once
    useEffect(() => {
        setActiveMeteors(
            Array.from({ length: VISIBLE_COUNT }, (_, i) => ({
                poolIndex: i,
                key:       i,
                delay:     i * 3,
            }))
        );
    }, []);

    const handleMeteorComplete = useCallback((meteorKey: number) => {
        setActiveMeteors(prev =>
            prev.map(m => {
                if (m.key !== meteorKey) return m;
                const newIndex = nextPoolIndexRef.current % METEOR_POOL.length;
                nextPoolIndexRef.current  += 1;
                keyCounterRef.current     += 1;
                return {
                    poolIndex: newIndex,
                    key:       keyCounterRef.current,
                    delay:     Math.random() * 2,
                };
            })
        );
    }, []);

    // Generate stars on mount; debounce regeneration on resize
    useEffect(() => {
        generateStars();
        let timer: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(timer);
            timer = setTimeout(generateStars, 250);
        };
        window.addEventListener("resize", onResize, { passive: true });
        return () => {
            window.removeEventListener("resize", onResize);
            clearTimeout(timer);
        };
    }, [generateStars]);

    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-transparent"
            // Isolate this subtree from the rest of the layout — prevents reflow
            style={{ contain: "layout style paint" }}
        >
            {stars.map(star => (
                <StarDot
                    key={star.id}
                    star={star}
                    isTransitioning={isTransitioning}
                    direction={direction}
                />
            ))}
            {activeMeteors.map(active => (
                <MeteorDot
                    key={active.key}
                    meteor={METEOR_POOL[active.poolIndex]}
                    delay={active.delay}
                    isTransitioning={isTransitioning}
                    direction={direction}
                    meteorKey={active.key}
                    onComplete={handleMeteorComplete}
                />
            ))}
        </div>
    );
};