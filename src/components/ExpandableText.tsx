import { useState } from "react";

interface ExpandableTextProps {
    text: string;
    maxLength?: number;
    className?: string;
}

export const ExpandableText = ({ text, maxLength = 120, className }: ExpandableTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (text.length <= maxLength) {
        return <p className={className}>{text}</p>;
    }

    const displayText = isExpanded ? text : text.slice(0, maxLength).trim() + "...";

    return (
        <div className={className}>
            <span className="inline">
                {displayText}
            </span>
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
                className="text-primary hover:text-primary/80 font-medium ml-2 inline-flex items-center focus:outline-none transition-colors cursor-pointer"
            >
                {isExpanded ? "-- see less" : "-- see more"}
            </button>
        </div>
    );
};
