import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, GitFork } from "lucide-react";
import { useState, useEffect } from "react";

export type ProjectImage = {
    url: string;
    title: string;
};

export type ProjectType = {
    title: string;
    text: string;
    image: string;
    images?: ProjectImage[];
    link?: string;
    github?: string;
    tags: readonly string[];
    frontendLink?: string;
    backendLink?: string;
    frontendGithub?: string;
    backendGithub?: string;
};

interface ProjectModalProps {
    project: ProjectType | null;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (project && (project.images?.length || 0) > 1) {
                if (e.key === 'ArrowLeft') handlePrev();
                if (e.key === 'ArrowRight') handleNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [project, currentImageIndex]);

    // Body scroll lock
    useEffect(() => {
        if (!project) return;
        setCurrentImageIndex(0);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [project]);

    if (!project) return null;

    const images = project.images && project.images.length > 0 
        ? project.images 
        : [{ url: project.image, title: project.title }];

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <AnimatePresence>
			{/* Main Modal Backdrop */}
            <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/80 backdrop-blur-md"
            >
                <motion.div
                    key="modal-content"
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-6xl h-[85vh] sm:h-[80vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Close Button Mobile (absolute top right over everything) */}
                    <button
                        onClick={onClose}
                        className="md:hidden absolute top-4 right-4 z-50 p-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-foreground hover:bg-background transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Left Side: Content (40% width on desktop) */}
                    <div className="w-full md:w-[40%] h-full flex flex-col bg-card relative border-b md:border-b-0 md:border-r border-border">
                        {/* Scrollable Content Area */}
                        <div className="p-6 md:p-10 overflow-y-auto no-scrollbar flex-1 flex flex-col custom-scrollbar">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                {project.title}
                            </h2>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20 tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-3 text-foreground/90">About the Project</h3>
                                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                                    {project.text}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-4 mt-auto w-full">
                                {project.frontendLink ? (
                                    <a
                                        href={project.frontendLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-semibold shadow-md shadow-primary/20 text-sm"
                                    >
                                        <ExternalLink size={18} />
                                        Frontend Demo
                                    </a>
                                ) : project.link ? (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-semibold shadow-md shadow-primary/20"
                                    >
                                        <ExternalLink size={20} />
                                        Live Demo
                                    </a>
                                ) : null}

                                {project.backendLink && (
                                    <a
                                        href={project.backendLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors font-semibold border border-border text-sm"
                                    >
                                        <ExternalLink size={18} />
                                        Backend API
                                    </a>
                                )}

                                {project.frontendGithub ? (
                                    <a
                                        href={project.frontendGithub}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors font-semibold border border-border text-sm"
                                    >
                                        <GitFork size={18} />
                                        Frontend Code
                                    </a>
                                ) : project.github ? (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors font-semibold border border-border"
                                    >
                                        <GitFork size={20} />
                                        Source Code
                                    </a>
                                ) : null}

                                {project.backendGithub && (
                                    <a
                                        href={project.backendGithub}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors font-semibold border border-border text-sm"
                                    >
                                        <GitFork size={18} />
                                        Backend Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Image Carousel (60% width on desktop) */}
                    <div className="w-full md:w-[60%] h-64 md:h-full relative bg-black/95 flex items-center justify-center group">
                        {/* Desktop Close Button */}
                        <div className="hidden md:flex absolute top-6 right-6 z-10">
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/20 bg-white/10 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Title of current image */}
                        <div className="absolute top-6 left-6 z-10 text-white/80 font-medium bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md text-sm border border-white/10">
                            {images[currentImageIndex].title}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={images[currentImageIndex].url}
                                alt={images[currentImageIndex].title}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-contain"
                            />
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/70 hover:text-white transition-all duration-200 opacity-100 md:opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/70 hover:text-white transition-all duration-200 opacity-100 md:opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {/* Interactive Carousel Indicators */}
                        {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                            currentImageIndex === idx 
                                                ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
                                                : "w-2.5 bg-white/50 hover:bg-white/80"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
