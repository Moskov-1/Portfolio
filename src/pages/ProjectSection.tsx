import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitFork } from "lucide-react";
import { fadeUp, staggerSlow, cardPop, viewport } from "../lib/animations";

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

export const ProjectSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">

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
                            // CSS hover: no JS pointer listener needed for a simple lift
                            className="group bg-card rounded-lg overflow-hidden shadow-xs border border-border transition-transform duration-300 hover:-translate-y-2"
                        >
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
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-primary/20 text-primary rounded-md px-2 py-1 text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{project.text}</p>

                                <div className="flex space-x-3">
                                    {/* CSS hover scale — no motion wrapper */}
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground/80 hover:text-primary hover:scale-125 transition-all duration-200"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground/80 hover:text-primary hover:scale-125 transition-all duration-200"
                                    >
                                        <GitFork size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    <a
                        href="https://github.com/Moskov-1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="space-btn w-fit inline-flex items-center mx-auto gap-2 hover:scale-105 hover:-translate-y-0.5 transition-transform active:scale-95"
                    >
                        My Github
                        {/* CSS animation — no motion instance, no JS timer */}
                        <ArrowRight size={16} className="animate-[nudge_1.5s_ease-in-out_infinite]" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};