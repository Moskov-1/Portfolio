import { ThemeToggle } from "../components/ThemeToggle"
import { StarBackground } from "../components/StarBackground"
import { Navbar } from "../components/Navbar"
import { HeroSection } from "./HeroSection"

export const Home = () => {
    return (
        <>
            <div className="min-h-screen bg-background text-foreground
            overflow-x-hidden">

            <ThemeToggle/>
            <StarBackground />
            {/* Shooting Star Background Effect */}
            <Navbar/>
            <main>
                <HeroSection />
            </main>
            {/* Footer Content */}
            </div>
        </>
    )
} 