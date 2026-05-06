import { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "../lib/utils";
import { fadeUp, cardPop, staggerNormal, viewport } from "../lib/animations";

// ─── Static data ──────────────────────────────────────────────────────────────

const SKILLS = [
    { name: "PHP",          levelZ: "Production++",         category: "Languages"  },
    { name: "Python",       levelZ: "Production",           category: "Languages"  },
    { name: "JavaScript",   levelZ: "Competent",            category: "Languages"  },
    { name: "C++",          levelZ: "(DSA & Algorithms)++", category: "Languages"  },
    { name: "Lua",          levelZ: "Beginner",             category: "Languages"  },
    { name: "Laravel",      levelZ: "Production++",         category: "Frameworks" },
    { name: "Django",       levelZ: "Production",           category: "Frameworks" },
    { name: "React",        levelZ: "Competent",            category: "Frameworks" },
    { name: "Docker",       levelZ: "Competent",            category: "DevOps"     },
    { name: "EC2",          levelZ: "Competent",            category: "DevOps"     },
    { name: "Linux",        levelZ: "Production",           category: "DevOps"     },
    { name: "Git",          levelZ: "Competent",            category: "DevOps"     },
    { name: "PyTorch",      levelZ: "Competent",            category: "Tools"      },
    { name: "Scikit-Learn", levelZ: "Competent",            category: "Tools"      },
    { name: "PostgreSQL",   levelZ: "Competent",            category: "Tools"      },
] as const;

const TYPES = ["All", "Languages", "Frameworks", "DevOps", "Tools"] as const;

// ─── SkillCard — CSS-driven bar animation, zero rAF loops ─────────────────────

const SkillCard = memo(({ skill }: { skill: typeof SKILLS[number] }) => {
    const [isVisible,  setIsVisible]  = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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
                <motion.div
                    className="text-left mt-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <p className="text-primary font-medium">{skill.levelZ}</p>
                </motion.div>
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

                {/* Heading */}
                <motion.h2
                    className={cn("text-3xl md:text-4xl", "font-bold text-center mb-12")}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    <span className="text-primary">My</span> Skills
                </motion.h2>

                {/* Filter buttons — stagger in, active indicator uses layoutId */}
                <LayoutGroup>
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 mb-12"
                        variants={staggerNormal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        {TYPES.map(type => (
                            <motion.button
                                key={type}
                                onClick={() => handleCategory(type)}
                                className={cn(
                                    "relative bg-card py-2 px-4 rounded-lg shadow-xs overflow-hidden",
                                    category === type && "text-primary-foreground"
                                )}
                                variants={fadeUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Sliding background pill for active state */}
                                {category === type && (
                                    <motion.span
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-primary rounded-lg"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span className="relative z-10">{type}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                </LayoutGroup>

                {/* Skills grid — AnimatePresence for smooth card enter/exit on filter */}
                <motion.div
                    className={cn("grid grid-cols-1 sm:grid-cols-2", "lg:grid-cols-3 gap-6")}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map(skill => (
                            <motion.div
                                key={skill.name}
                                layout
                                variants={cardPop}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            >
                                <SkillCard skill={skill} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
};