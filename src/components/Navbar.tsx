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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })    

    return (<nav 
    className={cn("fixed w-full z-40",
        'transition-all duration-300',
    )}>


    </nav>);
}