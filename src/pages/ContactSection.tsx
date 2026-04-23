import { motion } from "framer-motion";
import { GitFork, LocateFixed, LucideNetwork, MailCheck, PhoneForwarded, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { toast } from "../hooks/use-toast";
import { fadeUp, slideLeft, slideRight, staggerNormal, viewport } from "../lib/animations";

const contactInfo = [
    {
        icon: MailCheck,
        label: "Email",
        display: "raihanrony015@gmail.com",
        href: "mailto:raihanrony015@gmail.com",
    },
    {
        icon: PhoneForwarded,
        label: "Phone",
        display: "(+88)016017-94897",
        href: "tel:+8801601794897",
    },
    {
        icon: LocateFixed,
        label: "Location",
        display: "ECB, DHAKA - 1206",
        href: "https://maps.google.com/?q=ECB+Chattar,+Dhaka+1206",
        external: true,
    },
] as const;

export const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name:    formData.get("name"),
            email:   formData.get("email"),
            message: formData.get("message"),
        };

        try {
            // Set VITE_CONTACT_WEBHOOK_URL in your .env file / Vercel env vars
            const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL as string;

            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast({
                    title: "Message sent!",
                    description: "Thank you for your message. I'll get back to you soon.",
                });
                e.currentTarget.reset();
            } else {
                throw new Error("Failed to send message");
            }
        } catch {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again or email me directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 px-4 relative bg-secondary/30" id="contact">
            <div className={cn("container mx-auto max-w-5xl")}>

                {/* Heading */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-12"
                >
                    <h2 className={cn("text-3xl md:text-4xl", "font-bold mb-4")}>
                        Get in <span className="text-primary">Touch</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        If you have any questions or would like to work together, please don't hesitate to reach out.
                        I'm always open to new opportunities and collaborations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Left — contact info slides from left */}
                    <motion.div
                        className="space-y-8"
                        variants={staggerNormal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        <motion.h3 className="text-2xl font-semibold" variants={slideLeft}>
                            Contact Info
                        </motion.h3>

                        <div className="space-y-5">
                            {contactInfo.map(({ icon: Icon, label, display, href, external }) => (
                                <motion.div
                                    key={label}
                                    className="flex items-start space-x-4"
                                    variants={slideLeft}
                                >
                                    <motion.div
                                        className="p-3 rounded-full bg-primary/10 shrink-0"
                                        whileHover={{ scale: 1.15, rotate: 8 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Icon className="h-6 w-6 text-primary" />
                                    </motion.div>
                                    <div>
                                        <h4 className="font-medium">{label}</h4>
                                        <a
                                            href={href}
                                            {...(external
                                                ? { target: "_blank", rel: "noopener noreferrer" }
                                                : {})}
                                            className={cn(
                                                "text-muted-foreground hover:text-primary",
                                                "transition-colors duration-300"
                                            )}
                                        >
                                            {display}
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social links */}
                        <motion.div className="pt-4" variants={slideLeft}>
                            <h4 className="mb-4 font-medium">Follow Me</h4>
                            <div className="flex space-x-4">
                                {[
                                    { href: "https://www.linkedin.com/in/raihan-rony-a461121a1/", icon: LucideNetwork, label: "LinkedIn" },
                                    { href: "https://github.com/Moskov-1",                         icon: GitFork,       label: "GitHub"   },
                                ].map(({ href, icon: Icon, label }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <div className="p-3 rounded-full bg-primary/10">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — form slides from right */}
                    <motion.div
                        className="bg-card p-8 rounded-lg shadow-xs"
                        variants={slideRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {[
                                { id: "name",    label: "Your Name",    type: "text",  placeholder: "Pedro Machado…"           },
                                { id: "email",   label: "Your Email",   type: "email", placeholder: "john@gmail.com"            },
                            ].map(({ id, label, type, placeholder }) => (
                                <motion.div
                                    key={id}
                                    whileFocus={{ scale: 1.01 }}
                                >
                                    <label htmlFor={id} className="block text-sm font-medium mb-2">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        id={id}
                                        name={id}
                                        required
                                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-shadow duration-200"
                                        placeholder={placeholder}
                                    />
                                </motion.div>
                            ))}

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none transition-shadow duration-200"
                                    placeholder="Hello, I'd like to talk about…"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn("space-btn w-full flex items-center justify-center gap-2")}
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? "Sending…" : "Send Message"}
                                <motion.span
                                    animate={isSubmitting
                                        ? { rotate: 360 }
                                        : { x: [0, 3, 0] }
                                    }
                                    transition={isSubmitting
                                        ? { repeat: Infinity, duration: 0.8, ease: "linear" }
                                        : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                                    }
                                >
                                    <Send size={16} />
                                </motion.span>
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};