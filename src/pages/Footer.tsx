import { motion } from "framer-motion";
import { ArrowBigUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { fadeUp, viewport } from "../lib/animations";

export const Footer = () => {
    const lenis = useLenis();

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo("#hero");
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <motion.footer
            className="py-12 px-4 bg-card relative border border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
        >
            <p className="text-muted-foreground">
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-primary font-medium">Raihan</span> Rony :3
            </p>

            <motion.a
                href="#hero"
                onClick={handleScrollToTop}
                className="p-2 rounded-full bg-primary/20 hover:bg-primary/60 text-primary transition-colors"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Back to top"
            >
                <ArrowBigUp size={20} />
            </motion.a>
        </motion.footer>
    );
};