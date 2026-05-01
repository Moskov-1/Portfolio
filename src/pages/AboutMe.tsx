import { motion } from "framer-motion";
import { BriefcaseBusiness, Code, User } from "lucide-react";
import { cn } from "../lib/utils";
import { fadeUp, slideLeft, slideRight, staggerNormal, staggerSlow, viewport } from "../lib/animations";
import profileImg from "../assets/git-profile-pic-4-by-5.JPG";

const cards = [
    { icon: Code, title: "Backend Engineer", subtitle: "March 2025 – Present" },
    { icon: User, title: "Freelance Developer", subtitle: "2024 – Present" },
    { icon: BriefcaseBusiness, title: "Open to Opportunities", subtitle: "Available for hire" },
];
const SHOW_GOLD_FILTER = false;

export const AboutMe = () => {
    return (
        <div id="about" className="py-24 px-4 relative">
            <div className={cn("container mx-auto", "max-w-6xl")}>

                <motion.h2
                    className={cn("text-3xl mb-16", "md:text-4xl font-bold text-center")}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    About<span className="text-primary ml-2">Me</span>
                </motion.h2>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-stretch">

                    {/* Left side: Premium Image Frame */}
                    <motion.div
                        className="w-full lg:w-5/12 flex justify-center items-center"
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        <div className="relative w-64 sm:w-80 lg:w-full max-w-sm aspect-[4/5] mx-auto">
                            {/* Background offset decoration */}
                            <div className="absolute inset-0 bg-primary/30 rounded-3xl transform translate-x-8 translate-y-8 -z-10 border border-primary/20"></div>

                            {/* Image container */}
                            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border shadow-2xl bg-card z-10">
                                {/* Soft gold filter for warmth */}
                                {SHOW_GOLD_FILTER && (
                                    <div className="absolute inset-0 bg-amber-400 mix-blend-overlay opacity-30 z-20 pointer-events-none"></div>
                                )}
                                
                                {/* Depth gradient */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-70 mix-blend-multiply z-20 pointer-events-none"></div>

                                <img
                                    src={profileImg}
                                    alt="Raihan Rony"
                                    className="w-full h-full object-cover scale-110 filter brightness-100 grayscale-0"
                                />
                            </div>

                            {/* Ambient glow behind everything */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/30 blur-[80px] rounded-full -z-20 opacity-70 pointer-events-none"></div>
                        </div>
                    </motion.div>

                    {/* Right side: Text and Cards */}
                    <div className="w-full lg:w-7/12 flex flex-col justify-center">
                        <motion.div
                            className="space-y-6 text-center lg:text-left mb-12"
                            variants={staggerNormal}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                        >
                            <motion.h3
                                variants={slideRight}
                                className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                            >
                                Passionate about Engineering and problem solving
                            </motion.h3>

                            <motion.p
                                className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0"
                                variants={slideRight}
                            >
                                With a degree in Information and Communication Technology, and a year's worth of
                                experience in web development, I specialize in performance-based systems.
                                My goal is to build robust, scalable back-ends and automate tasks to keep production running.
                            </motion.p>

                            <motion.div
                                className={cn("flex flex-col", "sm:flex-row gap-4 justify-center lg:justify-start pt-4")}
                                variants={slideRight}
                            >
                                <a href="#contact" className="space-btn transition-transform hover:scale-105 hover:-translate-y-0.5 active:scale-95">
                                    Contact Me
                                </a>
                                <a
                                    href="#contact"
                                    className={cn(
                                        "px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold",
                                        "hover:bg-primary/10 transition-colors duration-300",
                                        "hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-transform",
                                        "flex items-center justify-center gap-2"
                                    )}
                                >
                                    My CV
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            variants={staggerSlow}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                        >
                            {cards.map(({ icon: Icon, title, subtitle }) => (
                                <motion.div
                                    key={title}
                                    className="glass-card p-5 rounded-xl card-hover group flex items-start gap-4"
                                    variants={fadeUp}
                                >
                                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                                        <p className="text-muted-foreground text-sm leading-snug">{subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};