import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitFork } from "lucide-react";
import { fadeUp, staggerSlow, cardPop, viewport } from "../lib/animations";

// ─── Static data ──────────────────────────────────────────────────────────────

const projects = [
    {
        title:  "Project 1",
        text:   "Description of Project 1",
        image:  "/projects/project1.jpg",
        link:   "https://example.com/project1",
        github: "https://github.com/Moskov-1/project1",
        tags:   ["tag1", "tag2", "tag3"],
    },
    {
        title:  "Project 2",
        text:   "Description of Project 2",
        image:  "/projects/project2.jpg",
        link:   "https://example.com/project2",
        github: "https://github.com/Moskov-1/project2",
        tags:   ["tag1", "tag2", "tag3"],
    },
    {
        title:  "Project 3",
        text:   "Description of Project 3",
        image:  "/projects/project3.jpg",
        link:   "https://example.com/project3",
        github: "https://github.com/Moskov-1/project3",
        tags:   ["tag1", "tag2", "tag3"],
    },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export const ProjectSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">

                {/* Section header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Here are some of the projects I have worked on.
                    </p>
                </motion.div>

                {/* Project cards — stagger in on scroll */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    {projects.map(project => (
                        <motion.div
                            key={project.title}
                            variants={cardPop}
                            whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                            className="group bg-card rounded-lg overflow-hidden shadow-xs"
                            style={{ boxShadow: "0 0 0 1px hsl(var(--border))" }}
                        >
                            {/* Image with scale on group hover via CSS */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-6">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="bg-primary/20 text-primary rounded-md px-2 py-1 text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{project.text}</p>

                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-3">
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <ExternalLink size={20} />
                                        </motion.a>
                                        <motion.a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <GitFork size={20} />
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* GitHub CTA */}
                <motion.div
                    className="text-center mt-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    <motion.a
                        href="https://github.com/Moskov-1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="space-btn w-fit flex items-center mx-auto gap-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        My Github
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ArrowRight size={16} />
                        </motion.span>
                    </motion.a>
                </motion.div>

            </div>
        </section>
    );
};