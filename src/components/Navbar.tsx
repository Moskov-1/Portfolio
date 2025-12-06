import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const navItems = [
    {name: "Home", path: "#home"},
    {name: "About", path: "#about"},
    {name: "Skills", path: "#Projects"},
    {name: "Contact", path: "#contact"},
];
export const Navbar = () => {
    const [isScrolled, 
        setIsScrolled] = useState(false);
    
    const [isMenuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })    

    return (
    <nav 
    className={cn("fixed w-full z-40",
        'transition-all duration-300',
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-md' : 'py-5 bg-transparent'
    )}>
        <div className={cn("container flex",
            "items-center justify-between"
        )}>
            <a href="#hero" className={cn('text-xl',
                'font-bold text-primary flex items-center gap-2',
            )}>
                <span className="relative z-10">
                    <span className="text-glow text-foreground mr-2">
                        {" "} Raihan
                    </span>
                    Rony
                </span>
            </a>
            {/* desktop rez */}
            <div className="hidden md:flex gap-8">
                {navItems.map((items,key)=>(
                    <a key={key} href={items.path} 
                    className={cn("text-sm font-medium ",
                    "transition-colors duration-300 ",
                    "hover:text-primary")}>
                        {items.name}
                    </a>
                ))}
            </div>

            {/* mobile rez */}
            <button onClick={() => setIsScrolled((prev)=>!prev)}
                className="md:hidden p-2 text-foreground z-50"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
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

            <div className={cn('fixed inset-0',
                'bg-background/95 background-blur-md',
                'z-40 flex flex-col items-center justify-center',
                'transition-all duration-300 md:hidden',
                isScrolled ? 'opacity-100 visible pointer-events-auto' 
                : 'opacity-0 invisible pointer-events-none'
            )}>
            </div>
            
        </div>

    </nav>);
}