import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { staggerFast, fadeIn } from "../lib/animations";

const navItems = [
    { name: "Home",    path: "#hero"    },
    { name: "About",   path: "#about"   },
    { name: "Skills",  path: "#skills"  },
    { name: "Contact", path: "#contact" },
];

// Individual nav link variant (used as stagger child)
const navLinkVariant = {
    hidden:  { opacity: 0, y: -12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export const Navbar = () => {
    const [isScrolled,  setIsScrolled]  = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        // Navbar slides down from above on initial load
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={cn(
                "fixed w-full z-40 transition-all duration-300",
                isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-md" : "py-5 bg-transparent"
            )}
        >
            <div className={cn("container flex", "items-center justify-between")}>
                {/* Logo */}
                <motion.a
                    href="#hero"
                    className={cn("text-xl", "font-bold text-primary flex items-center gap-2")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="relative z-10">
                        <span className="text-glow text-foreground mr-2">Raihan</span>
                        Rony
                    </span>
                </motion.a>

                {/* Desktop nav — stagger children on mount */}
                <motion.div
                    className="hidden md:flex gap-8"
                    variants={staggerFast}
                    initial="hidden"
                    animate="visible"
                >
                    {navItems.map(item => (
                        <motion.a
                            key={item.name}
                            href={item.path}
                            variants={navLinkVariant}
                            whileHover={{ color: "hsl(var(--primary))", y: -2 }}
                            className={cn(
                                "text-sm font-medium",
                                "transition-colors duration-300 hover:text-primary"
                            )}
                        >
                            {item.name}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Mobile hamburger */}
                <motion.button
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                    )}
                </motion.button>

                {/* Mobile menu overlay — AnimatePresence for mount/unmount animation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                            exit={{   opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-background/95 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            <motion.div
                                variants={staggerFast}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-col items-center gap-8"
                            >
                                {navItems.map(item => (
                                    <motion.a
                                        key={item.name}
                                        href={item.path}
                                        onClick={closeMenu}
                                        variants={fadeIn}
                                        whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                                        whileTap={{ scale: 0.96 }}
                                        className="text-2xl font-semibold hover:text-primary transition-colors duration-300"
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};