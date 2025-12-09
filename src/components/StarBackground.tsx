
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const StarBackground = () => {
    // id, size, x, y, opacity, 
    // animation, animationDelay

    type Star = {
        id: number;
        size: number;
        x: number;
        y: number;
        opacity: number;
        animation: string;
        animationDelay: number;
    }
    type Meteor = {
        id: number;
        size: number;
        x: number;
        y: number;
        delay: string;
        animationDuration: number;
    }
    const [stars, setStars] = useState<Star[]>([]);
    const [meteors, setMeteors] = useState<Meteor[]>([]);

    const generateStars = () => {
        const numberOfStars = Math.
            floor(window.innerWidth *
                window.innerHeight / 1000
            );

        const newStars: Star[] = [];
        for (let i = 0; i < numberOfStars; i++) {
            const star: Star = {
                id: i,
                size: Math.floor(Math.random() * Math.floor(Math.random() * 6)) + 1,
                // x: Math.random() * window.innerWidth,
                x: Math.random() * 100,
                // y: Math.random() * window.innerHeight,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animation: "float 6s ease-in-out infinite",
                animationDelay: Math.random() * 6 + 2,
            };
            newStars.push(star);
        }
        setStars(newStars);
    }

    const generateMeteors = () => {
        const numberOfMeteors = 10;

        const newMeteors: Meteor[] = [];
        for (let i = 0; i < numberOfMeteors; i++) {
            const meteor: Meteor = {
                id: i,
                size: Math.floor(Math.random() * Math.floor(Math.random() * 10)) + 1,
                // Spawn from anywhere across screen width: x between 0 and 80%
                x: Math.random() * 80,
                // Spawn from top portion of screen: y between 0 and 20%
                y: Math.random() * 20,
                // More varied delay for unpredictable spawning: 0-20 seconds
                delay: Math.random() * 20 + "s",
                // Varied duration: 3-10 seconds
                animationDuration: Math.random() * 7 + 3,
            };
            newMeteors.push(meteor);
        }
        setMeteors(newMeteors);
    }

    useEffect(() => {
        generateStars();
        generateMeteors();

        const handleResize = () => {
            generateStars();
            generateMeteors();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (<div className={cn("fixed inset-0",
        "overflow-hidden pointer-events-none z-0 bg-transparent",
    )}>
        {stars.map((star) => {
            return (<div
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
            );
        })}
        {meteors.map((item) => {
            return (<div
                key={item.id}
                className={cn("meteor animate-meteor",
                    "rounded-full"
                )}
                style={{
                    top: item.y + "%",
                    left: item.x + "%",
                    width: item.size * 50 + "px",
                    height: item.size * 1 + "px",
                    animationDelay: item.delay,
                    animationDuration: item.animationDuration + "s",
                }} />
            );
        })}
    </div>);

}