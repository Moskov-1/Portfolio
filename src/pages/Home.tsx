import { ThemeToggle } from "../components/ThemeToggle"
import { StarBackground } from "../components/StarBackground"
import { Navbar } from "../components/Navbar"
import { HeroSection } from "./HeroSection"
import { AboutMe } from "./AboutMe"
import { SkillsSection } from "./SkillsSection"
import { ProjectSection } from "./ProjectSection"
import { ContactSection } from "./ContactSection"
import { Footer } from "./Footer"
import { Toaster } from "../ui/toaster"
import { ThemeTransitionProvider } from "../context/ThemeTransitionContext"

export const Home = () => {
    return (
        <ThemeTransitionProvider>
            <div className="min-h-screen bg-background text-foreground
            overflow-x-hidden">

                <ThemeToggle />
                <StarBackground />
                {/* Shooting Star Background Effect */}
                <Navbar />
                <main>
                    <HeroSection />
                    <AboutMe />
                    <SkillsSection />
                    <ProjectSection />
                    <ContactSection />
                </main>
                <Footer />
                <Toaster />
            </div>
        </ThemeTransitionProvider>
    )
}