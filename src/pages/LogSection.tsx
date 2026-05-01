import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, viewport } from "../lib/animations";
import { ExpandableText } from "../components/ExpandableText";
import { LogModal } from "../components/LogModal";
import type { LogType } from "../components/LogModal";

const logs: LogType[] = [
    {
        title: "Containerizing with Docker",
        date: "May 2026",
        text: "Recently, I took a deep dive into Docker to streamline deployment processes. I containerized several microservices, set up docker-compose for local development, and learned how to optimize image sizes using multi-stage builds. It's completely changed the way I look at environment consistency.\n\nHere are some of the key takeaways:\n- Multi-stage builds reduce image size by up to 80%.\n- Docker networks isolate internal microservices completely.\n- Alpine linux is your best friend.",
        image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=1000",
        images: [
            "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
        ],
        tags: ["Docker", "DevOps", "Microservices"]
    },
    {
        title: "Exploring CI/CD Pipelines",
        date: "April 2026",
        text: "Set up my first automated CI/CD pipeline using GitHub Actions. I configured automated testing, linting, and deployment scripts to Vercel and an AWS EC2 instance. The peace of mind that comes with automated deployments is incredible.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000",
        images: [
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1000"
        ],
        tags: ["CI/CD", "GitHub Actions", "AWS"]
    },
    {
        title: "Deep Dive into System Design",
        date: "March 2026",
        text: "Spent the past few weeks reading about scalable system architecture. I implemented a highly available load balancer setup and explored caching strategies using Redis to optimize database queries. Learning to design for scale is fascinating.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        images: [
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000"
        ],
        tags: ["System Design", "Redis", "Architecture"]
    }
];

export const LogSection = () => {
    const [selectedLog, setSelectedLog] = useState<LogType | null>(null);
    return (
        <section id="logs" className="py-24 px-4 relative bg-muted/30">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Developer <span className="text-primary">Logs</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Documenting my ongoing journey, learnings, and cool tech I've been experimenting with recently.
                    </p>
                </motion.div>

                {/* Scrollable Container Wrapper */}
                <div className="relative group/scroll-container">
                    {/* Top Glow Indicator */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none z-20 transition-opacity duration-500 opacity-50 group-hover/scroll-container:opacity-100"></div>

                    <div className="max-h-[800px] overflow-y-auto no-scrollbar mask-y py-8 px-1 md:px-4 relative z-10">
                        <div className="space-y-16 pb-12">
                            {logs.map((log, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ ...viewport, margin: "-50px" }}
                                    onClick={() => setSelectedLog(log)}
                                    className="group cursor-pointer flex flex-col md:flex-row gap-0 items-stretch bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    {/* Left Side: Big Image */}
                                    <div className="w-full md:w-[45%] h-64 md:h-auto min-h-[300px] overflow-hidden relative">
                                        <img
                                            src={log.image}
                                            alt={log.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/20 via-transparent to-card/90 md:to-card/100"></div>
                                    </div>

                                    {/* Right Side: Title and Text */}
                                    <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center relative z-10 bg-card">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-sm text-muted-foreground font-mono bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                                                {log.date}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground transition-colors group-hover:text-primary">
                                            {log.title}
                                        </h3>
                                        
                                        <ExpandableText 
                                            text={log.text} 
                                            maxLength={120} 
                                            className="text-muted-foreground leading-relaxed mb-8" 
                                        />
                                        
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {log.tags.map(tag => (
                                                <span key={tag} className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Glow Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent pointer-events-none z-20 flex items-end justify-center pb-6 transition-opacity duration-500 opacity-80 group-hover/scroll-container:opacity-100">
                        {/* Subtle bouncing arrow to suggest scrolling */}
                        <div className="animate-bounce text-primary/70 bg-background/50 backdrop-blur-sm p-2 rounded-full border border-primary/20 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <LogModal log={selectedLog} onClose={() => setSelectedLog(null)} />
        </section>
    );
};
