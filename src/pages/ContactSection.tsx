import { motion } from "framer-motion";
import { GitFork, LocateFixed, LucideNetwork, MailCheck, PhoneForwarded, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { toast } from "../hooks/use-toast";
import { fadeUp, slideLeft, slideRight, staggerNormal, viewport } from "../lib/animations";

const contactInfo = [
    { icon: MailCheck,      label: "Email",    display: "raihanrony015@gmail.com",  href: "mailto:raihanrony015@gmail.com",                           external: false },
    { icon: PhoneForwarded, label: "Phone",    display: "(+88)016017-94897",         href: "tel:+8801601794897",                                        external: false },
    { icon: LocateFixed,    label: "Location", display: "ECB, DHAKA - 1206",         href: "https://maps.google.com/?q=ECB+Chattar,+Dhaka+1206",       external: true  },
] as const;

const socials = [
    { href: "https://www.linkedin.com/in/raihan-rony-a461121a1/", icon: LucideNetwork, label: "LinkedIn" },
    { href: "https://github.com/Moskov-1",                         icon: GitFork,       label: "GitHub"   },
] as const;

export const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = { name: formData.get("name"), email: formData.get("email"), message: formData.get("message") };

        try {
            const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL as string | undefined;
            if (!webhookUrl) throw new Error("Webhook not configured");
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast({ title: "Message sent!", description: "Thank you! I'll get back to you soon." });
                e.currentTarget.reset();
            } else throw new Error();
        } catch {
            toast({ title: "Error", description: "Failed to send. Please email me directly.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 px-4 relative bg-secondary/30" id="contact">
            <div className="container mx-auto max-w-5xl">

                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get in <span className="text-primary">Touch</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        If you have any questions or would like to work together, please don't hesitate to reach out.
                        I'm always open to new opportunities and collaborations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Left — slides from left */}
                    <motion.div className="space-y-8" variants={staggerNormal} initial="hidden" whileInView="visible" viewport={viewport}>
                        <motion.h3 className="text-2xl font-semibold" variants={slideLeft}>Contact Info</motion.h3>

                        <div className="space-y-5">
                            {contactInfo.map(({ icon: Icon, label, display, href, external }) => (
                                <motion.div key={label} className="flex items-start space-x-4" variants={slideLeft}>
                                    {/* CSS group-hover — no motion instance */}
                                    <div className="p-3 rounded-full bg-primary/10 shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{label}</h4>
                                        <a
                                            href={href}
                                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                                        >
                                            {display}
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div className="pt-4" variants={slideLeft}>
                            <h4 className="mb-4 font-medium">Follow Me</h4>
                            <div className="flex space-x-4">
                                {socials.map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="p-3 rounded-full bg-primary/10 hover:-translate-y-1 hover:scale-110 transition-transform duration-200"
                                    >
                                        <Icon className="h-6 w-6 text-primary" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — slides from right */}
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
                                { id: "name",  label: "Your Name",  type: "text",  placeholder: "Pedro Machado…" },
                                { id: "email", label: "Your Email", type: "email", placeholder: "john@gmail.com"  },
                            ].map(({ id, label, type, placeholder }) => (
                                <div key={id}>
                                    <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
                                    <input
                                        type={type} id={id} name={id} required
                                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary transition-shadow duration-200"
                                        placeholder={placeholder}
                                    />
                                </div>
                            ))}

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                                <textarea
                                    id="message" name="message" required rows={4}
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none transition-shadow duration-200"
                                    placeholder="Hello, I'd like to talk about…"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "space-btn w-full flex items-center justify-center gap-2",
                                    "hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-transform"
                                )}
                            >
                                {isSubmitting ? "Sending…" : "Send Message"}
                                <Send
                                    size={16}
                                    className={isSubmitting
                                        ? "animate-spin"
                                        : "animate-[nudge_1.5s_ease-in-out_infinite]"
                                    }
                                />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};