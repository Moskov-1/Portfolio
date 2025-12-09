import { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export const SkillsSection = () => {

    const skills = [
        { name: "php", levelZ: 'Production++', category: 'Languages' },
        { name: "python", levelZ: 'Production', category: 'Languages' },
        { name: "javascript", levelZ: 'competent', category: 'Languages' },
        { name: "c++", levelZ: '(DSA * Algorithms) ++', category: 'Languages' },
        { name: "lua", levelZ: 'Begineer', category: 'Languages' },

        { name: "Laravel", levelZ: 'Production++', category: 'Frameworks' },
        { name: "Django", levelZ: 'Production', category: 'Frameworks' },
        { name: "React", levelZ: 'competent', category: 'Frameworks' },

        { name: "Docker", levelZ: 'competent', category: 'DevOps' },
        { name: "EC2", levelZ: 'competent', category: 'DevOps' },
        { name: "Linux", levelZ: 'Production', category: 'DevOps' },
        { name: "Git", levelZ: 'Competent', category: 'DevOps' },

        { name: "Pytorch", levelZ: 'competent', category: 'Tools' },
        { name: "Scikit-Learn", levelZ: 'competent', category: 'Tools' },
        { name: "PostgreSQL", levelZ: 'Competent', category: 'Tools' },
    ];
    const types = ['All', 'Languages', 'Frameworks', 'DevOps', 'Tools'];
    const [category, setCategory] = useState('All');

    const filteredSkills = category === 'All' ? skills : skills.filter((skill) => skill.category === category);

    return (
        <section id='skills'
            className="py-24 px-4 relative bg-secondary/30"
        >
            <div className={cn("container mx-auto",
                'max-w-5xl'
            )}>
                <h2 className={cn("text-3xl md:text-4xl",
                    'font-bold text-center mb-12'
                )}
                >
                    <span className="text-primary">My</span> Skills
                </h2>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {types.map((type, key) => (
                        <button key={key} onClick={() => setCategory(type)}
                            className={cn("bg-card py-2 px-4 rounded-lg shadow-xs card-hover",
                                category === type && 'bg-primary text-primary-foreground'
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className={cn("grid grid-cols-1 sm:grid-cols-2",
                    'lg:grid-cols-3 gap-6'
                )}>
                    {filteredSkills.map((skill, key) => (
                        <SkillCard key={key} skill={skill} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const SkillCard = ({ skill }: { skill: { name: string; levelZ: string } }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Card is visible, start animation
                        const animationDuration = 1500; // 1.5 seconds
                        const startTime = Date.now();

                        const animate = () => {
                            const elapsed = Date.now() - startTime;
                            const percent = Math.min((elapsed / animationDuration) * 100, 100);

                            setProgress(percent);

                            if (percent < 100) {
                                requestAnimationFrame(animate);
                            } else {
                                // Wait a bit before revealing levelZ
                                setTimeout(() => setIsComplete(true), 300);
                            }
                        };

                        requestAnimationFrame(animate);
                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            },
            {
                threshold: 0.3, // Trigger when 30% of card is visible
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className="bg-card p-6 rounded-lg shadow-xs card-hover">
            <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">
                    {skill.name}
                </h3>
            </div>

            {!isComplete ? (
                <>
                    <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-primary h-2 rounded-full origin-left transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="text-right mt-1">
                        <span className="text-sm text-muted-foreground">
                            {Math.floor(progress)}%
                        </span>
                    </div>
                </>
            ) : (
                <div className="text-left mt-4 animate-fade-in">
                    <p className="text-primary font-medium">
                        {skill.levelZ}
                    </p>
                </div>
            )}
        </div>
    );
};