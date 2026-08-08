import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Mail, Github, Linkedin, ChevronRight, X, LayoutGrid } from "lucide-react";
import { cn } from "../lib/utils";
import resumePdf from "../assets/pdf/CV_Raihan_Ahmed.pdf";

const links = [
    { icon: FileText, label: "Resume", href: resumePdf, color: "hover:text-emerald-500 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]" },
    { icon: Mail, label: "Email", href: "mailto:raihanrony015@gmail.com", color: "hover:text-rose-500 hover:border-rose-500 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]" },
    { icon: Github, label: "GitHub", href: "https://github.com/Moskov-1", color: "hover:text-zinc-300 hover:border-zinc-300 hover:shadow-[0_0_15px_rgba(212,212,216,0.3)]" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/raihan-rony-a461121a1/", color: "hover:text-sky-500 hover:border-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]" }
];

export const QuickAccess = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Wheel Geometry
    const radius = 130;
    // Angles for the left-facing semi-circle (0 is straight left)
    const angles = [-65, -22, 22, 65]; // degrees relative to left

    return (
        <>
            {/* Desktop Version: Game-style Half Wheel */}
            {!isMobile && (
                <div 
                    className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex items-center justify-end"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {/* The remarkable trigger tab */}
                    <div className="relative w-12 h-28 bg-primary text-primary-foreground rounded-l-3xl flex items-center justify-center cursor-pointer shadow-[0_0_20px_hsl(var(--primary)/0.5)] group transition-all duration-300 hover:w-14 overflow-hidden border-y border-l border-primary-foreground/20">
                        {/* Constant pulse ring */}
                        <div className="absolute inset-0 rounded-l-3xl animate-ping opacity-20 bg-primary-foreground"></div>
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-y-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

                        <div className="relative z-10">
                            <ChevronRight className={`transition-transform duration-500 ${isOpen ? "rotate-0" : "rotate-180"}`} />
                        </div>
                    </div>

                    {/* Invisible Bridge to maintain hover state when moving mouse to icons */}
                    {isOpen && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-transparent cursor-default"></div>
                    )}

                    {/* The Wheel */}
                    <AnimatePresence>
                        {isOpen && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none">
                                {links.map((link, index) => {
                                    const angleRad = (angles[index] * Math.PI) / 180;
                                    // X is negative because it expands to the left
                                    const x = -radius * Math.cos(angleRad);
                                    const y = radius * Math.sin(angleRad);
                                    
                                    const Icon = link.icon;

                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            download={link.label === "Resume" ? "CV_Raihan_Ahmed.pdf" : undefined}
                                            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                                            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: 45 }}
                                            animate={{ x, y, opacity: 1, scale: 1, rotate: 0 }}
                                            exit={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: 45 }}
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 300, 
                                                damping: 22, 
                                                delay: index * 0.05 
                                            }}
                                            className={cn(
                                                "absolute top-1/2 right-0 -mt-6 -mr-6 w-12 h-12 bg-card border-[2px] border-primary/50 rounded-full flex items-center justify-center pointer-events-auto text-foreground transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group/item hover:border-primary",
                                                link.color
                                            )}
                                            title={link.label}
                                        >
                                            <Icon size={20} className="transition-transform duration-300 group-hover/item:scale-110" />
                                            {/* Glowing Dot behind Icon */}
                                            <div className="absolute inset-0 bg-current opacity-0 group-hover/item:opacity-20 rounded-full blur-md transition-opacity duration-300 -z-10"></div>
                                            
                                            {/* Tooltip (now on the left) */}
                                            <span className="absolute right-full mr-4 px-2 py-1 bg-card/90 backdrop-blur-md border border-border/50 rounded-md text-xs font-semibold text-foreground opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
                                                {link.label}
                                            </span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Mobile Version: Floating Action Menu */}
            {isMobile && (
                <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-center justify-end">
                    <AnimatePresence>
                        {isOpen && (
                            <div className="flex flex-col items-center gap-4 mb-4">
                                {links.map((link, index) => {
                                    const Icon = link.icon;
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            download={link.label === "Resume" ? "CV_Raihan_Ahmed.pdf" : undefined}
                                            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                                            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                            initial={{ opacity: 0, y: 30, scale: 0.5 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 30, scale: 0.5 }}
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 400, 
                                                damping: 25,
                                                delay: (links.length - 1 - index) * 0.05 
                                            }}
                                            className={cn(
                                                "w-12 h-12 bg-card/95 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-muted-foreground shadow-xl active:scale-90 transition-all duration-300",
                                                link.color
                                            )}
                                        >
                                            <Icon size={20} />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                    
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)] active:scale-90 transition-all duration-300 z-10"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 135 : 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        >
                            {isOpen ? <X size={26} /> : <LayoutGrid size={24} />}
                        </motion.div>
                    </button>
                </div>
            )}
        </>
    );
};
