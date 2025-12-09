import { ArrowRight, ExternalLink, GitFork } from "lucide-react";

const projects = [
    {
        title: "Project 1",
        text: "Description of Project 1",
        image: "/projects/project1.jpg",
        link: "https://example.com/project1",
        github: "https://github.com/username/project1",
        tags: ["tag1", "tag2", "tag3"]
    },
    {
        title: "Project 2",
        text: "Description of Project 2",
        image: "/projects/project2.jpg",
        link: "https://example.com/project2",
        github: "https://github.com/username/project1",
        tags: ["tag1", "tag2", "tag3"]
    },
    {
        title: "Project 3",
        text: "Description of Project 3",
        image: "/projects/project3.jpg",
        link: "https://example.com/project3",
        github: "https://github.com/username/project1",
        tags: ["tag1", "tag2", "tag3"]
    }
];

export const ProjectSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">

            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    {" "}
                    Featured <span className="text-primary">Projects</span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Here are some of the projects I have worked on.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((project, index) => (
                        <div key={index}
                            className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                            <div className="h-48 overflow-hidden">
                                <img src={project.image} alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="bg-primary/20 text-primary rounded-md px-2 py-1 text-sm font-medium">{tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <p className="text-muted-foregrond text-sm mb-4">{project.text}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        <a href={project.link} target="_blank"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                        <a href={project.github} target="_blank"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <GitFork size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a href="https://github.com/Moskov-1" target="_blank"
                        className="space-btn w-fit flex items-center mx-auto gap-2"
                    >
                        My Github <ArrowRight size={16} />
                    </a>
                </div>
            </div>

        </section>
    );
}