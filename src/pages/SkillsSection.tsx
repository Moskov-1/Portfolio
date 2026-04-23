import { useState, useEffect, useRef, memo, useCallback } from "react";
import { cn } from "../lib/utils";

// ─── Static data (module-level — never recreated) ─────────────────────────────

const SKILLS = [
    { name: "PHP",         levelZ: "Production++",          category: "Languages"   },
    { name: "Python",      levelZ: "Production",            category: "Languages"   },
    { name: "JavaScript",  levelZ: "Competent",             category: "Languages"   },
    { name: "C++",         levelZ: "(DSA & Algorithms)++",  category: "Languages"   },
    { name: "Lua",         levelZ: "Beginner",              category: "Languages"   },
    { name: "Laravel",     levelZ: "Production++",          category: "Frameworks"  },
    { name: "Django",      levelZ: "Production",            category: "Frameworks"  },
    { name: "React",       levelZ: "Competent",             category: "Frameworks"  },
    { name: "Docker",      levelZ: "Competent",             category: "DevOps"      },
    { name: "EC2",         levelZ: "Competent",             category: "DevOps"      },
    { name: "Linux",       levelZ: "Production",            category: "DevOps"      },
    { name: "Git",         levelZ: "Competent",             category: "DevOps"      },
    { name: "PyTorch",     levelZ: "Competent",             category: "Tools"       },
    { name: "Scikit-Learn",levelZ: "Competent",             category: "Tools"       },
    { name: "PostgreSQL",  levelZ: "Competent",             category: "Tools"       },
] as const;

const TYPES = ["All", "Languages", "Frameworks", "DevOps", "Tools"] as const;

// ─── SkillCard — CSS-driven animation, zero rAF loops ─────────────────────────
//
// Strategy: IntersectionObserver adds a class → CSS transitions the bar width.
// The browser GPU-composites the width transition with no JS frame loops.
// After 1.8 s we flip to showing the levelZ label.

const SkillCard = memo(({ skill }: { skill: typeof SKILLS[number] }) => {
    const [isVisible,  setIsVisible]  = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Observe once; unobserve after first intersection
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(card);
        return () => observer.unobserve(card);
    }, []);

    // Single timer — fires once when animation should be done (1.5s bar + 0.3s pause)
    useEffect(() => {
        if (!isVisible) return;
        const timer = setTimeout(() => setIsComplete(true), 1800);
        return () => clearTimeout(timer);
    }, [isVisible]);

    return (
        <div ref={cardRef} className="bg-card p-6 rounded-lg shadow-xs card-hover">
            <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
            </div>

            {!isComplete ? (
                <>
                    {/* Width animates via CSS transition — no JS loop needed */}
                    <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-primary h-2 rounded-full origin-left"
                            style={{
                                width:      isVisible ? "100%" : "0%",
                                transition: isVisible ? "width 1.5s ease-out" : "none",
                                willChange: "width",
                            }}
                        />
                    </div>
                    <div className="text-right mt-1">
                        <span className="text-sm text-muted-foreground">
                            {isVisible ? "Loading…" : "0%"}
                        </span>
                    </div>
                </>
            ) : (
                <div className="text-left mt-4 animate-fade-in">
                    <p className="text-primary font-medium">{skill.levelZ}</p>
                </div>
            )}
        </div>
    );
});
SkillCard.displayName = "SkillCard";

// ─── SkillsSection ────────────────────────────────────────────────────────────

export const SkillsSection = () => {
    const [category, setCategory] = useState<typeof TYPES[number]>("All");

    const filteredSkills = category === "All"
        ? SKILLS
        : SKILLS.filter(s => s.category === category);

    const handleCategory = useCallback((type: typeof TYPES[number]) => {
        setCategory(type);
    }, []);

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className={cn("container mx-auto", "max-w-5xl")}>
                <h2 className={cn("text-3xl md:text-4xl", "font-bold text-center mb-12")}>
                    <span className="text-primary">My</span> Skills
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {TYPES.map(type => (
                        <button
                            key={type}
                            onClick={() => handleCategory(type)}
                            className={cn(
                                "bg-card py-2 px-4 rounded-lg shadow-xs card-hover",
                                category === type && "bg-primary text-primary-foreground"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className={cn("grid grid-cols-1 sm:grid-cols-2", "lg:grid-cols-3 gap-6")}>
                    {filteredSkills.map(skill => (
                        // skill.name is stable and unique — safe key for filtered lists
                        <SkillCard key={skill.name} skill={skill} />
                    ))}
                </div>
            </div>
        </section>
    );
};