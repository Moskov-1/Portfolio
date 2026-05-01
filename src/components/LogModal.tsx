import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export type LogType = {
    title: string;
    date: string;
    text: string;
    image: string;
    images: string[];
    tags: string[];
};

interface LogModalProps {
    log: LogType | null;
    onClose: () => void;
}

export const LogModal = ({ log, onClose }: LogModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (log) {
            setCurrentImageIndex(0);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [log]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (log && log.images && log.images.length > 1) {
                if (e.key === 'ArrowLeft') handlePrev();
                if (e.key === 'ArrowRight') handleNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [log, currentImageIndex]);

    if (!log) return null;

    const images = log.images || [log.image];

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/80 backdrop-blur-md"
            >
                <motion.div
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

                    {/* Left Side: Image Carousel (60% width on desktop) */}
                    <div className="w-full md:w-[60%] h-64 md:h-full relative bg-black/95 flex items-center justify-center group border-b md:border-b-0 md:border-r border-border">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={images[currentImageIndex]}
                                alt={`${log.title} image ${currentImageIndex + 1}`}
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
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-background/20 hover:bg-background/80 backdrop-blur-md text-white hover:text-primary transition-all duration-200 opacity-100 md:opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-background/20 hover:bg-background/80 backdrop-blur-md text-white hover:text-primary transition-all duration-200 opacity-100 md:opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {/* Interactive Carousel Indicators */}
                        {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                            currentImageIndex === idx 
                                                ? "w-8 bg-primary shadow-[0_0_12px_rgba(167,139,250,0.8)]" 
                                                : "w-2.5 bg-white/60 hover:bg-white"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Side: Content (40% width on desktop) */}
                    <div className="w-full md:w-[40%] h-full flex flex-col bg-card relative">
                        {/* Desktop Close Button */}
                        <div className="hidden md:flex absolute top-6 right-6 z-10">
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="p-6 md:p-10 overflow-y-auto no-scrollbar flex-1 flex flex-col custom-scrollbar">
                            <div className="flex items-center gap-3 mb-6 mt-2 md:mt-4">
                                <span className="text-sm text-primary font-mono bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                                    {log.date}
                                </span>
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground leading-tight">
                                {log.title}
                            </h2>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {log.tags.map(tag => (
                                    <span key={tag} className="text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md border border-border">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed flex-1">
                                <p className="whitespace-pre-wrap text-base md:text-lg">{log.text}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
