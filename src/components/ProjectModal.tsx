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
    link: string;
    github: string;
    tags: readonly string[];
};

interface ProjectModalProps {
    project: ProjectType | null;
    onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (lightboxIndex !== null) setLightboxIndex(null);
                else onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, onClose]);

    if (!project) return null;

    const images = project.images && project.images.length > 0 
        ? project.images 
        : [{ url: project.image, title: project.title }];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % images.length);
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
        }
    };

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AnimatePresence>
            {/* Main Modal Backdrop */}
            <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm"
            >
                <motion.div
                    key="modal-content"
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-5 sm:p-6 border-b border-border/50 bg-muted/30">
                        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                            {project.title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-foreground/90">About the Project</h3>
                                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                                        {project.text}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-2">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-semibold shadow-md shadow-primary/20"
                                    >
                                        <ExternalLink size={20} />
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors font-semibold border border-border"
                                    >
                                        <GitFork size={20} />
                                        Source Code
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-4 text-foreground/90">Gallery</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setLightboxIndex(idx)}
                                            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-border shadow-sm"
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                <span className="text-foreground font-semibold bg-background/80 border border-border px-4 py-1.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                    View Image
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        key="lightbox-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxIndex(null)}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                    >
                        {/* Top left title */}
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-4 sm:top-6 left-4 sm:left-8 text-white text-lg sm:text-xl font-semibold drop-shadow-lg z-[70] max-w-[70vw] truncate"
                        >
                            {images[lightboxIndex].title}
                        </motion.div>

                        {/* Top right close */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setLightboxIndex(null)}
                            className="absolute top-4 sm:top-6 right-4 sm:right-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-200 z-[70]"
                        >
                            <X size={28} />
                        </motion.button>

                        {/* Navigation Buttons */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 text-white/70 hover:text-white hover:scale-110 bg-white/5 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-200 z-[70]"
                                >
                                    <ChevronLeft size={32} className="sm:w-10 sm:h-10" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 text-white/70 hover:text-white hover:scale-110 bg-white/5 hover:bg-white/20 rounded-full backdrop-blur-md transition-all duration-200 z-[70]"
                                >
                                    <ChevronRight size={32} className="sm:w-10 sm:h-10" />
                                </button>
                            </>
                        )}

                        {/* Image */}
                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-[90vw] h-[80vh] flex items-center justify-center p-4 sm:p-12"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={images[lightboxIndex].url}
                                alt={images[lightboxIndex].title}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none"
                            />
                        </motion.div>
                        
                        {/* Image Counter */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-white/10 px-5 py-2 rounded-full backdrop-blur-md tracking-wider text-sm sm:text-base border border-white/10"
                        >
                            {lightboxIndex + 1} / {images.length}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AnimatePresence>
    );
}
