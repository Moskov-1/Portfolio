import { cn } from "../lib/utils";

export const SkillsSection = () => {

    const skills = [
        {name: "php", level: 'Production++', category: 'Languages'},
        {name: "python", level: 'Production', category: 'Languages'},
        {name: "javascript", level: 'competent', category: 'Languages'},
        {name: "c++", level: '(DSA * Algorithms) ++', category: 'Languages'},
        {name: "lua", level: 'Begineer', category: 'Languages'},

        {name: "Laravel", level: 'Production++', category: 'Backend'},
        {name: "Django", level: 'Production', category: 'Backend'},
        {name: "React", level: 'competent', category: 'Frontend'},

        {name: "Docker", level: 'competent', category: 'DevOps'},
        {name: "EC2", level: 'competent', category: 'DevOps'},
        {name: "Linux", level: 'Production', category: 'DevOps'},
        {name: "Git", level: 'Competent', category: 'DevOps'},

        {name: "Pytorch", level: 'competent', category: 'ML'},
        {name: "Scikit-Learn", level: 'competent', category: 'ML'},
        {name: "PostgreSQL", level: 'Competent', category: 'SQL'},
    ];

    return (
        <section id='skills' 
        className="py-24 px-4 relative bg-secondary/30"
        >
            <div className={cn("container mx-auto",
                'max-w-5xl'
            )}>
                <h2 className={cn("text-3xl md:text-4xl",
                'font-bold text-center mb-12'
                )}
                >
                   <span className="text-primary"> My</span> Skills
                </h2>
                <div className={cn("grid grid-cols-1 sm:grid-cols-2",
                    'lg:grid-cols-3 gap-6'
                )}>
                    {skills.map((skill, key)=>(
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};