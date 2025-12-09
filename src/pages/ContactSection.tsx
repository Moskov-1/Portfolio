import { GitFork, Locate, LocateFixed, LucideNetwork, MailCheck, Phone, PhoneForwarded, Send } from "lucide-react"
import { cn } from "../lib/utils"
import { useState } from "react";

export const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        setTimeout(() => {
        // toast({
        //     title: "Message sent!",
        //     description: "Thank you for your message. I'll get back to you soon.",
        // });
        setIsSubmitting(false);
        }, 1500);
    };
    return (
    <section className="py-24 px-4 relative bg-secondary/30"
    id='contact'>
        <div className={cn("container mx-auto max-w-5xl")}>
            <h2 className={cn("text-3xl md:text-4xl",
                'font-bold text-center mb-4'
            )}>
                Get in <span className="text-primary">Touch</span>
            </h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                If you have any questions or would like to work together, please don't hesitate to reach out.
                I'm always open to new opportunities and collaborations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-6">
                        Contact Info
                    </h3>
                    <div className="space-y-5 justify-center">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <MailCheck className="h-6 w-6 text-primary"/>
                                {" "}
                            </div>
                            <div >
                                <h4 className="font-medium">
                                    Email
                                </h4>
                                <a href="mailto:raihanrony015@gmail.com"
                                className={cn("text-muted-foreground hover:text-primary",
                                    'transition-colors duration-300'
                                )}
                                >
                                    raihanrony015@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <PhoneForwarded className="h-6 w-6 text-primary"/>
                                {" "}
                            </div>
                            <div >
                                <h4 className="font-medium">
                                    Phone
                                </h4>
                                <a href="tel:+8801601794897"
                                className={cn("text-muted-foreground hover:text-primary",
                                    'transition-colors duration-300'
                                )}
                                >
                                    (+88)016017-94897
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <LocateFixed className="h-6 w-6 text-primary"/>
                                {" "}
                            </div>
                            <div >
                                <h4 className="font-medium">
                                    Location
                                </h4>
                                <a href="mailto:raihanrony015@gmail.com"
                                className={cn("text-muted-foreground hover:text-primary",
                                    'transition-colors duration-300'
                                )}
                                >
                                    ECB, DHAKA - 1206
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8">
                        <h4>Follow Me</h4>
                        {/* <div className="flex space-x-4 justify-center">
                            <a href="">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary"/>
                                    {" "}
                                </div>
                            </a>
                        </div> */}
                        <div className="flex space-x-4 justify-center">
                            <a href="https://www.linkedin.com/in/raihan-rony-a461121a1/" target="_blank">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <LucideNetwork className="h-6 w-6 text-primary"/>
                                    {" "}
                                </div>
                            </a>
                            <a href="https://github.com/Moskov-1" target="_blank">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <GitFork className="h-6 w-6 text-primary"/>
                                    {" "}
                                </div>
                            </a>
                            
                        </div>
                    </div>
                </div>
                <div className="bg-card p-8 rounded-lg shadow-xs">
                    <h3 className="text-2xl font-semibold mb-6">
                        Send a Message
                    </h3>
                     <form className="space-y-6">
                        <div>
                            <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2"
                            >
                            {" "}
                            Your Name
                            </label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                            placeholder="Pedro Machado..."
                            />
                        </div>

                        <div>
                            <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                            >
                            {" "}
                            Your Email
                            </label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                            placeholder="john@gmail.com"
                            />
                        </div>

                        <div>
                            <label
                            htmlFor="message"
                            className="block text-sm font-medium mb-2"
                            >
                            {" "}
                            Your Message
                            </label>
                            <textarea
                            id="message"
                            name="message"
                            required
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                            placeholder="Hello, I'd like to talk about..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                            "space-btn w-full flex items-center justify-center gap-2"
                            )}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <Send size={16} />
                        </button>
                        </form>
                </div>
            </div>
        </div>
    </section>)
}