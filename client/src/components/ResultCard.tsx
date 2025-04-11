import { motion } from "framer-motion";
import { Recommendation, Skill } from "@shared/schema";
import SkillChip from "./SkillChip";
import { Check, Trophy, Briefcase, ArrowRight } from "lucide-react";

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

  // Get color based on match percentage
  const getMatchColor = () => {
    if (matchPercentage >= 80) return "text-green-500";
    if (matchPercentage >= 60) return "text-blue-500";
    if (matchPercentage >= 40) return "text-yellow-500";
    return "text-orange-500";
  };

  const getMatchBgColor = () => {
    if (matchPercentage >= 80) return "bg-green-500";
    if (matchPercentage >= 60) return "bg-blue-500";
    if (matchPercentage >= 40) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <motion.div
      className="result-card bg-card rounded-xl overflow-hidden shadow-lg border border-primary/10 hover:border-primary/30 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: delay / 1000,
        ease: "easeOut"
      }}
      whileHover={{ y: -5 }}
    >
      {/* Top match indicator */}
      {matchPercentage >= 90 && (
        <div className="bg-primary/20 text-primary text-xs font-medium py-1 px-3 flex items-center justify-center">
          <Trophy className="h-3 w-3 mr-1" />
          <span>Perfect Match</span>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-accent/50 p-2 rounded-full mr-3">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          <div className={`text-lg font-bold ${getMatchColor()} flex items-center`}>
            {matchPercentage}%
          </div>
        </div>
        
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Match Score</span>
            <span className={`${getMatchColor()}`}>{matchPercentage}%</span>
          </div>
          <div className="w-full bg-accent/50 rounded-full h-2.5">
            <motion.div
              className={`${getMatchBgColor()} h-2.5 rounded-full progress-bar`}
              initial={{ width: 0 }}
              animate={{ width: `${matchPercentage}%` }}
              transition={{ duration: 1, delay: (delay + 100) / 1000 }}
            />
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 border-l-2 border-primary/30 pl-3">{description}</p>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-white">Required Skills:</h4>
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {matchedSkills.length}/{requiredSkills.length} matched
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Display matched skills first */}
            {matchedSkills.map(skill => (
              <motion.div
                key={skill.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (delay + 200) / 1000 }}
              >
                <SkillChip skill={skill} highlighted onRemove={() => {}} />
              </motion.div>
            ))}
            
            {/* Then display unmatched skills */}
            {unmatched.map(skill => (
              <motion.div
                key={skill.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (delay + 300) / 1000 }}
              >
                <SkillChip skill={skill} onRemove={() => {}} />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Action button */}
        <div className="flex justify-end">
          <motion.button
            className="text-xs text-primary flex items-center hover:underline"
            whileHover={{ x: 3 }}
          >
            <span>Learn more</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
