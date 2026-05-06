import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor
 * - Inner dot  : snaps to mouse instantly
 * - Outer ring : follows with spring-like CSS lerp (rAF-driven, light)
 * - On pointer-hover: ring scales up, dims, inner dot scales up with glow
 * - Mobile: component is a no-op (touch devices skip entirely)
 */
export const CustomCursor = () => {
    const dotRef   = useRef<HTMLDivElement>(null);
    const ringRef  = useRef<HTMLDivElement>(null);
    const mouse    = useRef({ x: 0, y: 0 });
    const ring     = useRef({ x: 0, y: 0 });
    const rafId    = useRef<number>(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible,  setIsVisible]  = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // No-op on touch-primary devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);

            // Snap the dot immediately via transform
            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
        };

        const onOver = (e: MouseEvent) => {
            const el = e.target as Element;
            const clickable = el.closest(
                "a, button, [role='button'], input, textarea, select, label, [tabindex], .cursor-pointer"
            );
            setIsHovering(!!clickable);
        };

        const onDown = () => setIsClicking(true);
        const onUp   = () => setIsClicking(false);
        const onLeave = () => setIsVisible(false);
        const onEnter = () => setIsVisible(true);

        // rAF loop — lerps the outer ring toward mouse position
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const tick = () => {
            ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
            ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
            }
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);

        document.addEventListener("mousemove",  onMove);
        document.addEventListener("mouseover",  onOver);
        document.addEventListener("mousedown",  onDown);
        document.addEventListener("mouseup",    onUp);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        return () => {
            cancelAnimationFrame(rafId.current);
            document.removeEventListener("mousemove",  onMove);
            document.removeEventListener("mouseover",  onOver);
            document.removeEventListener("mousedown",  onDown);
            document.removeEventListener("mouseup",    onUp);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches) return null;

    return (
        <>
            {/* ── Outer lagging ring ── */}
            <div
                ref={ringRef}
                aria-hidden="true"
                style={{
                    position:        "fixed",
                    top:             0,
                    left:            0,
                    width:           isHovering ? 40 : 32,
                    height:          isHovering ? 40 : 32,
                    borderRadius:    "50%",
                    border:          "1.5px solid hsl(var(--primary) / 0.6)",
                    pointerEvents:   "none",
                    zIndex:          9999,
                    opacity:         isVisible ? (isHovering ? 0.5 : 0.8) : 0,
                    transition:      "width 0.25s ease, height 0.25s ease, opacity 0.3s ease, border-color 0.25s ease",
                    boxShadow:       isHovering
                        ? "0 0 12px 2px hsl(var(--primary) / 0.25)"
                        : "0 0 6px 1px hsl(var(--primary) / 0.15)",
                    backdropFilter:  "blur(0px)",
                    willChange:      "transform",
                }}
            />

            {/* ── Inner snapping dot ── */}
            <div
                ref={dotRef}
                aria-hidden="true"
                style={{
                    position:      "fixed",
                    top:           0,
                    left:          0,
                    width:         isClicking ? 10 : isHovering ? 8 : 6,
                    height:        isClicking ? 10 : isHovering ? 8 : 6,
                    borderRadius:  "50%",
                    background:    "hsl(var(--primary))",
                    pointerEvents: "none",
                    zIndex:        10000,
                    opacity:       isVisible ? 1 : 0,
                    transition:    "width 0.15s ease, height 0.15s ease, opacity 0.2s ease, box-shadow 0.2s ease",
                    boxShadow:     isHovering
                        ? "0 0 10px 3px hsl(var(--primary) / 0.5)"
                        : "0 0 4px 1px hsl(var(--primary) / 0.3)",
                    willChange:    "transform",
                }}
            />
        </>
    );
};
