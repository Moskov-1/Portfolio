import { useState } from "react";
import { cn } from "../lib/utils";

export const SkillsSection = () => {

    const skills = [
        {name: "php", level: 100, levelZ: 'Production++', category: 'Languages'},
        {name: "python", level: 100, levelZ: 'Production', category: 'Languages'},
        {name: "javascript", level: 10, levelZ: 'competent', category: 'Languages'},
        {name: "c++", level: 10, levelZ: '(DSA * Algorithms) ++', category: 'Languages'},
        {name: "lua", level: 10, levelZ: 'Begineer', category: 'Languages'},

        {name: "Laravel", level: 100, levelZ: 'Production++', category: 'Frameworks'},
        {name: "Django", level: 10, levelZ: 'Production', category: 'Frameworks'},
        {name: "React", level: 10, levelZ: 'competent', category: 'Frameworks'},

        {name: "Docker", level: 100, levelZ: 'competent', category: 'DevOps'},
        {name: "EC2", level: 10, levelZ: 'competent', category: 'DevOps'},
        {name: "Linux", level: 10, levelZ: 'Production', category: 'DevOps'},
        {name: "Git", level: 10, levelZ: 'Competent', category: 'DevOps'},

        {name: "Pytorch", level: 100, levelZ: 'competent', category: 'Tools'},
        {name: "Scikit-Learn", level: 10, levelZ: 'competent', category: 'Tools'},
        {name: "PostgreSQL", level: 10, levelZ: 'Competent', category: 'Tools'},
    ];
    const types = ['All', 'Languages', 'Frameworks', 'DevOps', 'Tools'];
    const [category, setCategory] = useState('All');

    const filteredSkills = category === 'All' ? skills : skills.filter((skill) => skill.category === category);
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
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {types.map((type, key)=>(
                        <button key={key} onClick={() => setCategory(type)}
                        className={cn("bg-card py-2 px-4 rounded-lg shadow-xs card-hover",
                            category === type && 'bg-primary text-primary-foreground'
                        )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className={cn("grid grid-cols-1 sm:grid-cols-2",
                    'lg:grid-cols-3 gap-6'
                )}>
                    {filteredSkills.map((skill, key)=>(
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover"
                        >
                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg">
                                    {skill.name}
                                </h3>
                            </div>
                            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease_out]"
                                    style={{width: skill.level+"%"}}
                                >

                                </div>
                            </div>
                            <div className="text-right mt-1">
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="text-left mt-4">
                                <p className="text-muted-foreground">
                                    {skill.levelZ}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};