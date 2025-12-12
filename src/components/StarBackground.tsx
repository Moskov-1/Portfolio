
import { useEffect, useState, useCallback } from "react";
import { cn } from "../lib/utils";

// Large pool of pre-defined meteors with varied positions and sizes
// We only display a subset at a time and cycle through when animations complete
const METEOR_POOL = [
    // Small meteors
    { size: 1.2, x: 5, y: 5, duration: 3.5 },
    { size: 1.5, x: 92, y: 10, duration: 4 },
    { size: 1.3, x: 35, y: 3, duration: 3.8 },
    { size: 1.8, x: 68, y: 18, duration: 3.2 },
    { size: 1.4, x: 22, y: 12, duration: 3.6 },
    { size: 1.6, x: 80, y: 7, duration: 3.9 },
    { size: 1.1, x: 48, y: 22, duration: 3.3 },
    { size: 1.9, x: 15, y: 8, duration: 4.1 },
    { size: 1.7, x: 58, y: 15, duration: 3.7 },
    { size: 1.3, x: 88, y: 20, duration: 3.4 },

    // Medium meteors
    { size: 2.8, x: 12, y: 6, duration: 4.5 },
    { size: 3.2, x: 75, y: 14, duration: 5 },
    { size: 2.5, x: 42, y: 10, duration: 4.2 },
    { size: 3.5, x: 28, y: 22, duration: 5.2 },
    { size: 2.9, x: 65, y: 4, duration: 4.8 },
    { size: 3.0, x: 8, y: 18, duration: 4.6 },
    { size: 3.8, x: 52, y: 8, duration: 5.4 },
    { size: 2.6, x: 85, y: 16, duration: 4.3 },
    { size: 3.3, x: 38, y: 25, duration: 5.1 },
    { size: 2.7, x: 95, y: 12, duration: 4.7 },

    // Large meteors
    { size: 5.0, x: 18, y: 5, duration: 5.5 },
    { size: 5.5, x: 72, y: 15, duration: 6 },
    { size: 4.8, x: 45, y: 20, duration: 5.8 },
    { size: 6.0, x: 30, y: 10, duration: 6.2 },

    // Extra small for variety
    { size: 1.0, x: 3, y: 24, duration: 3.1 },
    { size: 1.1, x: 60, y: 3, duration: 3.2 },
    { size: 1.2, x: 78, y: 28, duration: 3.3 },
    { size: 1.0, x: 25, y: 6, duration: 3.0 },
    { size: 1.1, x: 90, y: 18, duration: 3.15 },
    { size: 1.2, x: 55, y: 12, duration: 3.25 },
];

// How many meteors visible at once
const VISIBLE_COUNT = 4;

type ActiveMeteor = {
    poolIndex: number;
    key: number;
    delay: number;
};

export const StarBackground = () => {
    type Star = {
        id: number;
        size: number;
        x: number;
        y: number;
        opacity: number;
        animation: string;
        animationDelay: number;
    }
    const [stars, setStars] = useState<Star[]>([]);
    const [activeMeteors, setActiveMeteors] = useState<ActiveMeteor[]>([]);
    const [nextPoolIndex, setNextPoolIndex] = useState(VISIBLE_COUNT);
    const [keyCounter, setKeyCounter] = useState(VISIBLE_COUNT);

    const generateStars = () => {
        const numberOfStars = Math.floor(
            window.innerWidth * window.innerHeight / 1000
        );

        const newStars: Star[] = [];
        for (let i = 0; i < numberOfStars; i++) {
            const star: Star = {
                id: i,
                size: Math.floor(Math.random() * Math.floor(Math.random() * 6)) + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animation: "float 6s ease-in-out infinite",
                animationDelay: Math.random() * 6 + 2,
            };
            newStars.push(star);
        }
        setStars(newStars);
    }

    // Initialize active meteors
    useEffect(() => {
        const initial: ActiveMeteor[] = [];
        for (let i = 0; i < VISIBLE_COUNT; i++) {
            initial.push({
                poolIndex: i,
                key: i,
                delay: i * 3, // Stagger initial delays
            });
        }
        setActiveMeteors(initial);
    }, []);

    // When a meteor's animation completes, replace it with next from pool
    const handleMeteorComplete = useCallback((meteorKey: number) => {
        setActiveMeteors(prev =>
            prev.map(m => {
                if (m.key === meteorKey) {
                    const newIndex = nextPoolIndex % METEOR_POOL.length;
                    setNextPoolIndex(p => p + 1);
                    setKeyCounter(k => k + 1);
                    return {
                        poolIndex: newIndex,
                        key: keyCounter + 1,
                        delay: 0, // No delay for replacement
                    };
                }
                return m;
            })
        );
    }, [nextPoolIndex, keyCounter]);

    useEffect(() => {
        generateStars();

        const handleResize = () => {
            generateStars();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (<div className={cn("fixed inset-0",
        "overflow-hidden pointer-events-none z-0 bg-transparent",
    )}>
        {stars.map((star) => (
            <div
                key={star.id}
                className={cn("absolute bg-white",
                    "rounded-full",
                    "star animate-pulse-subtle"
                )}
                style={{
                    top: star.y + "%",
                    left: star.x + "%",
                    width: star.size + "px",
                    height: star.size + "px",
                    opacity: star.opacity,
                    animation: star.animation,
                    animationDuration: star.animationDelay + "s",
                }}
            />
        ))}
        {activeMeteors.map((active) => {
            const meteor = METEOR_POOL[active.poolIndex];
            return (
                <div
                    key={active.key}
                    className={cn("meteor animate-meteor", "rounded-full")}
                    style={{
                        top: meteor.y + "%",
                        left: meteor.x + "%",
                        width: meteor.size * 50 + "px",
                        height: meteor.size * 1 + "px",
                        animationDelay: active.delay + "s",
                        animationDuration: meteor.duration + "s",
                    }}
                    onAnimationIteration={() => handleMeteorComplete(active.key)}
                />
            );
        })}
    </div>);

}