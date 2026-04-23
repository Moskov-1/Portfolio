import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const navItems = [
    { name: "Home",    path: "#hero"    },
    { name: "About",   path: "#about"   },
    { name: "Skills",  path: "#skills"  }, // Fixed: was "#Projects"
    { name: "Contact", path: "#contact" },
];

export const Navbar = () => {
    const [isScrolled,  setIsScrolled]  = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // ← Fixed: missing dep array caused listener leak on every render

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav
            className={cn(
                "fixed w-full z-40 transition-all duration-300",
                isScrolled ? "py-3 bg-background/80 backdrop-blur-md" : "py-5 bg-transparent"
            )}
        >
            <div className={cn("container flex", "items-center justify-between")}>
                <a
                    href="#hero"
                    className={cn("text-xl", "font-bold text-primary flex items-center gap-2")}
                >
                    <span className="relative z-10">
                        <span className="text-glow text-foreground mr-2">Raihan</span>
                        Rony
                    </span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex gap-8">
                    {navItems.map(item => (
                        <a
                            key={item.name}
                            href={item.path}
                            className={cn(
                                "text-sm font-medium",
                                "transition-colors duration-300 hover:text-primary"
                            )}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
                </button>

                {/* Mobile menu overlay — now has links */}
                <div
                    className={cn(
                        "fixed inset-0 bg-background/95 backdrop-blur-md",
                        "z-40 flex flex-col items-center justify-center gap-8",
                        "transition-all duration-300 md:hidden",
                        isMenuOpen
                            ? "opacity-100 visible pointer-events-auto"
                            : "opacity-0 invisible pointer-events-none"
                    )}
                >
                    {navItems.map(item => (
                        <a
                            key={item.name}
                            href={item.path}
                            onClick={closeMenu}
                            className="text-2xl font-semibold hover:text-primary transition-colors duration-300"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};