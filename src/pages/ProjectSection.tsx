import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitFork } from "lucide-react";
import { fadeUp, staggerSlow, cardPop, viewport } from "../lib/animations";
import { useState } from "react";
import { ProjectModal } from "../components/ProjectModal";
import type { ProjectType } from "../components/ProjectModal";
import { ExpandableText } from "../components/ExpandableText";
import ngoFront1 from "../assets/project-imgs/ngo/front-1.png";
import ngoDash1 from "../assets/project-imgs/ngo/dash-1.png";
import armandoDiagram from "../assets/project-imgs/armando/armando-diagram.png";
import armando1 from "../assets/project-imgs/armando/Armando-1.png";
import armando1_1 from "../assets/project-imgs/armando/Armando-1-1.png";
import armando2 from "../assets/project-imgs/armando/Armando-2.png";
import armando3 from "../assets/project-imgs/armando/Armando-3.png";
import minikubeDiagram from "../assets/project-imgs/k8s/minikube-diagram.png";

const projects: ProjectType[] = [
    {
        title:  "District NGO Portal",
        text:   "A comprehensive platform designed for non-governmental organizations to showcase their social activities and manage administrative workflows. Developed a responsive frontend with React hosted on Vercel, and a robust Laravel API backend running inside Docker containers on Render. The application leverages a PostgreSQL database and integrates Supabase S3 bucket for media storage, providing smooth uploading and management of social activity feeds.",
        image:  ngoFront1,
        images: [
            { url: ngoFront1, title: "Social Activities Showcase - Landing Page" },
            { url: ngoDash1, title: "Admin Management & Activity Dashboard" }
        ],
        link:   "https://social-ngo-project.vercel.app/",
        github: "https://github.com/Moskov-1/social_showcasing_react_project",
        frontendLink: "https://social-ngo-project.vercel.app/",
        frontendGithub: "https://github.com/Moskov-1/social_showcasing_react_project",
        backendLink: "https://social-activity-admin.onrender.com/",
        backendGithub: "https://github.com/RaihanRony-1917/district-ngo",
        tags:   ["React", "Laravel", "Docker", "Supabase S3", "PostgreSQL", "Vercel", "Render"],
    },
    {
        title:  "ChannelGum Account Marketplace",
        text:   "A dynamic, secure account marketplace allowing account owners to list digital assets and receive offers from potential buyers. Managed the server infrastructure and developed the robust Laravel backend, interactive admin/user dashboards, and transactional features. The platform is built using a hybrid Next.js + Laravel stack, leveraging Laravel Reverb for real-time WebSocket communication (e.g., deal negotiations and instant status updates) and NowPayments integration for automated crypto transactions.",
        image:  armandoDiagram,
        images: [
            { url: armandoDiagram, title: "System Architecture & Flow Diagram" },
            { url: armando1, title: "Marketplace Homepage & Account Listings" },
            { url: armando1_1, title: "Offers & Deal Negotiation Interface" },
            { url: armando2, title: "NowPayments Crypto Payment Integration" },
            { url: armando3, title: "Admin Management & Server Dashboard" }
        ],
        link:   "https://channelgum.com/",
        tags:   ["Next.js", "Laravel", "Laravel Reverb", "WebSockets", "NowPayments", "Crypto Payments", "Server Management"],
    },
    {
        title:  "Laravel Docker & Kubernetes Experiment",
        text:   "A hands-on experiment for dockerizing Laravel applications. Currently running a Laravel application with a PHP server and MySQL database in a Docker container environment. It is designed to run locally using Docker Compose, deployed to Docploy, and orchestrated within a Kubernetes cluster using Minikube.",
        image:  minikubeDiagram,
        images: [
            { url: minikubeDiagram, title: "Minikube Laravel Architecture Diagram" },
        ],
        github: "https://github.com/Moskov-1/minikube-laravel-experiment--docker-compose-k8s-",
        tags:   ["Laravel", "Docker", "Docker Compose", "Kubernetes", "Minikube", "Docploy", "MySQL"],
    },
];

export const ProjectSection = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

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
                            onClick={() => setSelectedProject(project)}
                            className="group bg-card rounded-lg overflow-hidden shadow-xs border border-border transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                                    <span className="text-foreground font-medium bg-background/80 border border-border px-3 py-1 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        View Details
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <ExpandableText text={project.text} maxLength={80} className="text-muted-foreground text-sm mb-4" />
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-primary/20 text-primary rounded-md px-2 py-1 text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    {project.frontendLink ? (
                                        <a
                                            href={project.frontendLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            title="Frontend Demo"
                                            className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-200 flex items-center gap-1 text-xs font-semibold"
                                        >
                                            <ExternalLink size={16} />
                                            <span>FE Demo</span>
                                        </a>
                                    ) : project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            title="Live Demo"
                                            className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-200 flex items-center gap-1 text-xs font-semibold"
                                        >
                                            <ExternalLink size={16} />
                                            <span>Demo</span>
                                        </a>
                                    ) : null}

                                    {project.backendLink && (
                                        <a
                                            href={project.backendLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            title="Backend API"
                                            className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-200 flex items-center gap-1 text-xs font-semibold border-l border-border pl-3"
                                        >
                                            <ExternalLink size={16} />
                                            <span>BE API</span>
                                        </a>
                                    )}

                                    {project.frontendGithub ? (
                                        <a
                                            href={project.frontendGithub}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            title="Frontend Code"
                                            className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-200 flex items-center gap-1 text-xs font-semibold border-l border-border pl-3"
                                        >
                                            <GitFork size={16} />
                                            <span>FE Git</span>
                                        </a>
                                    ) : project.github ? (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            title="Source Code"
                                            className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-200 flex items-center gap-1 text-xs font-semibold"
                                        >
                                            <GitFork size={16} />
                                            <span>Git</span>
                                        </a>
                                    ) : null}

                                    {project.backendGithub && (
                                        <a
                                            href={project.backendGithub}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            title="Backend Code"
                                            className="text-foreground/80 hover:text-primary hover:scale-110 transition-all duration-200 flex items-center gap-1 text-xs font-semibold border-l border-border pl-3"
                                        >
                                            <GitFork size={16} />
                                            <span>BE Git</span>
                                        </a>
                                    )}
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
                        <ArrowRight size={16} className="animate-[nudge_1.5s_ease-in-out_infinite]" />
                    </a>
                </motion.div>

            </div>

            <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </section>
    );
};