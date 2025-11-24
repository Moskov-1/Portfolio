import { useState } from "react"
import { Sun, Moon } from "lucide-react";
export const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');
    return <button>
        {theme === 'light' ? <Sun /> : <Moon/>}
    </button>
}