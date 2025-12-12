import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { useThemeTransition } from "../context/ThemeTransitionContext";

const TRANSITION_DURATION = 1500; // 1.5 seconds for smoother feel

export const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');
    const [isAnimating, setIsAnimating] = useState(false);
    const { startTransition, endTransition } = useThemeTransition();

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
            document.documentElement.classList.add(localTheme);
        }
    }, []);

    const toggleTheme = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        const newTheme = theme === 'light' ? 'dark' : 'light';
        const direction = newTheme === 'light' ? 'to-light' : 'to-dark';

        // Start transition animation
        startTransition(direction);

        // Change theme partway through animation for smoother feel
        setTimeout(() => {
            if (newTheme === 'dark') {
                setTheme('dark');
                localStorage.setItem('theme', 'dark');
                document.documentElement.classList.add('dark');
            } else {
                setTheme('light');
                localStorage.setItem('theme', 'light');
                document.documentElement.classList.remove('dark');
            }
        }, TRANSITION_DURATION * 0.6); // Switch at 60% through

        // End transition after full duration
        setTimeout(() => {
            endTransition();
            setIsAnimating(false);
        }, TRANSITION_DURATION);
    }

    return <button onClick={toggleTheme}
        className={cn("fixed max-sm:hidden top-5 right-5",
            "z-50 p-2 rounded-full transition-all duration-500",
            "focus:outline-hidden hover:scale-110",
            isAnimating && "pointer-events-none opacity-50 scale-90"
        )}
        disabled={isAnimating}
    >
        {theme !== 'light' ? (
            <Sun className={cn("w-6 h-6 text-yellow-500 transition-transform duration-300",
                isAnimating && "animate-spin"
            )} />
        ) : (
            <Moon className={cn("w-6 h-6 text-blue-800 transition-transform duration-300",
                isAnimating && "animate-pulse"
            )} />
        )}
    </button>
}