import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "../lib/utils";
import { fadeUp, cardPop, staggerNormal, viewport } from "../lib/animations";

// ─── Category accent colors (subtle border complement only) ───────────────────
const CATEGORY_STYLE: Record<string, { border: string; badge: string }> = {
    Languages:  { border: "border-sky-500/30",    badge: "bg-sky-500/10 text-sky-400"    },
    Frameworks: { border: "border-violet-500/30", badge: "bg-violet-500/10 text-violet-400" },
    DevOps:     { border: "border-orange-500/30", badge: "bg-orange-500/10 text-orange-400" },
    Tools:      { border: "border-emerald-500/30",badge: "bg-emerald-500/10 text-emerald-400" },
};

// ─── Devicon logo map ──────────────────────────────────────────────────────────
// Uses https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/...
const ICON: Record<string, string> = {
    PHP:          "php/php-original",
    Python:       "python/python-original",
    JavaScript:   "javascript/javascript-original",
    "C++":        "cplusplus/cplusplus-original",
    YAML:         "yaml/yaml-original",
    Laravel:      "laravel/laravel-original",
    Django:       "django/django-plain",
    React:        "react/react-original",
    Docker:       "docker/docker-original",
    EC2:          "amazonwebservices/amazonwebservices-plain-wordmark",
    Linux:        "linux/linux-original",
    Git:          "git/git-original",
    PyTorch:      "pytorch/pytorch-original",
    "Scikit-Learn":"scikitlearn/scikitlearn-original",
    PostgreSQL:   "postgresql/postgresql-original",
};

const iconUrl = (name: string) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${ICON[name] ?? "devicon/devicon-original"}.svg`;

// ─── Static data ──────────────────────────────────────────────────────────────
const SKILLS = [
    { name: "PHP",          levelZ: "Production++",         category: "Languages"  },
    { name: "Python",       levelZ: "Production",           category: "Languages"  },
    { name: "JavaScript",   levelZ: "Competent",            category: "Languages"  },
    { name: "C++",          levelZ: "DSA & Algorithms++",   category: "Languages"  },
    { name: "YAML",         levelZ: "Daily Driver",         category: "Languages"  },
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

// ─── SkillCard ─────────────────────────────────────────────────────────────────
const SkillCard = memo(({ skill }: { skill: typeof SKILLS[number] }) => {
    const style = CATEGORY_STYLE[skill.category];
    return (
        <div
            className={cn(
                "bg-card rounded-xl p-5 border shadow-sm hover:shadow-md transition-all duration-300",
                "flex flex-col items-center gap-3 text-center group",
                style.border
            )}
        >
            {/* Logo */}
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-secondary/40 p-2 transition-transform duration-300 group-hover:scale-110">
                <img
                    src={iconUrl(skill.name)}
                    alt={skill.name}
                    loading="lazy"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                />
            </div>

            {/* Name */}
            <h3 className="font-semibold text-base text-foreground">{skill.name}</h3>
        </div>
    );
});
SkillCard.displayName = "SkillCard";

// ─── Filter button dot indicator ──────────────────────────────────────────────
const TYPE_DOT: Record<string, string> = {
    Languages:  "bg-sky-400",
    Frameworks: "bg-violet-400",
    DevOps:     "bg-orange-400",
    Tools:      "bg-emerald-400",
};

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
            <div className="container mx-auto max-w-5xl">

                {/* Heading */}
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    <span className="text-primary">My</span> Skills
                </motion.h2>

                {/* Filter buttons */}
                <LayoutGroup>
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mb-12"
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
                                    "relative bg-card py-2 px-5 rounded-lg shadow-xs overflow-hidden",
                                    "flex items-center gap-2 text-sm font-medium transition-colors duration-200",
                                    category === type ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                                variants={fadeUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category === type && (
                                    <motion.span
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-primary rounded-lg"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                                {type !== "All" && (
                                    <span className={cn("relative z-10 w-2 h-2 rounded-full shrink-0", TYPE_DOT[type] ?? "bg-primary")} />
                                )}
                                <span className="relative z-10">{type}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                </LayoutGroup>

                {/* Skills grid */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
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

                {/* Legend */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mt-10"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    {(["Languages", "Frameworks", "DevOps", "Tools"] as const).map(cat => (
                        <div key={cat} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className={cn("w-2 h-2 rounded-full", TYPE_DOT[cat])} />
                            {cat}
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};