import { createContext, useContext, useState, type ReactNode } from 'react';

type TransitionDirection = 'to-light' | 'to-dark' | null;

interface ThemeTransitionContextType {
    isTransitioning: boolean;
    direction: TransitionDirection;
    startTransition: (dir: TransitionDirection) => void;
    endTransition: () => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | null>(null);

export const ThemeTransitionProvider = ({ children }: { children: ReactNode }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<TransitionDirection>(null);

    const startTransition = (dir: TransitionDirection) => {
        setDirection(dir);
        setIsTransitioning(true);
    };

    const endTransition = () => {
        setIsTransitioning(false);
        setDirection(null);
    };

    return (
        <ThemeTransitionContext.Provider value={{ isTransitioning, direction, startTransition, endTransition }}>
            {children}
        </ThemeTransitionContext.Provider>
    );
};

export const useThemeTransition = () => {
    const context = useContext(ThemeTransitionContext);
    if (!context) {
        throw new Error('useThemeTransition must be used within ThemeTransitionProvider');
    }
    return context;
};
