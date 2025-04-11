import { X } from "lucide-react";
import { Skill } from "@shared/schema";

interface SkillChipProps {
  skill: Skill;
  onRemove: () => void;
  highlighted?: boolean;
}

export default function SkillChip({ skill, onRemove, highlighted = false }: SkillChipProps) {
  return (
    <div className={`skill-chip ${highlighted ? 'bg-primary/20 text-primary' : 'bg-accent text-white'} px-3 py-1.5 rounded-full flex items-center space-x-2 border ${highlighted ? 'border-primary/20' : 'border-border'}`}>
      <span>{skill.name}</span>
      {onRemove && (
        <button 
          onClick={onRemove}
          className="text-muted-foreground hover:text-white transition-colors ml-2"
          aria-label={`Remove ${skill.name}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
