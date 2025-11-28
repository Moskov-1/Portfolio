import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
export const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if(localTheme) {
            setTheme(localTheme);
            document.documentElement.classList.add(localTheme);
        }
    }, []);
    const toggleTheme = () => {
        if(theme === 'light') {   
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    }
    return <button onClick={toggleTheme}
        className={cn("fixed max-sm:hidden top-5 right-5",
            "z-50 p-2 rounded-full transition-colors duration-300",
            "focus:outline-hidden"
        )}
        >
        {theme !== 'light' ? (<Sun className="w-6 h-6 text-yellow-500" />) 
        : 
        (<Moon className="w-6 h-6 text-blue-800" />)
        }
    </button>
}