import { motion } from "framer-motion";
import { BriefcaseBusiness, Code, User } from "lucide-react";
import { cn } from "../lib/utils";
import {
    fadeUp,
    slideLeft,
    slideRight,
    scaleIn,
    staggerNormal,
    staggerSlow,
    viewport,
} from "../lib/animations";

const cards = [
    {
        icon: Code,
        title: "Backend Engineer",
        subtitle: "March 2025 – Present",
    },
    {
        icon: User,
        title: "Freelance Developer",
        subtitle: "2024 – Present",
    },
    {
        icon: BriefcaseBusiness,
        title: "Open to Opportunities",
        subtitle: "Available for hire",
    },
] as const;

export const AboutMe = () => {
    return (
        <div id="about" className="py-24 px-4 relative">
            <div className={cn("container mx-auto", "max-w-5xl")}>

                {/* Section heading fades up */}
                <motion.h2
                    className={cn("text-3xl mb-12", "md:text-4xl font-bold text-center")}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    About<span className="text-primary ml-2">Me</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left column slides in from the left */}
                    <motion.div
                        className="space-y-6"
                        variants={staggerNormal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        <motion.h3 variants={slideLeft}>
                            Passionate about Engineering and problem solving
                        </motion.h3>
                        <motion.p className="text-muted-foreground" variants={slideLeft}>
                            With a degree in Information and Communication Technology, and a year's worth of
                            experience in web development, I specialize in performance-based systems.
                            My goal is to build robust, scalable back-ends and automate tasks to keep production running.
                        </motion.p>

                        <motion.div
                            className={cn("flex flex-col", "sm:flex-row gap-4 justify-center")}
                            variants={slideLeft}
                        >
                            <motion.a
                                href="#contact"
                                className="space-btn"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Contact Me
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className={cn(
                                    "px-6 py-2 rounded-full border",
                                    "border-primary text-primary hover:bg-primary/10",
                                    "transition-colors duration-300"
                                )}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                My CV
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Right column — cards stagger in from the right */}
                    <motion.div
                        className="grid grid-cols-1 gap-6"
                        variants={staggerSlow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        {cards.map(({ icon: Icon, title, subtitle }) => (
                            <motion.div
                                key={title}
                                className="gradient-border p-6 card-hover"
                                variants={slideRight}
                                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-start gap-4">
                                    <motion.div
                                        className="p-3 rounded-full bg-primary/10"
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Icon className="h-6 w-6 text-primary" />
                                    </motion.div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-lg">{title}</h4>
                                        <p className="text-muted-foreground">{subtitle}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    );
};