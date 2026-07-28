import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { fadeUp, staggerNormal } from "../lib/animations";

export const HeroSection = () => {
    const lenis = useLenis();

    const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo("#projects", { offset: -30 });
        } else {
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >
            {/* Stagger container — children animate in sequence */}
            <motion.div
                className="container max-w-4xl mx-auto text-center z-10"
                variants={staggerNormal}
                initial="hidden"
                animate="visible"
            >
                <div className="space-y-6">
                    {/* Hero heading — each span is a child so they stagger individually */}
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                        variants={fadeUp}
                    >
                        <span>Hi, I'm</span>
                        <span className="text-primary"> Raihan</span>
                        <span className="text-gradient ml-2"> Rony</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                        variants={fadeUp}
                    >
                        I create stellar web experiences with modern technologies.
                        Specializing in back-end development, I build systems that are
                        both functional and reliable.
                    </motion.p>

                    <motion.div className="pt-4" variants={fadeUp}>
                        <a href="#projects" onClick={handleScrollToProjects} className="space-btn">
                            View My Work
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator — delayed, then bounces infinitely */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
            >
                <span className="text-sm text-muted-foreground">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <ArrowDown className="h-5 w-5 text-primary" />
                </motion.div>
            </motion.div>
        </section>
    );
};