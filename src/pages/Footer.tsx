import { ArrowBigUp } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-card relative border border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
            {" "}
            <p className="text-muted-foreground"> &copy; {new Date().getFullYear()} <span className="text-primary tex-medium">Raihan</span> Rony :3</p>
            <a href="#hero"
            className="p-2 rounded-full bg-primary/20 hover:bg-primary/60 text-primary transition-colors">
                <ArrowBigUp size={20}/>
            </a>
        </footer>
    )
}