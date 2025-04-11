import { motion } from "framer-motion";
import { Recommendation, Skill } from "@shared/schema";
import SkillChip from "./SkillChip";

interface ResultCardProps {
  recommendation: Recommendation;
  delay: number;
}

export default function ResultCard({ recommendation, delay }: ResultCardProps) {
  const { title, matchPercentage, description, matchedSkills, requiredSkills } = recommendation;
  
  // Determine which skills are matched and which are not
  const unmatched = requiredSkills.filter(
    skill => !matchedSkills.some(matched => matched.id === skill.id)
  );

  return (
    <motion.div
      className="result-card bg-card rounded-xl p-5 shadow-lg border border-border overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: delay / 1000,
        ease: "easeOut"
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-lg font-bold text-primary">{matchPercentage}%</span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Match Score</span>
          <span className="text-white">{matchPercentage}%</span>
        </div>
        <div className="w-full bg-accent rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${matchPercentage}%` }}
            transition={{ duration: 1, delay: (delay + 100) / 1000 }}
          />
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <div>
        <h4 className="text-sm font-medium text-white mb-2">Key Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {matchedSkills.map(skill => (
            <SkillChip key={skill.id} skill={skill} highlighted onRemove={() => {}} />
          ))}
          {unmatched.map(skill => (
            <SkillChip key={skill.id} skill={skill} onRemove={() => {}} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
