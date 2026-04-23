import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { useThemeTransition } from "../context/ThemeTransitionContext";

const TRANSITION_DURATION = 1500;

// Reads localStorage synchronously — no flicker/FOUC on load
// Default is dark; respects any previously saved preference.
function getInitialTheme(): "light" | "dark" {
    try {
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || saved === "light") return saved;
    } catch {
        // localStorage unavailable (e.g. private browsing edge case)
    }
    return "dark"; // dark by default
}

export const ThemeToggle = () => {
    const [theme,       setTheme]       = useState<"light" | "dark">(getInitialTheme);
    const [isAnimating, setIsAnimating] = useState(false);
    const { startTransition, endTransition } = useThemeTransition();

    // Apply the initial theme class to <html> once on mount
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const toggleTheme = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        const newTheme  = theme === "light" ? "dark" : "light";
        const direction = newTheme === "light" ? "to-light" : "to-dark";

        startTransition(direction);

        // Switch the actual theme at 60% through the animation for a smooth feel
        setTimeout(() => {
            setTheme(newTheme);
            localStorage.setItem("theme", newTheme);
            if (newTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }, TRANSITION_DURATION * 0.6);

        setTimeout(() => {
            endTransition();
            setIsAnimating(false);
        }, TRANSITION_DURATION);
    };

    return (
        <button
            onClick={toggleTheme}
            disabled={isAnimating}
            className={cn(
                "fixed max-sm:hidden top-5 right-5",
                "z-50 p-2 rounded-full transition-all duration-500",
                "focus:outline-hidden hover:scale-110",
                isAnimating && "pointer-events-none opacity-50 scale-90"
            )}
        >
            {theme === "dark" ? (
                <Sun className={cn("w-6 h-6 text-yellow-500 transition-transform duration-300", isAnimating && "animate-spin")} />
            ) : (
                <Moon className={cn("w-6 h-6 text-blue-800 transition-transform duration-300", isAnimating && "animate-pulse")} />
            )}
        </button>
    );
};