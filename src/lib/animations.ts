import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variants for the portfolio.
 * Cinematic ease curve — smooth, not bouncy.
 */
const ease = [0.16, 1, 0.3, 1] as const;

// ── Basic enter animations ────────────────────────────────────────────────────

export const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease } },
};

export const fadeIn: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const slideLeft: Variants = {
    hidden:  { opacity: 0, x: -56 },
    visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease } },
};

export const slideRight: Variants = {
    hidden:  { opacity: 0, x: 56 },
    visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease } },
};

export const scaleIn: Variants = {
    hidden:  { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1,   transition: { duration: 0.5, ease } },
};

// ── Card pop (for filtered / grid items) ──────────────────────────────────────

export const cardPop: Variants = {
    hidden:  { opacity: 0, scale: 0.82, y: 20 },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.45, ease } },
    exit:    { opacity: 0, scale: 0.82, y: 20,  transition: { duration: 0.25 } },
};

// ── Stagger containers ────────────────────────────────────────────────────────

/** Stagger children quickly (nav items, tags, etc.) */
export const staggerFast: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.07 } },
};

/** Default stagger for section content */
export const staggerNormal: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12 } },
};

/** Slower stagger for large grids (projects, skills) */
export const staggerSlow: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// ── Common viewport config ────────────────────────────────────────────────────
// once: true → animates only on first scroll into view (no re-trigger)
// margin: "-80px" → triggers slightly before the element is fully in view

export const viewport = { once: true, margin: "-80px" } as const;
