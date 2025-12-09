import { BriefcaseBusiness, Code, User } from "lucide-react";
import { cn } from "../lib/utils";

export const AboutMe = () => {
    return (
        <div id='about'
            className="py-24 px-4 relative"
        >
            {" "}
            <div className={
                cn("container mx-auto",
                    'max-w-5xl'
                )}>
                <h2 className={cn("text-3xl mb-12",
                    'md:text-4xl font-bold text-center'
                )}>
                    About<span className="text-primary ml-2">
                        Me
                    </span>
                </h2>
                <div className="grid grid-cols-1 mdLgrid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3>Passionate about Engineering and problem solving</h3>
                        <p className="text-muted-foreground">
                            With a degree in Information and Communication Techonology, and a years worth
                            experience in web development in general, I specilize in performance based systems.
                            My goal is to make robust, scalable systems, and automate tasks to keep production running.
                        </p>
                        <p className="text-muted-foreground">
                            With a degree in Information and Communication Techonology, and a years worth
                            experience in web development in general, I specilize in performance based systems.
                            My goal is to make robust, scalable systems, and automate tasks to keep production running.
                        </p>
                        <div className={cn("flex flex-col",
                            'sm:flex-row gap-4 justify-center'
                        )}>
                            <a href="#contact"
                                className="space-btn"
                            >{" "}
                                Touch me</a>
                            <a href="#contact"
                                className={cn("px-6 py-2 rounded-full border",
                                    'border-primary text-primary hover:bg-primary/10',
                                    'transition-colors duration-300'
                                )}
                            >My CV</a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className='h-6 w-6 text-primary' />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Backend Engineer</h4>
                                    <p className="text-muted-foreground">March 2025 - Present</p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className='h-6 w-6 text-primary' />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Backend Engineer</h4>
                                    <p className="text-muted-foreground">March 2025 - Present</p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <BriefcaseBusiness className='h-6 w-6 text-primary' />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Backend Engineer</h4>
                                    <p className="text-muted-foreground">March 2025 - Present</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
};